const blockModal = document.querySelector(".reels-btn").addEventListener("click", () => {
    const getModal = async () => {
        const blockModalWrapper = document.getElementById("blockModalWrapper");
        const res = await fetch('community_modals.html');
        const htmlText = await res.text(); 

        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html"); 
        const blockModal = parsedHTML.getElementById("blockModal").innerHTML; 

        blockModalWrapper.innerHTML = blockModal;
        blockModalWrapper.style.display = "flex";

        const closeBtn = blockModalWrapper.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
            blockModalWrapper.style.display = "none";
        });
        
    }
    getModal();
})

const postWriteFormModal = document.querySelector(".write-btn").addEventListener("click", () => {
    const getModal = async () => {
        const postWriteModalWrapper = document.getElementById("postWriteModalWrapper");
        const res = await fetch('community_modals.html');
        const htmlText = await res.text();

        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const postWriteModal = parsedHTML.getElementById("postWriteModal").innerHTML;

        postWriteModalWrapper.innerHTML = postWriteModal;
        postWriteModalWrapper.style.display = "block";

        const closeBtn = postWriteModalWrapper.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
            postWriteModalWrapper.style.display = "none";
        });
    }
    getModal();
})

const postDetailFormModal = document.querySelector(".post-card").addEventListener("click", () => {
    const getModal = async () => {
        const postDetailModalWrapper = document.getElementById("postDetailModalWrapper");
        const res = await fetch('community_modals.html');
        const htmlText = await res.text();

        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const postDetailModal = parsedHTML.getElementById("postDetailModal").innerHTML;

        postDetailModalWrapper.innerHTML = postDetailModal;
        postDetailModalWrapper.style.display = "block";

        const closeBtn = postDetailModalWrapper.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
            postDetailModalWrapper.style.display = "none";
        });
    }
    getModal();
})

const postUpdateFormModal = document.querySelector(".update-btn").addEventListener("click", () => {
    const getModal = async () => {
        const postUpdateModalWrapper = document.getElementById("postUpdateModalWrapper");
        const res = await fetch('community_modals.html');
        const htmlText = await res.text();

        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const postUpdateModal = parsedHTML.getElementById("postUpdateModal").innerHTML;

        postUpdateModalWrapper.innerHTML = postUpdateModal;
        postUpdateModalWrapper.style.display = "block";

        const closeBtn = postUpdateModalWrapper.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => {
            postUpdateModalWrapper.style.display = "none";
        });
    }
    getModal();
})