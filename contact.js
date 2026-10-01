// ==========================================================================
// CONTACT PAGE FORM MODULE
// ==========================================================================

export function initContactForm() {
  const pageForm = document.getElementById('contactPageForm');
  if (pageForm) {
    pageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      pageForm.classList.add('hidden');
      const successMsg = document.getElementById('pageFormSuccess');
      if (successMsg) successMsg.classList.remove('hidden');
    });
  }
}
