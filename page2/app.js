const ham = document.getElementById('ham');
const dropdown  = document.getElementById('dropdown');
const theme = document.getElementById('theme');
const color = document.getElementById('color');

// Nav bar
ham.addEventListener('click', () => dropdown.classList.toggle('show'));
 
theme.addEventListener('click', () => color.classList.toggle('hide'));

// Get info from localStorage







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
console.log(style.getPropertyValue('--main-color'));

color.addEventListener('click', () => {
   const dark = style.getPropertyValue('--main-color');

   if(dark === ('#0C4951')) {
      setLight();
   } else {
      setDark();
   }
});








// function changeTheme() {
//    document.documentElement.style.setProperty('--main-color', '#dedede');
   
//    console.log('works');
// }




