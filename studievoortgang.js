/* Lichtpunt België: studiedagen afvinken en eigen notities.
   Geen aanmelding, geen serveropslag. Alleen localStorage in deze browser.
   Dagelijkse publicatie blijft geregeld door vrijgave.js. */
(function () {
 'use strict';
 const KEY='lichtpunt.study.v1';
 let userId=null;
 const storageKey=()=>userId?`lichtpunt.study.user.${userId}.v1`:KEY;
 const first='2026-10-19';
 const order=['petrus-begin','petrus-vervolg','genesis-begin','petrus-derde-reeks','genesis-tweede-reeks','koran-eerste'];
 const schedule={
  'petrus-vervolg':[
    ['Leven met de overheid','1 Petrus 2:13–17'],
    ['Onrecht en de werkelijkheid van slavernij','1 Petrus 2:18–20'],
    ['Jezus als voorbeeld bij lijden','1 Petrus 2:21–25'],
    ['Vrouwen in een Romeins huishouden','1 Petrus 3:1–2'],
    ['Innerlijke schoonheid en wederzijds respect','1 Petrus 3:3–7'],
    ['Een gemeenschap zonder vergelding','1 Petrus 3:8–9'],
    ['Vrede zoeken en nastreven','1 Petrus 3:10–12']
  ],
  'genesis-begin':[
    ['Een begin en een ongevormde aarde','Genesis 1:1–2'],
    ['Licht en duisternis','Genesis 1:3–5'],
    ['Het hemelgewelf en het droge land','Genesis 1:6–10'],
    ['Planten en groeikracht','Genesis 1:11–13'],
    ['Zon, maan en sterren','Genesis 1:14–19'],
    ['Leven in het water en de lucht','Genesis 1:20–25'],
    ['De mens en de waarde van de schepping','Genesis 1:26–31']
  ]
 };
 let memoryState={done:{},answers:{}};
 let storageWorks=true;
 function readState(){
   try {
     const raw=window.localStorage.getItem(storageKey());
     if(!raw)return memoryState;
     const data=JSON.parse(raw);
     if(!data||typeof data!=='object')return memoryState;
     return {done:data.done&&typeof data.done==='object'?data.done:{},answers:data.answers&&typeof data.answers==='object'?data.answers:{}};
   }catch(err){storageWorks=false;return memoryState;}
 }
 function saveState(state,change){
   memoryState=state;
   try {window.localStorage.setItem(storageKey(),JSON.stringify(state));storageWorks=true;}
   catch(err){storageWorks=false;}
   if(change && userId)window.dispatchEvent(new CustomEvent("lichtpunt:studychange",{detail:change}));
 }
 function isDone(id){return Boolean(readState().done[id]);}
 function setDone(id,done){const state=readState();if(done)state.done[id]=true;else delete state.done[id];saveState(state,{id,field:"done",value:!!done});refreshOverview();}
 function belgianDate(){
   const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
   const val=k=>parts.find(x=>x.type===k).value;
   return `${val('year')}-${val('month')}-${val('day')}`;
 }
 function updateProgressSummaries(){
   document.querySelectorAll('[data-progress-series]').forEach(grid=>{
     const series=grid.dataset.progressSeries;
     const cards=Array.from(grid.querySelectorAll('.lesson-card[data-study-id]'));
     const finished=cards.filter(card=>isDone(card.dataset.studyId)).length;
     const summary=document.querySelector(`[data-progress-summary="${series}"]`);
     if(!summary)return;
     summary.querySelector('.study-progress-count').textContent=`Mijn voortgang: ${finished} van ${cards.length} voltooid`;
     const bar=summary.querySelector('[role="progressbar"]');
     bar.setAttribute('aria-valuenow',String(finished));
     bar.querySelector('.study-progress-fill').style.width=`${(finished/cards.length)*100}%`;
   });
 }
 function refreshOverview(){
   document.querySelectorAll('.lesson-progress-item').forEach(wrapper=>{
     const card=wrapper.querySelector('.lesson-card');
     const checkbox=wrapper.querySelector('input[type="checkbox"]');
     const checked=isDone(card.dataset.studyId);
     wrapper.classList.toggle('is-complete',checked);
     if(checkbox) checkbox.checked=checked;
   });
   updateProgressSummaries();
 }
 function initOverview(){
   document.querySelectorAll('[data-progress-series] .lesson-card[data-study-id]').forEach(card=>{
     const id=card.dataset.studyId;
     const wrapper=document.createElement('div');wrapper.className='lesson-progress-item';
     card.parentElement.insertBefore(wrapper,card);
     wrapper.append(card);
     const release=card.dataset.release;
     const available=!release || release<=belgianDate();
     if(available){
       const label=document.createElement('label');label.className='lesson-progress-mark';
       const cb=document.createElement('input');cb.type='checkbox';cb.checked=isDone(id);
       cb.setAttribute('aria-label',`Markeer ${card.querySelector('h3')?.textContent||id} als voltooid`);
       cb.addEventListener('change',()=>setDone(id,cb.checked));
       const span=document.createElement('span');span.textContent='Deze studie heb ik gedaan';
       label.append(cb,span);wrapper.append(label);
     }
   });
   refreshOverview();
   const msg=document.querySelector('.progress-privacy-hint');
   if(msg&&!storageWorks)msg.textContent='Je browser staat plaatselijke opslag niet toe. Vinkjes blijven daarom mogelijk niet bewaard na afsluiten.';
 }
 function initLesson(){
   const id=document.body.dataset.studyId;
   if(!id)return;
   const release=document.body.dataset.release;
   if(release && belgianDate()<release) return;
   const checkbox=document.querySelector('[data-study-complete]');
   if(checkbox){
     checkbox.checked=isDone(id);
     checkbox.addEventListener('change',()=>setDone(id,checkbox.checked));
   }
   const text=document.querySelector('[data-personal-answer]');
   const feedback=document.querySelector('[data-save-status]');
   if(text){
     const state=readState(); text.value=String(state.answers[id]||'');
     const notice=()=>{feedback.textContent=!storageWorks?'Opslaan op dit toestel is geblokkeerd. Kopieer je tekst om hem te bewaren.':userId?'Bewaard op dit toestel · Online synchronisatie bij verbinding. Alleen jij kunt dit antwoord via je account bekijken.':'Alleen bewaard in deze browser · Niet verstuurd naar Lichtpunt.';};
     notice();
     text.addEventListener('input',()=>{
       const data=readState();
       if(text.value.trim()) data.answers[id]=text.value; else delete data.answers[id];
       saveState(data,{id,field:"answers",value:text.value});notice();
     });
     const clear=document.querySelector('[data-clear-answer]');
     clear?.addEventListener('click',()=>{
       text.value='';const data=readState();delete data.answers[id];saveState(data,{id,field:"answers",value:""});notice();text.focus();
     });
   }
 }
 function initToday(){
   const container=document.getElementById('daily-studies');
   if(!container)return;
   const today=belgianDate();
  // Vanaf 2 november gaat het vervolg van 1 Petrus verder. Genesis wacht op de volgende reeks.
  if(today>='2026-11-02'){
    const start=Date.parse('2026-11-02T12:00:00Z');
    const elapsed=Math.max(0,Math.floor((Date.parse(today+'T12:00:00Z')-start)/86400000));
    const index=Math.min(13,elapsed);
    const titles=[
      ['Een brief aan mensen die zich vreemden voelen','1 Petrus 1:1–2'],
      ['Een levende hoop, ondanks onzekerheid','1 Petrus 1:3–5'],
      ['Vreugde en verdriet kunnen naast elkaar bestaan','1 Petrus 1:6–9'],
      ['Profeten, vragen en een groter verhaal','1 Petrus 1:10–12'],
      ['Heilig leven begint bij bewust nadenken','1 Petrus 1:13–16'],
      ['Waarde, vrijheid en een nieuwe levensweg','1 Petrus 1:17–21'],
      ['Oprechte liefde en woorden die blijven','1 Petrus 1:22–25'],
      ['Wanneer het moeilijk wordt','1 Petrus 4:12–14'],
      ['Niet alle tegenslag is hetzelfde','1 Petrus 4:15–16'],
      ['Vertrouwen zonder het goede op te geven','1 Petrus 4:17–19'],
      ['Leiding geven is dienen, niet overheersen','1 Petrus 5:1–4'],
      ['Nederigheid en zorgen delen','1 Petrus 5:5–7'],
      ['Waakzaam zijn zonder in angst te leven','1 Petrus 5:8–11'],
      ['Een laatste groet en een boodschap van vrede','1 Petrus 5:12–14']
    ];
    const tag=document.getElementById('today-study-tag');
    if(tag)tag.textContent=elapsed>13?'Studies · laatst verschenen':`Nieuwe studie · ${today.split('-').reverse().join('/')}`;
    container.replaceChildren();
    const row=document.createElement('div');row.className='daily-study-row';
    const small=document.createElement('span');small.className='daily-study-series';small.textContent=`1 Petrus · aanvulling, deel ${index+1} van 14`;
    const link=document.createElement('a');link.className='daily-study-link';link.href=`petrus-volledig-${String(index+1).padStart(2,'0')}.html`;link.textContent=titles[index][0]+' →';
    const detail=document.createElement('span');detail.className='daily-study-passage';detail.textContent=titles[index][1];
    row.append(small,link,detail);container.append(row);
    const gen=document.createElement('div');gen.className='daily-study-row';
    const genLabel=document.createElement('span');genLabel.className='daily-study-series';genLabel.textContent='Genesis · vervolg in voorbereiding';
    const genLink=document.createElement('a');genLink.className='daily-study-link';genLink.href='bibliotheek-boek-genesis.html';genLink.textContent='Bekijk alle beschikbare Genesisstudies →';
    gen.append(genLabel,genLink);container.append(gen);
    return;
  }
  if(today>='2026-10-26'){
     const date0=Date.parse('2026-10-26T12:00:00Z');
     const index2=Math.min(6,Math.max(0,Math.floor((Date.parse(today+'T12:00:00Z')-date0)/86400000)));
     const future=[
       ['petrus-derde-reeks','Petrus','petrus-week2-dag'],
       ['genesis-tweede-reeks','Genesis','genesis-week2-dag']
     ];
     const data2={
       'petrus-derde-reeks':[["Moed wanneer je goed probeert te doen", "1 Petrus 3:13–14"], ["Uitleg geven met zachtheid en respect", "1 Petrus 3:15–17"], ["Een moeilijke passage over lijden en geesten", "1 Petrus 3:18–20"], ["Noach, water en de betekenis van de doop", "1 Petrus 3:20–22"], ["Een nieuwe levensrichting kiezen", "1 Petrus 4:1–3"], ["Buiten de groep staan en anders bekeken worden", "1 Petrus 4:4–6"], ["Gastvrijheid, liefde en ieders bijdrage", "1 Petrus 4:7–11"]],
       'genesis-tweede-reeks':[["De zevende dag: rust en voltooiing", "Genesis 2:1–3"], ["Twee scheppingsvertellingen naast elkaar", "Genesis 2:4–6"], ["De mens, de aarde en de levensadem", "Genesis 2:7–9"], ["Eden en de vier rivieren", "Genesis 2:10–14"], ["De tuin bewerken én bewaren", "Genesis 2:15–17"], ["Is alleen zijn goed voor de mens?", "Genesis 2:18–20"], ["Een partner: herkenning en verbondenheid", "Genesis 2:21–25"]]
     };
     const tag=document.getElementById('today-study-tag');
     tag.textContent=today>'2026-11-01'?'Studies · laatst verschenen':`Nieuwe studies · ${today.split('-').reverse().join('/')}`;
     container.replaceChildren();
     future.forEach(([key,label,prefix])=>{
       const [name,ref]=data2[key][index2];
       const row=document.createElement('div');row.className='daily-study-row';
       const small=document.createElement('span');small.className='daily-study-series';small.textContent=`${label} · vervolg, dag ${index2+1} van 7`;
       const link=document.createElement('a');link.href=`${prefix}${index2+1}.html`;link.className='daily-study-link';link.textContent=`${name} →`;
       const detail=document.createElement('span');detail.className='daily-study-passage';detail.textContent=ref;
       row.append(small,link,detail);container.append(row);
     });
     if(!index2){
       const row=document.createElement('div');row.className='daily-study-row';
       const small=document.createElement('span');small.className='daily-study-series';small.textContent='Koran · eerste studie';
       const link=document.createElement('a');link.href='koran-soera49-13.html';link.className='daily-study-link';link.textContent='Elkaar leren kennen, ondanks verschillen →';
       row.append(small,link);container.append(row);
     }
     return;
  }
   const index=Math.min(6,Math.floor((Date.parse(today+'T12:00:00Z')-Date.parse(first+'T12:00:00Z'))/86400000));
   const titleTag=document.getElementById('today-study-tag');
   if(index<0){
     titleTag.textContent='Studies · 1 Petrus';
     container.replaceChildren();
     const link=document.createElement('a');link.href='studie-dag-7.html';link.className='button';link.textContent='Lees de eerste Petrusreeks →';
     container.append(link);
     return;
   }
   if(index===6 && today>'2026-10-25') titleTag.textContent='Studies · laatst verschenen';
   else titleTag.textContent=`Studie · ${today.split('-').reverse().join('/')}`;
   container.replaceChildren();
   [['petrus-vervolg','Petrus','petrus-week1-dag'],['genesis-begin','Genesis','genesis-week1-dag']].forEach(([key,label,prefix])=>{
     const [name,ref]=schedule[key][index];
     const row=document.createElement('div');row.className='daily-study-row';
     const small=document.createElement('span');small.className='daily-study-series';small.textContent=`${label} · dag ${index+1} van 7`;
     const link=document.createElement('a');link.href=`${prefix}${index+1}.html`;link.className='daily-study-link';link.textContent=`${name} →`;
     const detail=document.createElement('span');detail.className='daily-study-passage';detail.textContent=ref;
     row.append(small,link,detail);container.append(row);
   });
 }
 function applyCloud(uid,data){
   userId=uid;
   const clean={done:data&&data.done&&typeof data.done==='object'?data.done:{},answers:data&&data.answers&&typeof data.answers==='object'?data.answers:{}};
   memoryState=clean;
   try{localStorage.setItem(storageKey(),JSON.stringify(clean));}catch(e){storageWorks=false;}
   refreshOverview();
   const cb=document.querySelector('[data-study-complete]');
   if(cb)cb.checked=isDone(document.body.dataset.studyId);
   const text=document.querySelector('[data-personal-answer]');
   if(text){const value=String(clean.answers[document.body.dataset.studyId]||'');if(text.value!==value)text.value=value;}
   const notice=document.querySelector('[data-save-status]');
   if(notice)notice.textContent='Online synchronisatie ingeschakeld · Je antwoorden zijn privé.';
   const hint=document.querySelector('.progress-privacy-hint');
   if(hint)hint.textContent='✓ Je studies en antwoorden worden via je account bewaard, en verschijnen na aanmelden ook op je andere toestellen.';
 }
 function disconnect(){
   const old=userId;userId=null;memoryState={done:{},answers:{}};
   if(old){try{localStorage.removeItem(`lichtpunt.study.user.${old}.v1`);}catch(e){}}
   refreshOverview();
   const cb=document.querySelector('[data-study-complete]');if(cb)cb.checked=isDone(document.body.dataset.studyId);
   const text=document.querySelector('[data-personal-answer]');if(text)text.value=String(readState().answers[document.body.dataset.studyId]||'');
   const hint=document.querySelector('.progress-privacy-hint');if(hint)hint.textContent='✓ Zonder account blijven vinkjes en notities alleen in deze browser bewaard. Met registratie kun je ze op andere toestellen terugvinden.';
   const notice=document.querySelector('[data-save-status]');if(notice)notice.textContent='Alleen bewaard in deze browser · Niet verstuurd naar Lichtpunt.';
 }
 window.LichtpuntVoortgang={applyCloud,disconnect,guestState:()=>{
   try{const a=JSON.parse(localStorage.getItem(KEY)||'{}');return {done:a.done||{},answers:a.answers||{}};}catch(e){return{done:{},answers:{}};}
 }};
 function init(){initOverview();initLesson();initToday();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 window.addEventListener('storage',event=>{if(event.key===KEY)refreshOverview();});
})();
