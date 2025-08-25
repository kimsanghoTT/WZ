import { getPost, addPost } from "./community_db.js";
import { updatePosts } from "./community_board.js";

document.querySelector(".reels-btn")?.addEventListener("click", () => {
    handleModal("blockModalWrapper", "blockModal");
});
document.querySelector(".write-btn")?.addEventListener("click", () => {
    handleModal("postWriteModalWrapper", "postWriteModal");
});
document.body.addEventListener("click", async(e) => {
    const targetedCard = e.target.closest(".post-card, .board-best-item");
    if(!targetedCard) return;

    const getPostId = targetedCard.getAttribute("id");
    const postNumber = Number(getPostId.split("-")[1]);
    const targetedPost = await getPost(postNumber);

    handleModal("postDetailModalWrapper", "postDetailModal", targetedPost);
})

const handleModal = async (modalWrapperId, modalContentId, post) => {
    const modalWrapper = document.getElementById(modalWrapperId);
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

            console.log(modalContentId);

            if(modalContentId === "postWriteModal") writingPost(modalElement, modalWrapper);

            if(modalContentId === "postDetailModal") {
                detailPost(modalElement, post)

                const commentForm = modalElement.querySelector(".comment-input-form");
                const commentInput = modalElement.querySelector("#commentInput");
                
                commentForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const text = commentInput.value.trim();
                    if (!text) return;

                    postComment(text, modalElement); 
                    commentInput.value = "";
                });
            };

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
};

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
        const formattedTagList = tag ? tag.split(",").map(tag => `${tag.trim()}`) : [];

        const newPost = {
            title: modalElement.querySelector("input[id='title']").value,
            profile:"./source/image/profile.png",
            author: "user",
            summary: summary,
            content: content,
            thumbnail: thumbnail,
            like:0,
            dislike:0,
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
        gsap.to(modalElement, {y:"100%", opacity:0, duration:0.3,
            onComplete: () => {
                modalWrapper.classList.remove("active");
                document.documentElement.classList.remove("modal-active");
                modalWrapper.innerHTML = '';
            }
        });
    })

}

const detailPost = (modalElement, post) => {
    modalElement.querySelector(".post-category").textContent = post.category;
    modalElement.querySelector(".detail-title-area .modal-area-title").textContent = post.title;
    const infoBox = modalElement.querySelector(".content-info-box");
    const content = modalElement.querySelector(".content-main-box");
    const tagList = post.tag.map(tag => `<li class="tag"><span><span class="hash">#</span>${tag}</span></li>`).join("");
    const reactionBtns = modalElement.querySelector(".reaction-btn-list");
    modalElement.querySelector(".comment-input-form .comment-count").textContent = `${post.comment} Comments`

    infoBox.innerHTML =
    `
        <div class="user-profile">
            <img src="${post.profile}" alt="profile">
            <span>${post.author}</span> 
        </div>
        <span>|</span>
        <span>${post.date}</span>
        <span>|</span>
        <span class="comment-count">${post.comment}</span>
        <span class="like-count">${post.like}</span>
    `

    content.innerHTML = 
    `
        <ul class="tag-list">${tagList}</ul>
        <div class="content">${post.content}</div>
    `

    reactionBtns.innerHTML = 
    `
        <button class="like-btn">
            <span>${post.like}</span>
        </button>
        <button class="dislike-btn">
            <span>${post.dislike}</span>
        </button>
    `
}

const postComment = (text, modalElement) => {
    const commentList = modalElement.querySelector(".comment-list");
    const comment = document.createElement("li");
    const date = new Date();
    const formattedTime = new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    comment.className = "comment";
    comment.innerHTML = 
    `
        <div class="comment-content">
            <div class="comment-content-upper">
                <div class="comment-user-profile">
                    <img src="./source/image/profile.png" alt="프로필 사진">
                    <span>user</span>
                </div>
                <span>|</span>
                <span>${formattedTime}</span>
            </div>
            <div class="comment-cotent-lower">
                <p>${text}</p>
            </div>
        </div>
        <div class="comment-util">
            <button class="comment-like-btn"><span></span></button>
            <button class="comment-dislike-btn"><span></span></button>
        </div>
    `
    commentList.append(comment);
}