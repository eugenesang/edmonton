
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