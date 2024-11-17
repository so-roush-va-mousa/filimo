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


document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('http://localhost:3000/heroes');
      const data = await response.json();

      // Use the first hero in the array
      const hero = data[0];

      // Set hero section content
      document.getElementById('hero-image').src = hero.image;
      document.getElementById('hero-title').textContent = hero.title;
      document.getElementById('hero-subtitle').textContent = hero.subtitle;
      document.getElementById('hero-description').textContent = hero.description;
      document.getElementById('hero-cta').textContent = hero.ctaText;
      document.getElementById('hero-cta').href = hero.ctaLink;

      // Populate features list
      const featuresList = document.getElementById('hero-features');
      hero.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          featuresList.appendChild(li);
      });
  } catch (error) {
      console.error('Error fetching hero data:', error);
  }
});
