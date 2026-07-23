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

    about_title: "Sobre mí",
    about_p1: "¡Hola!, me llamo Santiago Cifuentes Vélez, y soy Ilustrator y diseñador integral. Casi siempre estoy jugando con siluetas, cables, y narrativas visuales en lienzos 2D y/o 3D, coloreando figuras y sonidos… ¿Cool, no?",
    about_p2: "Me hace feliz compartir mi trabajo contigo. ¡Hugs!",

    contact_title: "Contacto",
    form_name: "Nombre",
    form_email: "Email",
    form_message: "Mensaje",
    form_send: "Enviar",
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

    about_title: "About",
    about_p1: "Hi! My name is Santiago Cifuentes Vélez, and I'm an illustrator and full-stack designer. I'm almost always playing with silhouettes, wires, and visual narratives across 2D and/or 3D canvases, coloring shapes and sounds… Cool, right?",
    about_p2: "It makes me happy to share my work with you. Hugs!",

    contact_title: "Contact",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_send: "Send",
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
  wrapWordsForScroll();
  updateScrollHighlight();
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

// ESPIRALLLLLLLLLL

// 1. Tomamos los datos de los proyectos ya existentes en el HTML (no los repetimos a mano)
const projectItems = document.querySelectorAll('.project-item');
const spiralContainer = document.querySelector('.projects-spiral');
const spiralInner = document.querySelector('.spiral-inner');

let spiralItems = []; // guarda cada miniatura junto con su ángulo "de origen"

// Generador de números "aleatorios" pero siempre iguales (con semilla fija)
function seededRandom(seed) {
  let value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function buildSpiral() {
  const targetTotal = 16;
  const originalCount = projectItems.length;
  const repeats = Math.max(2, Math.round(targetTotal / originalCount));
  const total = originalCount * repeats;
  spiralItems = [];

  const loops = 3;
  const verticalSpacing = 800 / total;

  // Construimos el orden barajado, usando semillas fijas (no Math.random)
  const order = [];
  for (let r = 0; r < repeats; r++) {
    const cycle = Array.from({ length: originalCount }, (_, idx) => idx);

    for (let a = cycle.length - 1; a > 0; a--) {
      const b = Math.floor(seededRandom(r * 100 + a) * (a + 1));
      [cycle[a], cycle[b]] = [cycle[b], cycle[a]];
    }

    order.push(...cycle);
  }

  for (let i = 0; i < total; i++) {
    const original = projectItems[order[i]];
    const clone = original.cloneNode(true);
    clone.classList.add('spiral-item');
    clone.classList.remove('project-item');

    const clonedLink = clone.querySelector('a');
    if (clonedLink) clonedLink.removeAttribute('href');

    spiralInner.appendChild(clone);

    const jitterAngle = seededRandom(i * 7.3) * 10 - 5;
    const jitterY = seededRandom(i * 3.1 + 50) * 16 - 8;

    const baseAngle = (360 / total) * i * loops + jitterAngle;
    const yOffset = (i - (total - 1) / 2) * verticalSpacing + jitterY;

    spiralItems.push({ el: clone, baseAngle, yOffset });
  }

  renderSpiral(0);
}

let time = 0; // reloj interno que avanza solo, para el efecto de flotado

function renderSpiral(rotation) {
  const radius = 90 + projectItems.length * 6;

  spiralItems.forEach((item, index) => {
    const angle = item.baseAngle + rotation;
    const radians = angle * (Math.PI / 180);

    const x = radius * Math.sin(radians);
    const z = radius * Math.cos(radians);

    item.z = z; // guardamos la profundidad actual de este frame

    const depthRatio = (z + radius) / (2 * radius);
    const scale = 0.6 + depthRatio * 0.5;
    const opacity = 0.3 + depthRatio * 0.7;

    const tiltX = Math.sin(radians) * 12;
    const floatOffset = Math.sin(time + index * 1.3) * 8;
    const floatTilt = Math.sin(time + index * 1.3) * 4;

    const blurAmount = (1 - depthRatio) * 5; // más atrás = más blur
    item.el.style.filter = `blur(${blurAmount}px)`;

   item.el.style.transform =
  `translate(-50%, -50%) translate3d(${x}px, ${item.yOffset + floatOffset}px, ${z}px) ` +
  `rotateY(${angle}deg) rotateX(${tiltX + floatTilt}deg) scale(${scale})`;
    item.el.style.opacity = opacity;
    item.el.style.zIndex = Math.round(z);
  });

  // --- Solo las 3 tarjetas más al frente pueden recibir clics ---
  const sortedByDepth = [...spiralItems].sort((a, b) => b.z - a.z);
  const frontThree = sortedByDepth.slice(0, 3);

  spiralItems.forEach((item) => item.el.classList.remove('in-front'));
  frontThree.forEach((item) => item.el.classList.add('in-front'));
}

// --- NUEVO: giro automático infinito ---
const autoRotateSpeed = 0.15; // grados por frame, ajusta para más/menos velocidad
let autoRotateDirection = 1; // 1 = derecha, -1 = izquierda

function animate() {
  time += 0.02;

  if (!isDragging) {
    currentRotation += autoRotateSpeed * autoRotateDirection;
  }
  renderSpiral(currentRotation);
  requestAnimationFrame(animate);
}

// Seleccionamos los botones de vista y los dos contenedores
const viewBtns = document.querySelectorAll('.view-btn');
const projectsList = document.querySelector('.projects-list');

// Forzamos el estado inicial: spiral visible, list oculta — sin importar el tamaño de pantalla

viewBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedView = btn.getAttribute('data-view');

    viewBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (selectedView === 'spiral') {
      projectsList.classList.add('is-hidden');
      spiralContainer.classList.remove('is-hidden');
    } else {
      projectsList.classList.remove('is-hidden');
      spiralContainer.classList.add('is-hidden');
    }
  });
});

// Variables para llevar el control del arrastre
let isDragging = false;
let startX = 0;
let currentRotation = 0;   // el ángulo acumulado real
let startRotation = 0;     // el ángulo que tenía al iniciar este arrastre

const spiral = document.querySelector('.projects-spiral');

// 1. Cuando el usuario presiona (mouse) o toca (celular)
spiral.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX;
  startRotation = currentRotation;
});

// Evita que los links clonados dentro del spiral naveguen al hacer click
spiral.addEventListener('click', (e) => {
  e.preventDefault();
});

// 2. Mientras se mueve, calculamos cuánto arrastró y rotamos
window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const sensitivity = 0.4;
  currentRotation = startRotation + deltaX * sensitivity;

  renderSpiral(currentRotation);
});

// 3. Cuando suelta (mouse o dedo), dejamos de arrastrar
window.addEventListener('pointerup', () => {
  if (isDragging) {
    const netDelta = currentRotation - startRotation; // hacia dónde se movió en total este arrastre
    if (netDelta !== 0) {
      autoRotateDirection = netDelta > 0 ? 1 : -1;
    }
  }
  isDragging = false;
});

buildSpiral();
animate();

// Seleccionamos todos los links del menú que tienen data-page, y todas las páginas
const navLinks = document.querySelectorAll('.menu-links [data-page]');
const pages = document.querySelectorAll('.page');

function goToPage(pageName) {
  // 1. Ocultamos todas las páginas, mostramos solo la que coincide
  pages.forEach((page) => {
    if (page.getAttribute('data-page') === pageName) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // 2. Llevamos el scroll arriba del todo, como una página nueva de verdad
  window.scrollTo(0, 0);
}

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // evita que el link "#" salte o recargue la página
    const pageName = link.getAttribute('data-page');
    goToPage(pageName);

    // 3. Cerramos el menú overlay automáticamente al elegir una página
    menuOverlay.classList.remove('active');
  });
});

// ---------- ABRIR PROYECTO (spiral y lista) ----------

const projectDetailTitle = document.getElementById('project-detail-title');
const projectDetailCategory = document.getElementById('project-detail-category');
const projectDetailDesc = document.getElementById('project-detail-desc');
const behanceBtn = document.getElementById('behance-btn');
const backBtn = document.getElementById('back-btn');

function openProject(linkEl) {
  const title = linkEl.querySelector('h3').textContent;
  const category = linkEl.querySelector('span').textContent;
  const desc = linkEl.getAttribute('data-desc');
  const behanceUrl = linkEl.getAttribute('data-behance');

  projectDetailTitle.textContent = title;
  projectDetailCategory.textContent = category;
  projectDetailDesc.textContent = desc;
  behanceBtn.setAttribute('href', behanceUrl);

  goToPage('project');
}

// Botón "volver"
backBtn.addEventListener('click', () => {
  goToPage('trabajos');
});

// --- Clic en la vista LISTA (no necesita distinguir arrastre, es un clic normal) ---
projectItems.forEach((item) => {
  const link = item.querySelector('a');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openProject(link);
  });
});

// --- Clic en el SPIRAL (aquí sí hay que distinguir clic real de arrastre) ---
let dragDistance = 0; // acumula cuánto se movió el mouse durante este gesto

spiral.addEventListener('pointerdown', (e) => {
  dragDistance = 0; // reiniciamos el contador en cada nuevo gesto
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  dragDistance += Math.abs(e.movementX); // sumamos el movimiento de este frame
});

spiral.addEventListener('click', (e) => {
  if (dragDistance < 6) {
    // Fue un clic real, no un arrastre: buscamos el link más cercano al elemento clickeado
    const clickedLink = e.target.closest('a');
    if (clickedLink) {
      openProject(clickedLink);
    }
  }
  // Si dragDistance >= 6, no hacemos nada: fue un arrastre, ya se ocupó de eso el otro código
});

// ---------- SCROLL TEXT HIGHLIGHT (About) ----------

function wrapWordsForScroll() {
  const paragraphs = document.querySelectorAll('.scroll-text');

  paragraphs.forEach((p) => {
    const words = p.textContent.trim().split(/\s+/); // separa el texto por espacios
    p.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ');
  });
}

function updateScrollHighlight() {
  const wrapper = document.getElementById('scroll-text-wrapper');
  if (!wrapper) return;

  const rect = wrapper.getBoundingClientRect();
  const scrollableDistance = wrapper.offsetHeight - window.innerHeight;

  // progress: 0 al entrar al wrapper, 1 al llegar al final de su espacio de scroll
  let progress = -rect.top / scrollableDistance;
  progress = Math.max(0, Math.min(1, progress)); // lo mantenemos entre 0 y 1

  const words = document.querySelectorAll('.scroll-text .word');
  const activeCount = Math.floor(progress * words.length);

  words.forEach((word, index) => {
    if (index < activeCount) {
      word.classList.add('lit');
    } else {
      word.classList.remove('lit');
    }
  });
}

function scrollLoop() {
  updateScrollHighlight();
  requestAnimationFrame(scrollLoop);
}
scrollLoop();

wrapWordsForScroll();
updateScrollHighlight();