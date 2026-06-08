// CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let fx = 0, fy = 0, lx = 0, ly = 0;

document.addEventListener('mousemove', e => {
  fx = e.clientX; fy = e.clientY;
  if (cursor) { cursor.style.left = fx + 'px'; cursor.style.top = fy + 'px'; }
});

function animateFollower() {
  lx += (fx - lx) * 0.12; ly += (fy - ly) * 0.12;
  if (follower) { follower.style.left = lx + 'px'; follower.style.top = ly + 'px'; }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// NAV SCROLL
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER
const ham = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (ham) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    if (mobileMenu) mobileMenu.classList.toggle('open');
  });
}
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    if (ham) ham.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  });
});

// ACTIVE NAV
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (btn) {
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  }
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#4ade80';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
    contactForm.reset();
  });
}

// COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 25);
  });
}
const statsSection = document.querySelector('.stats-row');
if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}
