import { bindCardClickEvent, bindCardHoverEvent, bindHomeAnimation } from "./home_event.js";
import { initAutoplaySwiper, renderHomeSwiper, renderAutoplaySwiper } from "./home_swiper.js";

export const fetchData = async () => {
    const res = await fetch('./source/data.json');
    const data = await res.json();
    return Object.values(data);
};

document.addEventListener("DOMContentLoaded", async () => {

    //스와이퍼 렌더링 및 초기화
    await renderHomeSwiper();
    await renderAutoplaySwiper();
    initAutoplaySwiper();

    //이벤트 바인딩
    bindCardHoverEvent();
    bindCardClickEvent();
    bindHomeAnimation();
})