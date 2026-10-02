// ==========================================================================
// SMK INTERIOR WORKS & FALSE CEILING - MAIN APPLICATION BOOTSTRAP
// Native ES Module Entry Point for Web Server / Domain Deployment
// ==========================================================================

import { initNavbar } from './navbar.js';
import { initStatsCounter } from './stats.js';
import { initSlideshow } from './slideshow.js';
import { initPortfolioGrid, initMarqueeBanner } from './portfolio.js';
import { initConsultationModal, initLightboxModal } from './modals.js';
import { initContactForm } from './contact.js';

function bootstrapApp() {
  // Global components initialization
  initNavbar();
  initStatsCounter();
  initConsultationModal();
  initLightboxModal();

  // Page specific component initialization
  if (document.getElementById('slideshowTrack')) {
    initSlideshow();
  }
  
  if (document.getElementById('portfolioGrid')) {
    initPortfolioGrid();
  }

  if (document.getElementById('servicesMarqueeTrack')) {
    initMarqueeBanner();
  }

  // Contact page form initialization
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
