const TEAMS = {
  barca: {
    name: "Barcelona",
    home: { main: "#a50044", sleeve: "#004d98", text: "#ffd700", crest: "FCB" },
    away: { main: "#004d98", sleeve: "#a50044", text: "#ffd700", crest: "FCB" },
    third: { main: "#000000", sleeve: "#ffd700", text: "#ffd700", crest: "FCB" }
  },
  real: {
    name: "Real Madrid",
    home: { main: "#ffffff", sleeve: "#e0e0e0", text: "#001970", crest: "RM" },
    away: { main: "#001970", sleeve: "#ffffff", text: "#ffffff", crest: "RM" },
    third: { main: "#000000", sleeve: "#8a0303", text: "#ffffff", crest: "RM" }
  },
  manu: {
    name: "Manchester United",
    home: { main: "#DA291C", sleeve: "#000000", text: "#ffffff", crest: "MU" },
    away: { main: "#000000", sleeve: "#DA291C", text: "#ffffff", crest: "MU" },
    third: { main: "#ffffff", sleeve: "#DA291C", text: "#000000", crest: "MU" }
  },
  liverpool: {
    name: "Liverpool",
    home: { main: "#C8102E", sleeve: "#00B2A9", text: "#ffffff", crest: "LFC" },
    away: { main: "#00B2A9", sleeve: "#C8102E", text: "#ffffff", crest: "LFC" },
    third: { main: "#000000", sleeve: "#C8102E", text: "#ffffff", crest: "LFC" }
  },
  juve: {
    name: "Juventus",
    home: { main: "#ffffff", sleeve: "#000000", text: "#000000", crest: "JUV" },
    away: { main: "#000000", sleeve: "#ffffff", text: "#ffffff", crest: "JUV" },
    third: { main: "#8a0303", sleeve: "#F0E800", text: "#ffffff", crest: "JUV" }
  },
  chelsea: {
    name: "Chelsea",
    home: { main: "#034694", sleeve: "#0a0a0a", text: "#ffffff", crest: "CFC" },
    away: { main: "#ffffff", sleeve: "#034694", text: "#034694", crest: "CFC" },
    third: { main: "#0a0a0a", sleeve: "#034694", text: "#ffffff", crest: "CFC" }
  },
  psg: {
    name: "Paris Saint-Germain",
    home: { main: "#004170", sleeve: "#da0b2d", text: "#ffffff", crest: "PSG" },
    away: { main: "#ffffff", sleeve: "#004170", text: "#004170", crest: "PSG" },
    third: { main: "#000000", sleeve: "#da0b2d", text: "#ffffff", crest: "PSG" }
  },
  bayern: {
    name: "Bayern Munich",
    home: { main: "#DC052D", sleeve: "#0066B2", text: "#ffffff", crest: "FCB" },
    away: { main: "#0066B2", sleeve: "#DC052D", text: "#ffffff", crest: "FCB" },
    third: { main: "#000000", sleeve: "#DC052D", text: "#ffffff", crest: "FCB" }
  }
};

// DOM elementlari
const nameInput = document.getElementById('playerName');
const numberInput = document.getElementById('playerNumber');
const teamSelect = document.getElementById('teamSelect');
const kitStyleSelect = document.getElementById('kitStyle');
const viewFrontBtn = document.getElementById('viewFrontBtn');
const viewBackBtn = document.getElementById('viewBackBtn');
const downloadBtn = document.getElementById('downloadBtn');
const randomBtn = document.getElementById('randomBtn');
const kit3d = document.getElementById('kit3d');
const kitCrest = document.getElementById('kitCrest');
const kitName = document.getElementById('kitName');
const kitNumber = document.getElementById('kitNumber');
const kitFrontNumber = document.getElementById('kitFrontNumber');
const root = document.documentElement;

// ism uzunligini hisoblab shriftni moslash
function fitNameFont(txt) {
  const len = txt.length;
  let size = 24;
  if (len > 12) size = 20;
  if (len > 16) size = 18;
  if (len > 20) size = 16;
  if (len > 24) size = 14;
  kitName.style.fontSize = size + 'px';
}

// Formani yangilash
function updateKit() {
  const rawName = nameInput.value.trim(); // foydalanuvchi nima yozsa — o‘sha
  const name = rawName || "ISM";
  const number = numberInput.value.trim() || "10";
  const teamId = teamSelect.value;
  const kitStyle = kitStyleSelect.value;
  
  const team = TEAMS[teamId];
  const kit = team[kitStyle];
  
  // Ranglarni o'rnatish
  root.style.setProperty('--kit-main-color', kit.main);
  root.style.setProperty('--kit-sleeve-color', kit.sleeve);
  root.style.setProperty('--kit-collar-color', kit.sleeve);
  root.style.setProperty('--kit-text-color', kit.text);
  root.style.setProperty('--kit-number-color', kit.text);
  
  // Matnlarni o'rnatish
  kitName.textContent = name;          // text-transform CSS orqali
  kitNumber.textContent = number;
  kitFrontNumber.textContent = number;
  kitCrest.textContent = kit.crest;

  fitNameFont(name);
}

// Ko'rinishni o'zgartirish
viewFrontBtn.addEventListener('click', () => {
  kit3d.classList.remove('show-back');
  viewFrontBtn.classList.add('active');
  viewBackBtn.classList.remove('active');
});

viewBackBtn.addEventListener('click', () => {
  kit3d.classList.add('show-back');
  viewBackBtn.classList.add('active');
  viewFrontBtn.classList.remove('active');
});

// Inputlarni tinglash (jonli)
nameInput.addEventListener('input', updateKit);
numberInput.addEventListener('input', updateKit);
teamSelect.addEventListener('change', updateKit);
kitStyleSelect.addEventListener('change', updateKit);

// Tasodifiy forma
randomBtn.addEventListener('click', () => {
  const teams = Object.keys(TEAMS);
  const randomTeam = teams[Math.floor(Math.random() * teams.length)];
  const styles = ['home', 'away', 'third'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  
  teamSelect.value = randomTeam;
  kitStyleSelect.value = randomStyle;
  
  // Endi ismni foydalanuvchi yozganicha qoldiramiz! 
  // (Agar baribir tasodifiy ism kerak bo‘lsa, pastdagi kodni qayta yoqing.)
  /*
  const names = ["MESSI", "RONALDO", "NEYMAR", "MBAPPE", "HAALAND", "BENZEMA", "LEWANDOWSKI", "SALAH"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  nameInput.value = randomName;
  */

  const randomNumber = Math.floor(Math.random() * 99) + 1;
  numberInput.value = randomNumber;
  
  updateKit();
});

// Yuklab olish
downloadBtn.addEventListener('click', () => {
  alert("Yuklab olish funksiyasi ishga tushirildi!");
});

// Dastlabki yuklash
updateKit();
