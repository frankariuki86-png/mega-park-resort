/* ------------------------
   Small helpers & DOM
   ------------------------ */
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

/* NAV toggle for mobile */
const navToggle = qs('#navToggle');
const mainNav = qs('#mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

/* Smooth scroll for in-page links */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav after click
      if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
    }
  });
});
/* ------------------------
   Carousel (3 slides, 3s each)
   ------------------------ */
(function carousel() {
  const slides = qsa('.hero .slide');
  const prevBtn = qs('#prevSlide');
  const nextBtn = qs('#nextSlide');
  if (!slides.length) return;

  let idx = 0;
  const total = slides.length;
  const intervalMs = 2500; // 3 seconds
  let timer = null;

  function show(i) {
    slides.forEach((s, si) => {
      s.classList.toggle('active', si === i);
    });
    idx = i;
  }

  function next() { show((idx + 1) % total); }
  function prev() { show((idx - 1 + total) % total); }

  // Auto-advance
  function start() {
    stop();
    timer = setInterval(next, intervalMs);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // start carousel
  start();

  // controls
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });

  // pause on hover (desktop)
  const carouselEl = qs('.hero-carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stop);
    carouselEl.addEventListener('mouseleave', start);
  }

  // ensure accessibility: allow arrow keys to change slide when focused
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); start(); }
    if (e.key === 'ArrowLeft') { prev(); start(); }
  });

})();

/* Minor: close nav when clicking outside on mobile */
document.addEventListener('click', (e) => {
  const insideNav = e.target.closest('#mainNav') || e.target.closest('#navToggle');
  if (!insideNav && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
  }
});


 /* Footer year */
const yearEl = qs('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
