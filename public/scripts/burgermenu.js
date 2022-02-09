const burgermenuButton = document.querySelector(".menu__burgermenu");
const menu = document.querySelector(".menu__list");

// Burgermenu eventlistener
burgermenuButton.addEventListener("click", toogleBurgermenu);

// Toggle open class to open and close burgermenu when clicked
function toogleBurgermenu() {
  menu.classList.toggle("open");
}
