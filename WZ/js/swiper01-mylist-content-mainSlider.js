
const swiper = new Swiper(".favorie_slider", {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      /* pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }, */
    });