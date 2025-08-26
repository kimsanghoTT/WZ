/* benefit-section */
document.addEventListener('DOMContentLoaded', function () {
  const target = document.querySelector('.overlay-benefit');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // 한 번만 작동하게
      }
    });
  }, {
    threshold: 1.0
  });

  observer.observe(target);
});

document.addEventListener('DOMContentLoaded', function () {
  const target = document.querySelector('.benefit-img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // 한 번만 작동하게
      }
    });
  }, {
    threshold: 1.0
  });

  observer.observe(target);
});



/* community-section */
document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.community-item');

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