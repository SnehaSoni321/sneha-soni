const themeBtn = document.getElementById('themeBtn');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const typedText = document.getElementById('typed-text');

let savedTheme = null;

try {
  savedTheme = localStorage.getItem('portfolio-theme');
} catch (error) {
  savedTheme = null;
}

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextTheme = dark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  themeBtn.textContent = dark ? '☀️' : '🌙';

  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (error) {
    // Ignore storage failures on restricted file:// contexts.
  }
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const words = ['Web Developer', 'Frontend Developer', 'DSA Learner', 'IBM Certified', 'Open Source Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  if (!typedText) {
    return;
  }

  const word = words[wordIndex];

  if (!deleting) {
    typedText.textContent = word.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    typedText.textContent = word.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, deleting ? 55 : 95);
}

type();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card,.project-card,.skill-tag,.exp-card,.cert-card,.highlight-card,.contact-info-card,.contact-form-card,.hero-card,.about-avatar,.hire-banner').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(24px)';
  item.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(item);
});