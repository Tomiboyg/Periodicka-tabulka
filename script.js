/* ============================================================
   Prvky — periodická tabuľka prvkov
   ------------------------------------------------------------
   Dáta sú priamo v tomto súbore (žiadne fetch()), aby stránka
   fungovala aj z file:// aj na GitHub Pages.

   Jeden prvok je pole, kvôli veľkosti súboru:
   [ protónové číslo, značka, latinský názov, slovenský názov,
     relatívna atómová hmotnosť, skupina, perióda, kategória,
     [oxidačné čísla], najčastejšie oxidačné číslo ]

   Skupina 0 = lantanoid / aktinoid (kreslia sa do spodných radov).
   ============================================================ */

const KATEGORIE = {
  alkalicky:     { nazov: "Alkalické kovy",         farba: "var(--k-alkalicky)" },
  zemin:         { nazov: "Kovy alkalických zemín", farba: "var(--k-zemin)" },
  prechodny:     { nazov: "Prechodné kovy",         farba: "var(--k-prechodny)" },
  postprechodny: { nazov: "Post-prechodné kovy",    farba: "var(--k-postprechodny)" },
  polokov:       { nazov: "Polokovy",               farba: "var(--k-polokov)" },
  nekov:         { nazov: "Nekovy",                 farba: "var(--k-nekov)" },
  halogen:       { nazov: "Halogény",               farba: "var(--k-halogen)" },
  vzacny:        { nazov: "Vzácne plyny",           farba: "var(--k-vzacny)" },
  lantanoid:     { nazov: "Lantanoidy",             farba: "var(--k-lantanoid)" },
  aktinoid:      { nazov: "Aktinoidy",              farba: "var(--k-aktinoid)" }
};

const SUROVE = [
[1,"H","Hydrogenium","Vodík",1.008,1,1,"nekov",[-1,1],1],
[2,"He","Helium","Hélium",4.003,18,1,"vzacny",[0],0],
[3,"Li","Lithium","Lítium",6.94,1,2,"alkalicky",[1],1],
[4,"Be","Beryllium","Berýlium",9.012,2,2,"zemin",[2],2],
[5,"B","Borum","Bór",10.81,13,2,"polokov",[3],3],
[6,"C","Carboneum","Uhlík",12.011,14,2,"nekov",[-4,2,4],4],
[7,"N","Nitrogenium","Dusík",14.007,15,2,"nekov",[-3,1,2,3,4,5],-3],
[8,"O","Oxygenium","Kyslík",15.999,16,2,"nekov",[-2,-1,2],-2],
[9,"F","Fluorum","Fluór",18.998,17,2,"halogen",[-1],-1],
[10,"Ne","Neon","Neón",20.180,18,2,"vzacny",[0],0],
[11,"Na","Natrium","Sodík",22.990,1,3,"alkalicky",[1],1],
[12,"Mg","Magnesium","Horčík",24.305,2,3,"zemin",[2],2],
[13,"Al","Aluminium","Hliník",26.982,13,3,"postprechodny",[3],3],
[14,"Si","Silicium","Kremík",28.085,14,3,"polokov",[-4,4],4],
[15,"P","Phosphorus","Fosfor",30.974,15,3,"nekov",[-3,3,5],5],
[16,"S","Sulphur","Síra",32.06,16,3,"nekov",[-2,2,4,6],6],
[17,"Cl","Chlorum","Chlór",35.45,17,3,"halogen",[-1,1,3,5,7],-1],
[18,"Ar","Argon","Argón",39.948,18,3,"vzacny",[0],0],
[19,"K","Kalium","Draslík",39.098,1,4,"alkalicky",[1],1],
[20,"Ca","Calcium","Vápnik",40.078,2,4,"zemin",[2],2],
[21,"Sc","Scandium","Skandium",44.956,3,4,"prechodny",[3],3],
[22,"Ti","Titanium","Titán",47.867,4,4,"prechodny",[2,3,4],4],
[23,"V","Vanadium","Vanád",50.942,5,4,"prechodny",[2,3,4,5],5],
[24,"Cr","Chromium","Chróm",51.996,6,4,"prechodny",[2,3,6],3],
[25,"Mn","Manganum","Mangán",54.938,7,4,"prechodny",[2,3,4,6,7],2],
[26,"Fe","Ferrum","Železo",55.845,8,4,"prechodny",[2,3],3],
[27,"Co","Cobaltum","Kobalt",58.933,9,4,"prechodny",[2,3],2],
[28,"Ni","Niccolum","Nikel",58.693,10,4,"prechodny",[2,3],2],
[29,"Cu","Cuprum","Meď",63.546,11,4,"prechodny",[1,2],2],
[30,"Zn","Zincum","Zinok",65.38,12,4,"prechodny",[2],2],
[31,"Ga","Gallium","Gálium",69.723,13,4,"postprechodny",[3],3],
[32,"Ge","Germanium","Germánium",72.630,14,4,"polokov",[2,4],4],
[33,"As","Arsenicum","Arzén",74.922,15,4,"polokov",[-3,3,5],3],
[34,"Se","Selenium","Selén",78.971,16,4,"nekov",[-2,4,6],4],
[35,"Br","Bromum","Bróm",79.904,17,4,"halogen",[-1,1,3,5,7],-1],
[36,"Kr","Krypton","Kryptón",83.798,18,4,"vzacny",[0,2],0],
[37,"Rb","Rubidium","Rubídium",85.468,1,5,"alkalicky",[1],1],
[38,"Sr","Strontium","Stroncium",87.62,2,5,"zemin",[2],2],
[39,"Y","Yttrium","Ytrium",88.906,3,5,"prechodny",[3],3],
[40,"Zr","Zirconium","Zirkónium",91.224,4,5,"prechodny",[4],4],
[41,"Nb","Niobium","Niób",92.906,5,5,"prechodny",[3,5],5],
[42,"Mo","Molybdaenum","Molybdén",95.95,6,5,"prechodny",[2,3,4,5,6],6],
[43,"Tc","Technetium","Technécium",98,7,5,"prechodny",[4,7],7],
[44,"Ru","Ruthenium","Ruténium",101.07,8,5,"prechodny",[2,3,4,6,8],3],
[45,"Rh","Rhodium","Ródium",102.906,9,5,"prechodny",[1,3],3],
[46,"Pd","Palladium","Paládium",106.42,10,5,"prechodny",[2,4],2],
[47,"Ag","Argentum","Striebro",107.868,11,5,"prechodny",[1],1],
[48,"Cd","Cadmium","Kadmium",112.414,12,5,"prechodny",[2],2],
[49,"In","Indium","Indium",114.818,13,5,"postprechodny",[1,3],3],
[50,"Sn","Stannum","Cín",118.710,14,5,"postprechodny",[2,4],4],
[51,"Sb","Stibium","Antimón",121.760,15,5,"polokov",[-3,3,5],3],
[52,"Te","Tellurium","Telúr",127.60,16,5,"polokov",[-2,4,6],4],
[53,"I","Iodum","Jód",126.904,17,5,"halogen",[-1,1,3,5,7],-1],
[54,"Xe","Xenon","Xenón",131.293,18,5,"vzacny",[0,2,4,6,8],0],
[55,"Cs","Caesium","Cézium",132.905,1,6,"alkalicky",[1],1],
[56,"Ba","Baryum","Bárium",137.327,2,6,"zemin",[2],2],
[57,"La","Lanthanum","Lantán",138.905,0,6,"lantanoid",[3],3],
[58,"Ce","Cerium","Cér",140.116,0,6,"lantanoid",[3,4],3],
[59,"Pr","Praseodymium","Prazeodým",140.908,0,6,"lantanoid",[3],3],
[60,"Nd","Neodymium","Neodým",144.242,0,6,"lantanoid",[3],3],
[61,"Pm","Promethium","Prométium",145,0,6,"lantanoid",[3],3],
[62,"Sm","Samarium","Samárium",150.36,0,6,"lantanoid",[2,3],3],
[63,"Eu","Europium","Európium",151.964,0,6,"lantanoid",[2,3],3],
[64,"Gd","Gadolinium","Gadolínium",157.25,0,6,"lantanoid",[3],3],
[65,"Tb","Terbium","Terbium",158.925,0,6,"lantanoid",[3,4],3],
[66,"Dy","Dysprosium","Dysprózium",162.500,0,6,"lantanoid",[3],3],
[67,"Ho","Holmium","Holmium",164.930,0,6,"lantanoid",[3],3],
[68,"Er","Erbium","Erbium",167.259,0,6,"lantanoid",[3],3],
[69,"Tm","Thulium","Túlium",168.934,0,6,"lantanoid",[3],3],
[70,"Yb","Ytterbium","Yterbium",173.045,0,6,"lantanoid",[2,3],3],
[71,"Lu","Lutetium","Lutécium",174.967,0,6,"lantanoid",[3],3],
[72,"Hf","Hafnium","Hafnium",178.49,4,6,"prechodny",[4],4],
[73,"Ta","Tantalum","Tantal",180.948,5,6,"prechodny",[5],5],
[74,"W","Wolframium","Volfrám",183.84,6,6,"prechodny",[4,6],6],
[75,"Re","Rhenium","Rénium",186.207,7,6,"prechodny",[4,7],7],
[76,"Os","Osmium","Osmium",190.23,8,6,"prechodny",[3,4,8],4],
[77,"Ir","Iridium","Irídium",192.217,9,6,"prechodny",[3,4],4],
[78,"Pt","Platinum","Platina",195.084,10,6,"prechodny",[2,4],4],
[79,"Au","Aurum","Zlato",196.967,11,6,"prechodny",[1,3],3],
[80,"Hg","Hydrargyrum","Ortuť",200.592,12,6,"prechodny",[1,2],2],
[81,"Tl","Thallium","Tálium",204.38,13,6,"postprechodny",[1,3],1],
[82,"Pb","Plumbum","Olovo",207.2,14,6,"postprechodny",[2,4],2],
[83,"Bi","Bismuthum","Bizmut",208.980,15,6,"postprechodny",[3,5],3],
[84,"Po","Polonium","Polónium",209,16,6,"polokov",[-2,2,4],4],
[85,"At","Astatium","Astát",210,17,6,"halogen",[-1,1],-1],
[86,"Rn","Radon","Radón",222,18,6,"vzacny",[0,2],0],
[87,"Fr","Francium","Francium",223,1,7,"alkalicky",[1],1],
[88,"Ra","Radium","Rádium",226,2,7,"zemin",[2],2],
[89,"Ac","Actinium","Aktínium",227,0,7,"aktinoid",[3],3],
[90,"Th","Thorium","Tórium",232.038,0,7,"aktinoid",[4],4],
[91,"Pa","Protactinium","Protaktínium",231.036,0,7,"aktinoid",[4,5],5],
[92,"U","Uranium","Urán",238.029,0,7,"aktinoid",[3,4,5,6],6],
[93,"Np","Neptunium","Neptúnium",237,0,7,"aktinoid",[3,4,5,6],5],
[94,"Pu","Plutonium","Plutónium",244,0,7,"aktinoid",[3,4,5,6],4],
[95,"Am","Americium","Amerícium",243,0,7,"aktinoid",[3,4,5,6],3],
[96,"Cm","Curium","Curium",247,0,7,"aktinoid",[3,4],3],
[97,"Bk","Berkelium","Berkélium",247,0,7,"aktinoid",[3,4],3],
[98,"Cf","Californium","Kalifornium",251,0,7,"aktinoid",[3],3],
[99,"Es","Einsteinium","Einsteinium",252,0,7,"aktinoid",[3],3],
[100,"Fm","Fermium","Fermium",257,0,7,"aktinoid",[3],3],
[101,"Md","Mendelevium","Mendelevium",258,0,7,"aktinoid",[2,3],3],
[102,"No","Nobelium","Nobelium",259,0,7,"aktinoid",[2,3],2],
[103,"Lr","Lawrencium","Lawrencium",266,0,7,"aktinoid",[3],3],
[104,"Rf","Rutherfordium","Ruterfordium",267,4,7,"prechodny",[4],4],
[105,"Db","Dubnium","Dubnium",268,5,7,"prechodny",[5],5],
[106,"Sg","Seaborgium","Seaborgium",269,6,7,"prechodny",[6],6],
[107,"Bh","Bohrium","Bohrium",270,7,7,"prechodny",[7],7],
[108,"Hs","Hassium","Hasium",277,8,7,"prechodny",[8],8],
[109,"Mt","Meitnerium","Meitnerium",278,9,7,"prechodny",[3],3],
[110,"Ds","Darmstadtium","Darmstadtium",281,10,7,"prechodny",[4],4],
[111,"Rg","Roentgenium","Roentgenium",282,11,7,"prechodny",[3],3],
[112,"Cn","Copernicium","Kopernicium",285,12,7,"prechodny",[2],2],
[113,"Nh","Nihonium","Nihonium",286,13,7,"postprechodny",[1],1],
[114,"Fl","Flerovium","Flerovium",289,14,7,"postprechodny",[2],2],
[115,"Mc","Moscovium","Moskovium",290,15,7,"postprechodny",[1],1],
[116,"Lv","Livermorium","Livermorium",293,16,7,"postprechodny",[2],2],
[117,"Ts","Tennessinum","Tennessín",294,17,7,"halogen",[-1],-1],
[118,"Og","Oganesson","Oganesón",294,18,7,"vzacny",[0],0]
];

/* Prevod na čitateľné objekty */
const PRVKY = SUROVE.map(p => ({
  cislo: p[0], znacka: p[1], latinsky: p[2], slovensky: p[3],
  hmotnost: p[4], skupina: p[5], perioda: p[6], kategoria: p[7],
  ox: p[8], hlavne: p[9]
}));

/* ============================================================
   POMOCNÉ FUNKCIE
   ============================================================ */

const $ = s => document.querySelector(s);
const farbaKat = k => KATEGORIE[k].farba;

/* Oxidačné číslo so znamienkom, mínus je typografické (−) */
const ox = n => n === 0 ? "0" : (n > 0 ? "+" : "−") + Math.abs(n);

/* Bez diakritiky, aby "cezium" našlo "cézium" */
const bezDiakritiky = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const nahodne = pole => pole[Math.floor(Math.random() * pole.length)];

function zamiesat(pole) {
  const a = pole.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================================================
   VYKRESĽOVANIE
   ============================================================ */

function vykresliTabulku() {
  const kusy = PRVKY.map(p => {
    let stlpec, riadok;
    if (p.skupina === 0) {
      const zaciatok = p.kategoria === "lantanoid" ? 57 : 89;
      stlpec = 4 + (p.cislo - zaciatok);
      riadok = p.kategoria === "lantanoid" ? 9 : 10;
    } else {
      stlpec = p.skupina;
      riadok = p.perioda;
    }
    return `<button class="prvok" type="button" data-cislo="${p.cislo}"
      style="--farba:${farbaKat(p.kategoria)};grid-column:${stlpec};grid-row:${riadok}"
      aria-label="${p.slovensky}, ${p.znacka}, protónové číslo ${p.cislo}">
      <span class="cislo">${p.cislo}</span>
      <span class="ox">${ox(p.hlavne)}</span>
      <span class="znacka">${p.znacka}</span>
      <span class="nazov">${p.slovensky}</span>
    </button>`;
  });

  /* zástupné miesta tam, odkiaľ sú lantanoidy a aktinoidy vybraté */
  kusy.push(`<div class="zastupca" style="--farba:var(--k-lantanoid);grid-column:3;grid-row:6">57–71</div>`);
  kusy.push(`<div class="zastupca" style="--farba:var(--k-aktinoid);grid-column:3;grid-row:7">89–103</div>`);
  kusy.push(`<div class="rad-popis" style="grid-column:3;grid-row:9">57–71</div>`);
  kusy.push(`<div class="rad-popis" style="grid-column:3;grid-row:10">89–103</div>`);

  $("#tabulka").innerHTML = kusy.join("");
}

function vykresliZoznam(prvky) {
  if (!prvky.length) {
    $("#zoznam").innerHTML = `<p class="prazdno">Nič sa nenašlo. Skús inú značku, názov alebo číslo.</p>`;
    return;
  }
  $("#zoznam").innerHTML = prvky.map(p => `
    <button class="riadok" type="button" data-cislo="${p.cislo}" style="--farba:${farbaKat(p.kategoria)}">
      <span class="r-znacka">${p.znacka}</span>
      <span>
        <span class="r-nazov">${p.slovensky}</span><br>
        <span class="r-latin">${p.latinsky} · ${p.cislo}</span>
      </span>
      <span class="r-ox">${p.ox.map(ox).join(" ")}</span>
    </button>`).join("");
}

function vykresliLegenduAFiltre() {
  $("#legenda").innerHTML = Object.values(KATEGORIE)
    .map(v => `<span style="--farba:${v.farba}"><i></i>${v.nazov}</span>`).join("");

  $("#kategorie-filtre").innerHTML = Object.entries(KATEGORIE)
    .map(([k, v]) => `<button class="kat-tl" type="button" data-kat="${k}" style="--farba:${v.farba}">
      <i class="bodka"></i>${v.nazov}</button>`).join("");
}

/* ============================================================
   HĽADANIE A FILTRE
   ============================================================ */

const aktivneKategorie = new Set();
let dopyt = "";

function vyhovuje(p) {
  if (aktivneKategorie.size && !aktivneKategorie.has(p.kategoria)) return false;
  if (!dopyt) return true;
  const q = bezDiakritiky(dopyt);
  return bezDiakritiky(p.slovensky).includes(q)
      || bezDiakritiky(p.latinsky).includes(q)
      || p.znacka.toLowerCase().startsWith(q)
      || String(p.cislo) === q;
}

function aplikujFilter() {
  const najdene = PRVKY.filter(vyhovuje);
  const jeFilter = dopyt !== "" || aktivneKategorie.size > 0;

  /* v tabuľke sa nevyhovujúce dlaždice iba stlmia, nech sa nerozpadne tvar */
  document.querySelectorAll(".prvok").forEach(el => {
    const p = PRVKY[Number(el.dataset.cislo) - 1];
    el.classList.toggle("stlmeny", jeFilter && !vyhovuje(p));
  });

  vykresliZoznam(najdene);

  $("#pocet-vysledkov").textContent = jeFilter
    ? (najdene.length ? `Zodpovedá ${najdene.length} zo 118 prvkov.` : "Nič sa nenašlo.")
    : "";
  $("#zmazat-hladanie").hidden = dopyt === "";
}

$("#hladanie").addEventListener("input", e => {
  dopyt = e.target.value.trim();
  aplikujFilter();
});

$("#zmazat-hladanie").addEventListener("click", () => {
  dopyt = "";
  $("#hladanie").value = "";
  $("#hladanie").focus();
  aplikujFilter();
});

$("#kategorie-filtre").addEventListener("click", e => {
  const tl = e.target.closest(".kat-tl");
  if (!tl) return;
  const k = tl.dataset.kat;
  aktivneKategorie.has(k) ? aktivneKategorie.delete(k) : aktivneKategorie.add(k);
  tl.classList.toggle("aktivny");
  aplikujFilter();
});

/* ============================================================
   DETAIL PRVKU
   ============================================================ */

const prekrytie = $("#prekrytie");
let poslednyFokus = null;

function otvorDetail(cislo) {
  const p = PRVKY[cislo - 1];
  poslednyFokus = document.activeElement;

  const oxHtml = p.ox.map(n => n === p.hlavne ? `<b>${ox(n)}</b>` : `<em>${ox(n)}</em>`).join("");
  const skupina = p.skupina === 0
    ? (p.kategoria === "lantanoid" ? "lantanoidy" : "aktinoidy")
    : p.skupina;

  $("#detail-obsah").innerHTML = `
    <div class="d-hlava">
      <div class="d-dlazdica" style="--farba:${farbaKat(p.kategoria)}">
        <span class="d-znacka">${p.znacka}</span>
        <span class="d-cislo">${p.cislo}</span>
      </div>
      <div>
        <h2 id="detail-nazov">${p.slovensky}</h2>
        <div class="d-latin">${p.latinsky}</div>
      </div>
    </div>
    <div class="d-riadky">
      <div class="d-riadok"><span>Protónové číslo</span><span>${p.cislo}</span></div>
      <div class="d-riadok"><span>Relatívna atómová hmotnosť</span><span>${p.hmotnost}</span></div>
      <div class="d-riadok"><span>Skupina</span><span>${skupina}</span></div>
      <div class="d-riadok"><span>Perióda</span><span>${p.perioda}</span></div>
      <div class="d-riadok"><span>Kategória</span><span>${KATEGORIE[p.kategoria].nazov}</span></div>
      <div class="d-riadok"><span>Oxidačné čísla</span><span class="ox-zoznam">${oxHtml}</span></div>
    </div>`;

  prekrytie.hidden = false;
  $("#zavriet").focus();
}

function zavriDetail() {
  prekrytie.hidden = true;
  if (poslednyFokus) poslednyFokus.focus();
}

document.addEventListener("click", e => {
  const dl = e.target.closest(".prvok, .riadok");
  if (dl) otvorDetail(Number(dl.dataset.cislo));
});

$("#zavriet").addEventListener("click", zavriDetail);
prekrytie.addEventListener("click", e => { if (e.target === prekrytie) zavriDetail(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !prekrytie.hidden) zavriDetail();
});

/* ============================================================
   PREPÍNANIE REŽIMOV A ZOBRAZENÍ
   ============================================================ */

document.querySelectorAll(".prep-tl").forEach(tl => {
  tl.addEventListener("click", () => {
    document.querySelectorAll(".prep-tl").forEach(x => x.classList.remove("aktivny"));
    tl.classList.add("aktivny");
    const test = tl.dataset.rezim === "test";
    $("#pohlad-ucenie").hidden = test;
    $("#pohlad-test").hidden = !test;
    $("#legenda").hidden = test;
    window.scrollTo({ top: 0 });
  });
});

document.querySelectorAll(".pohlad-tl").forEach(tl => {
  tl.addEventListener("click", () => {
    document.querySelectorAll(".pohlad-tl").forEach(x => x.classList.remove("aktivny"));
    tl.classList.add("aktivny");
    const tabulka = tl.dataset.pohlad === "tabulka";
    $("#tabulka-obal").hidden = !tabulka;
    $("#zoznam").hidden = tabulka;
  });
});

/* ============================================================
   TEST
   ------------------------------------------------------------
   Otázky sa vygenerujú naraz pri štarte, aby sa v jednom teste
   neopakoval ten istý prvok v tom istom type otázky.
   ============================================================ */

const KLUC = "prvky-rekordy-v2";
let test = null;

function zasoba() {
  const limit = Number($("#test-rozsah").value);
  return PRVKY.filter(p => p.cislo <= limit);
}

/* Vytvorí jednu otázku daného typu pre daný prvok */
function otazkaPre(typ, p, vsetky) {
  const ini = vsetky.filter(x => x.cislo !== p.cislo);
  const dlazdica = (hlavne, vedlajsie) => `
    <div class="velka-dlazdica" style="--farba:${farbaKat(p.kategoria)}">
      <div class="vd-hlavne">${hlavne}</div>
      <div class="vd-vedlajsie">${vedlajsie}</div>
    </div>`;

  switch (typ) {
    case "znacka-nazov":
      return {
        popis: "Ktorý prvok má túto značku?",
        zadanie: dlazdica(p.znacka, `protónové číslo ${p.cislo}`),
        spravna: p.slovensky,
        zle: zamiesat(ini).slice(0, 3).map(x => x.slovensky), prvok: p, typ
      };
    case "nazov-znacka":
      return {
        popis: "Aká je značka tohto prvku?",
        zadanie: `<div class="vd-text">${p.slovensky}</div>`,
        spravna: p.znacka,
        zle: zamiesat(ini).slice(0, 3).map(x => x.znacka), prvok: p, typ
      };
    case "latin-nazov":
      return {
        popis: "Ako sa tento prvok volá po slovensky?",
        zadanie: `<div class="vd-text"><em>${p.latinsky}</em></div>`,
        spravna: p.slovensky,
        zle: zamiesat(ini).slice(0, 3).map(x => x.slovensky), prvok: p, typ
      };
    case "nazov-latin":
      return {
        popis: "Ako znie latinský názov tohto prvku?",
        zadanie: `<div class="vd-text">${p.slovensky}</div>`,
        spravna: p.latinsky,
        zle: zamiesat(ini).slice(0, 3).map(x => x.latinsky), prvok: p, typ
      };
    default: { /* oxidacne */
      const moznecisla = [-4,-3,-2,-1,1,2,3,4,5,6,7,8].filter(n => !p.ox.includes(n));
      return {
        popis: "Ktoré oxidačné číslo môže mať tento prvok?",
        zadanie: dlazdica(p.znacka, p.slovensky),
        spravna: ox(nahodne(p.ox)),
        zle: zamiesat(moznecisla).slice(0, 3).map(ox), prvok: p, typ
      };
    }
  }
}

function pripravOtazky() {
  const typVolba = $("#test-typ").value;
  const pocet = Number($("#test-pocet").value);
  const vsetky = zasoba();
  const typy = ["znacka-nazov", "nazov-znacka", "latin-nazov", "nazov-latin", "oxidacne"];

  const vybrane = zamiesat(vsetky).slice(0, pocet);
  /* ak je prvkov menej než otázok, doplníme ďalším zamiešaním */
  while (vybrane.length < pocet) vybrane.push(nahodne(vsetky));

  return vybrane.map(p => {
    const typ = typVolba === "mix" ? nahodne(typy) : typVolba;
    const o = otazkaPre(typ, p, vsetky);
    o.moznosti = zamiesat([o.spravna, ...o.zle]);
    return o;
  });
}

/* ---------- rekordy ---------- */

function nacitajRekordy() {
  try { return JSON.parse(localStorage.getItem(KLUC)) || {}; } catch { return {}; }
}

const klucTestu = () => `${$("#test-typ").value}|${$("#test-rozsah").value}|${$("#test-pocet").value}`;

function zobrazRekord() {
  const r = nacitajRekordy()[klucTestu()];
  $("#test-rekord").textContent = r
    ? `Tvoj najlepší výsledok v tomto nastavení: ${r} %`
    : "V tomto nastavení zatiaľ nemáš výsledok.";
}

function ulozRekord(percenta) {
  const r = nacitajRekordy();
  const k = klucTestu();
  if (!r[k] || percenta > r[k]) {
    r[k] = percenta;
    try { localStorage.setItem(KLUC, JSON.stringify(r)); } catch {}
  }
}

/* ---------- priebeh ---------- */

function ukazObrazovku(ktora) {
  $("#test-uvod").hidden = ktora !== "uvod";
  $("#test-beh").hidden = ktora !== "beh";
  $("#test-vysledok").hidden = ktora !== "vysledok";
}

function vykresliOtazku() {
  const o = test.otazky[test.index];

  $("#postup-vypln").style.width = (test.index / test.otazky.length * 100) + "%";
  $("#postup-cislo").textContent = `Otázka ${test.index + 1} z ${test.otazky.length}`;
  $("#postup-skore").textContent = `${test.spravnych} správnych`;

  $("#zadanie-popis").textContent = o.popis;
  $("#zadanie").innerHTML = o.zadanie;
  $("#moznosti").innerHTML = o.moznosti
    .map(m => `<button class="moznost" type="button" data-hodnota="${m}">${m}</button>`).join("");

  $("#odozva").textContent = "";
  $("#odozva").className = "odozva";
  $("#test-dalej").hidden = true;
}

function odpovedz(tl) {
  const o = test.otazky[test.index];
  const p = o.prvok;
  const zvolena = tl.dataset.hodnota;
  const spravne = zvolena === o.spravna;

  document.querySelectorAll(".moznost").forEach(b => {
    b.disabled = true;
    if (b.dataset.hodnota === o.spravna) {
      b.classList.add("spravne");
      b.insertAdjacentHTML("beforeend", `<span class="znak">✓</span>`);
    }
  });

  const odozva = $("#odozva");
  if (spravne) {
    test.spravnych++;
    odozva.className = "odozva ok";
    odozva.textContent = o.typ === "oxidacne"
      ? `Správne. ${p.slovensky} má oxidačné čísla ${p.ox.map(ox).join(", ")}.`
      : `Správne. ${p.znacka} — ${p.slovensky}, latinsky ${p.latinsky}, protónové číslo ${p.cislo}.`;
  } else {
    tl.classList.add("nespravne");
    tl.insertAdjacentHTML("beforeend", `<span class="znak">✕</span>`);
    odozva.className = "odozva chyba";
    odozva.textContent = o.typ === "oxidacne"
      ? `Nie. ${p.slovensky} má oxidačné čísla ${p.ox.map(ox).join(", ")}.`
      : `Nie. Správne je ${o.spravna}. ${p.znacka} — ${p.slovensky}, latinsky ${p.latinsky}.`;
    test.chyby.push({ otazka: o, zvolena });
  }

  $("#postup-skore").textContent = `${test.spravnych} správnych`;
  $("#postup-vypln").style.width = ((test.index + 1) / test.otazky.length * 100) + "%";
  $("#test-dalej").hidden = false;
  $("#test-dalej").textContent = test.index + 1 === test.otazky.length ? "Zobraziť výsledok" : "Ďalšia otázka";
  $("#test-dalej").focus();
}

function ukazVysledok() {
  const spolu = test.otazky.length;
  const percenta = Math.round(test.spravnych / spolu * 100);
  ulozRekord(percenta);

  $("#vysledok-kruh").style.setProperty("--podiel", percenta + "%");
  $("#vysledok-percenta").textContent = percenta + " %";
  $("#vysledok-nadpis").textContent =
    percenta === 100 ? "Všetko správne." :
    percenta >= 80 ? "Veľmi dobré." :
    percenta >= 50 ? "Ide to, ešte to dolaď." : "Toto chce ešte opakovanie.";
  $("#vysledok-text").textContent = `${test.spravnych} z ${spolu} otázok správne.`;

  $("#chyby").innerHTML = test.chyby.length
    ? `<h3>Čo si nevedel</h3>` + test.chyby.map(({ otazka, zvolena }) => {
        const p = otazka.prvok;
        return `<div class="chyba-riadok">
          <b>${otazka.spravna}</b> — ${p.znacka}, ${p.slovensky} (${p.latinsky}), č. ${p.cislo}
          <br><em>tvoja odpoveď: ${zvolena}</em>
        </div>`;
      }).join("")
    : "";

  ukazObrazovku("vysledok");
}

function spustiTest() {
  test = { otazky: pripravOtazky(), index: 0, spravnych: 0, chyby: [] };
  ukazObrazovku("beh");
  vykresliOtazku();
}

$("#test-start").addEventListener("click", spustiTest);
$("#test-znova").addEventListener("click", spustiTest);
$("#test-spat").addEventListener("click", () => { zobrazRekord(); ukazObrazovku("uvod"); });
$("#test-ukoncit").addEventListener("click", () => { zobrazRekord(); ukazObrazovku("uvod"); });

$("#moznosti").addEventListener("click", e => {
  const tl = e.target.closest(".moznost");
  if (tl && !tl.disabled) odpovedz(tl);
});

$("#test-dalej").addEventListener("click", () => {
  test.index++;
  if (test.index >= test.otazky.length) ukazVysledok();
  else vykresliOtazku();
});

$("#test-typ").addEventListener("change", zobrazRekord);
$("#test-rozsah").addEventListener("change", zobrazRekord);
$("#test-pocet").addEventListener("change", zobrazRekord);

/* ============================================================
   ŠTART
   ============================================================ */

vykresliTabulku();
vykresliZoznam(PRVKY);
vykresliLegenduAFiltre();
aplikujFilter();
zobrazRekord();
