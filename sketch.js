// 1. Seleccionamos los elementos del HTML que necesitamos controlar
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const menuOverlay = document.querySelector('.menu-overlay');

// 2. Cuando se hace clic en "menu", agregamos la clase "active"
menuBtn.addEventListener('click', () => {
  menuOverlay.classList.add('active');
});

// 3. Cuando se hace clic en "close", quitamos la clase "active"
closeBtn.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
});