import {configured,auth} from './firebase-service.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';

const $=id=>document.getElementById(id);
const status=$('lp-status'), guest=$('lp-guest'),member=$('lp-member'),unavailable=$('lp-unavailable');
const installBtn=$('lp-install-button');
let deferredPrompt=null;
function renderState(state,user){
 status.hidden=state!=='loading'; guest.hidden=state!=='guest';member.hidden=state!=='member';unavailable.hidden=state!=='error';
 if(state==='member'){
  const name=user?.displayName?.trim()||'lezer';
  $('lp-welcome').textContent=`Welkom ${name}! Je bent aangemeld en kunt de installatie-instructies gebruiken.`;
 }
}
if(!configured||!auth){renderState('error');}
else{
 try{onAuthStateChanged(auth,user=>renderState(user?'member':'guest',user),()=>renderState('error'));}
 catch(_){renderState('error');}
}
function showDevice(choice){
 const android=choice==='android';
 $('lp-android-panel').hidden=!android;$('lp-iphone-panel').hidden=android;
 $('lp-android-choice').classList.toggle('selected',android);
 $('lp-iphone-choice').classList.toggle('selected',!android);
 $('lp-android-choice').setAttribute('aria-pressed',String(android));
 $('lp-iphone-choice').setAttribute('aria-pressed',String(!android));
}
$('lp-android-choice').addEventListener('click',()=>showDevice('android'));
$('lp-iphone-choice').addEventListener('click',()=>showDevice('iphone'));
const agent=navigator.userAgent||'';
if(/iPad|iPhone|iPod/i.test(agent)){showDevice('iphone');}
const installed=window.matchMedia?.('(display-mode: standalone)').matches||Boolean(window.navigator.standalone);
if(installed){$('lp-installed').hidden=false;}
window.addEventListener('beforeinstallprompt',event=>{
 event.preventDefault();deferredPrompt=event;
 if(!installed)installBtn.hidden=false;
});
window.addEventListener('appinstalled',()=>{deferredPrompt=null;installBtn.hidden=true;$('lp-installed').hidden=false;});
installBtn.addEventListener('click',async()=>{
 if(!deferredPrompt||member.hidden)return;
 const prompt=deferredPrompt;deferredPrompt=null;installBtn.hidden=true;
 try{await prompt.prompt();await prompt.userChoice;}catch(_){}
});
$('lp-copy').addEventListener('click',async()=>{
 const url='https://lichtpunt-belgie.github.io/lichtpunt-app.html';
 try{await navigator.clipboard.writeText(url);$('lp-copy-result').textContent='✓ Link gekopieerd.';}
 catch(_){$('lp-copy-result').textContent='Kopiëren lukt niet automatisch. Selecteer en kopieer: '+url;}
});
