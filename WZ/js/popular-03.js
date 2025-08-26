document.querySelectorAll('.popular_slider').forEach((el) => {
  new Swiper(el, {
    slidesPerView: 5,
    slidesPerGroup: 4,
    speed: 700,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: el.querySelector('.swiper-button-next'),
      prevEl: el.querySelector('.swiper-button-prev'),
    },
  });
});