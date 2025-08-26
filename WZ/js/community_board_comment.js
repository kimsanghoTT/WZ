import { updatePost } from "./community_db.js";
import { filteredPosts, updateBoard } from "./community_board.js";
import { currentPage } from "./community_init.js";

export const postComment = async (text, modalElement, post) => {
    const commentList = modalElement.querySelector(".comment-list");
    const date = new Date();
    const formattedTime = new Intl.DateTimeFormat('ko-KR', { 
        hour:'2-digit', minute:'2-digit', hour12:false 
    }).format(date);

    const comment = { 
        text, 
        time: formattedTime, 
        like:0, 
        dislike:0 
    };
    const comments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
    comments.push(comment);
    localStorage.setItem(`comment-${post.id}`, JSON.stringify(comments));

    renderComments(comment, commentList, post);

    post.comment++;
    await updatePost(post);
    modalElement.querySelectorAll(".comment-count").forEach(each => each.textContent = post.comment);

    const card = document.getElementById(`post-${post.id}`);
    if(card) {
        card.querySelectorAll(".comment-count").forEach(each => each.textContent = post.comment)
    };
    await updateBoard(currentPage, filteredPosts);
};

export const renderComments = (comment, commentList, post) => {
    const commentItem = document.createElement("li");
    commentItem.className = "comment";
    commentItem.innerHTML = `
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
    `;
    commentList.append(commentItem);

    commentItem.querySelector(".comment-like-btn").addEventListener("click", () => {
        comment.like++;

        commentItem.querySelector(".comment-like-btn span").textContent = comment.like;

        const comments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
        const idx = comments.findIndex(c => c.time===comment.time && c.text===comment.text);
        comments[idx].like = comment.like;

        localStorage.setItem(`comment-${post.id}`, JSON.stringify(comments));
    }, {once:true});

    commentItem.querySelector(".comment-dislike-btn").addEventListener("click", () => {
        comment.dislike++;

        commentItem.querySelector(".comment-dislike-btn span").textContent = comment.dislike;

        const comments = JSON.parse(localStorage.getItem(`comment-${post.id}`)) || [];
        const idx = comments.findIndex(c => c.time===comment.time && c.text===comment.text);
        comments[idx].dislike = comment.dislike;

        localStorage.setItem(`comment-${post.id}`, JSON.stringify(comments));
    }, {once:true});
};