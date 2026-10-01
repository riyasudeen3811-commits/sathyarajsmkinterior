// ==========================================================================
// PORTFOLIO SLIDESHOW MODULE (Speed Control, Thumbnail Strip, Auto-Play)
// ==========================================================================

import { portfolioData } from './portfolioData.js';

let currentSlideIndex = 0;
let slideInterval = null;
let slideSpeed = 1200; // Default 1.2s per user requirement
let isPlaying = true;

export function initSlideshow() {
  const track = document.getElementById('slideshowTrack');
  const thumbStrip = document.getElementById('thumbnailStrip');
  if (!track || !thumbStrip) return;

  track.innerHTML = '';
  thumbStrip.innerHTML = '';

  portfolioData.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.className = `slide-item ${index === 0 ? 'active' : ''}`;
    slide.dataset.index = index;
    slide.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
    track.appendChild(slide);

    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${index === 0 ? 'active' : ''}`;
    thumb.dataset.index = index;
    thumb.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
    thumb.addEventListener('click', () => goToSlide(index));
    thumbStrip.appendChild(thumb);
  });

  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide((currentSlideIndex - 1 + portfolioData.length) % portfolioData.length));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide((currentSlideIndex + 1) % portfolioData.length));

  const playPauseBtn = document.getElementById('playPauseBtn');
  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);

  const speedBtns = document.querySelectorAll('.speed-btn');
  speedBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      speedBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      slideSpeed = parseInt(e.target.dataset.speed, 10);
      const speedVal = document.getElementById('speedValue');
      if (speedVal) speedVal.innerText = `${(slideSpeed / 1000).toFixed(1)}s`;
      if (isPlaying) startSlideshow();
    });
  });

  const stage = document.getElementById('slideshowBox');
  if (stage) {
    stage.addEventListener('mouseenter', () => { if (isPlaying) pauseSlideshow(false); });
    stage.addEventListener('mouseleave', () => { if (isPlaying) startSlideshow(); });
  }

  startSlideshow();
  updateCaption();
}

export function goToSlide(index) {
  const slides = document.querySelectorAll('.slide-item');
  const thumbs = document.querySelectorAll('.thumb-item');
  if (!slides.length) return;

  if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.remove('active');
  if (thumbs[currentSlideIndex]) thumbs[currentSlideIndex].classList.remove('active');

  currentSlideIndex = index;

  if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add('active');
  if (thumbs[currentSlideIndex]) {
    thumbs[currentSlideIndex].classList.add('active');
    thumbs[currentSlideIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  updateCaption();
  if (isPlaying) resetProgressBar();
}

function updateCaption() {
  const current = portfolioData[currentSlideIndex];
  if (!current) return;
  const titleEl = document.getElementById('captionTitle');
  const descEl = document.getElementById('captionDesc');
  if (titleEl) titleEl.innerText = `${currentSlideIndex + 1}. ${current.title}`;
  if (descEl) descEl.innerText = `${current.categoryLabel} • ${current.desc}`;
}

export function startSlideshow() {
  clearInterval(slideInterval);
  resetProgressBar();
  slideInterval = setInterval(() => {
    goToSlide((currentSlideIndex + 1) % portfolioData.length);
  }, slideSpeed);
}

export function pauseSlideshow(updateState = true) {
  clearInterval(slideInterval);
  const progressBar = document.getElementById('slideProgress');
  if (progressBar) progressBar.style.width = '0%';
  if (updateState) {
    document.getElementById('pauseIcon')?.classList.add('hidden');
    document.getElementById('playIcon')?.classList.remove('hidden');
    const txt = document.getElementById('playStateText');
    if (txt) txt.innerText = 'Play';
  }
}

export function togglePlayPause() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    document.getElementById('pauseIcon')?.classList.remove('hidden');
    document.getElementById('playIcon')?.classList.add('hidden');
    const txt = document.getElementById('playStateText');
    if (txt) txt.innerText = 'Pause';
    startSlideshow();
  } else {
    pauseSlideshow(true);
  }
}

export function resetProgressBar() {
  const progressBar = document.getElementById('slideProgress');
  if (!progressBar) return;
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  setTimeout(() => {
    progressBar.style.transition = `width ${slideSpeed}ms linear`;
    progressBar.style.width = '100%';
  }, 20);
}
