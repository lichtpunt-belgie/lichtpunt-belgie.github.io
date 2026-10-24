/* Lichtpunt België – persoonlijk notitieboek, oktober 2026.
 * Neemt GEEN bestaande antwoorden of voltooide studies over of weg.
 * Voor aangemelde lezers: notes.<studiedag> in hetzelfde beveiligde
 * users/{uid}/private/study-document als de bestaande studievoortgang.
 * Gasten: uitsluitend localStorage op dit toestel.
 * Geen notitie of profiel wordt gedeeld met andere bezoekers.
 */
import {configured, auth, db} from './firebase-service.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import {doc, getDocFromServer, setDoc} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const root = document.querySelector('[data-notes-app]');
const studyId = document.body?.dataset.studyId || '';
const VALID_ID = /^(studie(?:-dag-[1-7])?|petrus-week[12]-dag[1-7]|genesis-week[12]-dag[1-7]|koran-soera49-13)$/;
const GUEST_KEY=`lichtpunt.notities.gast.${studyId}.v2`;
const OLD_GUEST_KEY='lichtpunt.notities.gast.v1';
const userCache = uid=>`lichtpunt.notities.gebruiker.${uid}.${studyId}.v1`;
const pendingKey = uid=>`lichtpunt.notities.wachtend.${uid}.${studyId}.v1`;
const MAX_NOTES=12, MAX_BODY=2000, MAX_TITLE=90, MAX_VERSE=90;
const el = sel => root?.querySelector(sel);
let uid=null, entries=[], pending=false, loaded=false, currentEdit=null;
let loadingToken=0, uploading=false, uploadTimer=null;

function localRead(key){try {const value=JSON.parse(localStorage.getItem(key)||'null');return Array.isArray(value)?sanitize(value):null;}catch(_){return null;}}
function localSave(key, list){try{localStorage.setItem(key,JSON.stringify(list));return true;}catch(_){return false;}}
// Oudere proefversies hebben anonieme notities zonder een studiedagcode
// bewaard. Alleen op de oorspronkelijke proefdag een kopie aanbieden; de
// oorspronkelijke sleutel blijft onaangeroerd, zodat niets wordt gewist.
function guestRead(){
  const perDay=localRead(GUEST_KEY);
  if(perDay!==null) return perDay;
  if(studyId==='studie-dag-1'){
    const old=localRead(OLD_GUEST_KEY);
    if(old!==null){localSave(GUEST_KEY,old);return old;}
  }
  return [];
}
function sanitize(source){
  if (!Array.isArray(source))return [];
  return source.slice(0,MAX_NOTES).filter(x=>x&&typeof x==='object'&&typeof x.id==='string').map(x=>({
    id:x.id.slice(0,90), title:String(x.title||'').slice(0,MAX_TITLE),
    verse:String(x.verse||'').slice(0,MAX_VERSE), body:String(x.body||'').slice(0,MAX_BODY),
    createdAt:String(x.createdAt||'').slice(0,30), updatedAt:String(x.updatedAt||'').slice(0,30)
  }));
}
function message(text,kind='normal'){
  const node=el('[data-note-status]');if(node){node.textContent=text;node.dataset.level=kind;}
}
function make(tag,className='',text=''){
  const node=document.createElement(tag);if(className)node.className=className;if(text)node.textContent=text;return node;
}
function render(){
  if(!root)return;
  el('[data-note-add]').disabled=!loaded||entries.length>=MAX_NOTES;
  el('[data-note-refresh]').hidden=!uid;
  el('[data-note-refresh]').disabled=!loaded;
  el('[data-note-export]').disabled=!loaded||!entries.length;
  el('[data-note-count]').textContent=`${entries.length} van maximaal ${MAX_NOTES} notities`;
  const list=el('[data-note-list]');list.replaceChildren();
  if(!entries.length){
    list.append(make('p','notes-empty','Nog geen notities bij deze studiedag. Voeg je eerste gedachte of opzoeking toe.'));
    return;
  }
  entries.forEach(entry=>{
    const item=make('article','notes-item');
    const title=make('h4','notes-item-title',entry.title||'Notitie zonder titel');
    const meta=make('p','notes-item-meta');
    meta.textContent=(entry.verse?`${entry.verse} · `:'')+'Bijgewerkt '+formatTime(entry.updatedAt||entry.createdAt);
    const body=make('p','notes-item-body',entry.body);
    const buttons=make('div','notes-row');
    const edit=make('button','notes-button notes-button-plain','Bewerken');edit.type='button';
    edit.addEventListener('click',()=>openForm(entry));
    const remove=make('button','notes-button notes-button-danger','Verwijderen');remove.type='button';
    remove.addEventListener('click',()=>removeEntry(entry.id));
    buttons.append(edit,remove);item.append(title,meta,body,buttons);list.append(item);
  });
}
function formatTime(text){
  if(!text)return 'datum onbekend';const d=new Date(text);
  if(Number.isNaN(d.getTime()))return 'datum onbekend';
  return new Intl.DateTimeFormat('nl-BE',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Brussels'}).format(d);
}
function openForm(entry=null){
  if(!loaded)return;
  currentEdit=entry?.id||null;
  el('[data-note-form-title]').textContent=entry?'Notitie bewerken':'Nieuwe notitie';
  el('[data-note-title]').value=entry?.title||'';
  el('[data-note-verse]').value=entry?.verse||'';
  el('[data-note-body]').value=entry?.body||'';
  el('[data-note-form]').hidden=false;
  el('[data-note-title]').focus();
}
function closeForm(){el('[data-note-form]').hidden=true;currentEdit=null;el('[data-note-form]').reset();}
function idNew(){return typeof crypto?.randomUUID==='function'?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,12)}`;}
function persist(next){
  const key=uid?userCache(uid):GUEST_KEY;
  const clean=sanitize(next);
  if(!localSave(key,clean)){
    message('⚠️ Opslaan op dit toestel lukt niet. Kopieer je tekst voordat je verdergaat.','error');return false;
  }
  if(uid&&!localSave(pendingKey(uid),clean)){
    message('⚠️ Online wijzigingen kunnen niet veilig in de wachtrij worden gezet.','error');return false;
  }
  entries=clean;pending=Boolean(uid);render();
  if(uid){message('Op dit toestel bewaard · online controle volgt…');schedule();}
  else message('✓ Op dit toestel bewaard. Zonder registratie worden notities niet online verstuurd.','success');
  return true;
}
function saveEntry(e){
  e.preventDefault();if(!loaded)return;
  const title=el('[data-note-title]').value.trim().slice(0,MAX_TITLE);
  const verse=el('[data-note-verse]').value.trim().slice(0,MAX_VERSE);
  const body=el('[data-note-body]').value.trim().slice(0,MAX_BODY);
  if(!body){message('Schrijf eerst je notitie. De titel en bronverwijzing zijn optioneel.','error');return;}
  const now=new Date().toISOString();
  const old=entries.find(x=>x.id===currentEdit);
  if(!old&&entries.length>=MAX_NOTES){message('Maximum aantal notities bereikt. Je kunt eerdere notities bewerken.','error');return;}
  const note={id:old?.id||idNew(),title,verse,body,createdAt:old?.createdAt||now,updatedAt:now};
  const next=old?entries.map(x=>x.id===old.id?note:x):[note,...entries];
  if(persist(next))closeForm();
}
function removeEntry(id){
  const note=entries.find(n=>n.id===id);if(!note)return;
  if(!window.confirm(`Wil je de notitie ‘${note.title||'Zonder titel'}’ verwijderen?`))return;
  const next=entries.filter(n=>n.id!==id);
  if(persist(next)&&currentEdit===id)closeForm();
}
function schedule(){
  if(uploadTimer)clearTimeout(uploadTimer);
  uploadTimer=setTimeout(()=>{uploadTimer=null;void upload();},1100);
}
function equal(a,b){return JSON.stringify(sanitize(a))===JSON.stringify(sanitize(b));}
async function upload(){
  if(!uid||uploading||!loaded||!pending)return;
  const active=uid, token=loadingToken;
  const value=localRead(pendingKey(active));
  if(value===null)return;
  uploading=true;message('Notities worden online opgeslagen…');
  let again=false;
  try{
    // Alleen het veld notes.<studiedag> wordt bijgewerkt.
    // Bestaande answers en done worden NIET aangeraakt.
    const ref=doc(db,'users',active,'private','study');
    await setDoc(ref,{notes:{[studyId]:value}},{merge:true});
    const snapshot=await getDocFromServer(ref);
    if(token!==loadingToken||active!==uid)return;
    const fromServer=snapshot.exists()?snapshot.data()?.notes?.[studyId]:null;
    if(!equal(fromServer,value)){
      message('⚠️ Online controle nog niet gelukt. Je notities staan op dit toestel.','error');return;
    }
    const waiting=localRead(pendingKey(active));
    if(waiting!==null&&equal(waiting,value)){
      try{localStorage.removeItem(pendingKey(active));}catch(_){/* blijft veilig in wachtlijst */}
      pending=false;
      message('✓ Notities online opgeslagen en gecontroleerd · alleen voor jouw account.','success');
    }else{
      pending=true;again=true;
      message('Eerdere wijziging online bevestigd · nieuwere wijziging wordt nog bewaard.');
    }
  }catch(_){
    if(token===loadingToken&&active===uid)message('⚠️ Nog niet online opgeslagen. Je notities blijven op dit toestel staan.','error');
  }finally{
    uploading=false;
    if(again&&token===loadingToken&&active===uid)schedule();
  }
}
async function loadUser(user){
  const token=++loadingToken;
  uid=user?.uid||null;loaded=false;pending=false;render();closeForm();
  if(!uid){
    entries=guestRead();loaded=true;render();
    message('Notities worden alleen in deze browser bewaard. Voor synchronisatie kun je je gratis aanmelden.');
    return;
  }
  const current=uid;
  message('Je persoonlijke notities worden geladen…');
  const pendingCopy=localRead(pendingKey(current));
  try{
    const ref=doc(db,'users',current,'private','study');
    const snapshot=await getDocFromServer(ref);
    if(token!==loadingToken||uid!==current)return;
    const cloud=sanitize(snapshot.exists()?snapshot.data()?.notes?.[studyId]:[]);
    if(pendingCopy!==null){
      entries=pendingCopy;pending=true;message('Notities op dit toestel wachten nog op online bevestiging…');
    }else{
      entries=cloud;
      localSave(userCache(current),cloud);
      message('✓ Je notities zijn geladen uit jouw online account.','success');
    }
    loaded=true;render();if(pending)schedule();
  }catch(_){
    if(token!==loadingToken||uid!==current)return;
    entries=pendingCopy||localRead(userCache(current))||[];
    pending=pendingCopy!==null;
    // Geen wijzigingen toestaan totdat we weten wat er in de cloud staat:
    // dit voorkomt dat een offline toestel oudere notities overschrijft.
    loaded=false;render();
    message('⚠️ Online notities konden niet worden geladen. Je ziet eventueel een lokale kopie, maar bewerken is uitgeschakeld. Vernieuw zodra internet werkt.','error');
  }
}
async function refresh(){
  if(!uid)return;
  if(pending||localRead(pendingKey(uid))!==null){message('Er wachten nog wijzigingen op online opslag. Vernieuw pas na een geslaagde bevestiging.','error');return;}
  if(!loaded)return;
  const current=uid,token=loadingToken;
  try{
    message('De laatste notities worden opgehaald…');
    const snapshot=await getDocFromServer(doc(db,'users',current,'private','study'));
    if(token!==loadingToken||current!==uid)return;
    const cloud=sanitize(snapshot.exists()?snapshot.data()?.notes?.[studyId]:[]);
    entries=cloud;localSave(userCache(current),cloud);render();
    message('✓ De laatste online notities zijn opgehaald.','success');
  }catch(_){message('⚠️ Ophalen is niet gelukt. Je bestaande notities blijven staan.','error');}
}
function exportNotes(){
  if(!entries.length)return;
  const name='Lichtpunt-notities-'+studyId+'.txt';
  const text='LICHTPUNT BELGIË – PERSOONLIJKE STUDIENOTITIES\nStudie: '+studyId+'\n\n'+entries.map(x=>
    (x.title||'Notitie')+'\n'+(x.verse?x.verse+'\n':'')+'Bijgewerkt: '+formatTime(x.updatedAt)+'\n\n'+x.body+'\n'
  ).join('\n------------------------------\n\n');
  const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=make('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function init(){
  if(!root||!VALID_ID.test(studyId))return;
  root.hidden=false;
  el('[data-note-add]').addEventListener('click',()=>openForm());
  el('[data-note-cancel]').addEventListener('click',closeForm);
  el('[data-note-form]').addEventListener('submit',saveEntry);
  el('[data-note-refresh]').addEventListener('click',()=>void refresh());
  el('[data-note-export]').addEventListener('click',exportNotes);
  render();
  if(configured){onAuthStateChanged(auth,user=>{void loadUser(user);});}
  else{void loadUser(null);}
  window.addEventListener('online',()=>{if(uid&&pending&&loaded)schedule();});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
