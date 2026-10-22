/* Lichtpunt: dagelijkse zichtbaarheid, volgens de kalenderdatum in België.
   GitHub Pages is publiek: afbeeldingen bestaan al in de repository.
   Dit zorgt voor automatische zichtbaarheid in de website, niet voor geheimhouding. */
(function () {
  'use strict';
  const posts = [
  {
    "number": 98,
    "date": "2026-10-19",
    "day": "maandag",
    "title": "Een liedje kan je dag veranderen",
    "theme": "Muziek",
    "description": "Muziek kan herinneringen wakker maken en een gewone dag een nieuwe kleur geven.",
    "image": "assets/lichtpuntje-098-nl.png"
  },
  {
    "number": 99,
    "date": "2026-10-20",
    "day": "dinsdag",
    "title": "Een kleine wandeling doet meer dan je denkt",
    "theme": "Buitenlucht",
    "description": "Even buiten zijn kan helpen om de gedachten tot rust te brengen.",
    "image": "assets/lichtpuntje-099-nl.png"
  },
  {
    "number": 100,
    "date": "2026-10-21",
    "day": "woensdag",
    "title": "Soms mag je even niets moeten",
    "theme": "Rust",
    "description": "Ons honderdste Lichtpuntje: af en toe rust nemen is geen zwakte.",
    "image": "assets/lichtpuntje-100-nl.png"
  },
  {
    "number": 101,
    "date": "2026-10-22",
    "day": "donderdag",
    "title": "Een oude foto brengt soms warmte terug",
    "theme": "Herinneringen",
    "description": "Een oude foto kan een dierbare herinnering opnieuw tot leven brengen.",
    "image": "assets/lichtpuntje-101-nl.png"
  },
  {
    "number": 102,
    "date": "2026-10-23",
    "day": "vrijdag",
    "title": "Een maaltijd smaakt beter als je ze deelt",
    "theme": "Samen eten",
    "description": "Samen eten geeft soms meer dan voeding alleen: aandacht en verbondenheid.",
    "image": "assets/lichtpuntje-102-nl.png"
  },
  {
    "number": 103,
    "date": "2026-10-24",
    "day": "zaterdag",
    "title": "Lachen maakt een zware dag lichter",
    "theme": "Humor",
    "description": "Een glimlach lost niet alles op, maar brengt soms toch een beetje lucht.",
    "image": "assets/lichtpuntje-103-nl.png"
  },
  {
    "number": 104,
    "date": "2026-10-25",
    "day": "zondag",
    "title": "Nieuwe moed begint vaak heel klein",
    "theme": "Hoop",
    "description": "Een nieuwe start kan ontstaan uit iets heel kleins.",
    "image": "assets/lichtpuntje-104-nl.png"
  }
];
  const options = { timeZone:'Europe/Brussels', year:'numeric', month:'2-digit', day:'2-digit' };
  const firstDay = '2026-10-19';
  function todayBelgium() {
    const parts = new Intl.DateTimeFormat('en-GB', options).formatToParts(new Date());
    const pick = name => parts.find(item => item.type === name).value;
    return `${pick('year')}-${pick('month')}-${pick('day')}`;
  }
  function currentPosts() { const today = todayBelgium(); return posts.filter(p => p.date <= today); }
  function readableDate(iso) {
    const [year,month,day] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat('nl-BE',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,day)));
  }
  function updateHome() {
    const image = document.getElementById('lp-photo');
    if (!image) return;
    const released = currentPosts();
    const latest = released.at(-1);
    const label = document.getElementById('lp-label');
    const title = document.getElementById('lp-title');
    const description = document.getElementById('lp-description');
    const date = document.getElementById('lp-date');
    const photoLink = document.getElementById('lp-photo-link');
    const download = document.getElementById('lp-download');
    if (!latest) {
      label.textContent = 'Vanaf maandag 19 oktober';
      title.textContent = 'Een nieuw Lichtpuntje, elke dag';
      description.textContent = 'Vanaf 19 oktober verschijnt hier dagelijks een nieuwe gedachte. Alle verschenen Lichtpuntjes vind je terug in het archief.';
      date.textContent = 'Elke dag verschijnt er één nieuw Lichtpuntje.';
      image.src = 'assets/lichtpuntje-voorbeeld.png';
      image.alt = 'Voorbeeld van een Lichtpuntje';
      photoLink.href = image.src;
      download.hidden = true;
      return;
    }
    label.textContent = `Lichtpuntje ${latest.number} · ${latest.theme}`;
    title.textContent = latest.title;
    description.textContent = latest.description;
    date.textContent = `${latest.day[0].toUpperCase()+latest.day.slice(1)} ${readableDate(latest.date)}`;
    image.src = latest.image;
    image.alt = `Lichtpuntje ${latest.number}: ${latest.title}`;
    photoLink.href = latest.image;
    download.href = latest.image;
    download.setAttribute('download', `Lichtpuntje_${latest.number}_Nederlands.png`);
    download.hidden = false;
  }
  function appendCard(container, post) {
    const card = document.createElement('article'); card.className = 'lp-archive-card';
    const link = document.createElement('a'); link.className='lp-archive-photo';
    link.href=post.image;link.target='_blank';link.rel='noopener';
    link.setAttribute('aria-label',`Bekijk afbeelding van Lichtpuntje ${post.number}`);
    const img = document.createElement('img');img.src=post.image;img.loading='lazy';
    img.alt=`Lichtpuntje ${post.number}: ${post.title}`;
    link.append(img);
    const copy = document.createElement('div');copy.className='lp-archive-copy';
    const dat = document.createElement('span');dat.className='lp-archive-date';
    dat.textContent=`Nr. ${post.number} · ${post.day} ${readableDate(post.date)}`;
    const title = document.createElement('h3');title.textContent=post.title;
    const desc = document.createElement('p');desc.textContent=post.description;
    const download = document.createElement('a');download.className='button';
    download.href=post.image;download.setAttribute('download',`Lichtpuntje_${post.number}_Nederlands.png`);
    download.textContent='⬇ Download voor WhatsApp';
    copy.append(dat,title,desc,download);card.append(link,copy);container.append(card);
  }
  function updateArchive() {
    const container=document.getElementById('lp-archive-list');if(!container)return;
    const released=currentPosts().slice().reverse();
    const status=document.getElementById('lp-archive-status');
    container.replaceChildren();
    if (released.length===0) {
      status.textContent='De eerste aflevering verschijnt maandag 19 oktober 2026.';
      const message=document.createElement('p');message.className='lp-archive-empty';
      message.textContent='Nog even geduld: op maandag 19 oktober verschijnt hier Lichtpuntje 98. Daarna komt er iedere dag een nieuw Lichtpuntje bij.';
      container.append(message);return;
    }
    status.textContent=`${released.length} ${released.length===1?'Lichtpuntje is':'Lichtpuntjes zijn'} verschenen. Klik op een afbeelding om ze groot te bekijken of download ze voor WhatsApp.`;
    released.forEach(post=>appendCard(container,post));
  }
  function render(){updateHome();updateArchive();}
  if (document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);
  else render();
  window.setInterval(render, 60000); // Ook als de bezoeker de site rond middernacht open laat.
})();
