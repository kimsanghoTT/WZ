document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('h2');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 1.0 
  });

  targets.forEach(target => observer.observe(target));
});