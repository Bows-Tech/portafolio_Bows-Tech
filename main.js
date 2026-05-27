// =============================================
//   PORTAFOLIO — main.js
// =============================================

// --- Año dinámico en el footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Menú hamburguesa (móvil) ---
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Cierra el menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Aparición de secciones al hacer scroll (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(section);
});

// Cuando la sección entra en pantalla, la hacemos visible
const style = document.createElement('style');
style.textContent = `.section.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(style);

// --- Highlight del enlace activo en la nav ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// Estilo del enlace activo
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav-links a.active { color: var(--accent) !important; }`;
document.head.appendChild(activeStyle);