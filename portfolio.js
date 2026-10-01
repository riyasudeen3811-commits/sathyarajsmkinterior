// ==========================================================================
// PORTFOLIO GRID & RUNNING MARQUEE BANNER MODULE
// ==========================================================================

import { portfolioData } from './portfolioData.js';
import { openLightbox } from './modals.js';

export function initPortfolioGrid() {
  renderGridItems(portfolioData);
  initMarqueeBanner();

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const filter = e.target.dataset.filter;
      if (filter === 'all') {
        renderGridItems(portfolioData);
      } else {
        renderGridItems(portfolioData.filter(item => item.category === filter));
      }
    });
  });
}

export function renderGridItems(items) {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'p-card';
    card.innerHTML = `
      <div class="p-img-box">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <span class="p-badge">${item.categoryLabel}</span>
      </div>
      <div class="p-info">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(item));
    grid.appendChild(card);
  });
}

export function initMarqueeBanner() {
  const track = document.getElementById('servicesMarqueeTrack');
  if (!track) return;

  track.innerHTML = '';
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...portfolioData, ...portfolioData];

  marqueeItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'marquee-card';
    card.innerHTML = `
      <div class="marquee-img-box">
        <img src="${item.img}" alt="${item.title}" loading="lazy" decoding="async">
        <span class="marquee-badge-pill">${item.categoryLabel}</span>
      </div>
      <div class="marquee-card-info">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(item));
    track.appendChild(card);
  });
}
