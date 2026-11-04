/* Lichtpunt België – privacyvriendelijke bezoekmeting. Geen Google-tag vóór toestemming. */
(function () {
  'use strict';
  if (window.__lichtpuntAnalyticsReady) return;
  window.__lichtpuntAnalyticsReady = true;
  const MEASUREMENT_ID = 'G-KSQBYCNSS0';
  const KEY = 'lichtpunt.analytics.toestemming.v1';
  let tagLoaded = false;
  let tagStarted = false;
  let panel = null;

  function choice() {
    try { const val = localStorage.getItem(KEY); return ['ja','nee'].includes(val) ? val : null; }
    catch (_) { return null; }
  }
  function store(val) { try { localStorage.setItem(KEY, val); } catch (_) {} }

  function startAnalytics() {
    window['ga-disable-' + MEASUREMENT_ID] = false;
    if (tagLoaded) {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        if (tagStarted) window.gtag('event', 'page_view');
      }
      return;
    }
    tagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Google Consent Mode v2: we vragen enkel toestemming voor statistieken.
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    tag.addEventListener('load', () => {
      if (choice() !== 'ja' || tagStarted) return;
      tagStarted = true;
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    });
    document.head.appendChild(tag);
  }

  function revoke() {
    window['ga-disable-' + MEASUREMENT_ID] = true;
    if (typeof window.gtag === 'function')
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    // Probeer bestaande analytische cookies op dit domein te wissen.
    document.cookie.split(';').forEach(item => {
      const name = item.split('=')[0].trim();
      if (/^_ga(?:_|$)/.test(name))
        document.cookie = name + '=; max-age=0; path=/; SameSite=Lax';
    });
  }
  function setConsent(val) {
    store(val);
    if (panel) { panel.remove(); panel = null; }
    if (val === 'ja') startAnalytics();
    else revoke();
  }

  function showChoices() {
    if (panel) return;
    if (!document.getElementById('lp-analytics-style')) {
      const style = document.createElement('style');
      style.id = 'lp-analytics-style';
      style.textContent = `
#lp-analytics-panel{position:fixed;z-index:2147482000;bottom:16px;right:16px;box-sizing:border-box;width:min(450px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;padding:19px;border:1px solid #cfe1da;border-radius:14px;box-shadow:0 10px 38px rgba(12,53,48,.2);background:#fffdf8;color:#173d3b;font:15px/1.55 system-ui,-apple-system,Segoe UI,sans-serif}
#lp-analytics-panel h2{font:700 19px/1.3 Georgia,serif;margin:0 0 10px;color:#184c4b}
#lp-analytics-panel p{margin:0 0 14px}
#lp-analytics-panel a{color:#174d50;text-decoration:underline}
#lp-analytics-actions{display:flex;flex-wrap:wrap;gap:10px}
#lp-analytics-actions button{flex:1;min-width:120px;padding:10px 14px;border-radius:8px;cursor:pointer;font:600 14px/1.25 system-ui,sans-serif}
#lp-analytics-allow{color:#fff;background:#184c4b;border:1px solid #184c4b}
#lp-analytics-reject{color:#184c4b;background:#fff;border:1px solid #184c4b}
#lp-analytics-preference{color:inherit;background:none;border:0;text-decoration:underline;cursor:pointer;font:inherit;padding:0}
#lp-analytics-panel button:focus-visible,#lp-analytics-preference:focus-visible{outline:3px solid #c58d28;outline-offset:2px}
@media(max-width:500px){#lp-analytics-panel{bottom:10px;right:10px;width:calc(100vw - 20px);padding:15px}}
      `;
      document.head.appendChild(style);
    }
    panel = document.createElement('section');
    panel.id = 'lp-analytics-panel';
    panel.setAttribute('role','region');
    panel.setAttribute('aria-label','Keuze voor bezoekstatistieken');
    panel.innerHTML = `<h2>Mag Lichtpunt bezoeken tellen?</h2>
<p>Met jouw toestemming gebruiken we <strong>Google Analytics</strong> om te zien hoeveel mensen de website bezoeken. Je kunt weigeren en toch alles blijven lezen. De cijfers zijn niet openbaar. <a href="privacy.html">Meer over privacy</a>.</p>
<div id="lp-analytics-actions"><button type="button" id="lp-analytics-reject">Weigeren</button><button type="button" id="lp-analytics-allow">Toestaan</button></div>`;
    document.body.appendChild(panel);
    panel.querySelector('#lp-analytics-reject').addEventListener('click', () => setConsent('nee'));
    panel.querySelector('#lp-analytics-allow').addEventListener('click', () => setConsent('ja'));
  }

  function init() {
    const footer = document.querySelector('.footer-meta') || document.querySelector('footer');
    if (footer && !document.getElementById('lp-analytics-preference')) {
      const wrap = document.createElement('p');
      wrap.style.cssText = 'margin-top:8px;font-size:13px';
      wrap.innerHTML = '<button type="button" id="lp-analytics-preference">Statistiekvoorkeur wijzigen</button>';
      footer.appendChild(wrap);
      wrap.querySelector('button').addEventListener('click', showChoices);
    }
    const val = choice();
    if (val === 'ja') startAnalytics();
    else if (val === 'nee') revoke();
    else showChoices();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
