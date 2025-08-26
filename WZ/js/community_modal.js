import { deletePost, updatePost, getPost, addPost } from "./community_db.js";
import { updateBoard } from "./community_board.js";



const handleModal = async (modalWrapperId, modalContentId, options = {}) => {
    const post = options.post;
    
    const modalWrapper = document.getElementById(modalWrapperId);
    if (!modalWrapper) return;
    modalWrapper.innerHTML = '';

    try {
        const response = await fetch('community_modals.html');
        const htmlText = await response.text();
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const modalElement = parsedHTML.getElementById(modalContentId)?.cloneNode(true);

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
        
        if (modalElement) {
            modalWrapper.appendChild(modalElement);
            modalWrapper.classList.add("active");
            document.documentElement.classList.add("modal-active");

            //글쓰기 버튼 클릭 시
            if(modalContentId === "postWriteModal") writingPost(modalElement, modalWrapper, options, closeModal);

            //게시판에서 게시물 카드 클릭 시
            if(modalContentId === "postDetailModal") {
                detailPost(modalElement, post);

                const commentList = modalElement.querySelector(".comment-list");
                const getComments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
                getComments.forEach(comment => renderComments(comment, commentList, post));

                const commentForm = modalElement.querySelector(".comment-input-form");
                const commentInput = modalElement.querySelector("#commentInput");

                commentForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const text = commentInput.value.trim();
                    if (!text || !post) return;

                    postComment(text, modalElement, post); 
                    commentInput.value = "";
                });

                const likeBtn = modalElement.querySelector(".like-btn");
                const dislikeBtn = modalElement.querySelector(".dislike-btn");
                const writeBtn = modalElement.querySelector(".write-btn");
                const updateBtn = modalElement.querySelector(".update-btn");
                const deleteBtn = modalElement.querySelector(".delete-btn");
                const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
                const dislikedPosts = JSON.parse(localStorage.getItem("dislikedPosts")) || [];

                likeBtn.addEventListener("click", async () => {
                    if(likedPosts.includes(post.id)){
                        alert("이미 좋아요를 누르셨습니다.");
                        return;
                    }
                    post.like++;
                    await updatePost(post);

                    likedPosts.push(post.id);
                    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

                    likeBtn.querySelector("span").textContent = post.like;
                    const card = document.getElementById(`post-${post.id}`);

                    if(card){
                        card.querySelectorAll(".like-count").forEach(each => {
                            each.textContent = post.like;
                        })
                        modalElement.querySelector(".like-count").textContent = post.like;
                    }
                    await updateBoard();
                }, {once:true})

                dislikeBtn.addEventListener("click", async () => {
                    if(dislikedPosts.includes(post.id)){
                        alert("이미 싫어요를 누르셨습니다.");
                        return;
                    }
                    post.dislike++;
                    await updatePost(post);

                    dislikedPosts.push(post.id);
                    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

                    dislikeBtn.querySelector("span").textContent = post.dislike;
                })

                writeBtn.addEventListener("click", () => {
                    closeModal();
                    handleModal("postWriteModalWrapper", "postWriteModal");
                })
                updateBtn.addEventListener("click", () => {
                    closeModal();
                    handleModal("postWriteModalWrapper", "postWriteModal", {mode:"update", post:post});
                })
                deleteBtn.addEventListener("click", async () => {
                    const check = confirm("게시글을 삭제하시겠습니까?");
                    if(!check){
                        return;
                    }
                    await deletePost(post.id);
                    alert("삭제되었습니다.");

                    await updateBoard();
                    closeModal();   
                })
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

const writingPost = (modalElement, modalWrapper, options, closeModal) => {
    // Quill 에디터 초기화
    const quill = new Quill(modalElement.querySelector('#editor'), {
        modules: {
            toolbar: modalElement.querySelector('#toolbar')
        },
        theme: 'snow'
    });

    if(options.mode === "update" && options.post){
        modalElement.querySelector("#title").value = options.post.title;
        modalElement.querySelector("#tag").value = options.post.tag.join(", ");
        modalElement.querySelector(".selected-category").textContent = options.post.category;
        quill.root.innerHTML = options.post.content;
    }

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

        const img = quill.root.querySelector("img");
        const thumbnail = img ? img.getAttribute("src") : "./source/image/profile.png";
        const plainText = quill.getText().trim();
        const lines = plainText.split("\n").filter(line => line.trim() !== "");
        const summary = lines.slice(0, 2).join(" ")
        const content = quill.root.innerHTML;
        const tag = modalElement.querySelector("#tag").value;
        const formattedTagList = tag ? tag.split(",").map(tag => `${tag.trim()}`) : [];
        const date = new Date();
        const formattedTime = new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);

        if (!content || content.trim() === "<p><br></p>") {
            alert("내용을 입력해주세요.");
            return;
        }

        if(options.mode === "update" && options.post){
            options.post.title = modalElement.querySelector("#title").value,
            options.post.summary = summary;
            options.post.content = content,
            options.post.thumbnail = thumbnail;
            options.post.date = formattedTime;
            options.post.category = selectedCategory.textContent;
            options.post.tag = formattedTagList;

            await updatePost(options.post);
            await updateBoard();

            const directToDetail = await getPost(options.post.id);
            closeModal();
            handleModal("postDetailModalWrapper", "postDetailModal", {post:directToDetail});

        }
        else{
            const newPost = {
                title: modalElement.querySelector("#title").value,
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

            const newPostId = await addPost(newPost);
            await updateBoard();

            const directToDetail = await getPost(newPostId);
            closeModal();
            handleModal("postDetailModalWrapper", "postDetailModal", {post:directToDetail});
        }
    })
    const cancel = modalElement.querySelector(".cancel-btn");

    cancel.addEventListener("click", () => {
        if(options.mode === "update"){
            closeModal();
            handleModal("postDetailModalWrapper", "postDetailModal", {post:options.post});
        }
        else{
            gsap.to(modalElement, {y:"100%", opacity:0, duration:0.3,
                onComplete: () => {
                    modalWrapper.classList.remove("active");
                    document.documentElement.classList.remove("modal-active");
                    modalWrapper.innerHTML = '';
                }
            });
        }

    })

}

const detailPost = (modalElement, post) => {
    modalElement.querySelector(".post-category").textContent = post.category;
    modalElement.querySelector(".detail-title-area .modal-area-title").textContent = post.title;
    const infoBox = modalElement.querySelector(".content-info-box");
    const content = modalElement.querySelector(".content-main-box");
    const tagList = post.tag.map(tag => `<li class="tag"><span><span class="hash">#</span>${tag}</span></li>`).join("");
    const reactionBtns = modalElement.querySelector(".reaction-btn-list");
    modalElement.querySelector(".comment-input-form .comment-count").textContent = `${post.comment}`

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
        <span>|</span>
        <span class>조회 ${post.views}</span>
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

const postComment = async (text, modalElement, post) => {
    const commentList = modalElement.querySelector(".comment-list");
    const date = new Date();
    const formattedTime = new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    const comment = {
        text,
        time: formattedTime,
        like:0,
        dislike:0
    }

    const comments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
    comments.push(comment);
    localStorage.setItem(`comment-${post.id}`, JSON.stringify(comments));
    renderComments(comment, commentList, post);

    post.comment++; 
    await updatePost(post);
    const card = document.getElementById(`post-${post.id}`);

    if(card){
        card.querySelectorAll(".comment-count").forEach(each => {
            each.textContent = `${post.comment}`;
        });
        modalElement.querySelectorAll(".comment-count").forEach(each => {
            each.textContent = `${post.comment}`;
        })
    }
    await updateBoard();
}

const renderComments = (comment, commentList, post) => {
    const commentItem = document.createElement("li");
    commentItem.className = "comment";
    commentItem.innerHTML = 
    `
        <div class="comment-content">
            <div class="comment-content-upper">
                <div class="comment-user-profile">
                    <img src="./source/image/profile.png" alt="프로필 사진">
                    <span>user</span>
                </div>
                <span>|</span>
                <span>${comment.time}</span>
            </div>
            <div class="comment-cotent-lower">
                <p>${comment.text}</p>
            </div>
        </div>
        <div class="comment-util">
            <button class="comment-like-btn"><span>${comment.like}</span></button>
            <button class="comment-dislike-btn"><span>${comment.dislike}</span></button>
        </div>
    `
    commentList.append(commentItem);

    const commentLikeBtn = commentItem.querySelector(".comment-like-btn");
    const commentDislikeBtn = commentItem.querySelector(".comment-dislike-btn");

    commentLikeBtn.addEventListener("click", () => {
        comment.like++;
        commentLikeBtn.querySelector("span").textContent = comment.like;

        const comments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
        const idx = comments.findIndex(target => target.time === comment.time && target.text === comment.text);
        comments[idx].like = comment.like;
        localStorage.setItem(`comment-${post.id}`, JSON.stringify(comments));
    }, {once:true});

    commentDislikeBtn.addEventListener("click", () => {
        comment.dislike++;
        commentDislikeBtn.querySelector("span").textContent = comment.dislike;

        const comments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
        const idx = comments.findIndex(target => target.time === comment.time && target.text === comment.text);
        comments[idx].dislike = comment.dislike;
        localStorage.setItem(`comment-${post.id}`, JSON.stringify(comments));
    }, {once:true});
}