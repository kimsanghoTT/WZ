import { handleModal } from "./community_board_modal.js";
import { updateBoard } from "./community_board.js";
import { updatePost, getPost } from "./community_db.js";

document.addEventListener('DOMContentLoaded', async () => {
    const renderHeader = async () => {
      const mainHeader = document.getElementById("mainHeader");
      
      const res = await fetch("layout.html");
      const htmlText = await res.text(); 

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html"); 
      const header = doc.getElementById("mainHeader").innerHTML; 
      
      mainHeader.innerHTML = header;
    };
    await renderHeader(); 

    const swiper = new Swiper(".reels-swiper", {
        slidesPerView: "4.5",
        spaceBetween: 30,
        freeMode: {
            enabled: true,
            momentumRatio: 0.3, 
            momentumVelocityRatio: 0.3 
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
            dragSize: 50
        },
    });

    const customProgressBar = document.querySelector('.swiper-custom-progressbar');

    swiper.on('progress', (swiper, progress) => {
        const progressWidth = progress * 100;
        customProgressBar.style.width = `${progressWidth}%`;
    });

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

        targetedPost.views++;
        await updatePost(targetedPost);
        const card = document.getElementById(`post-${targetedPost.id}`);

        if(card){
            card.querySelectorAll(".views").forEach(each => {
                each.textContent = `조회 ${targetedPost.views}`;
            })
        }
        await updateBoard();
        handleModal("postDetailModalWrapper", "postDetailModal", {post:targetedPost});
    })
});

const popularCheckbox = document.getElementById('popularCheck');
const popularCheckLabel = document.querySelector('.reels-sort-btn label');

popularCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    popularCheckLabel.classList.add("checked");
  } else {
    popularCheckLabel.classList.remove("checked");
  }
});



