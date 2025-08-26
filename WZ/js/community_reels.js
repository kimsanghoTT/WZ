export const reelsDetail = (modalElement, modalWrapper, reels) => {
    const leftSection = modalElement.querySelector(".reels-form-left");
    const rightSection = modalElement.querySelector(".reels-form-right");
    const tagList = reels.tag.map(tag => `<li class="tag"><span><span class="hash">#</span>${tag}</span></li>`).join("");

    leftSection.innerHTML = 
    `
    <div class="video-container">
        <video src=${reels.video} loop autoplay controls type="mp4">
    </div>
    `

    rightSection.querySelector(".reels-form-content").innerHTML = 
    `
    <div class="user-info">
        <img src="./source/image/profile.png">
        <span>user</span>
    </div>
    <div class="reels-content-text">
        ${reels.context}
    </div>
    <ul class="tag-list">
        ${tagList}
    </ul>
    <div class="reels-form-util">
        <div class="reels-form-util-box">
            <button class="reels-form-like"><span class="ico"></span></button>
            <span class="reels-like-count">${reels.like}</span>
        </div>
        <div class="reels-form-util-box">
            <button class="reels-form-share"><span class="ico"></span></button>
            <span class="reels-share-count">${reels.share}</span>
        </div>
    </div>
    `
}