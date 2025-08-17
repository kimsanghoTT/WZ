import { getAllPosts } from "./db";

const postList = document.getElementById("postList");

const getAllItem = async () => {
    const posts = await getAllPosts();

    if(posts.length === 0){
        postList.innerHTML = `<li>등록된 게시글이 없습니다.</li>`;
    }
    postList.innerHTML = posts.map(post => 
        `<li>
            <div>
                <a href="detail.html?id=${post.id}">${post.title}</a>          
            </div>
            <div>
                <span>${post.createdAt}</span>
                <span></span>
            </div>
        </li>`

    ).join('');
}

getAllItem();