/* ==========================================================================
   BRYL-MINIMAL DESIGN LANGUAGE — Core JavaScript
   Theme management (Light / Dark / System), Mobile Nav Overlay, Active Nav
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initMobileNav();
  initActiveNav();
  initContactForm();
  initCertificateModal();
});

/* ── Theme Management (Light / Dark / System) ── */
function initThemeSystem() {
  const themeButtons = document.querySelectorAll('[data-theme-choice]');
  const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Read saved preference or default to 'system'
  let currentChoice = localStorage.getItem('theme-preference') || 'system';

  function applyTheme(choice) {
    currentChoice = choice;
    localStorage.setItem('theme-preference', choice);

    if (choice === 'system') {
      const isDark = systemQuery.matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', choice);
    }

    // Update active state on buttons
    themeButtons.forEach(btn => {
      const match = btn.getAttribute('data-theme-choice') === choice;
      btn.classList.toggle('active', match);
    });
  }

  // Bind click handlers
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-theme-choice');
      applyTheme(choice);
    });
  });

  // Watch for OS preference changes when in 'system' mode
  systemQuery.addEventListener('change', () => {
    if (currentChoice === 'system') {
      applyTheme('system');
    }
  });

  // Initial application
  applyTheme(currentChoice);
}

/* ── Mobile Overlay Navigation (<1024px) ── */
function initMobileNav() {
  const openBtn = document.getElementById('mobileMenuOpen');
  const closeBtn = document.getElementById('mobileMenuClose');
  const overlay = document.getElementById('mobileOverlay');
  const navLinks = overlay ? overlay.querySelectorAll('a') : [];

  if (!openBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Keyboard escape route
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ── Active Nav Highlight via Intersection Observer ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  if (sections.length === 0 || navItems.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          const isMatch = href === `#${id}`;
          item.classList.toggle('active', isMatch);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ── Minimal Contact Form Handling ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'sent ✓';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2500);
  });
}

/* ── Certificate Modal Controller (bryl-minimal spec) ── */
function initCertificateModal() {
  const openButtons = document.querySelectorAll('[data-modal-open]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal(modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close when clicking directly on overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.is-active');
      if (activeModal) closeModal(activeModal);
    }
  });
}
