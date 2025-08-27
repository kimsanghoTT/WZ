/* 서브 헤더 창열기 */
$(function () {
    $('.nav-list').on('click', function (e) {
        e.preventDefault();
        let subHeader = $('.subHeader');
        $(subHeader).stop().animate({
            left: 0
        }, 1500, 'easeOutExpo')
    })

    $('.headerClose').on('click', function () {
        let subHeader = $('.subHeader');
        $(subHeader).stop().animate({
            left: '-100%'
        }, 1500, 'easeOutExpo')
    })
})

/* 서브헤더 메뉴를 클릭하면 해당 프로덕트로 이동하기 */
// 서브헤더의 탭 점프
$(function () {
    $('#product').attr('tabindex', '-1');

    $('.subHeaderOpen').on('click', 'a.jumpTab', function (e) {
        e.preventDefault();

        const tabIndex = Number($(this).data('tab')) || 0;
        const $tabLi = $('.tabMenu li');
        const $lists = $('.tabOpen > .productList');

        // 탭 전환
        $tabLi.removeClass('on').eq(tabIndex).addClass('on');
        $lists.removeClass('on').eq(tabIndex).addClass('on');

        // 스크롤
        const headerH = $('#mainHeader').outerHeight() || 0;
        const dest = Math.max(0, $('#product').offset().top - headerH);
        $('html, body').stop().animate({ scrollTop: dest }, 700, 'easeOutCubic');

        // 서브헤더 닫기
        $('.subHeader').stop().animate({ left: '-100%' }, 600, 'easeInExpo');

        // 포커스 이동
        setTimeout(() => { $('#product').focus(); }, 750);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const header = document.querySelector("#mainHeader");

    if (currentPage.includes("home.html")) {
        header.classList.add("atHome");

        if (window.pageYOffset === 0) {
            header.classList.add("onTop");
        }
        else {
            header.classList.remove("onTop");
        }

        let postScrollPoint = window.pageYOffset;

        window.addEventListener("scroll", () => {
            const currentScrollPoint = window.pageYOffset;

            if (currentScrollPoint > postScrollPoint) {
                header.classList.add("scrollDown");
                header.classList.remove("scrollUp");
            }
            else if (currentScrollPoint <= postScrollPoint) {
                header.classList.add("scrollUp");
                header.classList.remove("scrollDown");
            }
            if (currentScrollPoint === 0) {
                header.classList.add("onTop");
            }
            else {
                header.classList.remove("onTop");
            }
            postScrollPoint = currentScrollPoint;
        })
    }
    else {
        let postScrollPoint = window.pageYOffset;

        window.addEventListener("scroll", () => {
            const currentScrollPoint = window.pageYOffset;

            if (currentScrollPoint > postScrollPoint) {
                header.classList.add("scrollDown");
                header.classList.remove("scrollUp");
            }
            else if (currentScrollPoint <= postScrollPoint) {
                header.classList.add("scrollUp");
                header.classList.remove("scrollDown");
            }
            postScrollPoint = currentScrollPoint;
        })
    }
})
