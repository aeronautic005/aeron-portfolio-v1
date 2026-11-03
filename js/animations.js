/* ==========================================================================
   BRYL-MINIMAL DESIGN LANGUAGE — Entrance Stagger & Observers
   Fades up from 12px below over 700ms, staggered ~70ms apart, capped around 330ms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollStagger();
});

function initScrollStagger() {
  const elements = document.querySelectorAll('.observe-entrance');

  if (elements.length === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    elements.forEach(el => {
      el.classList.add('animate-entrance');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-entrance');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}
