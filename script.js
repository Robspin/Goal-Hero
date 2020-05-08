const here = document.getElementById('hold');
const addBtn = document.getElementById('add-step');
const createBtn = document.getElementById('create');
const mainGoalEl = document.getElementById('main-goal');


// Add step
function addStep(e){
   const item = document.createElement('div');

   item.innerHTML = `
            <input type="text" id="steps" class="steps input" placeholder="ex - next step">
            <button id="remove-btn"  class="remove-btn btn">x</button>
   `;
   item.classList.add('input-container');
   here.appendChild(item);

   e.preventDefault();
}


// Event listeners
addBtn.addEventListener('click', addStep);

// Remove step button
here.addEventListener('click', e => {
   const clickedEl = e.target;

   if (clickedEl.tagName === 'BUTTON'){
      console.log(clickedEl);
      clickedEl.parentElement.remove();
   }

   e.preventDefault();
});


let secondaryGoals = localStorage.getItem('secondaryGoals') !== null ?
localStorageTransactions : [];


// Add goals to localstorage
createBtn.addEventListener('click', (e) => {
   e.preventDefault();

   const mainGoal = mainGoalEl.value;

   // All of steps
   const secondaryGoalsEl = document.querySelectorAll('.steps');

   let x = Array.from(secondaryGoalsEl);
   x.forEach(input => secondaryGoals.push(input.value));

   console.log(mainGoal, secondaryGoals);

   localStorage.setItem('main', JSON.stringify(mainGoal));
   localStorage.setItem('steps', JSON.stringify(secondaryGoals));

   window.open("./page2/index.html","_self")
});