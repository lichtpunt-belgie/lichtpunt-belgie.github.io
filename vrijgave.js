/* Dagelijkse zichtbaarheid in tijdzone Europe/Brussels.
   Let op: dit is géén vertrouwelijke embargo-beveiliging: de bronbestanden staan in een openbare GitHub-repository.
   Echte geheimhouding tot publicatie vraagt een aparte privébron en een publicatieproces. */
(function(){
  function todayBrussels(){
    const bits=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const pick=k=>bits.find(x=>x.type===k).value;
    return pick('year')+'-'+pick('month')+'-'+pick('day');
  }
  const today=todayBrussels();
  if(document.body.dataset.release){
    if(today>=document.body.dataset.release){document.body.classList.add('released');}
  }
  document.querySelectorAll('a.scheduled-link[data-release]').forEach(link=>{
    if(today<link.dataset.release){
      link.classList.add('locked');link.removeAttribute('href');link.setAttribute('aria-disabled','true');
      const badge=link.querySelector('.lesson-open');if(badge)badge.textContent='Verschijnt '+link.dataset.release.split('-').reverse().join('/');
      link.setAttribute('title','Deze les verschijnt op '+link.dataset.release);
    }
  });
})();
