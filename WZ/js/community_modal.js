import { getPost, addPost } from "./community_db.js";
import { updatePosts } from "./community_board.js";

const handleModal = (triggerSelector, modalWrapperId, modalContentId) => {
    const trigger = document.querySelector(triggerSelector);
    if (!trigger) return;

    trigger.addEventListener("click", async () => {
        const modalWrapper = document.getElementById(modalWrapperId);
        gsap.registerPlugin(ScrollToPlugin) 

        if (!modalWrapper) return;
        modalWrapper.innerHTML = '';

        try {
            const response = await fetch('community_modals.html');
            const htmlText = await response.text();
            
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(htmlText, "text/html");
            const modalElement = parsedHTML.getElementById(modalContentId)?.cloneNode(true);
            
            if (modalElement) {
                modalWrapper.appendChild(modalElement);
                modalWrapper.classList.add("active");
                document.documentElement.classList.add("modal-active");

                console.log(modalElement);

                if(modalContentId === "postWriteModal") writingPost(modalElement, modalWrapper);

                if(modalContentId === "postDetailModal") detailPost(modalElement, modalWrapper)

                gsap.fromTo(modalElement, {y:"100%", opacity:0}, {y:0, opacity:1, duration:0.5});
                
                const closeModal = () => {
                    gsap.to(modalElement, {y:"100%", opacity:0, duration:0.3,
                        onComplete: () => {
                            modalWrapper.classList.remove("active");
                            document.documentElement.classList.remove("modal-active");
                            modalWrapper.innerHTML = '';
                        }
                    });
                };
                
                const closeBtn = modalElement.querySelector(".close-btn");
                if (closeBtn) {
                    closeBtn.addEventListener("click", closeModal);
                }

            }
        } catch (error) {
            console.error(error);
        }
    });
};

// 모든 모달 적용
handleModal(".reels-btn", "blockModalWrapper", "blockModal");
handleModal(".write-btn", "postWriteModalWrapper", "postWriteModal");
handleModal(".update-btn", "postUpdateModalWrapper", "postUpdateModal");

const writingPost = (modalElement, modalWrapper) => {
    // Quill 에디터 초기화
    const quill = new Quill(modalElement.querySelector('#editor'), {
        modules: {
            toolbar: modalElement.querySelector('#toolbar')
        },
        theme: 'snow'
    });

    const categorySelector = modalElement.querySelector(".category-selector");
    const categoryList = modalElement.querySelector(".category-list");
    const selectedCategory = modalElement.querySelector(".selected-category");
    const categoryItems = modalElement.querySelectorAll(".category-list li");

    categorySelector.addEventListener("click", () => {
        categoryList.classList.toggle("active");
    });

    categoryItems.forEach(item => {
        item.addEventListener("click", () => {
            const value = item.querySelector("span").textContent;
            selectedCategory.textContent = value;
            categoryList.classList.remove("active");
        })
    })

    const upload = modalElement.querySelector("#uploadBtn")
        
    upload.addEventListener("click", async (e) => {
        e.preventDefault();

        const date = new Date();
        const formattedTime = new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);

        const img = quill.root.querySelector("img");
        const thumbnail = img ? img.getAttribute("src") : "./source/image/profile.png";

        const plainText = quill.getText().trim();
        const lines = plainText.split("\n").filter(line => line.trim() !== "");
        const summary = lines.slice(0, 2).join(" ")

        const content = quill.root.innerHTML;

        const tag = modalElement.querySelector("input[id='tag']").value;
        const formattedTagList = tag ? tag.split(",").map(tag => `#${tag.trim()}`) : [];

        const newPost = {
            title: modalElement.querySelector("input[id='title']").value,
            profile:"./source/image/profile.png",
            author: "user",
            summary: summary,
            content: content,
            thumbnail: thumbnail,
            like:0,
            comment:0,
            views:0,
            date: formattedTime,
            category: selectedCategory.textContent,
            tag:formattedTagList
        }

        if (!content || content.trim() === "<p><br></p>") {
            alert("내용을 입력해주세요.");
            return;
        }

        await addPost(newPost);
        await updatePosts();

        modalWrapper.classList.remove("active");
        modalWrapper.innerHTML = '';
    })
    const cancel = modalElement.querySelector(".cancel-btn");

    cancel.addEventListener("click", () => {
        modalWrapper.classList.remove("active");
        document.documentElement.classList.remove("modal-active");
        modalWrapper.innerHTML = '';
    })

}

const detailPost = (modalElement, modalWrapper) => {
    document.body.addEventListener("click", async (e) => {
        const card = e.target.closest(".post-card, .board-best-item");
        if (!card) return;

        const getPostId = card.getAttribute("id");
        const postNumber = Number(getPostId.split("-")[1]);
        const targetPost = await getPost(postNumber);
        console.log(targetPost);
    });

}


