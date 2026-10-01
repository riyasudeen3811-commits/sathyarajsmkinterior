// ==========================================================================
// MODAL DIALOGS MODULE (Consultation Modal & Lightbox Modal)
// ==========================================================================

export function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (!modal) return;

  const openBtns = document.querySelectorAll('.open-consultation-btn');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('consultationForm');
  const success = document.getElementById('modalSuccessState');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        if (form) {
          form.reset();
          form.classList.remove('hidden');
        }
        if (success) success.classList.add('hidden');
      }, 400);
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBtn?.click();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
      if (success) success.classList.remove('hidden');
    });
  }
}

export function initLightboxModal() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBtn?.click();
  });
}

export function openLightbox(item) {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCategory');

  if (img) img.src = item.img;
  if (title) title.innerText = item.title;
  if (cat) cat.innerText = `${item.categoryLabel} • ${item.desc}`;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}
