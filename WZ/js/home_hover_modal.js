import {initPlayer } from "./home_iframe_player.js";

export const hoverModal = async (data, id, e) => {
    const hoveredContent = data.find(item => item.id === id);
    if(!hoveredContent) {
        hoverModalWrapper.classList.remove("active");
        return;
    };
    const hoverModalWrapper = document.getElementById("homeHoverModalWrapper");
    hoverModalWrapper.innerHTML = '';

    try{
        const response = await fetch("home_modals.html");
        const htmlText = await response.text();
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const modalElement = parsedHTML.getElementById("homeHoverModal")?.cloneNode(true);

        if (modalElement) {
            const iframe = modalElement.querySelector("#hoverModalIframe");
            iframe.src = hoveredContent.video;
            modalElement.querySelector(".title-row h3").textContent = hoveredContent.title;
            modalElement.querySelector(".content-rating .rating").textContent = hoveredContent.rating;
            modalElement.querySelector(".content-rating p").textContent = `에피소드 ${hoveredContent.episode}개`

            const tagList = hoveredContent.tag.slice(0,3).map(tag => {
                return `<li class="tag"><span><span class="hash">#</span>${tag}</span></li>`
            }).join("");
            modalElement.querySelector(".hover-modal-tags").innerHTML = tagList;

            switch(hoveredContent.rating){
                case "ALL":
                    modalElement.querySelector(".rating").style.backgroundColor = "#1CA40C";
                    break;
                case "12+":
                    modalElement.querySelector(".rating").style.backgroundColor = "#E5B200";
                    break;
                case "15+":
                    modalElement.querySelector(".rating").style.backgroundColor = "#DD8100";
                    break;
                case "18+":
                    modalElement.querySelector(".rating").style.backgroundColor = "#D60000";
                    break;
            }


            // 커서 기준 위치
            modalElement.style.left = `${e.clientX}px`;
            modalElement.style.top = `${e.clientY}px`;

            hoverModalWrapper.append(modalElement);
            gsap.fromTo(modalElement, { opacity:0 }, { opacity:1, duration:0.3 });
            hoverModalWrapper.classList.add("active");

            const videoURL = hoveredContent.video;
            const videoId = videoURL.split('/embed/')[1].split('?')[0];

            initPlayer(iframe, modalElement, videoId);
        }
    }
    catch(error){
        console.error(error)
    }

}
