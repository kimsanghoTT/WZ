var swiper = new Swiper(".main-Autoplay-Swiper", {
            effect: 'fade',
            loof: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: ".main-Autoplay-Swiper .swiper-pagination",
                clickable: true,
                type: "bullets"
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
        const Texts = document.querySelectorAll('.slide-overlay-text');

        Texts.forEach(el => {
            el.addEventListener('mouseenter', () => {
                swiper.autoplay.stop();
            });
            el.addEventListener('mouseleave', () => {
                swiper.autoplay.start();
            });
        });