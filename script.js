const workouts = {
  1: {
    title: 'SUPPORTED<br><em>PRESS</em>', description: 'Build upper-body strength with supported pressing and controlled shoulder work.',
    exercises: [
      ['Machine Chest Press', 'Chest Press Machine', '4', '8', '--'], ['Seated Dumbbell Shoulder Press', 'Dumbbells, Back-Supported Bench', '3', '10', '--'], ['Cable External Rotation', 'Cable Machine', '3', '10', '--'], ['Cuban Press', 'Light Dumbbells, Bench', '3', '10', '--'], ['Assisted Dip Machine Press', 'Assisted Dip Machine', '3', '8', '--'], ['Dumbbell Lateral Raise', 'Dumbbells, Seated', '3', '12', '--'], ['Dumbbell Lateral Raise', 'Dumbbells, Seated', '3', '8', '--'], ['Seated Dumbbell Front Raise', 'Dumbbells, Back-Supported Bench', '3', '8', '--'], ['Chest-Supported Rear-Delt Flye', 'Dumbbells, Incline Bench', '3', '8', '--'], ['Seated Cable Press', 'Cable Machine, Bench', '3', '8', '60 sec']
    ]
  },
  2: { title: 'SUPPORTED<br><em>LEG PRESS</em>', description: 'Train your lower body with supported, controlled movements and a neutral spine.', exercises: [['Seated Leg Press', 'Leg Press Machine', '4', '10', '—'], ['Goblet Squat to Box', 'Dumbbell, Box', '3', '10', '—'], ['Supported Split Squat', 'Rack, Dumbbells', '3', '8 per leg', '—'], ['Seated Calf Raise', 'Calf Raise Machine', '4', '12', '—'], ['Dead Bug', 'Exercise Mat', '3', '8 per side', '—'], ['Bird Dog', 'Exercise Mat', '3', '8 per side', '—']] },
  3: { title: 'SUPPORTED<br><em>PULL</em>', description: 'Train your back and arms with supported pulling movements and strict, pain-free control.', exercises: [['Neutral-Grip Lat Pulldown', 'Lat Pulldown Machine', '4', '8', '--'], ['Chest-Supported Dumbbell Row', 'Bench, Dumbbells', '4', '10', '--'], ['Seated Cable Row', 'Cable Machine', '3', '10', '--'], ['Incline Dumbbell Biceps Curl', 'Bench, Dumbbells', '3', '10', '--'], ['Seated Hammer Curl', 'Dumbbells', '3', '8', '--'], ['Cable Curl', 'Cable Machine', '3', '8', '--'], ['Pronated-Grip Cable Curl', 'Cable Machine, Straight Bar', '3', '8', '60 sec']] },
  4: { title: 'WARRIOR FIT<br><em>BENCH</em>', description: 'Use changing angles and drop sets to build relentless pressing endurance.', exercises: [['Warrior Fit Incline Dumbbell Bench Press', 'Bench, Dumbbells', '4', '6+6', '--'], ['Dumbbell Bench Press', 'Bench, Dumbbells', '3', '6+6+6', '--'], ['Cable Flye', '—', '4', '10', '--'], ['Close-Grip Barbell Bench Press', 'Barbell, Bench', '4', '10', '--'], ['Triceps Pressdown', 'Adjustable Cable Machine, V-Handle Attachment', '4', '8', '--'], ['Bodyweight Dip', 'Dip Station', '4', '8', '--'], ['Narrow Pushup', '—', '4', '8', '60 sec']] },
  5: { title: 'SUPPORTED<br><em>POSTERIOR CHAIN</em>', description: 'Build posterior-chain strength with supported, controlled exercises and no forced spinal loading.', exercises: [['Cable Pull-Through', 'Cable Machine, Rope', '3', '12', '—'], ['Glute Bridge', 'Exercise Mat', '3', '10', '—'], ['Supported Step-Up', 'Box, Rail', '3', '8 per leg', '—'], ['Pallof Press', 'Cable Machine, Handle', '3', '10 per side', '—'], ['Heel Tap', 'Exercise Mat', '3', '8 per side', '—']] }
};

let currentDay = 1;
let checkboxes = [];
const progressFill = document.getElementById('progressFill');
const completionText = document.getElementById('completionText');
const beginButton = document.getElementById('beginButton');
const exerciseList = document.getElementById('exerciseList');

function updateProgress() {
  const completed = checkboxes.filter((box) => box.checked).length;
  const percentage = Math.round((completed / checkboxes.length) * 100);
  progressFill.style.width = `${percentage}%`;
  completionText.textContent = percentage === 100 ? 'MISSION COMPLETE' : `${percentage}% COMPLETE`;
  beginButton.innerHTML = percentage === 100 ? 'WORKOUT COMPLETE ✓' : 'BEGIN WORKOUT <span>→</span>';
}

function loadDay(day) {
  currentDay = day;
  const workout = workouts[day];
  document.getElementById('dayLabel').textContent = `DAY ${day}`;
  document.getElementById('focusLabel').textContent = `DAY ${day} FOCUS`;
  document.getElementById('featuredTitle').innerHTML = workout.title;
  document.getElementById('featuredDescription').textContent = workout.description;
  exerciseList.innerHTML = workout.exercises.map((exercise, index) => `<label class="exercise-item"><input type="checkbox" /><span class="exercise-number">${String(index + 1).padStart(2, '0')}</span><span><strong>${exercise[0]}</strong><small>${exercise[1]} · ${exercise[2]} sets · ${exercise[3]} reps</small></span><b>${exercise[4]}</b></label>`).join('');
  checkboxes = [...exerciseList.querySelectorAll('input')];
  checkboxes.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));
  document.querySelectorAll('.day-tab').forEach((tab) => {
    const isActive = Number(tab.dataset.day) === day;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
  document.querySelectorAll('[data-day-jump]').forEach((button) => {
    const isActive = Number(button.dataset.dayJump) === day;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  updateProgress();
}

document.querySelectorAll('.day-tab').forEach((tab) => tab.addEventListener('click', () => loadDay(Number(tab.dataset.day))));
document.querySelectorAll('[data-day-jump]').forEach((button) => button.addEventListener('click', () => {
  loadDay(Number(button.dataset.dayJump));
  document.getElementById('today').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
beginButton.addEventListener('click', () => { exerciseList.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (!checkboxes.some((box) => box.checked)) checkboxes[0].focus(); });

document.getElementById('topButton').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('aj-wolverine-theme');
if (savedTheme !== 'light') document.body.classList.add('dark-mode');
function updateThemeButton() {
  const dark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('aria-pressed', String(dark));
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('aj-wolverine-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeButton();
});

loadDay(currentDay);
updateThemeButton();
