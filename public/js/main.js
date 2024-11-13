// Cache elements once
const filimotorLink = document.querySelector('#filimotor-link');
const filimotorMenu = document.querySelector('#filimotor-menu');

const showMenu = () => {
  filimotorMenu.classList.replace('hidden', 'block');
};

const hideMenu = () => {
  filimotorMenu.classList.replace('block', 'hidden');
};

let debounceTimer;
const debounce = (func, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
};

filimotorLink.addEventListener('mouseenter', () => debounce(showMenu, 100));
filimotorLink.addEventListener('mouseleave', () => debounce(hideMenu, 100));
