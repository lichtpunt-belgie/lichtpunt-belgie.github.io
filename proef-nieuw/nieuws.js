/* Lichtpunt – updatescherm; geen cookies of netwerktracking. */
(()=>{'use strict';
 const VERSION='lichtpunt.nieuw.v2026-10-22'+(location.pathname.includes('/proef-nieuw/')?'.proef':'');
 const panel=document.getElementById('wat-is-nieuw');if(!panel)return;
 const dialog=panel.querySelector('[role="dialog"]');let last=null;
 function hasSeen(){try{return localStorage.getItem(VERSION)==='ja';}catch{return false;}}
 function markSeen(){try{localStorage.setItem(VERSION,'ja');}catch{}}
 function open(){last=document.activeElement;panel.hidden=false;document.body.style.overflow='hidden';dialog.focus();}
 function close(){panel.hidden=true;document.body.style.overflow='';markSeen();last?.focus?.();}
 panel.querySelectorAll('[data-close-news]').forEach(b=>b.addEventListener('click',close));
 document.querySelectorAll('[data-open-news]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();open();}));
 panel.addEventListener('click',e=>{if(e.target===panel)close();});
 document.addEventListener('keydown',e=>{if(panel.hidden)return;if(e.key==='Escape')close();
   if(e.key==='Tab'){const focusable=Array.from(dialog.querySelectorAll('a[href],button:not([disabled])'));const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
 });
 if(!hasSeen())open();
})();
