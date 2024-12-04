// import src = require("tailwindcss-rtl");

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

document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the JSON server
  fetch('http://localhost:3000/cards')
    .then(response => {
      return response.json();
    })
    .then(defaultCards => {
      const slidewrapper = document.getElementById("dynamic-card");
      const detailWaraper = document.getElementById("movie-detail-a");

      // Function to render the cards
      function renderCards(cards) {
        slidewrapper.innerHTML = "";
        

        cards.forEach(card => {
          console.log(card)
          const cardDiv = document.createElement("div");
          cardDiv.className = "card"; 
          const myImg = document.createElement("img");
          myImg.setAttribute('src' , card.image);
          cardDiv.append(myImg);
          myImg.classList.add('rounded-lg');
          slidewrapper.appendChild(cardDiv);
          cardDiv.setAttribute("data-id", card["id"]);

          cardDiv.addEventListener("click", (event) => {
            const cardId = event.currentTarget.getAttribute("data-id"); // گرفتن id کارت
            console.log(cardId);
            const selectedCard = cards.find(c => c["id"] === cardId);
            console.log(selectedCard);
          
            detailWaraper.innerHTML = ""; // پاک کردن جزئیات قبلی
          
            // ایجاد تصویر بک‌گراند
            const movieDetailholder = document.createElement("div");
            movieDetailholder.className = "holder";
            const movieDetailBg = document.createElement("img");
            movieDetailholder.append(movieDetailBg);
            movieDetailBg.setAttribute('src', selectedCard.imageCover);
            movieDetailBg.classList.add("w-full", "h-full", "bg-cover", "bg-center","opacity-90", "h-[500px]");
            movieDetailholder.classList.add("w-full", "h-full", "rounded-lg");
          
            detailWaraper.appendChild(movieDetailholder); // Append the holder
            console.log(detailWaraper);
          });
          

        });
      }

      renderCards(defaultCards);

      const serialButton = document.getElementById("serial-btn"); 
      serialButton.addEventListener("click", () => {
        fetch('http://localhost:3000/serials') 
          .then(response => {
            return response.json();
          })
          .then(serialCards => {
            console.log(serialCards);
            renderCards(serialCards); 
          })
          .catch(error => {
            console.error('Error fetching the سریال data:', error);
          });
      });


      const defaultButton = document.getElementById("default-btn"); 
      defaultButton.addEventListener("click", () => {
        renderCards(defaultCards); 
      });
    })
    .catch(error => {
      console.error('Error fetching the data:', error); 
    });
});




