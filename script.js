const here = document.getElementById('hold');
const addBtn = document.getElementById('add-step');
const createBtn = document.getElementById('create');
const mainGoalEl = document.getElementById('main-goal');


// Add step
function addStep(e){
   const item = document.createElement('div');

   item.innerHTML = `
            <input type="text" id="steps" class="steps input" placeholder="ex - next step">
            <button id="remove-btn"  class="remove-btn btn" tabindex="-1">x</button>
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

let ID = 0;
let goals = [];

function IDcreator() {
   ID++;
   return ID;

}

// Add goals to localstorage
createBtn.addEventListener('click', (e) => {
   e.preventDefault();

   const mainGoal = {   name: mainGoalEl.value,
                        type: 'maingoal',
                        completed: false,
                        id: IDcreator()
   };
   
   goals.push(mainGoal);

   // All of steps
   const secondaryGoalsEl = document.querySelectorAll('.steps');

   let x = Array.from(secondaryGoalsEl);
   x.forEach(input => goals.push({ 
      name: input.value,
      type: 'subgoal', 
      completed: false,
      id: IDcreator()  
   }));



   console.log(mainGoal, goals);

   localStorage.setItem('myGoal', JSON.stringify(goals));
   window.open("./page2/index.html","_self")
});