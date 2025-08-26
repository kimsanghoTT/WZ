
const swiper = new Swiper(".favorite_slider", {
     slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: true,
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