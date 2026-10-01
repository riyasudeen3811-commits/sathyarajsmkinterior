// ==========================================================================
// STATS COUNTER ANIMATION MODULE
// ==========================================================================

export function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'), 10);
          let count = 0;
          const increment = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              num.innerText = target;
              clearInterval(timer);
            } else {
              num.innerText = count;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const heroStats = document.querySelector('.hero-stats-bar');
  if (heroStats) observer.observe(heroStats);
}
