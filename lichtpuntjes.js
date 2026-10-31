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
    },
    {
        "number": 105,
        "date": "2026-10-26",
        "day": "maandag",
        "title": "Een onverwachte omweg",
        "theme": "Omwegen",
        "description": "Soms brengt een onverwachte wending je bij iets moois.",
        "image": "assets/lichtpuntje-105-nl.png"
    },
    {
        "number": 106,
        "date": "2026-10-27",
        "day": "dinsdag",
        "title": "Kijk eens naar de lucht",
        "theme": "Rust",
        "description": "Even omhoogkijken brengt soms rust.",
        "image": "assets/lichtpuntje-106-nl.png"
    },
    {
        "number": 107,
        "date": "2026-10-28",
        "day": "woensdag",
        "title": "Je mag van mening veranderen",
        "theme": "Groei",
        "description": "Nieuwe inzichten krijgen is een teken van blijven leren.",
        "image": "assets/lichtpuntje-107-nl.png"
    },
    {
        "number": 108,
        "date": "2026-10-29",
        "day": "donderdag",
        "title": "De voldoening van iets afmaken",
        "theme": "Kleine stappen",
        "description": "Een kleine taak afronden geeft voldoening.",
        "image": "assets/lichtpuntje-108-nl.png"
    },
    {
        "number": 109,
        "date": "2026-10-30",
        "day": "vrijdag",
        "title": "Een compliment dat blijft hangen",
        "theme": "Waardering",
        "description": "Een oprecht compliment kan iemand lang bijblijven.",
        "image": "assets/lichtpuntje-109-nl.png"
    },
    {
        "number": 110,
        "date": "2026-10-31",
        "day": "zaterdag",
        "title": "Een dag zonder vast plan",
        "theme": "Vrijheid",
        "description": "Een dag met ruimte voor het onverwachte.",
        "image": "assets/lichtpuntje-110-nl.png"
    },
    {
        "number": 111,
        "date": "2026-11-01",
        "day": "zondag",
        "title": "Wie we missen, blijft in onze herinnering",
        "theme": "Herinneringen",
        "description": "Mensen die we missen behouden een plaats in ons verhaal.",
        "image": "assets/lichtpuntje-111-nl.png"
    },
    {
        "number": 112,
        "date": "2026-11-02",
        "day": "maandag",
        "title": "Een raam vol ochtendlicht",
        "theme": "Aandacht",
        "description": "Wanneer de ochtendzon door het raam valt, wordt een gewone kamer even bijzonder. De stoel staat er nog, de kop op tafel ook. Toch ziet alles er anders uit. Soms hebben we geen nieuwe spullen of grote plannen nodig. Het helpt om te kijken naar wat er al is, maar waar we haastig aan voorbijgaan.",
        "image": "assets/lichtpuntje-112-nl.jpg"
    },
    {
        "number": 113,
        "date": "2026-11-03",
        "day": "dinsdag",
        "title": "De kracht van even luisteren",
        "theme": "Luisteren",
        "description": "Iemand begint te vertellen en je denkt meteen dat je het antwoord al kent. Maar als je rustig luistert, hoor je soms iets heel anders dan je verwachtte. Niet iedereen zoekt een oplossing. Soms wil iemand alleen weten dat zijn verhaal niet te zwaar is om te delen. Een open oor kan meer ruimte geven dan tien goedbedoelde adviezen.",
        "image": "assets/lichtpuntje-113-nl.jpg"
    },
    {
        "number": 114,
        "date": "2026-11-04",
        "day": "woensdag",
        "title": "Het bankje langs de weg",
        "theme": "Onderweg",
        "description": "Op een bankje langs een wandelpad gaan allerlei mensen even zitten: iemand met een boodschappentas, een fietser, een ouder paar. Niemand hoeft er iets te kopen of te bewijzen. Het is gewoon een plek om op adem te komen. Wat zou het mooi zijn als wij voor elkaar af en toe zo’n bankje konden zijn.",
        "image": "assets/lichtpuntje-114-nl.jpg"
    },
    {
        "number": 115,
        "date": "2026-11-05",
        "day": "donderdag",
        "title": "Een klein begin is ook een begin",
        "theme": "Moed",
        "description": "Een grote taak lijkt op een berg wanneer je alles tegelijk bekijkt. Maar geen berg wordt beklommen met één reuzensprong. Soms is de eerste stap niet meer dan een papier ordenen, één bericht versturen of vijf minuten opruimen. Dat is niet weinig: het is een begin. Je hoeft de hele weg vandaag niet te kennen.",
        "image": "assets/lichtpuntje-115-nl.jpg"
    },
    {
        "number": 116,
        "date": "2026-11-06",
        "day": "vrijdag",
        "title": "De geur van verse koffie",
        "theme": "Herinnering",
        "description": "Sommige geuren brengen ons onmiddellijk terug naar een ander moment. Verse koffie, warme broodjes, een regenbui op straat. Ineens herinner je je een keuken, een stem of een rustig gesprek. Zulke momenten lijken klein, maar ze laten een warm spoor achter. Misschien kunnen we vandaag zelf zo’n eenvoudige herinnering maken.",
        "image": "assets/lichtpuntje-116-nl.jpg"
    },
    {
        "number": 117,
        "date": "2026-11-07",
        "day": "zaterdag",
        "title": "Ruimte voor een andere mening",
        "theme": "Respect",
        "description": "Twee mensen kunnen naar dezelfde gebeurtenis kijken en iets heel anders ervaren. Dat maakt een gesprek soms lastig, maar ook waardevol. Wie alleen zijn eigen woorden herhaalt, ontdekt niets nieuws. Wie nieuwsgierig vraagt waarom de ander zo denkt, hoeft het niet eens te worden om toch iets te leren.",
        "image": "assets/lichtpuntje-117-nl.jpg"
    },
    {
        "number": 118,
        "date": "2026-11-08",
        "day": "zondag",
        "title": "De boom die zijn bladeren loslaat",
        "theme": "Loslaten",
        "description": "Een boom houdt zijn bladeren niet vast uit angst voor de winter. Hij laat los wat voorbij is en bewaart zijn kracht voor een nieuwe tijd. Mensen hebben het daar soms moeilijker mee. We dragen zorgen, verwachtingen en oude teleurstellingen mee. Loslaten betekent niet dat iets onbelangrijk was. Het betekent dat er weer ruimte mag ontstaan.",
        "image": "assets/lichtpuntje-118-nl.jpg"
    },
    {
        "number": 119,
        "date": "2026-11-09",
        "day": "maandag",
        "title": "Een vriendelijk woord onderweg",
        "theme": "Vriendelijkheid",
        "description": "In de winkel, op straat of bij een halte kruisen we dagelijks mensen van wie we het verhaal niet kennen. Een kleine begroeting kan zo’n ontmoeting minder afstandelijk maken. Je hoeft geen groot gesprek te beginnen. Gewoon even oog hebben voor degene die tegenover je staat, kan al genoeg zijn.",
        "image": "assets/lichtpuntje-119-nl.jpg"
    },
    {
        "number": 120,
        "date": "2026-11-10",
        "day": "dinsdag",
        "title": "Ook stilte vertelt iets",
        "theme": "Stilte",
        "description": "Niet iedere stilte is leeg. Soms is het de rust na een drukke dag, soms het nadenken voor je antwoord geeft, soms de nabijheid van iemand bij wie je niets hoeft uit te leggen. We vullen stiltes vaak snel op met geluid. Maar wie ze af en toe laat bestaan, merkt hoeveel ruimte er in stilte kan zitten.",
        "image": "assets/lichtpuntje-120-nl.jpg"
    },
    {
        "number": 121,
        "date": "2026-11-11",
        "day": "woensdag",
        "title": "De regen hoort er ook bij",
        "theme": "Aanvaarding",
        "description": "We dromen van dagen met zon, maar de aarde heeft ook regen nodig. Zo kennen we in ons leven lichte en sombere momenten. Een moeilijke dag hoeft niet meteen een mislukte dag te zijn. Misschien lukt er minder dan gepland, en misschien is dat vandaag genoeg. Morgen mogen we opnieuw beginnen.",
        "image": "assets/lichtpuntje-121-nl.jpg"
    },
    {
        "number": 122,
        "date": "2026-11-12",
        "day": "donderdag",
        "title": "De moed om nee te zeggen",
        "theme": "Grenzen",
        "description": "Altijd ja zeggen klinkt vriendelijk, maar kan je langzaam uitputten. Wie overal voor iedereen klaarstaat, vergeet soms dat zijn eigen tijd en energie ook grenzen hebben. Een rustig uitgesproken nee hoeft geen afwijzing van de ander te zijn. Het kan een eerlijke manier zijn om te zorgen dat wat je wel doet, met aandacht gebeurt.",
        "image": "assets/lichtpuntje-122-nl.jpg"
    },
    {
        "number": 123,
        "date": "2026-11-13",
        "day": "vrijdag",
        "title": "Een verhaal achter elke voordeur",
        "theme": "Begrip",
        "description": "Wanneer we langs huizen lopen, zien we ramen, deuren en misschien een lichtje branden. Maar wat er binnen leeft, weten we niet. Achter iedere voordeur schuilt een eigen verhaal van vreugde, zorgen, hoop en herinneringen. Daarom is het goed om voorzichtig te zijn met snelle oordelen. We kennen van de meeste mensen maar een klein stukje.",
        "image": "assets/lichtpuntje-123-nl.jpg"
    },
    {
        "number": 124,
        "date": "2026-11-14",
        "day": "zaterdag",
        "title": "Een oude gewoonte opnieuw bekijken",
        "theme": "Verandering",
        "description": "Sommige dingen doen we al jaren op dezelfde manier. Niet omdat het de beste manier is, maar omdat we eraan gewend zijn. Af en toe is het goed om te vragen: helpt dit nog, of mag het anders? Veranderen betekent niet dat alles vroeger verkeerd was. Het betekent dat we bereid blijven te leren.",
        "image": "assets/lichtpuntje-124-nl.jpg"
    },
    {
        "number": 125,
        "date": "2026-11-15",
        "day": "zondag",
        "title": "De vreugde van een eenvoudige maaltijd",
        "theme": "Dankbaarheid",
        "description": "Een pan soep op het vuur, een boterham op een bord, een stoel aan tafel. Niet ieder mooi moment hoeft bijzonder of duur te zijn. Soms komt de warmte juist uit de eenvoud. Als we even aandacht hebben voor wat er wél is, krijgt een gewone maaltijd een andere betekenis.",
        "image": "assets/lichtpuntje-125-nl.jpg"
    },
    {
        "number": 126,
        "date": "2026-11-16",
        "day": "maandag",
        "title": "Iemand iets leren",
        "theme": "Delen",
        "description": "Wie iets goed kan, vergeet soms hoe moeilijk het ooit was om ermee te beginnen. Een ander de tijd geven om het te leren, vraagt geduld. Niet overnemen, niet zuchten, maar rustig uitleggen en laten proberen. Wat iemand zelf leert, kan hij later weer aan een ander doorgeven. Zo groeit kennis verder.",
        "image": "assets/lichtpuntje-126-nl.jpg"
    },
    {
        "number": 127,
        "date": "2026-11-17",
        "day": "dinsdag",
        "title": "Een pad door het bos",
        "theme": "Keuzes",
        "description": "In een bos zie je soms verschillende paden. Geen bord kan je altijd vertellen welke wandeling het mooiste wordt. In het leven is het niet anders. We kiezen met de kennis van vandaag en ontdekken onderweg wat we nog niet wisten. Wie ooit een ander pad kiest, is daarom niet verloren.",
        "image": "assets/lichtpuntje-127-nl.jpg"
    },
    {
        "number": 128,
        "date": "2026-11-18",
        "day": "woensdag",
        "title": "Zorg voor wat kwetsbaar is",
        "theme": "Zorg",
        "description": "Een jonge plant heeft water nodig, maar ook tijd. Je kunt niet aan het steeltje trekken om hem sneller te laten groeien. Bij mensen werkt dat net zo. Wie zich kwetsbaar voelt, heeft vaak meer aan geduld en veiligheid dan aan druk. Groei laat zich niet afdwingen, maar krijgt kansen waar aandacht is.",
        "image": "assets/lichtpuntje-128-nl.jpg"
    },
    {
        "number": 129,
        "date": "2026-11-19",
        "day": "donderdag",
        "title": "Het plezier van samen lachen",
        "theme": "Verbondenheid",
        "description": "Een grapje aan tafel kan een gewone avond plots lichter maken. Samen lachen betekent niet dat je alle zorgen vergeet. Het betekent dat er, midden in het leven zoals het is, nog ruimte bestaat voor vrolijkheid. Soms zijn de mensen met wie we kunnen lachen ook degenen bij wie we stil durven zijn.",
        "image": "assets/lichtpuntje-129-nl.jpg"
    },
    {
        "number": 130,
        "date": "2026-11-20",
        "day": "vrijdag",
        "title": "Wat je onderweg niet zag",
        "theme": "Verwondering",
        "description": "Wie altijd haast heeft, ziet vooral waar hij naartoe moet. De kleine dingen langs de weg verdwijnen naar de achtergrond: een vogel op een hek, licht op een muur, een kind dat zwaait. Af en toe helpt het om je tempo te verlagen. Niet om minder te doen, maar om meer te zien.",
        "image": "assets/lichtpuntje-130-nl.jpg"
    },
    {
        "number": 131,
        "date": "2026-11-21",
        "day": "zaterdag",
        "title": "Een deur op een kier",
        "theme": "Nieuwe kansen",
        "description": "Na een teleurstelling lijkt het soms alsof alle deuren gesloten zijn. Toch kan er ergens één op een kier staan: een onverwacht gesprek, een uitnodiging of een idee dat gisteren nog niet bestond. Niet iedere kans wordt een succes. Maar wie blijft kijken, ontdekt soms mogelijkheden waar eerst alleen een muur leek.",
        "image": "assets/lichtpuntje-131-nl.jpg"
    },
    {
        "number": 132,
        "date": "2026-11-22",
        "day": "zondag",
        "title": "Waardering zonder applaus",
        "theme": "Inzet",
        "description": "Veel nuttig werk gebeurt zonder publiek. Iemand ruimt op, zet stoelen klaar, belt een eenzame buur of zorgt dat alles op tijd klaarstaat. Bijna niemand merkt het op. Toch zou het zonder die stille inzet niet hetzelfde zijn. Daarom mogen we vaker stilstaan bij de mensen die iets mogelijk maken.",
        "image": "assets/lichtpuntje-132-nl.jpg"
    },
    {
        "number": 133,
        "date": "2026-11-23",
        "day": "maandag",
        "title": "Een vraag mag blijven bestaan",
        "theme": "Nieuwsgierigheid",
        "description": "We willen graag duidelijke antwoorden. Maar sommige vragen hebben tijd nodig en andere blijven misschien altijd open. Dat hoeft geen mislukking te zijn. Een vraag kan ons helpen beter te kijken, verder te lezen en anderen te begrijpen. Wie niet alles zeker weet, kan nog altijd zorgvuldig en eerlijk leven.",
        "image": "assets/lichtpuntje-133-nl.jpg"
    },
    {
        "number": 134,
        "date": "2026-11-24",
        "day": "dinsdag",
        "title": "De warmte van een lamp",
        "theme": "Geborgenheid",
        "description": "Wanneer het buiten vroeger donker wordt, kan een klein licht in huis veel veranderen. De kamer wordt niet groter en de avond niet korter, maar de sfeer wordt zachter. Misschien werkt aandacht tussen mensen net zo. Ze verandert niet altijd de omstandigheden, maar kan het gevoel geven dat je niet alleen bent.",
        "image": "assets/lichtpuntje-134-nl.jpg"
    },
    {
        "number": 135,
        "date": "2026-11-25",
        "day": "woensdag",
        "title": "Een stap terug kan verstandig zijn",
        "theme": "Inzicht",
        "description": "Soms merk je midden in een gesprek dat de woorden harder worden dan je bedoelde. Dan is even stoppen geen verlies. Je krijgt ruimte om te luisteren, na te denken en later rustiger terug te komen. Niet elk verschil moet vandaag opgelost worden. Begrip groeit zelden wanneer iedereen alleen luider spreekt.",
        "image": "assets/lichtpuntje-135-nl.jpg"
    },
    {
        "number": 136,
        "date": "2026-11-26",
        "day": "donderdag",
        "title": "De schoonheid van iets herstellen",
        "theme": "Herstel",
        "description": "Een oude stoel, een los knopje of een gebroken kopje hoeft niet altijd meteen vervangen te worden. Soms kun je iets herstellen en krijgt het juist daardoor meer betekenis. Met mensen ligt dat ingewikkelder, maar de gedachte blijft mooi: wat beschadigd is, is niet noodzakelijk waardeloos. Zorg vraagt aandacht, tijd en geduld.",
        "image": "assets/lichtpuntje-136-nl.jpg"
    },
    {
        "number": 137,
        "date": "2026-11-27",
        "day": "vrijdag",
        "title": "Een plek voor iedereen",
        "theme": "Welkom",
        "description": "Aan een lange tafel kunnen mensen met heel verschillende verhalen zitten. De één praat veel, de ander luistert. De één gelooft, de ander twijfelt of denkt anders. Toch kan iedereen delen in hetzelfde gesprek wanneer niemand eerst moet bewijzen dat hij erbij hoort. Respect begint vaak met plaats maken voor elkaar.",
        "image": "assets/lichtpuntje-137-nl.jpg"
    },
    {
        "number": 138,
        "date": "2026-11-28",
        "day": "zaterdag",
        "title": "Wat een briefje kan betekenen",
        "theme": "Aandacht",
        "description": "Een eenvoudig briefje op tafel kan een dag veranderen: ‘Succes vandaag’, ‘Denk aan je’, of ‘Bedankt’. De woorden zijn klein, maar ze laten zien dat iemand aan je gedacht heeft. We zoeken vaak bijzondere manieren om waardering te tonen. Soms volstaat een paar minuten aandacht en een oprechte zin.",
        "image": "assets/lichtpuntje-138-nl.jpg"
    },
    {
        "number": 139,
        "date": "2026-11-29",
        "day": "zondag",
        "title": "Tijd om iets te vieren",
        "theme": "Vreugde",
        "description": "We wachten vaak op grote gebeurtenissen voor we iets vieren. Maar waarom zou een kleine overwinning geen glimlach verdienen? Een moeilijke afspraak is achter de rug, een taak is afgerond of iemand heeft iets nieuws geleerd. Ook dat zijn stappen. Door ze op te merken, maken we het dagelijks leven een beetje vriendelijker.",
        "image": "assets/lichtpuntje-139-nl.jpg"
    },
    {
        "number": 140,
        "date": "2026-11-30",
        "day": "maandag",
        "title": "Een nieuwe bladzijde",
        "theme": "Vooruitkijken",
        "description": "Een boek wordt niet minder waardevol omdat een hoofdstuk moeilijk was. Je leest verder, neemt mee wat je geleerd hebt en ontdekt wat nog komt. Ook ons leven bestaat uit meer dan één periode. We kunnen het verleden niet uitwissen, maar we hoeven het ook niet de enige stem te geven.",
        "image": "assets/lichtpuntje-140-nl.jpg"
    },
    {
        "number": 141,
        "date": "2026-12-01",
        "day": "dinsdag",
        "title": "Licht delen maakt het niet kleiner",
        "theme": "Samenleven",
        "description": "Een kaars verliest haar licht niet wanneer ze een andere kaars aansteekt. Zo is het ook met kennis, aandacht en hoop. Wat je deelt, hoeft daardoor niet minder voor jezelf te worden. Soms groeit het juist, omdat een ander er op zijn beurt iets goeds mee kan doen. Misschien begint een vriendelijkere wereld wel zo eenvoudig.",
        "image": "assets/lichtpuntje-141-nl.jpg"
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
      if (download) download.hidden = true;
      return;
    }
    label.textContent = `Lichtpuntje ${latest.number} · ${latest.theme}`;
    title.textContent = latest.title;
    description.textContent = latest.description;
    date.textContent = `${latest.day[0].toUpperCase()+latest.day.slice(1)} ${readableDate(latest.date)}`;
    image.src = latest.image;
    image.alt = `Lichtpuntje ${latest.number}: ${latest.title}`;
    photoLink.href = latest.image;
    if (download) {download.href = latest.image; download.setAttribute('download', `Lichtpuntje_${latest.number}_Nederlands.png`);download.hidden = false;}
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
    copy.append(dat,title,desc);card.append(link,copy);container.append(card);
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
    status.textContent=`${released.length} ${released.length===1?'Lichtpuntje is':'Lichtpuntjes zijn'} verschenen. Klik op een afbeelding om ze groot te bekijken.`;
    released.forEach(post=>appendCard(container,post));
  }
  function render(){updateHome();updateArchive();}
  if (document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);
  else render();
  window.setInterval(render, 60000); // Ook als de bezoeker de site rond middernacht open laat.
})();
