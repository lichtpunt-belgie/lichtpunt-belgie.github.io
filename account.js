import {configured,auth,db} from './firebase-service.js';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile,sendEmailVerification,sendPasswordResetEmail,deleteUser,EmailAuthProvider,reauthenticateWithCredential} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import {doc,deleteDoc,setDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
const $=id=>document.getElementById(id);
const forms=$('account-forms'), logged=$('signed-in'), noConfig=$('setup-message');
const feedback=(message,error=false,target='account-feedback')=>{const el=$(target);el.textContent=message;el.classList.toggle('error',error);};
let working=false;
function toggleForm(register){
 $('login-form').hidden=register;$('register-form').hidden=!register;
 $('tab-login').setAttribute('aria-selected',String(!register));$('tab-register').setAttribute('aria-selected',String(register));
 feedback('');
}
$('tab-login').addEventListener('click',()=>{location.hash='';toggleForm(false);});
$('tab-register').addEventListener('click',()=>{location.hash='registreren';toggleForm(true);});
window.addEventListener('hashchange',()=>{if(!auth?.currentUser)toggleForm(location.hash==='#registreren');});
toggleForm(location.hash==='#registreren');
if(!configured){noConfig.hidden=false;}
else{noConfig.hidden=true;
 onAuthStateChanged(auth,user=>{
  if(user){forms.hidden=true;logged.hidden=false;$('signed-in-name').textContent=user.displayName||'lezer';$('signed-in-email').textContent=user.email||'';$('verify-notice').hidden=user.emailVerified;}
  else{forms.hidden=false;logged.hidden=true;toggleForm(location.hash==='#registreren');}
 });
 $('login-form').addEventListener('submit',async e=>{
  e.preventDefault();if(working)return;working=true;feedback('Even aanmelden…');
  try{await signInWithEmailAndPassword(auth,$('login-email').value.trim(),$('login-password').value);feedback('Welkom terug!');$('login-password').value='';}
  catch(e){feedback(errorLabel(e),true);}finally{working=false;}
 });
 $('register-form').addEventListener('submit',async e=>{
  e.preventDefault();if(working)return;
  const name=$('reg-name').value.trim(), pw=$('reg-password').value;
  if(!name||name.length>45||pw.length<10||pw!==$('reg-password2').value||!$('reg-consent').checked){feedback('Controleer je profielnaam, beide wachtwoorden en de toestemming.',true);return;}
  working=true;feedback('Je account wordt aangemaakt…');
  try{
   const result=await createUserWithEmailAndPassword(auth,$('reg-email').value.trim(),pw);
   try{await updateProfile(result.user,{displayName:name});}catch(err){}
   // Vastlegging van de UITDRUKKELIJKE toestemming, per privacyversie.
   // Alleen de eigenaar heeft schrijfrecht op users/{uid}.
   let consentSaved=true;
   try{await setDoc(doc(db,'users',result.user.uid),{
     consent:{version:'2026-10-22',purpose:'Online bewaren van antwoorden, notities en studievoortgang; kan geloofsovertuiging onthullen',explicit:true,acceptedAt:serverTimestamp()}
   },{merge:true});}catch(err){consentSaved=false;}
   let mailSent=true;
   try{await sendEmailVerification(result.user);}catch(err){mailSent=false;}
   $('reg-password').value='';$('reg-password2').value='';
   const msg=!consentSaved
     ?'Account aangemaakt, maar de toestemming kon niet online worden vastgelegd. Bewaar voorlopig geen persoonlijke studiegegevens en mail ons via Contact.'
     :mailSent?'Account aangemaakt! Controleer je e-mail. Open daarna een studie om je voortgang te synchroniseren.':'Account aangemaakt, maar de bevestigingsmail kon niet worden verzonden. Controleer je verbinding.';
   feedback(msg,!consentSaved||!mailSent,'profile-feedback');
   $('signed-in-name').textContent=name;
  }catch(err){feedback(errorLabel(err),true);}finally{working=false;}
 });
 $('forgot-password').addEventListener('click',async()=>{
  const email=$('login-email').value.trim();
  if(!email){feedback('Vul eerst je e-mailadres in.',true);return;}
  try{await sendPasswordResetEmail(auth,email);feedback('Als het adres bij ons bekend is, ontvang je instructies via e-mail.');}
  catch(err){feedback(errorLabel(err),true);}
 });
 $('logout').addEventListener('click',async()=>{try{await signOut(auth);feedback('Je bent afgemeld.',false,'profile-feedback');}catch(err){feedback(errorLabel(err),true,'profile-feedback');}});
 $('delete-account').addEventListener('click',()=>{
  if(!auth.currentUser||working)return;
  $('delete-confirm-text').value='';$('delete-confirm-password').value='';
  $('delete-dialog-error').hidden=true;
  $('delete-dialog').showModal();
  $('delete-confirm-text').focus();
 });
 $('delete-cancel').addEventListener('click',()=>{$('delete-dialog').close();$('delete-confirm-password').value='';});
 $('delete-confirm-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const user=auth.currentUser;if(!user||working)return;
  if($('delete-confirm-text').value!=='VERWIJDER'){
   $('delete-dialog-error').textContent='Typ precies VERWIJDER om te bevestigen.';
   $('delete-dialog-error').hidden=false;
   $('delete-confirm-text').focus();return;
  }
  const pw=$('delete-confirm-password').value;
  if(!pw)return;
  $('delete-dialog').close();$('delete-confirm-password').value='';
  working=true;feedback('Bezig met verwijderen. Sluit deze pagina nog niet.',false,'profile-feedback');
  const uid=user.uid;
  try{
   // Eerst opnieuw aanmelden. Verwijder uitsluitend eigen gegevens, volgens
   // de Firestore-regels voor users/{uid}/private/study.
   await reauthenticateWithCredential(user,EmailAuthProvider.credential(user.email,pw));
   await deleteDoc(doc(db,'users',uid,'private','study'));
   await deleteDoc(doc(db,'users',uid));
   await deleteUser(user);
   // Alle bekende ACCOUNTGEBONDEN lokale kopieën, herstelbestanden en nog
   // niet verzonden wijzigingen van deze gebruiker op DIT toestel wissen.
   // Anonieme gastnotities worden bewust niet aangeraakt.
   try {
    const userKeys=[
      `lichtpunt.proef.study.user.${uid}.v1`,
      `lichtpunt.proef.study.pending.${uid}.v1`,
      `lichtpunt.study.user.${uid}.v1`,
      `lichtpunt.study.pending.${uid}.v1`
    ];
    for(const key of Object.keys(localStorage)){
     const belongsToUser=userKeys.includes(key)||
       key.startsWith(`lichtpunt.proef.answer.backup.${uid}.`)||
       key.startsWith(`lichtpunt.proef.notities.gebruiker.${uid}.`)||
       key.startsWith(`lichtpunt.proef.notities.wachtend.${uid}.`)||
       key.startsWith(`lichtpunt.answer.backup.${uid}.`)||
       key.startsWith(`lichtpunt.notities.gebruiker.${uid}.`)||
       key.startsWith(`lichtpunt.notities.wachtend.${uid}.`);
     if(belongsToUser)localStorage.removeItem(key);
    }
   } catch (_) {}
   feedback('Je account en de online opgeslagen studiegegevens zijn verwijderd. De lokale accountkopieën op dit toestel zijn ook gewist. Als je andere toestellen gebruikte, wis daar eventueel nog de browsergegevens.',false,'account-feedback');
  }catch(err){
   // Firebase Authentication en Firestore bieden in deze client-app geen
   // gezamenlijke alles-of-niets-verwijdering. Bij een gedeeltelijke fout
   // nooit ten onrechte melden dat alles verdwenen is.
   feedback('Verwijderen niet volledig afgerond. Het kan zijn dat een deel van de online gegevens al is gewist. '+errorLabel(err)+' Probeer niet meteen opnieuw zonder eerst te controleren.',true,'profile-feedback');
  }finally{working=false;}
 });
}
function errorLabel(err){
 const code=err?.code||'';
 const codes={
  'auth/invalid-email':'Het e-mailadres is niet geldig.',
  'auth/email-already-in-use':'Voor dit e-mailadres bestaat al een account.',
  'auth/weak-password':'Kies een sterker wachtwoord.',
  'auth/invalid-credential':'Het e-mailadres of wachtwoord klopt niet.',
  'auth/too-many-requests':'Te veel pogingen. Probeer het later opnieuw.',
  'auth/network-request-failed':'Er is geen verbinding. Probeer opnieuw als je internet hebt.',
  'auth/wrong-password':'Het ingevoerde wachtwoord klopt niet.',
  'auth/requires-recent-login':'Meld je eerst opnieuw aan en probeer het daarna opnieuw.',
  'permission-denied':'De online opslag heeft geen toegang. Controleer de Firebase-veiligheidsregels.'
 };
 return codes[code]||'Er ging iets mis. Controleer je verbinding of probeer later opnieuw.';
}
