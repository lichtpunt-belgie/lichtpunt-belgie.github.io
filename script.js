(function(){
'use strict';
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.site-nav');
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Menu sluiten':'Menu openen');});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}
const dialog=document.querySelector('#auth-dialog');
if(!dialog)return;
const title=dialog.querySelector('#auth-title');
const tabs=dialog.querySelectorAll('[data-auth-tab]');
const profile=dialog.querySelector('.reg-only');
const infoBtn=dialog.querySelector('#auth-info-btn');
const feedback=dialog.querySelector('#auth-feedback');
function setTab(tab){const isRegister=tab==='register';tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.authTab===tab)));profile.hidden=!isRegister;title.textContent=isRegister?'Gratis lid worden':'Welkom terug';infoBtn.textContent=isRegister?'Registratie nog niet actief':'Aanmelding nog niet actief';feedback.textContent='Dit is een ontwerp. Vul hier nog geen persoonlijke gegevens in. Er worden geen accounts of wachtwoorden opgeslagen.';}
document.querySelectorAll('[data-open-auth]').forEach(b=>b.addEventListener('click',()=>{setTab(b.dataset.openAuth);dialog.showModal();}));
tabs.forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.authTab)));
dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',(e)=>{if(e.target===dialog)dialog.close();});
infoBtn.addEventListener('click',()=>{feedback.textContent='Deze proefwebsite toont alleen hoe het ledenprofiel eruit zal zien. Zodra veilige registratie is ingericht, kun je hier echt een account aanmaken.';});
})();
