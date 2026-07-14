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


// Seleccionamos el botón y el elemento <html>
const themeBtn = document.querySelector('.theme-btn');
const root = document.documentElement; // document.documentElement = la etiqueta <html>

// 1. Al cargar la página, revisamos si el usuario ya había elegido un tema antes
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
  themeBtn.textContent = '☀';
}

// 2. Al hacer clic, alternamos entre claro y oscuro
themeBtn.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';

  if (isLight) {
    root.removeAttribute('data-theme'); // sin atributo = vuelve al oscuro (:root)
    themeBtn.textContent = '☾';
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    themeBtn.textContent = '☀';
    localStorage.setItem('theme', 'light');
  }
});

// 1. El diccionario: un objeto con todas las claves y sus dos versiones
const translations = {
  es: {
    menu_trabajos: "trabajos",
    menu_about: "sobre mí",
    menu_contacto: "contacto",
    hero_title: "Diseñador gráfico & motion designer",
    hero_sub: "Basado en Cali, Colombia",
    trabajos_title: "Trabajos",
    p1_titulo: "Proyecto Uno", p1_cat: "Branding",
    p2_titulo: "Proyecto Dos", p2_cat: "Motion",
    p3_titulo: "Proyecto Tres", p3_cat: "Editorial",
    p4_titulo: "Proyecto Cuatro", p4_cat: "Identidad",
  },
  en: {
    menu_trabajos: "work",
    menu_about: "about",
    menu_contacto: "contact",
    hero_title: "Graphic & motion designer",
    hero_sub: "Based in Cali, Colombia",
    trabajos_title: "Work",
    p1_titulo: "Project One", p1_cat: "Branding",
    p2_titulo: "Project Two", p2_cat: "Motion",
    p3_titulo: "Project Three", p3_cat: "Editorial",
    p4_titulo: "Project Four", p4_cat: "Identity",
  }
};

// 2. Función que aplica el idioma elegido a toda la página
function applyLanguage(lang) {
  // Buscamos TODOS los elementos que tengan data-i18n (no solo el primero)
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key];
  });

  document.documentElement.setAttribute('lang', lang);
  langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  localStorage.setItem('lang', lang);
}

// 3. Al cargar la página, revisamos si ya había un idioma guardado
const langBtn = document.querySelector('.lang-btn');
const savedLang = localStorage.getItem('lang') || 'es';
applyLanguage(savedLang);

// 4. Al hacer clic, alternamos
langBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('lang');
  const next = current === 'es' ? 'en' : 'es';
  applyLanguage(next);
});