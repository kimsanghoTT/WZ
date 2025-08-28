export const hoverModal = async (data, id, e) => {
    const hoveredContent = data.find(item => item.id === id);
    if(!hoveredContent) hoverModalWrapper.classList.remove("active");
    console.log(hoveredContent);

    const tagList = hoveredContent.tag.map(tag => `<li class="tag"><span><span class="hash">#</span>${tag}</span></li>`).join("");

    const hoverModalWrapper = document.getElementById("homeHoverModalWrapper");
    hoverModalWrapper.innerHTML = '';

    try{
        const response = await fetch("home_modals.html");
        const htmlText = await response.text();
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const modalElement = parsedHTML.getElementById("homeHoverModal")?.cloneNode(true);

        if (modalElement) {
            modalElement.innerHTML =
            `
                <div class="modal-video-section">
                    <iframe 
                        id="hoverModalIframe"
                        src="${hoveredContent.video}" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen>
                    </iframe>
                    <div class="gradient-overlay"></div>
                </div>
                <div class="modal-info-section">
                    <div>
                        <div class="title-row">
                            <h3>${hoveredContent.title}</h3>
                            <div class="modal-play-icon"><span><img src="/source/image/ico/ico_play.png" alt=""></span></div>
                        </div>

                        <div class="inner-plus">
                            <a href="#">
                                <h4>더보기</h4>
                                <div class="plus"></div>
                            </a>
                        </div>
                    </div>
                    <div class="content-tags">
                        <div class="content-inner">
                            <span class="content">15</span> <p>에피소드 ${hoveredContent.episode}개</p>
                        </div>
                        <ul class="tags">
                            ${tagList}
                        </ul>
                    </div>
                </div>
            `

            // 커서 기준 위치
            modalElement.style.left = `${e.clientX}px`;
            modalElement.style.top = `${e.clientY}px`;

            hoverModalWrapper.append(modalElement);
            gsap.fromTo(modalElement, { opacity:0 }, { opacity:1, duration:0.3 });
            hoverModalWrapper.classList.add("active");

            const videoURL = hoveredContent.video;
            const videoId = videoURL.split('/embed/')[1].split('?')[0];

            let player;

            // YouTube Iframe API 로드 시점을 감지하고 플레이어 객체를 생성합니다.
            window.onYouTubeIframeAPIReady = function() {
                player = new YT.Player(iframeId, {
                    videoId: videoId,
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            };

            // 플레이어 준비가 완료되면 실행될 함수입니다.
            function onPlayerReady(event) {
                const playButton = modalElement.querySelector('.modal-play-icon');
                if (!playButton) return;

                // 커스텀 재생 버튼에 클릭 이벤트를 추가합니다.
                playButton.addEventListener('click', () => {
                    if (event.target.getPlayerState() === YT.PlayerState.PLAYING) {
                        event.target.pauseVideo();
                    } else {
                        event.target.playVideo();
                    }
                });
            }
        }
    }
    catch(error){
        console.error(error)
    }


}

export const clickModal = (data, id) => {

}