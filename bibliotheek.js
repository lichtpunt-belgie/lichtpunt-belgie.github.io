/* Lichtpunt België · directory search + availability in Belgian time. No personal data touched. */
(function(){
'use strict';
const search=document.querySelector('#library-search');
if(search){
 const all=[...document.querySelectorAll('.library-entry')];
 const groups=[...document.querySelectorAll('[data-book-group]')];
 const counter=document.querySelector('[data-library-count]');
 const empty=document.querySelector('#library-no-results');
 const filter=()=>{
   const q=search.value.toLocaleLowerCase('nl').trim();let visible=0;
   all.forEach(e=>{const match=e.textContent.toLocaleLowerCase('nl').includes(q);e.hidden=!match;if(match)visible++;});
   groups.forEach(g=>{g.hidden=![...g.querySelectorAll('.library-entry')].some(e=>!e.hidden);});
   if(counter)counter.textContent=visible+' resultaten';
   if(empty)empty.hidden=visible>0;
 };
 search.addEventListener('input',filter);filter();
}
const dateParts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const get=t=>dateParts.find(p=>p.type===t).value;
const now=get('year')+'-'+get('month')+'-'+get('day');
document.querySelectorAll('.library-lesson[data-release]').forEach(link=>{
 const date=link.dataset.release,badge=link.querySelector('[data-release-status]');
 if(now>=date){if(badge){badge.className='ls-status is-available';badge.textContent='● Beschikbaar';}}
 else {link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.dataset.locked='true';link.title='Beschikbaar vanaf '+date.split('-').reverse().join('/');if(badge){badge.className='ls-status is-scheduled';badge.textContent='◷ Vanaf '+date.split('-').reverse().join('/');}}
});
})();
