document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: "4",
        spaceBetween: 30,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },
    });
});