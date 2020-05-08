const ham = document.getElementById('ham');
const dropdown = document.getElementById('dropdown');
const theme = document.getElementById('theme');
const color = document.getElementById('color');
const stepsContainer = document.querySelector('.subgoal-container');

// Nav bar
ham.addEventListener('click', () => dropdown.classList.toggle('show'));

theme.addEventListener('click', () => color.classList.toggle('hide'));

// Get info from localStorage
const mainGoal = JSON.parse(localStorage.getItem('main'));

const localStorageSteps = JSON.parse(localStorage.getItem('steps'));
let steps = localStorage.getItem('steps') !== null ?
   localStorageSteps : [];

// console.log(mainGoal, steps[0].name);

// Create text from goaldata
function updateText() {
   document.getElementById('main-title').innerText = mainGoal;
   
   let stepsArr = steps.map(steps => steps.name);
   
   stepsArr.forEach(string => { 
      const item = document.createElement('div');
      item.innerHTML = `
      <i style="font-size:200%"></i><h2>${string}</h2>
         `;
      stepsContainer.appendChild(item);
      item.classList.add('subgoal-box');
    });
}

// Click event to finish goal
stepsContainer.addEventListener('click', e => {
   const clickedEl = e.target;
   const checked = document.querySelectorAll('i');
   if (clickedEl.className === 'subgoal-box') {
      console.log(clickedEl);
   clickedEl.children[0].classList.add('fas');
   clickedEl.children[0].classList.add('fa-check');
   // checked.classList.add('hide');
   }
});

// Change theme
function setLight() {
   document.documentElement.style.setProperty('--main-color', '#7BFED6');
   document.documentElement.style.setProperty('--secondary-color', '#AEFFE7');
   document.documentElement.style.setProperty('--text-color', 'black');
}

function setDark() {
   document.documentElement.style.setProperty('--main-color', '#0C4951');
   document.documentElement.style.setProperty('--secondary-color', '#387780');
   document.documentElement.style.setProperty('--text-color', '#fff');
}

let style = getComputedStyle(document.body);
// console.log(style.getPropertyValue('--main-color'));

// Eventlisteners

color.addEventListener('click', () => {
   const dark = style.getPropertyValue('--main-color');

   if (dark === ('#0C4951')) {
      setLight();
   } else {
      setDark();
   }
});






updateText();



