// Simple script to handle loading bar and section reveal on scroll

const bar = document.getElementById('loading-bar');
let total = 0;
let loaded = 0;

// Show the loading bar while images load
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  total = images.length;
  images.forEach(img => {
    if (img.complete) {
      loaded++;
      updateBar();
    } else {
      img.addEventListener('load', () => {
        loaded++;
        updateBar();
      });
    }
  });
});

function updateBar() {
  const percent = total === 0 ? 100 : (loaded / total) * 100;
  bar.style.width = percent + '%';
  if (percent >= 100) {
    setTimeout(() => {
      bar.style.opacity = '0';
    }, 300);
  }
}

// Reveal sections on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));