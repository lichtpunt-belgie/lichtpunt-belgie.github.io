/* Lichtpunt – geïsoleerde proef, versie 3 (21 oktober 2026)
   Alleen geregistreerde leden synchroniseren. Gastgegevens blijven lokaal.
   Wijzigingen staan eerst in een duurzame lokale wachtrij en worden pas als
   'Online opgeslagen' gemeld na verificatie van de echte servergegevens.
   Bewaar de zichtbare tekst bij het afvinken mee en vervang tijdens schrijven
   nooit het antwoordvak door een momentopname van de server.
*/
import {configured, auth, db} from './firebase-service.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import {doc, getDocFromServer, setDoc} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const progress = window.LichtpuntVoortgang;
const clean = o => ({
  done: o?.done && typeof o.done === 'object' && !Array.isArray(o.done) ? o.done : {},
  answers: o?.answers && typeof o.answers === 'object' && !Array.isArray(o.answers) ? o.answers : {}
});
const validId = id => /^(studie(?:-dag-[1-7])?|petrus-week1-dag[1-7]|genesis-week1-dag[1-7])$/.test(id);
const queueKey = userId => `lichtpunt.proef.study.pending.${userId}.v1`;
let userId = null;
let ready = false;
let timer = null;
let writing = false;
let remote = clean(null);
let session = 0;

function readPending(user) {
  try { return clean(JSON.parse(localStorage.getItem(queueKey(user)) || '{}')); }
  catch (_) { return clean(null); }
}
function storePending(user, changes) {
  try {
    localStorage.setItem(queueKey(user), JSON.stringify(clean(changes)));
    return true;
  } catch (_) { return false; }
}
function isEmpty(state) { return !Object.keys(state.done).length && !Object.keys(state.answers).length; }
function blend(cloud, changes) {
  return {done: {...cloud.done, ...changes.done}, answers: {...cloud.answers, ...changes.answers}};
}
function status(message) {
  document.querySelectorAll('[data-save-status]').forEach(el => { el.textContent = message; });
}
function setEditable(enabled) {
  document.querySelectorAll('[data-personal-answer],[data-study-complete],[data-clear-answer],.lesson-progress-mark input')
    .forEach(el => { el.disabled = !enabled; });
}
function nav(user) {
  document.querySelectorAll('.account-shortcut')
    .forEach(el => { el.textContent = user ? '☀ Mijn account' : '☀ Aanmelden'; });
}
function schedule() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { timer = null; void uploadChanges(); }, 1500);
}
function matches(server, patch) {
  return ['done', 'answers'].every(field => Object.entries(patch[field]).every(
    ([id, value]) => server[field][id] === value));
}
function removeVerified(user, patch) {
  const pending = readPending(user);
  for (const field of ['done', 'answers']) {
    for (const [id, value] of Object.entries(patch[field])) {
      // De gebruiker kan intussen alweer een nieuwe wijziging hebben gemaakt.
      if (pending[field][id] === value) delete pending[field][id];
    }
  }
  storePending(user, pending);
  return pending;
}
async function uploadChanges() {
  if (writing || !ready || !userId) return;
  const activeId = userId;
  const activeSession = session;
  const patch = readPending(activeId);
  if (isEmpty(patch)) return;
  writing = true;
  status('Wijzigingen worden veilig online bewaard…');
  let success = false;
  try {
    const ref = doc(db, 'users', activeId, 'private', 'study');
    // merge:true wijzigt uitsluitend de meegestuurde velden.
    await setDoc(ref, patch, {merge: true});
    // Lees expliciet van de server; een lokaal cache-antwoord is geen bewijs.
    const snapshot = await getDocFromServer(ref);
    if (activeSession !== session || activeId !== userId) return;
    if (!snapshot.exists() || !matches(clean(snapshot.data()), patch)) {
      status('⚠️ Opslag nog niet bevestigd. Je wijziging staat voorlopig op dit toestel.');
      return;
    }
    remote = clean(snapshot.data());
    const remaining = removeVerified(activeId, patch);
    // Geen applyCloud na een schrijfbewerking! Daardoor kon een opgeslagen
    // servermomentopname een recenter (of nog niet meegestuurd) antwoord
    // in het zichtbare tekstvak overschrijven zodra men het vinkje zette.
    // Het lokale formulier blijft tijdens bewerken de bron van waarheid.
    success = true;
    status(isEmpty(remaining)
      ? '✓ Online opgeslagen en gecontroleerd · Alleen toegankelijk via jouw account.'
      : '✓ Eerdere wijziging online opgeslagen · Nieuwe wijziging wordt nog bewaard…');
  } catch (_) {
    if (activeSession === session && activeId === userId)
      status('⚠️ Nog niet online opgeslagen. Je wijzigingen blijven voorlopig op dit toestel bewaard.');
  } finally {
    writing = false;
    if (success && activeSession === session && activeId === userId && !isEmpty(readPending(activeId))) schedule();
  }
}

window.addEventListener('lichtpunt:studychange', event => {
  const change = event.detail;
  if (!userId || !['done', 'answers'].includes(change?.field) || !validId(change.id)) return;
  const pending = readPending(userId);
  pending[change.field][change.id] = change.field === 'done'
    ? Boolean(change.value) : String(change.value).slice(0, 5000);
  if (change.field === 'done' && document.body?.dataset.studyId === change.id) {
    // Een vinkje mag nooit een reeds getypt antwoord wissen. Stuur daarom
    // bij het aanvinken meteen ook de ACTUELE inhoud van dit antwoordvak mee.
    // De schrijfbevestiging controleert vervolgens beide serverwaarden.
    const answer = document.querySelector('[data-personal-answer]');
    if (answer) pending.answers[change.id] = answer.value.slice(0, 5000);
  }
  if (!storePending(userId, pending)) {
    status('⚠️ Dit toestel kan wijzigingen niet veilig bewaren. Kopieer je antwoord.');
    return;
  }
  status('Op dit toestel bewaard · Online bevestiging volgt…');
  if (ready) schedule();
});
window.addEventListener('online', () => { if (ready && userId) schedule(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && ready && userId) void uploadChanges();
});

if (configured) {
  // Tijdens het laden van een account voorkomen we wijzigingen die zouden
  // worden overschreven zodra de server voor het eerst antwoordt.
  setEditable(false);
  status('Studiegegevens worden geladen…');
  onAuthStateChanged(auth, async user => {
    const currentSession = ++session;
    if (timer) clearTimeout(timer);
    timer = null;
    ready = false;
    userId = user?.uid || null;
    nav(user);
    setEditable(!user);
    if (!user) {
      progress?.disconnect();
      return;
    }
    if (!progress) return;
    const activeId = user.uid;
    const ref = doc(db, 'users', activeId, 'private', 'study');
    status('Je persoonlijke studiegegevens worden geladen…');
    try {
      let snapshot = await getDocFromServer(ref);
      if (session !== currentSession) return;
      if (!snapshot.exists()) {
        // Een nieuw account mag bestaande *anonieme* studievinkjes overnemen.
        const guest = clean(progress.guestState());
        await setDoc(ref, guest);
        snapshot = await getDocFromServer(ref);
      }
      if (session !== currentSession) return;
      remote = clean(snapshot.data());
      const pending = readPending(activeId);
      progress.applyCloud(activeId, blend(remote, pending));
      ready = true;
      setEditable(true);
      if (!isEmpty(pending)) {
        status('Lokale wijzigingen wachten nog op bevestiging…');
        schedule();
      } else {
        status('✓ Online gegevens geladen · Alleen toegankelijk via jouw account.');
      }
    } catch (_) {
      if (session === currentSession) {
        // Wijzigingen niet doen alsof ze gesynchroniseerd zijn.
        const pending = readPending(activeId);
        progress.applyCloud(activeId, blend(remote, pending));
        setEditable(true);
        status('⚠️ Kon je online gegevens niet controleren. Werk tijdelijk op dit toestel; vernieuw later de pagina.');
      }
    }
  });
}
