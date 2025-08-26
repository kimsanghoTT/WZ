
/* header */
document.querySelector("#searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const WORD = document.getElementById('mainSearch').value.trim();

    if (WORD.length === 0) {
        alert("검색어를 입력해주세요");
        return;
    }

    window.location.href = `search.html?query=${encodeURIComponent(WORD)}`;
});

const fetchData = async () => {
    const res = await fetch('./data.json');
    const data = await res.json();
    const dataArray = Object.values(data);
    return dataArray;
}

/* render */

document.addEventListener('DOMContentLoaded', async () => {
    const URL = new URLSearchParams(window.location.search);
    const query = URL.get('query')?.toLowerCase() || '';
    console.log(query);

    if (!query) return;

    const data = await fetchData();
    const DataAll = data.find(item => item.id.toLowerCase() === query);

    if (DataAll) {
        const Main = document.getElementById('detail-main');
        const Info1 = document.getElementById('work-info');
        const Episode = document.getElementById('episode-list');

        const MainDiv = document.createElement('div');
        const InfoDive01 = document.createElement('div');
        const InfoDiv02 = document.createElement('div');
        const EpisodeDiv = document.createElement('div');

        MainDiv.classList.add('main-text');
        InfoDive01.classList.add('info01');
        InfoDiv02.classList.add('info02');
        EpisodeDiv.classList.add('episodeAll');

        /* bg css */
        Main.style.background = `
  linear-gradient(to bottom, rgba(0, 0, 0, 0.3), #21252B 99%),
  url(${DataAll.image_default})`;
        Main.style.backgroundRepeat = 'no-repeat';
        Main.style.backgroundPosition = 'center';
        Main.style.backgroundSize = 'cover';


        MainDiv.innerHTML = `
                    <h2>${DataAll.title}</h2>
                    <img src="source/image/content-detail/like02.png" alt="">
                    <img src="source/image/content-detail/top01.png" alt="">`
        InfoDive01.innerHTML = `
                <div class="info-title">
                <h3>줄거리</h3>
                <a href="#"><img src="source/image/content-detail/share.png" alt="share"></a>
                </div>
                <p>${DataAll.summary}</p>`;


        /* 관람가 배경색 */
        const rating = DataAll.rating;

        let backgroundColor = "";
        if (rating === 'ALL') {
            backgroundColor = "#2196F3";
        } else if (rating === '18+') {
            backgroundColor = "#F44336";
        } else if (rating === '15+') {
            backgroundColor = "#FF9800";
        } else {
            backgroundColor = "#4CAF50";
        }



        InfoDiv02.innerHTML = `
                        <h3><span style="background-color: ${backgroundColor};">${DataAll.rating}</span>작품정보</h3>
                        <ul class="info02-text">
                            <li><span>출연 :</span> ${DataAll.cast}</li>
                            <li><span>장르 :</span> ${DataAll.category}</li>
                            <li><span>감독 :</span> ${DataAll.director}</li>
                            <li><span>제작사 :</span> ${DataAll.production}</li>
                            <li>${DataAll.tag.map(tag => `#${tag.trim()}`).join(' ')}</li>
                        </ul>
                        <div class="info02-ico">
                        </div>`;

        EpisodeDiv.innerHTML = `
                        <h3>전체회차</h3>
                        <span>전체회차 ${DataAll.episode}개</span>
                        <div class="All-list">    
                        <div class="list">
                        </div>           
                        </div>`
                        

        // 별점,% 랜덤
        function randomstar(min, max) {
            const random = Math.random() * (max - min) + min;
            return random.toFixed(1);
        }

        function randompercent(min, max) {
            const random = Math.random() * (max - min) + min;
            return random.toFixed(1);  // 소수점 첫째자리까지 표시
        }


        const episodehtml = EpisodeDiv.querySelector('.list');

        episodehtml.innerHTML = '';

        for (let i = 0; i < DataAll.episodeGuide.length; i++) {
            const ep = DataAll.episodeGuide[i];
            const starspan = randomstar(3.8, 5.0);
            const percentspan = randompercent(45, 55);

            episodehtml.innerHTML += `
                                    <div class="listN">
                                        <img src="${DataAll.image_default}" alt="">
                                            <div class="list-text">
                                                <h4>${ep.number}회차: ${ep.title}</h4>
                                                <div class="list-icons">
                                                <i class="xi-star"><span>${starspan}</span></i> 
                                                <span>${percentspan}</span>
                                                <a href=""><img src="source/image/content-detail/share.png" alt=""></a>
                                                </div>
                                            </div>
                                    </div>`
        }
        Main.appendChild(MainDiv);
        Info1.appendChild(InfoDive01);
        Info1.appendChild(InfoDiv02);
        Episode.appendChild(EpisodeDiv);

    }

    /* 댓글 */
    const ptitles = document.getElementsByClassName('review-text');

    Array.from(ptitles).forEach(title => {
        const p = title.getElementsByTagName('p')[0];
        const span = document.createElement('span');
        span.innerHTML = `${DataAll.title}`;
        p.prepend(span);
    });

})




/* 댓글 렌더링 */

document.querySelectorAll('.review-text-icons .xi-heart').forEach(item => {
    item.addEventListener('click', function () {
        const Hspan = item.nextElementSibling;
        const HNum = parseInt(Hspan.textContent);
        Hspan.textContent = HNum + 1;
    }, { once: true })
})

document.querySelectorAll('.review-text-icons .xi-emoticon-sad').forEach(item => {
    item.addEventListener('click', function () {
        const Sspan = item.nextElementSibling;
        const SNum = parseInt(Sspan.textContent);
        Sspan.textContent = SNum + 1;
    }, { once: true })
})


document.getElementById('review-button').addEventListener('click', function (e) {
    e.preventDefault();
    const reviewResult = document.getElementById('review-input');
    const reviewText = reviewResult.value.trim();
    if (reviewText === '') return;

    const reviewList = document.getElementsByClassName('review-list')[0];

    const reviewRender = document.createElement('div');
    reviewRender.classList.add('list');

    reviewRender.innerHTML = `<img src="source/image/profile.png" alt=""><span>user</span>
                            <div class="review-text">
                                <p>${reviewText}</p>
                                <ul class="review-text-icons">
                                    <li><i class="xi-heart"></i><span class="hNum">0</span></li>
                                    <li><i class="xi-emoticon-sad"></i><span class="sNum">0</span></li>
                                </ul>
                            </div>`
    reviewList.appendChild(reviewRender);

    reviewList.prepend(reviewRender);

    reviewResult.value = '';

    const Heart = reviewRender.querySelector('.xi-heart');
    const Sad = reviewRender.querySelector('.xi-emoticon-sad');
    const HNum = reviewRender.querySelector('.hNum');
    const sNum = reviewRender.querySelector('.sNum');


    Heart.addEventListener('click', function (e) {
        e.preventDefault();
        let heartNum = parseInt(HNum.textContent) || 0;
        heartNum++;
        HNum.textContent = heartNum;
    }, { once: true })

    Sad.addEventListener('click', function (e) {
        e.preventDefault();
        let sadNum = parseInt(sNum.textContent) || 0;
        sadNum++;
        sNum.textContent = sadNum;
    }, { once: true })
})