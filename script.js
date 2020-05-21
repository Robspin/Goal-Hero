const here = document.getElementById('hold');
const addBtn = document.getElementById('add-step');
const createBtn = document.getElementById('create');
const mainGoalEl = document.getElementById('main-goal');

// Look for localstorage
(function () {
   if (localStorage.getItem('myGoal') !== null) {
      window.open('./page2/index.html', '_self');
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
console.log(x);

// Event listeners
addBtn.addEventListener('click', addStep);

// Remove step button
here.addEventListener('click', e => {
   const clickedEl = e.target;

   if (clickedEl.tagName === 'BUTTON') {
      console.log(clickedEl);
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

// Add goals to localstorage
createBtn.addEventListener('click', e => {
   e.preventDefault();
   const secondaryGoalsEl = document.querySelectorAll('.steps');

   let x = Array.from(secondaryGoalsEl);
   let z = 0;
   let q = 0;

   x.forEach(input => {
      if (input.value === '') {
         z++;
      } else if (input.value.length > 15) {
         q++;
      }
   });

   if (mainGoalEl.value === '') {
      z++;
   } else if (mainGoalEl.value.length > 15) {
      q++;
   }

   if (z !== 0) {
      empty();
   } else if (q !== 0) {
      alert("Goal can't be longer then 15 characters");
   } else {
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
   window.open('./page2/index.html', '_self');
}
