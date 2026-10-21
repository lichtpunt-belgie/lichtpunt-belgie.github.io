/* Lichtpunt – privé studiedata, uitsluitend na Firebase-aanmelding.
   Zonder account gaat er geen voortgang naar Firebase.
   Schrijfacties worden samengevoegd en nog niet bevestigde wijzigingen
   blijven lokaal in een aparte wachtrij bewaard voor opnieuw proberen.
*/
import { configured, auth, db } from './firebase-service.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { doc, getDoc, setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const progress=window.LichtpuntVoortgang;
const clean=o=>({done:o?.done&&typeof o.done==='object'?o.done:{},answers:o?.answers&&typeof o.answers==='object'?o.answers:{}});
const validId=id=>/^(studie(?:-dag-[1-7])?|petrus-week1-dag[1-7]|genesis-week1-dag[1-7])$/.test(id);
const qKey=uid=>`lichtpunt.proef.study.pending.${uid}.v1`;
let uid=null,ready=false,unsub=null,timer=null,writing=false,latestCloud={done:{},answers:{}};
function readPending(userId){try{return clean(JSON.parse(localStorage.getItem(qKey(userId))||'{}'));}catch{return clean(null);}}
function savePending(userId,data){try{localStorage.setItem(qKey(userId),JSON.stringify(clean(data)));}catch{/* browser kan opslag blokkeren */}}
function empty(obj){return Object.keys(obj.done||{}).length===0&&Object.keys(obj.answers||{}).length===0;}
function renderStatus(message){document.querySelectorAll('[data-save-status]').forEach(el=>{el.textContent=message;});}
function updateNav(user){document.querySelectorAll('.account-shortcut').forEach(el=>{el.textContent=user?'☀ Mijn account':'☀ Aanmelden';});}
function blend(base,changes){return {done:{...base.done,...changes.done},answers:{...base.answers,...changes.answers}};}
function cancel(){if(timer)clearTimeout(timer);timer=null;if(unsub)unsub();unsub=null;ready=false;}
function schedule(){if(timer)clearTimeout(timer);timer=setTimeout(()=>{timer=null;void flush();},1100);}
async function flush(){
 if(writing||!uid||!ready)return;
 const whom=uid;
 const pending=readPending(whom);
 if(empty(pending))return;
 writing=true;
 let succeeded=false;
 renderStatus('Online bewaren…');
 try{
  await setDoc(doc(db,'users',whom,'private','study'),pending,{merge:true});
  // Verwijder alleen de waarden die intussen niet opnieuw gewijzigd zijn.
  const current=readPending(whom);
  for(const field of ['done','answers']){
   for(const [id,value] of Object.entries(pending[field])){
    if(current[field][id]===value)delete current[field][id];
   }
  }
  savePending(whom,current);
  latestCloud=blend(latestCloud,pending);
  succeeded=true;
  if(uid===whom){
   renderStatus(empty(current)?'✓ Online opgeslagen · Alleen toegankelijk via jouw account.':'Nieuwe wijzigingen wachten nog op opslaan.');
  }
 }catch(e){
  if(uid===whom)renderStatus('⚠️ Nog niet online opgeslagen. De wijziging blijft voorlopig op dit toestel bewaard.');
 }finally{
  writing=false;
  if(succeeded&&uid===whom&&!empty(readPending(whom))&&navigator.onLine)schedule();
 }
}
window.addEventListener('lichtpunt:studychange',e=>{
 const c=e.detail;
 if(!uid||!['done','answers'].includes(c?.field)||!validId(c.id))return;
 const p=readPending(uid);
 p[c.field][c.id]=c.field==='done'?Boolean(c.value):String(c.value).slice(0,5000);
 savePending(uid,p);
 renderStatus('Op dit toestel bewaard · Online bewaren volgt…');
 if(ready)schedule();
});
window.addEventListener('online',()=>{if(uid&&ready)schedule();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&uid&&ready)void flush();});

if(configured){
 onAuthStateChanged(auth,async user=>{
  cancel();const current=user?.uid||null;uid=current;
  updateNav(user);
  if(!user){progress?.disconnect();return;}
  if(!progress)return;
  const ref=doc(db,'users',current,'private','study');
  try{
   let snapshot=await getDoc(ref);
   if(uid!==current)return;
   if(!snapshot.exists()){
    // Alleen bij een nieuw leeg cloudaccount wordt anonieme lokale voortgang overgenomen.
    const guest=clean(progress.guestState());
    if(!empty(guest))await setDoc(ref,guest);
    else await setDoc(ref,{done:{},answers:{}});
    snapshot=await getDoc(ref);
   }
   if(uid!==current)return;
   latestCloud=clean(snapshot.data());
   const pending=readPending(current);
   progress.applyCloud(current,blend(latestCloud,pending));
   ready=true;
   unsub=onSnapshot(ref,snap=>{
    if(uid!==current||!snap.exists())return;
    latestCloud=clean(snap.data());
    // Bekijk altijd de nog niet bevestigde lokale wijzigingen voordat de UI wordt vernieuwd.
    progress.applyCloud(current,blend(latestCloud,readPending(current)));
   },()=>renderStatus('⚠️ Verbinding met de online opslag is onderbroken.'));
   if(!empty(pending))schedule();
   else renderStatus('✓ Online gesynchroniseerd · Alleen toegankelijk via jouw account.');
  }catch(e){
   if(uid===current){ready=false;renderStatus('⚠️ Kon je online gegevens niet ophalen. Probeer het later opnieuw.');}
  }
 });
}
