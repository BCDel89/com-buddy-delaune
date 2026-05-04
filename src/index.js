import './main.scss';
import './pdf.scss';
import './mobile.scss';

// ── Topbar shadow on scroll ────────────────────────────────────────────────
const topbar = () => {
  const bar = document.querySelector('.topbar');
  if (!bar) return;
  const update = () => bar.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
};

// ── Reveal on scroll ───────────────────────────────────────────────────────
const reveal = () => {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  targets.forEach((el) => io.observe(el));
};

// ── Active section in topbar nav ──────────────────────────────────────────
const navHighlight = () => {
  const links = document.querySelectorAll('.topbar-nav a[href^="#"]');
  if (!links.length) return;

  const map = new Map();
  links.forEach((l) => {
    const id = l.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) map.set(target, l);
  });

  if (!map.size) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = map.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  map.forEach((_, target) => io.observe(target));
};

// ── Work card pointer-tracked glow ────────────────────────────────────────
const workCardGlow = () => {
  const cards = document.querySelectorAll('.work-card');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    });
  });
};

const init = () => {
  topbar();
  reveal();
  navHighlight();
  workCardGlow();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
