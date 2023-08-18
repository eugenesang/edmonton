let closeOpen = document.querySelector('.mb-expand')
let optionsDropDown = document.querySelector('.options-dropdown');

let closeOpenIcons = closeOpen.querySelectorAll('i');
const closeNavMenu =()=>{
    closeOpenIcons.forEach(icon=>{
        icon.classList.toggle('hidden')
    });
    optionsDropDown.classList.toggle('hidden')
}
closeOpen.onclick = closeNavMenu;
document.querySelector('.options-left').onclick = closeNavMenu;
document.querySelector('.options-bottom').onclick = closeNavMenu;
let expandableList = document.querySelectorAll('.nest-li-ul')

expandableList.forEach(li=>{
    let ul = li.querySelector('ul');
    let icon = li.querySelector('i');


    li.onmouseenter= ()=>{
        ul.classList.remove('hidden');
        icon.classList.remove('fa-chevron-right')
        icon.classList.add('fa-chevron-down')
    }
    li.onmouseleave=()=>{
        ul.classList.add('hidden');
        icon.classList.add('fa-chevron-right')
        icon.classList.remove('fa-chevron-down')
    }
})


// Get a reference to the navigation bar element
const navbar = document.getElementById('navbar');

// Function to add box shadow when scrolling is done
function toggleBoxShadow() {
  if (window.scrollY > 0) {
    // Add box shadow when scrolling down
    navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  } else {
    // Remove box shadow when at the top
    navbar.style.boxShadow = 'none';
  }
}

// Attach the toggleBoxShadow function to the scroll event
window.addEventListener('scroll', toggleBoxShadow);

/**
 * 
 * @param {HTMLElement} container 
 */
function toggleAnswer(container) {
  container.classList.toggle("open");
  let icon = container.querySelector('i');
  if(icon.classList.contains('fa-chevron-down')){
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-right')
  }else{
    icon.classList.remove('fa-chevron-right');
    icon.classList.add('fa-chevron-down')
  }
}