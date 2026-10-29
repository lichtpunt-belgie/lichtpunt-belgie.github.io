/* Lichtpunt België – alleen-lezen overzicht van persoonlijke studiedoelen.
   Leest dezelfde sleutels en Firestore-documenten als studievoortgang.js.
   Wijzigt zelf NOOIT studievinkjes, antwoorden of accountgegevens. */
import {configured, auth, db} from './firebase-service.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import {doc, getDocFromServer} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const lessons=[...document.querySelectorAll('.library-lesson[href],.library-lesson[data-release]')];
const listing=document.querySelector('.library-lessons');
if(listing && lessons.length){
 const today=(()=>{const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const p=k=>parts.find(x=>x.type===k)?.value||'';return `${p('year')}-${p('month')}-${p('day')}`;})();
 const keyFor=link=>{
   const url=(link.getAttribute('href')||'').split('?')[0].split('#')[0];
   const file=url.split('/').pop();
   return /^[a-z0-9-]+\.html$/.test(file)?file.slice(0,-5):null;
 };
 const idMap=new Map(lessons.map(el=>[el,keyFor(el)]));
 const available=lessons.filter(el=>!el.dataset.release || today>=el.dataset.release);
 const scheduled=lessons.length-available.length;
 const box=document.createElement('section');box.className='library-user-progress';box.setAttribute('aria-label','Mijn persoonlijke studievoortgang');
 const heading=document.createElement('h2');heading.textContent='Mijn studievoortgang';
 const count=document.createElement('p');count.className='library-progress-count';count.setAttribute('aria-live','polite');count.textContent='Je voortgang wordt geladen…';
 const bar=document.createElement('div');bar.className='library-progress-track';bar.setAttribute('role','progressbar');bar.setAttribute('aria-label','Percentage van beschikbare studies afgewerkt');bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');bar.setAttribute('aria-valuenow','0');
 const fill=document.createElement('div');fill.className='library-progress-fill';bar.append(fill);
 const note=document.createElement('p');note.className='library-progress-note';note.textContent='De persoonlijke vinkjes worden opgehaald.';
 box.append(heading,count,bar,note);listing.before(box);

 function readLocal(key){
   try{const data=JSON.parse(localStorage.getItem(key)||'{}');return data && typeof data.done==='object' && !Array.isArray(data.done)?data.done:{};}
   catch(_){return {};}
 }
 function show(done,source){
   let finished=0;
   for(const el of lessons){
     const old=el.querySelector('.library-personal-status'); if(old)old.remove();
     el.classList.remove('is-user-completed');
     if(el.dataset.release && el.dataset.release>today)continue;
     const id=idMap.get(el);if(!id)continue;
     const complete=done[id]===true;
     if(complete)finished++;
     const badge=document.createElement('span');
     badge.className='ls-status library-personal-status '+(complete?'is-completed':'is-todo');
     badge.textContent=complete?'✓ Afgewerkt':'○ Nog te doen';
     const holder=el.querySelector('.library-lesson-status');
     if(holder)holder.append(badge);
     el.classList.toggle('is-user-completed',complete);
   }
   const total=available.length;
   if(total===0)count.textContent=`Nog geen studies beschikbaar · ${scheduled} binnenkort`;
   else count.textContent=`${finished} van ${total} beschikbare studies afgewerkt${scheduled?' · '+scheduled+' binnenkort':''}`;
   const value=total?Math.round(100*finished/total):0;
   fill.style.width=value+'%';bar.setAttribute('aria-valuenow',String(value));
   note.textContent=source;
 }
 function guest(){show(readLocal('lichtpunt.study.v1'),'Voortgang wordt alleen op dit toestel bewaard. Met een account kun je ze op andere toestellen terugvinden.');}
 let latestRequest=0;
 async function loadForUser(user){
   const request=++latestRequest;
   if(!user){guest();return;}
   // De lokaal opgeslagen laatste stand verschijnt direct na terugnavigeren.
   const cached=readLocal('lichtpunt.study.user.'+user.uid+'.v1');
   const pending=readLocal('lichtpunt.study.pending.'+user.uid+'.v1');
   show({...cached,...pending},'Je accountvoortgang wordt gecontroleerd…');
   try{
     const snapshot=await getDocFromServer(doc(db,'users',user.uid,'private','study'));
     if(request!==latestRequest)return;
     const cloud=snapshot.exists() && snapshot.data()?.done && typeof snapshot.data().done==='object'?snapshot.data().done:{};
     // De wachtrij krijgt voorrang, ook wanneer de server nog oudere gegevens heeft.
     show({...cloud,...readLocal('lichtpunt.study.pending.'+user.uid+'.v1')},'Persoonlijke voortgang uit je account. Een vinkje kun je in de studie zelf aan- of uitzetten.');
   }catch(_){
     if(request!==latestRequest)return;
     show({...readLocal('lichtpunt.study.user.'+user.uid+'.v1'),...readLocal('lichtpunt.study.pending.'+user.uid+'.v1')},'Online voortgang niet bereikbaar. Dit is de laatst lokaal bewaarde stand; controleer opnieuw wanneer je verbinding werkt.');
   }
 }
 if(!configured){guest();}
 else onAuthStateChanged(auth,user=>{void loadForUser(user);});
 // Bij teruggaan via de browser kan een pagina uit de cache komen.
 window.addEventListener('pageshow',event=>{
   if(!event.persisted)return;
   if(configured)void loadForUser(auth?.currentUser||null);
   else guest();
 });
}
