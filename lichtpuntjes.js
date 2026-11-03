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
        "image": "assets/lichtpuntje-112-nl.jpg",
        "reflection": "We zijn zo gewend om ons op taken en zorgen te richten dat we soms nauwelijks merken wat er om ons heen gebeurt. Een eenvoudige verandering in licht of kleur kan ons eraan herinneren dat vertrouwde dingen niet vanzelfsprekend zijn. Aandacht is geen opdracht om altijd positief te denken. Ook op moeilijke dagen mag je verdrietig of moe zijn. Maar juist dan kan een klein, rustig moment helpen om niet volledig door de drukte te worden opgeslokt. Misschien ligt de waarde van zo'n moment niet in wat het oplost, maar in de gelegenheid om even aanwezig te zijn. Wat heb jij vandaag gezien waar je anders zomaar aan voorbij zou zijn gegaan?"
    },
    {
        "number": 113,
        "date": "2026-11-03",
        "day": "dinsdag",
        "title": "De kracht van even luisteren",
        "theme": "Luisteren",
        "description": "Iemand begint te vertellen en je denkt meteen dat je het antwoord al kent. Maar als je rustig luistert, hoor je soms iets heel anders dan je verwachtte. Niet iedereen zoekt een oplossing. Soms wil iemand alleen weten dat zijn verhaal niet te zwaar is om te delen. Een open oor kan meer ruimte geven dan tien goedbedoelde adviezen.",
        "image": "assets/lichtpuntje-113-nl.jpg",
        "reflection": "Wanneer iemand zijn verhaal vertelt, voelen we vaak de behoefte om meteen te helpen. We zoeken naar oplossingen, geven raad of vergelijken de situatie met onze eigen ervaringen. Dat doen we meestal met goede bedoelingen. Maar luisteren vraagt soms iets anders: bereid zijn om even niet zelf centraal te staan. Iemand die verdriet, onzekerheid of een moeilijke ervaring deelt, heeft niet altijd behoefte aan een antwoord. Soms wil die persoon vooral voelen dat zijn woorden ernstig worden genomen en dat hij niet veroordeeld wordt. Echt luisteren is iemand de ruimte geven om zichzelf te zijn, ook wanneer je zijn situatie niet kunt veranderen. Luisteren we om de ander te begrijpen, of vooral om zelf te kunnen antwoorden?"
    },
    {
        "number": 114,
        "date": "2026-11-04",
        "day": "woensdag",
        "title": "Het bankje langs de weg",
        "theme": "Onderweg",
        "description": "Op een bankje langs een wandelpad gaan allerlei mensen even zitten: iemand met een boodschappentas, een fietser, een ouder paar. Niemand hoeft er iets te kopen of te bewijzen. Het is gewoon een plek om op adem te komen. Wat zou het mooi zijn als wij voor elkaar af en toe zo’n bankje konden zijn.",
        "image": "assets/lichtpuntje-114-nl.jpg",
        "reflection": "Een rustplaats langs de weg is er niet alleen voor wie sterk of snel is. Ook iemand die moe is, onzeker wandelt of even niet verder kan, mag er gaan zitten. Dat maakt dit eenvoudige beeld zo betekenisvol voor ons dagelijks leven. We hoeven niet voor iedereen een oplossing te hebben om toch een veilige aanwezigheid te zijn. Soms helpt het al om iemand niet op te jagen, een plaats vrij te houden of een gesprek niet af te kappen. Tegelijk hoeft niemand altijd beschikbaar te zijn; ook wie steun biedt, heeft rust nodig. Bij wie kun jij zonder uitleg even op adem komen? En voor wie zou jij zo'n rustige aanwezigheid kunnen zijn?"
    },
    {
        "number": 115,
        "date": "2026-11-05",
        "day": "donderdag",
        "title": "Een klein begin is ook een begin",
        "theme": "Moed",
        "description": "Een grote taak lijkt op een berg wanneer je alles tegelijk bekijkt. Maar geen berg wordt beklommen met één reuzensprong. Soms is de eerste stap niet meer dan een papier ordenen, één bericht versturen of vijf minuten opruimen. Dat is niet weinig: het is een begin. Je hoeft de hele weg vandaag niet te kennen.",
        "image": "assets/lichtpuntje-115-nl.jpg",
        "reflection": "Grote veranderingen beginnen zelden met een indrukwekkend moment. Vaker bestaan ze uit pogingen die nauwelijks iemand ziet. Wie bang is om te mislukken, kan blijven wachten tot alles duidelijk en perfect is. Maar de eerste stap hoeft het eindresultaat nog niet te bevatten. Je mag iets leren terwijl je eraan begint, onderweg bijsturen en af en toe hulp vragen. Een kleine handeling is niet waardeloos omdat er nog veel werk volgt. Ze laat zien dat je jezelf de kans geeft om vooruit te komen. Misschien helpt het vandaag om niet naar de hele berg te kijken, maar naar de volgende haalbare stap. Welke kleine stap kun jij nu zetten, zonder jezelf meteen alles op te leggen?"
    },
    {
        "number": 116,
        "date": "2026-11-06",
        "day": "vrijdag",
        "title": "De geur van verse koffie",
        "theme": "Herinnering",
        "description": "Sommige geuren brengen ons onmiddellijk terug naar een ander moment. Verse koffie, warme broodjes, een regenbui op straat. Ineens herinner je je een keuken, een stem of een rustig gesprek. Zulke momenten lijken klein, maar ze laten een warm spoor achter. Misschien kunnen we vandaag zelf zo’n eenvoudige herinnering maken.",
        "image": "assets/lichtpuntje-116-nl.jpg",
        "reflection": "Een geur kan herinneringen oproepen die we niet bewust aan het zoeken waren. Ineens lijkt een plek uit het verleden dichtbij, samen met de mensen en gevoelens die erbij horen. Zo ontdekken we dat verbondenheid vaak schuilt in gewone, herhaalde momenten: samen ontbijten, een gesprek voeren, iemand verwelkomen. Niet alles wat betekenisvol is, hoeft groots of duur te zijn. Voor wie iemand mist, kan zo'n herinnering tegelijk warm en pijnlijk aanvoelen. Beide gevoelens mogen bestaan. Misschien kunnen we vandaag ook zelf bijdragen aan een mooie herinnering door werkelijk aandacht te hebben voor degene die bij ons is. Welk klein, vertrouwd moment betekent voor jou veel meer dan het op het eerste gezicht lijkt?"
    },
    {
        "number": 117,
        "date": "2026-11-07",
        "day": "zaterdag",
        "title": "Ruimte voor een andere mening",
        "theme": "Respect",
        "description": "Twee mensen kunnen naar dezelfde gebeurtenis kijken en iets heel anders ervaren. Dat maakt een gesprek soms lastig, maar ook waardevol. Wie alleen zijn eigen woorden herhaalt, ontdekt niets nieuws. Wie nieuwsgierig vraagt waarom de ander zo denkt, hoeft het niet eens te worden om toch iets te leren.",
        "image": "assets/lichtpuntje-117-nl.jpg",
        "reflection": "Verschillen van mening kunnen ongemakkelijk zijn, vooral wanneer een onderwerp ons diep raakt. Dan luisteren we soms vooral om een tegenargument te vinden. Toch betekent respect niet dat we onze overtuiging moeten loslaten. Het betekent dat we erkennen dat de ander ervaringen, vragen en redenen heeft die we misschien nog niet begrijpen. Een eerlijke vraag kan meer duidelijk maken dan tien verwijten. Begrip is bovendien niet hetzelfde als instemming: je mag na een goed gesprek nog altijd verschillend denken. Waar het om gaat, is dat een verschil geen reden hoeft te zijn om de waardigheid van de ander te ontkennen. Kun jij een mening die je niet deelt toch eerst proberen te begrijpen?"
    },
    {
        "number": 118,
        "date": "2026-11-08",
        "day": "zondag",
        "title": "De boom die zijn bladeren loslaat",
        "theme": "Loslaten",
        "description": "Een boom houdt zijn bladeren niet vast uit angst voor de winter. Hij laat los wat voorbij is en bewaart zijn kracht voor een nieuwe tijd. Mensen hebben het daar soms moeilijker mee. We dragen zorgen, verwachtingen en oude teleurstellingen mee. Loslaten betekent niet dat iets onbelangrijk was. Het betekent dat er weer ruimte mag ontstaan.",
        "image": "assets/lichtpuntje-118-nl.jpg",
        "reflection": "Loslaten wordt soms voorgesteld alsof we simpelweg moeten vergeten wat ons verdriet deed. Maar een herinnering, een gemiste kans of een belangrijk afscheid laat zich niet op bevel verwijderen. Loslaten kan ook betekenen dat iets niet langer ieder besluit hoeft te bepalen. Je mag erkennen dat een periode belangrijk was én tegelijk ruimte maken voor wat nu nodig is. Dat proces heeft geen vaste snelheid. Sommige dagen voelt het licht, andere dagen komt het gemis terug. Ook dat hoort erbij. Zoals de seizoenen elkaar afwisselen, verandert de betekenis die gebeurtenissen voor ons krijgen. Wat draag jij nog met je mee, en zou het helpen om daar wat zachter mee om te gaan?"
    },
    {
        "number": 119,
        "date": "2026-11-09",
        "day": "maandag",
        "title": "Een vriendelijk woord onderweg",
        "theme": "Vriendelijkheid",
        "description": "In de winkel, op straat of bij een halte kruisen we dagelijks mensen van wie we het verhaal niet kennen. Een kleine begroeting kan zo’n ontmoeting minder afstandelijk maken. Je hoeft geen groot gesprek te beginnen. Gewoon even oog hebben voor degene die tegenover je staat, kan al genoeg zijn.",
        "image": "assets/lichtpuntje-119-nl.jpg",
        "reflection": "We weten meestal niet met welke zorgen de mensen die we ontmoeten hun dag begonnen zijn. Achter een haastige blik kan vermoeidheid schuilgaan, achter stilte onzekerheid. Daarom kan een vriendelijke houding meer betekenen dan we vermoeden. Het gaat niet om voortdurend vrolijk zijn of iedereen aanspreken. Het gaat om kleine keuzes: iemand laten uitspreken, geduldig blijven wanneer iets langer duurt of een oprechte dankjewel zeggen. Vriendelijkheid vraagt geen kennis van iemands achtergrond of geloof. Ze begint met het besef dat de ander net zo goed gevoelens en grenzen heeft als wij. Is er vandaag een ontmoeting waarin jij iets meer geduld of warmte kunt tonen?"
    },
    {
        "number": 120,
        "date": "2026-11-10",
        "day": "dinsdag",
        "title": "Ook stilte vertelt iets",
        "theme": "Stilte",
        "description": "Niet iedere stilte is leeg. Soms is het de rust na een drukke dag, soms het nadenken voor je antwoord geeft, soms de nabijheid van iemand bij wie je niets hoeft uit te leggen. We vullen stiltes vaak snel op met geluid. Maar wie ze af en toe laat bestaan, merkt hoeveel ruimte er in stilte kan zitten.",
        "image": "assets/lichtpuntje-120-nl.jpg",
        "reflection": "We leven in een wereld waarin stilte al snel wordt opgevuld. Zodra er geen geluid klinkt, grijpen we naar een scherm of zoeken we iets om te zeggen. Toch kan stilte verschillende betekenissen hebben. Ze kan helpen om gevoelens te ordenen, een beslissing te laten bezinken of naast iemand te blijven zonder woorden te forceren. Natuurlijk kan stilte ook zwaar of eenzaam zijn; niet iedere stilte brengt rust. Daarom is aandacht voor de situatie belangrijk. Soms is spreken nodig, soms luisteren, soms alleen aanwezig zijn. De kunst is niet om altijd stil te blijven, maar om niet bang te zijn voor een moment zonder antwoorden. Wanneer heeft stilte jou voor het laatst geholpen om iets duidelijker te voelen of te begrijpen?"
    },
    {
        "number": 121,
        "date": "2026-11-11",
        "day": "woensdag",
        "title": "De regen hoort er ook bij",
        "theme": "Aanvaarding",
        "description": "We dromen van dagen met zon, maar de aarde heeft ook regen nodig. Zo kennen we in ons leven lichte en sombere momenten. Een moeilijke dag hoeft niet meteen een mislukte dag te zijn. Misschien lukt er minder dan gepland, en misschien is dat vandaag genoeg. Morgen mogen we opnieuw beginnen.",
        "image": "assets/lichtpuntje-121-nl.jpg",
        "reflection": "We beoordelen een dag vaak aan de hand van wat gelukt is. Als plannen veranderen of onze energie ontbreekt, noemen we hem al snel verloren. Maar het leven is niet iedere dag even voorspelbaar. Tegenslag kan ons vertragen, verdriet kan aandacht vragen en rust kan noodzakelijk zijn. Dat maakt een dag niet minder menselijk. Aanvaarden is niet hetzelfde als opgeven; je mag iets moeilijk vinden en toch zoeken naar een volgende stap. We hoeven evenmin van elk probleem onmiddellijk een les te maken. Soms is het voldoende om de dag met mildheid af te sluiten. Zou je jezelf vandaag dezelfde ruimte kunnen geven die je iemand anders in een moeilijke periode zou gunnen?"
    },
    {
        "number": 122,
        "date": "2026-11-12",
        "day": "donderdag",
        "title": "De moed om nee te zeggen",
        "theme": "Grenzen",
        "description": "Altijd ja zeggen klinkt vriendelijk, maar kan je langzaam uitputten. Wie overal voor iedereen klaarstaat, vergeet soms dat zijn eigen tijd en energie ook grenzen hebben. Een rustig uitgesproken nee hoeft geen afwijzing van de ander te zijn. Het kan een eerlijke manier zijn om te zorgen dat wat je wel doet, met aandacht gebeurt.",
        "image": "assets/lichtpuntje-122-nl.jpg",
        "reflection": "Wie graag helpt, kan het gevoel krijgen dat elke vraag meteen een verplichting is. Zeker wanneer anderen op ons rekenen, is het lastig om een grens aan te geven. Toch bestaat duurzame zorg niet uit eindeloos beschikbaar zijn. Vermoeidheid en overbelasting kunnen er uiteindelijk voor zorgen dat we niemand meer met aandacht kunnen helpen. Een duidelijk nee hoeft daarom geen gebrek aan liefde of solidariteit te zijn. Het kan juist eerlijkheid brengen: dit kan ik wel, en dat lukt mij nu niet. Grenzen stellen vraagt oefening, en soms ook moed tegenover teleurgestelde verwachtingen. Waar zou een rustige, respectvolle grens jou helpen om beter voor jezelf én voor anderen te zorgen?"
    },
    {
        "number": 123,
        "date": "2026-11-13",
        "day": "vrijdag",
        "title": "Een verhaal achter elke voordeur",
        "theme": "Begrip",
        "description": "Wanneer we langs huizen lopen, zien we ramen, deuren en misschien een lichtje branden. Maar wat er binnen leeft, weten we niet. Achter iedere voordeur schuilt een eigen verhaal van vreugde, zorgen, hoop en herinneringen. Daarom is het goed om voorzichtig te zijn met snelle oordelen. We kennen van de meeste mensen maar een klein stukje.",
        "image": "assets/lichtpuntje-123-nl.jpg",
        "reflection": "We vullen ontbrekende informatie vaak ongemerkt zelf in. Iemand doet afstandelijk en we denken dat hij onvriendelijk is. Iemand reageert laat en we voelen ons genegeerd. Maar achter gedrag kunnen omstandigheden zitten die we niet kennen: zorgen thuis, gezondheidsproblemen, verdriet of gewoon een moeilijke dag. Dat betekent niet dat alles aanvaardbaar is, wel dat voorzichtigheid met oordelen verstandig blijft. We hoeven niet van iedereen het hele verhaal te kennen om respectvol te handelen. Soms volstaat het om ruimte te laten voor een andere verklaring. Wie weet verandert een eenvoudige vraag meer dan een snelle conclusie. Over wie heb jij misschien een oordeel gevormd terwijl je nog maar een klein deel van het verhaal kende?"
    },
    {
        "number": 124,
        "date": "2026-11-14",
        "day": "zaterdag",
        "title": "Een oude gewoonte opnieuw bekijken",
        "theme": "Verandering",
        "description": "Sommige dingen doen we al jaren op dezelfde manier. Niet omdat het de beste manier is, maar omdat we eraan gewend zijn. Af en toe is het goed om te vragen: helpt dit nog, of mag het anders? Veranderen betekent niet dat alles vroeger verkeerd was. Het betekent dat we bereid blijven te leren.",
        "image": "assets/lichtpuntje-124-nl.jpg",
        "reflection": "Gewoonten geven houvast. Ze besparen tijd en zorgen ervoor dat vertrouwde dingen soepel verlopen. Maar wat ooit behulpzaam was, hoeft niet voor altijd de beste keuze te blijven. Mensen veranderen, omstandigheden veranderen en soms ontdekken we iets wat we vroeger niet wisten. Een gewoonte onderzoeken is dan geen aanval op het verleden. Het is een manier om bewust te kiezen wat we willen behouden. Dat geldt voor praktische zaken, maar ook voor overtuigingen en manieren waarop we met elkaar omgaan. Wie vragen durft te stellen, hoeft zijn geschiedenis niet te verloochenen. Welke gewoonte zou jij eens met een open blik willen bekijken, zonder vooraf te besluiten dat ze goed of fout is?"
    },
    {
        "number": 125,
        "date": "2026-11-15",
        "day": "zondag",
        "title": "De vreugde van een eenvoudige maaltijd",
        "theme": "Dankbaarheid",
        "description": "Een pan soep op het vuur, een boterham op een bord, een stoel aan tafel. Niet ieder mooi moment hoeft bijzonder of duur te zijn. Soms komt de warmte juist uit de eenvoud. Als we even aandacht hebben voor wat er wél is, krijgt een gewone maaltijd een andere betekenis.",
        "image": "assets/lichtpuntje-125-nl.jpg",
        "reflection": "Niet iedereen heeft dezelfde mogelijkheden om een maaltijd op tafel te zetten. Juist daarom vraagt dit Lichtpuntje om meer dan alleen dankbaarheid voor ons eigen bord. Samen eten kan warmte geven omdat mensen tijd en aandacht delen, maar voedsel en gezelschap zijn niet voor iedereen vanzelfsprekend. Een eenvoudige maaltijd kan bijzonder worden wanneer er plaats is voor een gesprek, een herinnering of iemand die anders alleen zou zitten. Dat hoeft geen groot feest te zijn. Soms ontstaat verbondenheid doordat we niet op de prijs van de maaltijd letten, maar op de mensen aan tafel. Wat maakt voor jou een maaltijd waardevol: wat er op het bord ligt, of hoe je je erbij voelt?"
    },
    {
        "number": 126,
        "date": "2026-11-16",
        "day": "maandag",
        "title": "Iemand iets leren",
        "theme": "Delen",
        "description": "Wie iets goed kan, vergeet soms hoe moeilijk het ooit was om ermee te beginnen. Een ander de tijd geven om het te leren, vraagt geduld. Niet overnemen, niet zuchten, maar rustig uitleggen en laten proberen. Wat iemand zelf leert, kan hij later weer aan een ander doorgeven. Zo groeit kennis verder.",
        "image": "assets/lichtpuntje-126-nl.jpg",
        "reflection": "Kennis groeit wanneer mensen bereid zijn haar te delen. Toch vergeten we gemakkelijk hoe onzeker het kan voelen om iets voor de eerste keer te proberen. Een uitleg die voor de ene vanzelfsprekend is, kan voor een ander veel stappen bevatten. Geduld betekent daarom niet alleen dezelfde woorden herhalen, maar ook kijken waar iemand vastloopt en hem de kans geven zelf te oefenen. Fouten horen bij leren; schaamte helpt zelden vooruit. Iemand iets aanleren kan ook onszelf bescheidener maken, omdat we ontdekken dat niet iedereen op dezelfde manier denkt. Wanneer heb jij voor het laatst iets geleerd dankzij het geduld van een ander? En aan wie zou jij diezelfde ruimte kunnen geven?"
    },
    {
        "number": 127,
        "date": "2026-11-17",
        "day": "dinsdag",
        "title": "Een pad door het bos",
        "theme": "Keuzes",
        "description": "In een bos zie je soms verschillende paden. Geen bord kan je altijd vertellen welke wandeling het mooiste wordt. In het leven is het niet anders. We kiezen met de kennis van vandaag en ontdekken onderweg wat we nog niet wisten. Wie ooit een ander pad kiest, is daarom niet verloren.",
        "image": "assets/lichtpuntje-127-nl.jpg",
        "reflection": "Een keuze maken voelt vaak alsof we vooraf zeker moeten weten waar ze ons zal brengen. Maar niemand beschikt over alle informatie over de toekomst. We beslissen met onze huidige kennis, onze waarden en wat op dat moment mogelijk is. Soms blijkt een gekozen richting goed te passen; soms ontdekken we onderweg dat bijsturen nodig is. Dat laatste hoeft geen bewijs van mislukking te zijn. Het kan juist betekenen dat we blijven leren. Ook mogen mensen verschillende paden kiezen zonder dat één van hen daarom minder waard is. De vraag is niet altijd of je ooit verkeerd bent afgeslagen, maar wat je nu hebt geleerd. Welke keuze bekijk jij vandaag misschien met meer begrip dan vroeger?"
    },
    {
        "number": 128,
        "date": "2026-11-18",
        "day": "woensdag",
        "title": "Zorg voor wat kwetsbaar is",
        "theme": "Zorg",
        "description": "Een jonge plant heeft water nodig, maar ook tijd. Je kunt niet aan het steeltje trekken om hem sneller te laten groeien. Bij mensen werkt dat net zo. Wie zich kwetsbaar voelt, heeft vaak meer aan geduld en veiligheid dan aan druk. Groei laat zich niet afdwingen, maar krijgt kansen waar aandacht is.",
        "image": "assets/lichtpuntje-128-nl.jpg",
        "reflection": "Wanneer iemand het moeilijk heeft, willen we vaak dat het snel beter gaat. We moedigen aan, geven raad en verwachten soms meteen resultaat. Maar kwetsbaarheid volgt geen planning. Vertrouwen, herstel en persoonlijke groei hebben tijd nodig, en mensen verschillen in wat zij aankunnen. Aandacht betekent luisteren naar wat iemand werkelijk nodig heeft, niet alleen naar wat wij graag zouden zien gebeuren. Geduld mag tegelijk samengaan met duidelijke grenzen en praktische hulp. Je kunt steun aanbieden zonder iemands leven over te nemen. Misschien is de belangrijkste vraag niet hoe snel iemand vooruitkomt, maar of die persoon zich veilig genoeg voelt om een stap te zetten. Hoe kunnen we iemand steunen zonder extra druk te veroorzaken?"
    },
    {
        "number": 129,
        "date": "2026-11-19",
        "day": "donderdag",
        "title": "Het plezier van samen lachen",
        "theme": "Verbondenheid",
        "description": "Een grapje aan tafel kan een gewone avond plots lichter maken. Samen lachen betekent niet dat je alle zorgen vergeet. Het betekent dat er, midden in het leven zoals het is, nog ruimte bestaat voor vrolijkheid. Soms zijn de mensen met wie we kunnen lachen ook degenen bij wie we stil durven zijn.",
        "image": "assets/lichtpuntje-129-nl.jpg",
        "reflection": "Samen lachen brengt mensen soms even uit hun zorgen. Het kan spanning verminderen en laten voelen dat je niet voortdurend sterk of ernstig hoeft te zijn. Maar humor vraagt ook gevoeligheid. Wat voor de ene grappig is, kan een ander kwetsen, zeker wanneer iemand zelf het mikpunt wordt. Het mooiste lachen ontstaat wanneer mensen zich inbegrepen voelen en niemand zichzelf hoeft te verbergen. Vrolijkheid maakt verdriet niet ongedaan, maar beide kunnen naast elkaar bestaan. Soms is de fijnste vriendschap er een waarin je samen kunt lachen én op een moeilijk moment stil kunt zijn. Denk eens aan iemand bij wie jij helemaal jezelf kunt zijn. Wat maakt die verbondenheid zo waardevol?"
    },
    {
        "number": 130,
        "date": "2026-11-20",
        "day": "vrijdag",
        "title": "Wat je onderweg niet zag",
        "theme": "Verwondering",
        "description": "Wie altijd haast heeft, ziet vooral waar hij naartoe moet. De kleine dingen langs de weg verdwijnen naar de achtergrond: een vogel op een hek, licht op een muur, een kind dat zwaait. Af en toe helpt het om je tempo te verlagen. Niet om minder te doen, maar om meer te zien.",
        "image": "assets/lichtpuntje-130-nl.jpg",
        "reflection": "Haast maakt onze blik smaller. We concentreren ons op het volgende doel en merken daardoor minder op van wat zich onderweg afspeelt. Dat is begrijpelijk: verplichtingen wachten niet altijd. Toch kan een kleine onderbreking onze aandacht opnieuw openen. Een onverwacht detail in de natuur, een vriendelijk gebaar of een mooi stukje licht kan eraan herinneren dat ons leven niet uitsluitend uit taken bestaat. Bewust kijken betekent niet dat we onze verantwoordelijkheden laten vallen. We geven onszelf alleen toestemming om meer waar te nemen dan de klok en de planning. Soms verandert onze stemming niet door wat er gebeurt, maar door waar we aandacht aan schenken. Wat viel jou vandaag op toen je even niet gehaast was?"
    },
    {
        "number": 131,
        "date": "2026-11-21",
        "day": "zaterdag",
        "title": "Een deur op een kier",
        "theme": "Nieuwe kansen",
        "description": "Na een teleurstelling lijkt het soms alsof alle deuren gesloten zijn. Toch kan er ergens één op een kier staan: een onverwacht gesprek, een uitnodiging of een idee dat gisteren nog niet bestond. Niet iedere kans wordt een succes. Maar wie blijft kijken, ontdekt soms mogelijkheden waar eerst alleen een muur leek.",
        "image": "assets/lichtpuntje-131-nl.jpg",
        "reflection": "Na een teleurstelling beschermen we ons soms door niets nieuws meer te verwachten. Dat is begrijpelijk, vooral wanneer vertrouwen eerder werd beschaamd. Hoop hoeft echter niet te betekenen dat we zeker weten dat alles goed komt. Ze kan ook de bereidheid zijn om een mogelijkheid voorzichtig te onderzoeken, zonder onze grenzen uit het oog te verliezen. Een nieuwe deur hoeft niet meteen wijd open. Je mag eerst kijken, vragen stellen en beslissen of de stap veilig en passend is. Niet iedere kans moet worden gegrepen. Soms geeft het al moed om te beseffen dat het verhaal nog niet vastligt. Welke kleine mogelijkheid zou jij zonder druk of grote verwachtingen eens willen bekijken?"
    },
    {
        "number": 132,
        "date": "2026-11-22",
        "day": "zondag",
        "title": "Waardering zonder applaus",
        "theme": "Inzet",
        "description": "Veel nuttig werk gebeurt zonder publiek. Iemand ruimt op, zet stoelen klaar, belt een eenzame buur of zorgt dat alles op tijd klaarstaat. Bijna niemand merkt het op. Toch zou het zonder die stille inzet niet hetzelfde zijn. Daarom mogen we vaker stilstaan bij de mensen die iets mogelijk maken.",
        "image": "assets/lichtpuntje-132-nl.jpg",
        "reflection": "Veel vormen van zorg vallen pas op wanneer niemand ze meer doet. Iemand houdt een ruimte netjes, luistert naar een buur, regelt praktische zaken of merkt dat een ander hulp nodig heeft. Zulke inzet levert zelden applaus op, maar draagt wel het dagelijks samenleven. Waardering hoeft niet groots te zijn. Een concreet bedankje laat iemand merken dat zijn inspanning gezien wordt. Tegelijk is het goed om te voorkomen dat de stille helpers vanzelfsprekend alle lasten blijven dragen. Echte waardering kan ook betekenen dat we werk eerlijker verdelen. Wie maakt in jouw omgeving iets mogelijk zonder er aandacht voor te vragen? En hoe kun jij laten merken dat je dat ziet?"
    },
    {
        "number": 133,
        "date": "2026-11-23",
        "day": "maandag",
        "title": "Een vraag mag blijven bestaan",
        "theme": "Nieuwsgierigheid",
        "description": "We willen graag duidelijke antwoorden. Maar sommige vragen hebben tijd nodig en andere blijven misschien altijd open. Dat hoeft geen mislukking te zijn. Een vraag kan ons helpen beter te kijken, verder te lezen en anderen te begrijpen. Wie niet alles zeker weet, kan nog altijd zorgvuldig en eerlijk leven.",
        "image": "assets/lichtpuntje-133-nl.jpg",
        "reflection": "We leren vaak dat op iedere vraag een duidelijk antwoord moet volgen. Maar sommige onderwerpen zijn ingewikkeld, omdat bronnen onvolledig zijn of mensen verschillende ervaringen hebben. Toegeven dat we iets niet weten, is geen zwakte. Het kan juist een vorm van eerlijkheid zijn. Een open vraag nodigt uit om verder te lezen, beter te luisteren en onze aannames te onderzoeken. Dat geldt ook voor geloof en levensbeschouwing. Je kunt trouw blijven aan wat voor jou belangrijk is en toch erkennen dat je nog niet alles begrijpt. Respectvol zoeken begint soms bij het woord 'misschien'. Welke vraag zou jij graag verder onderzoeken, zonder jezelf te verplichten vandaag al tot een definitief antwoord te komen?"
    },
    {
        "number": 134,
        "date": "2026-11-24",
        "day": "dinsdag",
        "title": "De warmte van een lamp",
        "theme": "Geborgenheid",
        "description": "Wanneer het buiten vroeger donker wordt, kan een klein licht in huis veel veranderen. De kamer wordt niet groter en de avond niet korter, maar de sfeer wordt zachter. Misschien werkt aandacht tussen mensen net zo. Ze verandert niet altijd de omstandigheden, maar kan het gevoel geven dat je niet alleen bent.",
        "image": "assets/lichtpuntje-134-nl.jpg",
        "reflection": "Een klein licht neemt de duisternis niet helemaal weg, maar kan een ruimte wel anders laten aanvoelen. Zo werkt aandacht tussen mensen soms ook. Een telefoontje verandert niet onmiddellijk een moeilijke situatie en een bezoek lost niet iedere zorg op. Toch kan iemand daardoor merken dat hij niet vergeten is. Geborgenheid heeft vaak te maken met voorspelbaarheid en vertrouwen: weten dat je welkom bent en jezelf niet voortdurend hoeft uit te leggen. We kunnen die veiligheid niet voor iedereen garanderen, maar wel bewust proberen bij te dragen. Soms is het meest waardevolle niet wat we zeggen, maar dat we blijven luisteren. Wie zou vandaag blij kunnen zijn met een eenvoudig teken dat je aan hem denkt?"
    },
    {
        "number": 135,
        "date": "2026-11-25",
        "day": "woensdag",
        "title": "Een stap terug kan verstandig zijn",
        "theme": "Inzicht",
        "description": "Soms merk je midden in een gesprek dat de woorden harder worden dan je bedoelde. Dan is even stoppen geen verlies. Je krijgt ruimte om te luisteren, na te denken en later rustiger terug te komen. Niet elk verschil moet vandaag opgelost worden. Begrip groeit zelden wanneer iedereen alleen luider spreekt.",
        "image": "assets/lichtpuntje-135-nl.jpg",
        "reflection": "Wanneer een gesprek verhit raakt, willen we vaak nog snel ons gelijk halen. Daardoor luisteren we minder goed en worden woorden gemakkelijk harder dan bedoeld. Een onderbreking kan helpen om dat patroon te doorbreken. Even afstand nemen betekent niet dat de ander automatisch gelijk heeft of dat het onderwerp onbelangrijk is. Het geeft ons tijd om te onderscheiden wat we werkelijk willen zeggen en wat voortkomt uit frustratie. Een gesprek later hervatten lukt beter wanneer beide kanten weten dat de pauze geen ontwijking is. Niet ieder conflict wordt opgelost, maar respect kan ook bestaan terwijl meningen verschillen. Wanneer zou het verstandiger zijn om eerst rust te zoeken in plaats van meteen te reageren?"
    },
    {
        "number": 136,
        "date": "2026-11-26",
        "day": "donderdag",
        "title": "De schoonheid van iets herstellen",
        "theme": "Herstel",
        "description": "Een oude stoel, een los knopje of een gebroken kopje hoeft niet altijd meteen vervangen te worden. Soms kun je iets herstellen en krijgt het juist daardoor meer betekenis. Met mensen ligt dat ingewikkelder, maar de gedachte blijft mooi: wat beschadigd is, is niet noodzakelijk waardeloos. Zorg vraagt aandacht, tijd en geduld.",
        "image": "assets/lichtpuntje-136-nl.jpg",
        "reflection": "Herstellen vraagt dat we niet alleen zien wat beschadigd is, maar ook wat nog waarde heeft. Bij spullen kan dat eenvoudig zijn: we maken iets schoon, repareren het of geven het een nieuwe functie. Bij menselijke relaties ligt het gevoeliger. Vertrouwen kan niet met een paar mooie woorden worden hersteld. Daarvoor zijn eerlijkheid, tijd en vaak concrete veranderingen nodig. Bovendien hoeft niemand terug te keren naar een situatie die onveilig blijft. De gedachte van vandaag is daarom geen opdracht om alles te vergeven of goed te maken. Ze nodigt uit om zorgvuldig te kijken wat herstelbaar is en welke grenzen nodig zijn. Wat heeft voor jou geholpen om na een teleurstelling weer vertrouwen op te bouwen?"
    },
    {
        "number": 137,
        "date": "2026-11-27",
        "day": "vrijdag",
        "title": "Een plek voor iedereen",
        "theme": "Welkom",
        "description": "Aan een lange tafel kunnen mensen met heel verschillende verhalen zitten. De één praat veel, de ander luistert. De één gelooft, de ander twijfelt of denkt anders. Toch kan iedereen delen in hetzelfde gesprek wanneer niemand eerst moet bewijzen dat hij erbij hoort. Respect begint vaak met plaats maken voor elkaar.",
        "image": "assets/lichtpuntje-137-nl.jpg",
        "reflection": "Een plaats aanbieden is meer dan een stoel vrijhouden. Het betekent dat mensen niet eerst dezelfde achtergrond, overtuiging of gewoonten hoeven te hebben om met respect te worden behandeld. In een groep is het gemakkelijk om vooral te luisteren naar wie op ons lijkt. Maar wie een andere taal spreekt, weinig zegt of anders denkt, heeft evenveel recht om gehoord te worden. Echte gastvrijheid vraagt daarom soms dat we onze vanzelfsprekendheden bevragen. Niet iedereen hoeft hetzelfde te geloven of met alles akkoord te gaan. Het is al veel waard wanneer verschillen bespreekbaar blijven zonder dat iemand buitengesloten wordt. Wie krijgt in jouw omgeving weinig ruimte, en wat zou een klein gebaar van welkom kunnen veranderen?"
    },
    {
        "number": 138,
        "date": "2026-11-28",
        "day": "zaterdag",
        "title": "Wat een briefje kan betekenen",
        "theme": "Aandacht",
        "description": "Een eenvoudig briefje op tafel kan een dag veranderen: ‘Succes vandaag’, ‘Denk aan je’, of ‘Bedankt’. De woorden zijn klein, maar ze laten zien dat iemand aan je gedacht heeft. We zoeken vaak bijzondere manieren om waardering te tonen. Soms volstaat een paar minuten aandacht en een oprechte zin.",
        "image": "assets/lichtpuntje-138-nl.jpg",
        "reflection": "Een persoonlijk briefje laat zien dat iemand tijd heeft genomen om aan een ander te denken. De waarde zit niet in mooi papier of lange zinnen, maar in de aandacht die erachter schuilt. We onderschatten soms hoe lang een vriendelijke boodschap kan blijven hangen, zeker bij iemand die weinig waardering ontvangt. Oprechte woorden hoeven niet ingewikkeld te zijn. Het helpt juist om concreet te zeggen waarvoor je dankbaar bent of wat je in de ander waardeert. Een berichtje kan geen echt contact altijd vervangen, maar wel een uitnodiging ertoe zijn. Aan wie zou jij vandaag iets willen zeggen dat je al langer denkt, maar nog nooit hardop hebt uitgesproken?"
    },
    {
        "number": 139,
        "date": "2026-11-29",
        "day": "zondag",
        "title": "Tijd om iets te vieren",
        "theme": "Vreugde",
        "description": "We wachten vaak op grote gebeurtenissen voor we iets vieren. Maar waarom zou een kleine overwinning geen glimlach verdienen? Een moeilijke afspraak is achter de rug, een taak is afgerond of iemand heeft iets nieuws geleerd. Ook dat zijn stappen. Door ze op te merken, maken we het dagelijks leven een beetje vriendelijker.",
        "image": "assets/lichtpuntje-139-nl.jpg",
        "reflection": "We meten vooruitgang vaak aan grote resultaten. Daardoor zien we over het hoofd hoeveel inspanning kleine stappen kunnen vragen. Voor iemand kan een moeilijke afspraak bijwonen al een hele overwinning zijn; voor een ander is het eindelijk om hulp durven vragen. Zulke momenten verdienen erkenning, ook als niemand anders ze opmerkt. Vieren hoeft niet te betekenen dat we doen alsof alle problemen voorbij zijn. We mogen blij zijn met wat gelukt is en tegelijk weten dat er nog uitdagingen wachten. Die combinatie maakt waardering geloofwaardig. Misschien helpt het vandaag om niet alleen te vragen wat nog moet, maar ook te zien wat al is gebeurd. Welke kleine overwinning zou jij jezelf of iemand anders gunnen om even bij stil te staan?"
    },
    {
        "number": 140,
        "date": "2026-11-30",
        "day": "maandag",
        "title": "Een nieuwe bladzijde",
        "theme": "Vooruitkijken",
        "description": "Een boek wordt niet minder waardevol omdat een hoofdstuk moeilijk was. Je leest verder, neemt mee wat je geleerd hebt en ontdekt wat nog komt. Ook ons leven bestaat uit meer dan één periode. We kunnen het verleden niet uitwissen, maar we hoeven het ook niet de enige stem te geven.",
        "image": "assets/lichtpuntje-140-nl.jpg",
        "reflection": "Een nieuwe periode begint niet altijd met een feestelijk gevoel. Soms gaan we verder terwijl er nog verdriet, onzekerheid of vermoeidheid is. Toch hoeft het verleden niet alles te bepalen wat hierna komt. We kunnen gebeurtenissen niet uitwissen, maar wel onderzoeken wat ze ons geleerd hebben en wat we niet langer willen herhalen. Vooruitkijken is daarom geen ontkenning van wat gebeurd is. Het is een keuze om ook ruimte te laten voor andere ervaringen. Daarbij mag het tempo rustig zijn; niet ieder nieuw hoofdstuk begint met een grote ommekeer. Welke gedachte uit het verleden wil je bewaren als inzicht, en welke last zou je liever niet telkens opnieuw meenemen?"
    },
    {
        "number": 141,
        "date": "2026-12-01",
        "day": "dinsdag",
        "title": "Licht delen maakt het niet kleiner",
        "theme": "Samenleven",
        "description": "Een kaars verliest haar licht niet wanneer ze een andere kaars aansteekt. Zo is het ook met kennis, aandacht en hoop. Wat je deelt, hoeft daardoor niet minder voor jezelf te worden. Soms groeit het juist, omdat een ander er op zijn beurt iets goeds mee kan doen. Misschien begint een vriendelijkere wereld wel zo eenvoudig.",
        "image": "assets/lichtpuntje-141-nl.jpg",
        "reflection": "Wanneer we kennis, aandacht of hoop delen, ontstaat er vaak iets wat niet in bezit te meten is. Iemand die een ander iets leert, verliest zijn kennis niet. Een oprecht gebaar kan ertoe leiden dat die persoon zelf weer iemand helpt. Zo kan een kleine daad verder reiken dan we ooit zullen zien. Dat betekent niet dat we onszelf moeten leeggeven; ook vrijgevigheid heeft gezonde grenzen nodig. Maar het herinnert eraan dat verbondenheid groeit wanneer mensen elkaar iets gunnen. In een wereld met veel verschillen kunnen zulke eenvoudige gebaren een gemeenschappelijke taal vormen. Wat zou jij vandaag kunnen delen dat voor een ander veel betekent, zonder dat het jou iets wezenlijks ontneemt?"
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
    description.textContent = latest.reflection || latest.description;
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
    const desc = document.createElement('p');desc.textContent=post.reflection || post.description;
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
