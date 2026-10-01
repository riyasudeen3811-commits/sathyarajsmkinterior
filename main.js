// ==========================================================================
// YES MK INTERIOR WORK & FALSE CEILING - MAIN APPLICATION BOOTSTRAP
// ==========================================================================

import './style.css';
import { initNavbar } from './navbar.js';
import { initStatsCounter } from './stats.js';
import { initSlideshow } from './slideshow.js';
import { initPortfolioGrid, initMarqueeBanner } from './portfolio.js';
import { initConsultationModal, initLightboxModal } from './modals.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Global components initialization
  initNavbar();
  initStatsCounter();
  initConsultationModal();

  // Page specific component initialization
  if (document.getElementById('slideshowTrack')) {
    initSlideshow();
    initPortfolioGrid();
    initLightboxModal();
  } else if (document.getElementById('servicesMarqueeTrack')) {
    initMarqueeBanner();
    initLightboxModal();
  }

  // Contact page form initialization
  initContactForm();
});
