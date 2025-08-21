const handleModal = async (triggerSelector, modalWrapperId, modalContentId) => {
    const trigger = document.querySelector(triggerSelector);
    if (!trigger) return;

    trigger.addEventListener("click", async () => {
        const modalWrapper = document.getElementById(modalWrapperId);
        if (!modalWrapper) return;

        const response = await fetch('community_modals.html');
        const htmlText = await response.text();
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");

        const modalElement = parsedHTML.getElementById(modalContentId).cloneNode(true);
        console.log(modalElement);

        modalWrapper.innerHTML = '';
        modalWrapper.appendChild(modalElement);

        document.body.style.overflow = "hidden";

        modalWrapper.style.opacity = 1;
        modalWrapper.style.pointerEvents = "all";
        setTimeout(() => {
            modalWrapper.classList.add("active");
        }, 10);

        modalElement.addEventListener("wheel", (e) => {
            if (modalElement) {
                const isAtTop = modalElement.scrollTop === 0;
                const isAtBottom = modalElement.scrollHeight - modalElement.scrollTop === modalElement.clientHeight;

                if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                    e.preventDefault(); 
                    e.stopPropagation();
                } else {
                    e.stopPropagation();
                }
            } else {
                e.stopPropagation();
            }
        }, { passive: false });

        const closeBtn = modalElement.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modalWrapper.classList.remove("active");
                modalWrapper.style.opacity = 0;
                modalWrapper.style.pointerEvents = "none";
                document.body.style.overflow = ""; 
            });
        }
    });
};

// 모든 모달 적용
handleModal(".reels-btn", "blockModalWrapper", "blockModal");
handleModal(".write-btn", "postWriteModalWrapper", "postWriteModal");
handleModal(".post-card", "postDetailModalWrapper", "postDetailModal");
handleModal(".update-btn", "postUpdateModalWrapper", "postUpdateModal");
