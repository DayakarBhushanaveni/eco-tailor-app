function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(sec => sec.classList.remove('active'));
  document.getElementById(screen).classList.add('active');
  // Highlight active nav button
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  const navBtns = {home:0,tryon:1,materials:2,profile:3};
  document.querySelectorAll('nav button')[navBtns[screen]].classList.add('active');
}

// Material detail popup
function showMaterialDetail(title, desc, src, impact) {
  document.getElementById('material-detail').classList.remove('hidden');
  document.getElementById('mat-title').textContent = title;
  document.getElementById('mat-desc').textContent = desc;
  document.getElementById('mat-source').textContent = src;
  document.getElementById('mat-impact').textContent = impact;
}
function hideMaterialDetail() {
  document.getElementById('material-detail').classList.add('hidden');
}

// Default to Home on load
showScreen('home');