document.addEventListener('DOMContentLoaded', () => {
    const renderHeader = async () => {
      const mainHeader = document.getElementById("mainHeader");
      
      const res = await fetch("layout.html");
      const htmlText = await res.text(); 

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html"); 
      const header = doc.getElementById("mainHeader").innerHTML; 
      
      mainHeader.innerHTML = header;
    };

    const swiper = new Swiper(".reels-swiper", {
        slidesPerView: "4.5",
        spaceBetween: 30,
        freeMode: {
            enabled: true,
            momentumRatio: 0.3, 
            momentumVelocityRatio: 0.3 
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
            dragSize: 50
        },
    });

    const customProgressBar = document.querySelector('.swiper-custom-progressbar');

    swiper.on('progress', (swiper, progress) => {
        const progressWidth = progress * 100;
        customProgressBar.style.width = `${progressWidth}%`;
    });
    renderHeader(); 
});

const popularCheckbox = document.getElementById('popularCheck');
const popularCheckLabel = document.querySelector('.reels-sort-btn label');

popularCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    popularCheckLabel.classList.add("checked");
  } else {
    popularCheckLabel.classList.remove("checked");
  }
});



