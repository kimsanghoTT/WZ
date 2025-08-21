let boardPostsDB;
let posts = [];
let currentPage = 1;
const POSTS_PER_PAGE = 12;
const MAX_PAGINATION_PER_PAGE = 10;

// indexedDB 초기화
const { openDB } = idb;
const initDB = async () => {
    boardPostsDB = await openDB('boardDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("posts")) {
                const store = db.createObjectStore("posts", { keyPath: "id", autoIncrement: true });
                store.createIndex('createAt', 'createAt', { unique: false });
            }
        }
    });
};

const getAllPosts = async () => {
    posts = await boardPostsDB.getAll("posts");
};

const renderPosts = (displayPosts) => {
    const boardGrid = document.querySelector(".board-grid");
    boardGrid.innerHTML = '';

    if (displayPosts.length === 0) {
        boardGrid.innerHTML = 
        `
        <div class="no-data">
             <p>게시물이 없습니다.</p>   
        </div>
        `;
        return;
    }

    displayPosts.forEach(post => {
        const card = document.createElement("div");
        card.className = "post-card";

        card.innerHTML = `
        <div class="post-thumbnail">
            <img src="${post.thumbnail}" alt="프로필사진">
        </div>
        <div class="post-info">
            <p class="post-title">${post.title}</p>
            <div class="post-additional-util">
                <span class="ico like">${post.like}</span>
                <span class="ico comment">${post.comment}</span>
            </div>
            <div class="post-info-detail">
                <span>${post.author}</span>|
                <span>조회 ${post.views}</span>|
                <span>날짜 ${post.date}</span>
            </div>
        </div>`;
        boardGrid.append(card);
    });
};

const renderPagination = (totalPages) => {
    const startPageNum = Math.floor((currentPage - 1) / MAX_PAGINATION_PER_PAGE) * MAX_PAGINATION_PER_PAGE + 1;
    const endPageNum = Math.min(startPageNum + MAX_PAGINATION_PER_PAGE - 1, totalPages);

    const paginationList = document.querySelector(".pagination-list");
    paginationList.innerHTML = '';

    for (let i = startPageNum; i <= endPageNum; i++) {
        const page = document.createElement("li");
        page.className = "page";

        const paginationBtn = document.createElement("button");
        if (currentPage === i) {
            paginationBtn.style.fontWeight = "bold";
            paginationBtn.style.opacity = 1;
        }
        paginationBtn.innerHTML = `<span>${i}</span>`;
        paginationBtn.addEventListener("click", () => {
            currentPage = i;
            updatePosts();
        });

        page.append(paginationBtn);
        paginationList.append(page);
    }
};

const renderBestPosts = () => {
    const medals = ["gold", "silver", "bronze"];
    const bestPosts = [...posts].sort((a, b) => b.like - a.like).slice(0, 3);

    const bestList = document.querySelector(".board-best-list");
    bestList.innerHTML = '';

    bestPosts.forEach((post, index) => {
        const bestItem = document.createElement("li");
        const medal = medals[index] || "gold";
        bestItem.className = "board-best-item";
        bestItem.innerHTML = `
        <div class="best-medal ${medal}"><span class="ico"></span></div>
        <div class="best-post">
            <div class="best-user-profile">
                <img src="${post.profile}" alt="프로필사진">
                <span>${post.author}</span>
            </div>
            <div class="best-post-summary">
                <p class="best-title">${post.title}</p>
                <p class="best-content">${post.content}</p>
            </div>
            <div class="best-additional-util">
                <div class="best-like">
                    <span class="ico"></span>
                    <span>${post.like}</span>
                </div>
                <div class="best-comment">
                    <span class="ico"></span>
                    <span>${post.comment}</span>
                </div>
            </div>
        </div>
        <div class="best-thumbnail">
            <img src="${post.thumbnail}" alt="프로필사진">
        </div>`;
        bestList.append(bestItem);
    });
};

const updatePosts = () => {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startPostNum = (currentPage - 1) * POSTS_PER_PAGE;
    const endPostNum = startPostNum + POSTS_PER_PAGE;
    const displayPosts = posts.slice(startPostNum, endPostNum);

    renderPosts(displayPosts);
    renderPagination(totalPages);
    renderBestPosts();

    document.querySelector(".prev-btn").disabled = currentPage === 1;
    document.querySelector(".next-btn").disabled = currentPage === totalPages;
};

const init = async () => {
    await initDB();
    await getAllPosts();
    updatePosts();
    console.log(posts);

    document.querySelector(".prev-btn").addEventListener("click", () => {
        currentPage--;
        updatePosts();
    });
    document.querySelector(".next-btn").addEventListener("click", () => {
        currentPage++;
        updatePosts();
    });
};

init();
