/**
 * EMBELLISH BEAUTY SALON - MAIN INTERACTION SCRIPT
 * Handles Mobile Nav (Strict Click-Only), Forms, Header Scroll, Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initContactForm();
});

/* --- Header Compact Transition --- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- Mobile Navigation Overlay (Strict Click-Only) --- */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('is-active');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Lock Body Scroll
  }

  function closeMenu() {
    mobileNav.classList.remove('is-active');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore Scroll
    hamburgerBtn.focus();
  }

  // Click triggers
  hamburgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ESC Key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/* --- Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const service = form.querySelector('#service').value;

    if (!name || !phone || !service) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please complete all required fields (*).';
      return;
    }

    // Success Simulation
    feedback.className = 'form-feedback success';
    feedback.textContent = 'Thank you! Your enquiry has been received. Our desk will contact you shortly to confirm timing.';
    form.reset();
  });
}
