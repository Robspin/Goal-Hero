const ham = document.getElementById('ham');
const dropdown = document.getElementById('dropdown');
const theme = document.getElementById('theme');
const color = document.getElementById('color');
const stepsContainer = document.querySelector('.subgoal-container');
const elem = document.getElementById('myBar');
const hero = document.getElementById('hero');
const newGoalLink = document.getElementById('newGoal');

// Get info from localStorage
const myGoal = JSON.parse(localStorage.getItem('myGoal'));

let steps = [];
let idCounter = 0;
let preset = 20;

// Nav bar
ham.addEventListener('click', () => dropdown.classList.toggle('show'));

// Create text from goaldata
function updateText() {
   let idArr = steps.map(steps => steps.id);
   let stepsArr = steps.map(steps => steps.name);

   stepsArr.forEach(string => {
      const item = document.createElement('div');
      item.innerHTML = `
      <i style="font-size:200%" id="${idArr[idCounter]}"></i><h2>${string}</h2>
         `;
      stepsContainer.appendChild(item);
      item.classList.add('subgoal-box');

      idCounter++;
   });
}

function setMain() {
   document.getElementById('main-title').innerText = myGoal[0].name;
   if (!localStorage.getItem('steps')) {
      steps = myGoal;
      steps.shift();
      localStorage.setItem('steps', JSON.stringify(steps));
   } else {
      steps = JSON.parse(localStorage.getItem('steps'));
   }
}

// Click event to finish goal
stepsContainer.addEventListener('click', e => {
   const clickedEl = e.target;
   if (clickedEl.className === 'subgoal-box') {
      let x = clickedEl.children[1].innerText;
      let y = clickedEl.children[0].id;

      steps.forEach(name => {
         if (name.name === x && name.completed === false) {
            name.completed = true;
            localStorage.setItem('steps', JSON.stringify(steps));
            steps = steps;
         } else if (name.name === x && name.completed === true) {
            name.completed = false;
            localStorage.setItem('steps', JSON.stringify(steps));
            steps = steps;
         }
      });
   }
   checkIfCompleted();
});

function checkIfCompleted() {
   steps.forEach(name => {
      if (name.completed === true) {
         let cId = name.id;
         document.getElementById(cId).classList.add('fa-check');
         document.getElementById(cId).classList.add('fas');
      } else if (name.completed === false) {
         let cId = name.id;
         document.getElementById(cId).classList.remove('fa-check');
         document.getElementById(cId).classList.remove('fas');
      }
   });
   updateProg();
}

function updateProg() {
   let progC = 0;
   steps.forEach(name => {
      if (name.completed === true) {
         progC++;
      }
   });
   let percent = (progC * 100) / steps.length;
   progress(percent);
}

function progress(percent) {
   let left = percent;

   hero.style.left = left - 10 + '%';
   elem.style.width = left + '%';
}

// Change theme
function setLight() {
   document.documentElement.style.setProperty('--main-color', '#64CED8');
   document.documentElement.style.setProperty('--secondary-color', '#C0F5FA');
   document.documentElement.style.setProperty('--text-color', 'black');
   document.getElementById('ham').src = '/user/pngs/ham-black.png';
   localStorage.setItem('theme', 'light');
}

function setDark() {
   document.documentElement.style.setProperty('--main-color', '#0C4951');
   document.documentElement.style.setProperty('--secondary-color', '#387780');
   document.documentElement.style.setProperty('--text-color', '#fff');
   document.getElementById('ham').src = '/user/pngs/ham.png';
}

function changeTheme() {
   let theme = localStorage.getItem('theme');
   if (theme === 'light') {
      setDark();
      localStorage.removeItem('theme');
   } else {
      setLight();
   }
}

function checkTheme() {
   let theme = localStorage.getItem('theme');
   if (theme === 'light') {
      setLight();
   }
}

let style = getComputedStyle(document.body);

// Eventlisteners
newGoalLink.addEventListener('click', () => {
   localStorage.removeItem('steps');
   localStorage.removeItem('myGoal');
   window.open('../index.html', '_self');
});

theme.addEventListener('click', changeTheme);

function init() {
   setMain();
   updateText();
   checkIfCompleted();
   updateProg();
   progress();
   checkTheme();
}

init();
