import {configured,auth,db} from './firebase-service.js';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile,sendEmailVerification,sendPasswordResetEmail,deleteUser,EmailAuthProvider,reauthenticateWithCredential} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import {doc,deleteDoc} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
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
   let mailSent=true;
   try{await sendEmailVerification(result.user);}catch(err){mailSent=false;}
   $('reg-password').value='';$('reg-password2').value='';
   feedback(mailSent?'Account aangemaakt! Controleer je e-mail. Open daarna een studie om je voortgang te synchroniseren.':'Account aangemaakt, maar de bevestigingsmail kon niet worden verzonden. Controleer je verbinding.',!mailSent,'profile-feedback');
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
 $('delete-account').addEventListener('click',async()=>{
  const user=auth.currentUser;if(!user)return;
  if(!confirm('Je account én alle online opgeslagen antwoorden en vinkjes worden definitief verwijderd. Wil je doorgaan?'))return;
  const pw=prompt('Vul voor de veiligheid je wachtwoord opnieuw in (wordt niet opgeslagen):');if(!pw)return;
  try{
   await reauthenticateWithCredential(user,EmailAuthProvider.credential(user.email,pw));
   await deleteDoc(doc(db,'users',user.uid,'private','study'));
   await deleteDoc(doc(db,'users',user.uid));
   await deleteUser(user);
   // Persoonlijke proefnotities en herstelkopieën van dit account op dit toestel wissen.
   try {
    for (const key of Object.keys(localStorage)) {
     if ((key.startsWith('lichtpunt.proef.notities.gebruiker.') ||
          key.startsWith('lichtpunt.proef.notities.wachtend.') ||
          key.startsWith('lichtpunt.proef.answer.backup.')) && key.includes(user.uid)) {
       localStorage.removeItem(key);
     }
    }
   } catch (_) {}
   feedback('Je account en online studiegegevens, inclusief notities, zijn verwijderd.');
  }catch(err){feedback('Verwijderen is niet volledig gelukt: '+errorLabel(err)+' Neem indien nodig contact op met Lichtpunt.',true,'profile-feedback');}
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
  'permission-denied':'De online opslag heeft geen toegang. Controleer de Firebase-veiligheidsregels.'
 };
 return codes[code]||'Er ging iets mis. Controleer je verbinding of probeer later opnieuw.';
}
