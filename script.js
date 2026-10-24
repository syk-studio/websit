const STUDIO_EMAIL = 'syk.studio4@gmail.com';

// Mobile Navigation Toggle
const menuButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navLinks.classList.toggle('open', !isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Direct Email link helper
const emailLink = document.getElementById('email-link');
if (emailLink) {
  emailLink.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent('Project Enquiry for SYK Studio')}`;
}

// Copy Email Button with human feedback
const copyEmailButton = document.getElementById('copy-email');
if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_EMAIL);
      copyEmailButton.textContent = 'Copied to Clipboard ✓';
      setTimeout(() => { 
        copyEmailButton.textContent = 'Copy Email'; 
      }, 2500);
    } catch {
      window.location.href = `mailto:${STUDIO_EMAIL}`;
    }
  });
}

// Dynamic Copyright Year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Interactive Project Form Handler
const projectForm = document.getElementById('project-form');
const formFeedback = document.getElementById('form-feedback');

if (projectForm) {
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const service = document.querySelector('input[name="service_type"]:checked')?.value || 'General Enquiry';
    const details = document.getElementById('project-details').value;

    const subject = encodeURIComponent(`Project Enquiry: ${service} - ${name}`);
    const body = encodeURIComponent(
      `Hello SYK Studio team,\n\n` +
      `Name / Organization: ${name}\n` +
      `Email: ${email}\n` +
      `Service Requested: ${service}\n\n` +
      `Project Details:\n${details}\n\n` +
      `Looking forward to hearing from you!`
    );

    // Provide friendly confirmation message
    if (formFeedback) {
      formFeedback.textContent = 'Opening your email client to send details... We will be in touch!';
      formFeedback.style.display = 'block';
    }

    setTimeout(() => {
      window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    }, 400);
  });
}

// Smooth Intersection Observer for Scroll Reveals
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach(el => revealObserver.observe(el));
}

// Active Nav state on scroll
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')]
  .filter(link => link.getAttribute('href').length > 1);

if ('IntersectionObserver' in window && sectionLinks.length) {
  const sectionById = new Map(
    sectionLinks.map(link => [document.querySelector(link.getAttribute('href')), link])
  );

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = sectionById.get(entry.target);
      if (link) {
        link.classList.toggle('active', entry.isIntersecting);
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sectionById.forEach((_, section) => section && navObserver.observe(section));
}

// Cookie Consent Banner Logic
(function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');

  if (!cookieBanner) return;

  const consent = localStorage.getItem('syk_cookie_consent');
  if (!consent) {
    // Show after slight delay for smooth presentation
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1200);
  }

  function handleConsent(choice) {
    localStorage.setItem('syk_cookie_consent', choice);
    cookieBanner.classList.remove('show');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => handleConsent('accepted'));
  }
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => handleConsent('rejected'));
  }
})();

