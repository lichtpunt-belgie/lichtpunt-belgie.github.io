/* Lichtpunt België – duidelijke accountmelding voor studiebibliotheek.
   Alleen lezen: verandert NOOIT studievoortgang, login, notities of Firebase-data.
   Controleert de bestaande Firebase Auth-sessie, ook na aan-/afmelden. */
import { configured, auth } from './firebase-service.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';

function addLoginIndicator() {
  if (document.getElementById('lp-account-status')) return;

  const style = document.createElement('style');
  style.id = 'lp-account-status-style';
  style.textContent = `
    #lp-account-status { box-sizing:border-box; width:100%; padding:9px 16px; background:#f5f8f5; border-bottom:1px solid #d7e6dd; font:inherit; color:#194f47; }
    #lp-account-status .lp-as-inner { max-width:950px; margin:auto; display:flex; flex-wrap:wrap; gap:6px 14px; align-items:center; justify-content:space-between; }
    #lp-account-status .lp-as-text { font-size:.92rem; line-height:1.55; }
    #lp-account-status .lp-as-label { font-weight:750; margin-right:8px; }
    #lp-account-status .lp-as-link { color:#114a43; font-size:.87rem; font-weight:700; text-underline-offset:3px; white-space:nowrap; }
    #lp-account-status.lp-as-guest { background:#fff7e9; color:#684513; border-bottom-color:#eed8b2; }
    #lp-account-status.lp-as-guest .lp-as-link { color:#684513; }
    #lp-account-status.lp-as-unknown { background:#f7f7f4; color:#56635e; border-bottom-color:#e3e6e2; }
    @media (max-width:620px) { #lp-account-status { padding:10px 15px; } #lp-account-status .lp-as-inner{ display:block; } #lp-account-status .lp-as-text{font-size:.91rem;} #lp-account-status .lp-as-link { display:inline-block; padding-top:4px; } }
  `;
  document.head.append(style);

  const bar = document.createElement('div');
  bar.id = 'lp-account-status';
  bar.className = 'lp-as-unknown';
  bar.setAttribute('role', 'status');
  bar.setAttribute('aria-live', 'polite');
  const inner = document.createElement('div');
  inner.className = 'lp-as-inner';
  const text = document.createElement('div');
  text.className = 'lp-as-text';
  const label = document.createElement('strong');
  label.className = 'lp-as-label';
  const message = document.createElement('span');
  const link = document.createElement('a');
  link.className = 'lp-as-link';
  link.href = 'account.html';
  inner.append(text, link);
  text.append(label, message);
  bar.append(inner);

  const header = document.querySelector('header.site-header');
  const main = document.querySelector('main');
  if (header) header.insertAdjacentElement('afterend', bar);
  else if (main) main.insertAdjacentElement('beforebegin', bar);
  else document.body.prepend(bar);

  function render(state) {
    bar.className = 'lp-as-' + state;
    if (state === 'signed') {
      label.textContent = '✓ Je bent aangemeld';
      message.textContent = 'Je studievoortgang is aan je account gekoppeld.';
      link.textContent = 'Mijn account';
      link.hidden = false;
    } else if (state === 'guest') {
      label.textContent = '⚠ Je bent niet aangemeld';
      message.textContent = 'Vinkjes blijven op dit toestel en synchroniseren niet met je account.';
      link.textContent = 'Nu aanmelden';
      link.hidden = false;
    } else if (state === 'error') {
      label.textContent = 'Aanmeldstatus niet beschikbaar';
      message.textContent = 'Controleer je verbinding of kijk bij Mijn account.';
      link.textContent = 'Mijn account';
      link.hidden = false;
    } else {
      label.textContent = 'Aanmelding controleren…';
      message.textContent = 'Even nagaan of je met je account verbonden bent.';
      link.hidden = true;
    }
  }

  render('checking');
  if (!configured || !auth) { render('error'); return; }
  try {
    onAuthStateChanged(auth,
      (user) => render(user ? 'signed' : 'guest'),
      () => render('error')
    );
  } catch (_) { render('error'); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addLoginIndicator, { once:true });
} else {
  addLoginIndicator();
}
