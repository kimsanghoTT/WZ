document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-wrapper');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        logo.classList.add('show');
        observer.unobserve(logo);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(logo);
});