const here = document.getElementById('hold');
const addBtn = document.getElementById('add-step');
const createBtn = document.getElementById('create');
const mainGoalEl = document.getElementById('main-goal');

// Look for localstorage
(function () {
   if (localStorage.getItem('myGoal') !== null) {
      window.open('./user/goal.html', '_self');
   }
})();

// Add step
function addStep(e) {
   const item = document.createElement('div');
   let x = document.getElementById('hold').childElementCount;

   if (x > 11) {
      alert("Can't add more steps");
      e.preventDefault();
   } else {
      item.innerHTML = `
            <input type="text" id="steps" class="steps input" placeholder="ex - next step">
            <button id="remove-btn"  class="remove-btn btn" tabindex="-1">x</button>
   `;
      item.classList.add('input-container');
      here.appendChild(item);

      e.preventDefault();
   }
}

let x = document.getElementById('hold').childElementCount;

// Event listeners
addBtn.addEventListener('click', addStep);

// Remove step button
here.addEventListener('click', e => {
   const clickedEl = e.target;

   if (clickedEl.tagName === 'BUTTON') {
      clickedEl.parentElement.remove();
   }

   e.preventDefault();
});

let ID = 0;
let goals = [];

function IDcreator() {
   ID++;
   return ID;
}

function empty() {
   alert("Goal can't be empty");
}

function setLight() {
   document.documentElement.style.setProperty('--main-color', '#64CED8');
   document.documentElement.style.setProperty('--secondary-color', '#C0F5FA');
   document.documentElement.style.setProperty('--text-color', 'black');
}

(function () {
   let theme = localStorage.getItem('theme');
   if (theme === 'light') {
      setLight();
   }
})();

// Add goals to localstorage
createBtn.addEventListener('click', e => {
   e.preventDefault();
   const secondaryGoalsEl = document.querySelectorAll('.steps');

   let x = Array.from(secondaryGoalsEl);
   let z = 0;
   let q = 0;

   x.forEach(input => {
      if (input.value === '' || input.value === ' ') {
         z++;
      } else if (input.value.length > 22) {
         q++;
      }
   });

   if (mainGoalEl.value === '' || mainGoalEl.value === ' ') {
      z++;
   } else if (mainGoalEl.value.length > 22) {
      q++;
   }

   if (z !== 0) {
      empty();
   } else if (q !== 0) {
      alert("Goal can't be longer then 22 characters");
   } else if (q === 0 && z === 0) {
      goalCreate();
   }
});

function goalCreate() {
   const secondaryGoalsEl = document.querySelectorAll('.steps');
   let y = Array.from(secondaryGoalsEl);

   const mainGoal = {
      name: mainGoalEl.value,
      type: 'maingoal',
      completed: false,
      id: IDcreator()
   };

   goals.push(mainGoal);

   y.forEach(input =>
      goals.push({
         name: input.value,
         type: 'subgoal',
         completed: false,
         id: IDcreator()
      })
   );

   localStorage.setItem('myGoal', JSON.stringify(goals));
   window.open('./user/goal.html', '_self');
}

// Disable enter key
window.addEventListener(
   'keydown',
   function (e) {
      if (
         e.keyIdentifier == 'U+000A' ||
         e.keyIdentifier == 'Enter' ||
         e.keyCode == 13
      ) {
         if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
            e.preventDefault();
            return false;
         }
      }
   },
   true
);
