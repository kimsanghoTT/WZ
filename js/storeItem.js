
$(function () {
  $('.optWrap > div > p').attr('tabindex', '0');
});

// [추가] 옵션 클릭/포커스 시 선택값 저장
$(document).on('click focusin', '.optWrap > div > p', function () {
  const val = $(this).text().trim();
  localStorage.setItem('selectedOption', val);
});

// [기존 수량 초기화 직후에 덧붙이기] 초기 수량을 저장
$(function () {
  $('.number').each(function () {
    const $qty = $(this).find('span').eq(1);
    if (!$qty.text().trim()) $qty.text('1');
    localStorage.setItem('selectedQuantity', $qty.text().trim());
  });
});

// [증감 핸들러의 마지막 줄에 덧붙이기] 변경된 수량을 저장
$(document).on('click', '.number span:first-child, .number span:last-child', function () {
  const $qty = $(this).closest('.number').find('span').eq(1);
  // (기존 증감 로직 바로 뒤에)
  localStorage.setItem('selectedQuantity', $qty.text().trim());
});


// [증감 핸들러의 마지막 줄에 덧붙이기] 변경된 수량을 저장
$(document).on('click', '.number span:first-child, .number span:last-child', function () {
  const $qty = $(this).closest('.number').find('span').eq(1);
  // (기존 증감 로직 바로 뒤에)
  localStorage.setItem('selectedQuantity', $qty.text().trim());
});



$(function () {
  // 열고 닫기 (아이콘/전체 a 둘 다 허용)
  $(document).on('click', '.optWrap a, .optWrap a i', function (e) {
    e.preventDefault();
    const $wrap = $(this).closest('.optWrap');
    $('.optWrap').not($wrap).removeClass('open'); // 다른 패널 닫기
    $wrap.toggleClass('open');
  });

  // 옵션 클릭 시 선택 반영 + 닫기
  $(document).on('click', '.optWrap > div > p', function () {
    const $wrap = $(this).closest('.optWrap');
    $wrap.find('a span').text($(this).text().trim());
    opttext = $(this).text().trim();
    $wrap.removeClass('open');
  });


  // 바깥 클릭 시 닫기
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.optWrap').length) $('.optWrap').removeClass('open');
  });
});



/* 수량 값 선택 */
// 수량 초기화(비어 있으면 1로)
$(function () {
  $('.number').each(function () {
    const $qty = $(this).find('span').eq(1);
    if (!$qty.text().trim()) $qty.text('1');
  });
});

// 감소(첫 번째 span)
$(document).on('click', '.number span:first-child', function () {
  const $qty = $(this).closest('.number').find('span').eq(1);
  let v = parseInt($qty.text(), 10) || 1;
  $qty.text(Math.max(1, v - 1)); // 최소 1
});

// 증가(세 번째 span)
$(document).on('click', '.number span:last-child', function () {
  const $qty = $(this).closest('.number').find('span').eq(1);
  let v = parseInt($qty.text(), 10) || 1;
  $qty.text(v + 1);
});


/* 컬러선택 */
$(function () {
  const $pack  = $('.colorPack');
  const $imgs  = $pack.nextAll('img').slice(0, 4);
  const $stage = $imgs.first().parent(); // 이미지 부모 컨테이너
  const $texts = $('.itemSummary, .itemTitle .price2, .itemTitle .tagArea');
  const baseCol = $texts.css('color');

  const gradients = [
    'radial-gradient(#fff 20%, #7ad3d1 80%)',
    'radial-gradient(#fff 20%, #ffa9b5 80%)',
    'radial-gradient(#fff 10%, #d8ebac 50%)',
    'radial-gradient(#fff 10%, #2a2a2a 50%)'
  ];

  // 초기 셋업
  $stage.css({ position: 'relative', overflow: 'hidden', background: gradients[0] });

  // ★ 중앙 정렬: 컨테이너를 가득 채우되 비율 유지 + 중앙 배치
  $imgs.css({
    position: 'absolute', top: '50%', left: '50%', width: '60%', height: '80%',
    objectFit: 'contain', objectPosition: 'center', zIndex: 1, display: 'none'
  }).eq(0).show();

  // 컨테이너 높이 고정(낙하 방지)
  const ratios = new Array($imgs.length);
  function updateStageMinH(){
    const r = Math.max.apply(null, ratios.filter(Boolean));
    if (r) $stage.css('minHeight', Math.round($stage.width() * r));
  }
  $imgs.each(function(i, img){
    const set = ()=>{ if (img.naturalWidth) { ratios[i] = img.naturalHeight / img.naturalWidth; updateStageMinH(); } };
    img.complete ? set() : $(img).one('load', set);
  });
  $(window).on('resize', updateStageMinH);

  // 배경 그라디언트 페이드(오버레이는 이미지 아래)
  function fadeStageBG(gradient) {
    $stage.find('.bgFade').remove();
    const $ov = $('<div class="bgFade">').css({
      position: 'absolute', inset: 0, pointerEvents: 'none',
      zIndex: 0, opacity: 0, transition: 'opacity .25s ease',
      background: gradient
    });
    $stage.append($ov);
    requestAnimationFrame(() => $ov.css('opacity', 1));
    $ov.on('transitionend', function () {
      $stage.css('background', gradient);
      $ov.remove();
    });
  }

  // 색상 클릭 핸들러
  $pack.on('click', 'figure', function () {
    const idx = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');

    const $cur = $imgs.filter(':visible');
    const $next = $imgs.eq(idx);
    if ($cur[0] === $next[0]) return;

    // 배경 전환
    fadeStageBG(gradients[idx]);

    // #121212일 때 텍스트 색상
    if (idx === 3) $texts.css('color', '#fefefe');
    else           $texts.css('color', baseCol);

    // 이전 이미지: 빠른 페이드아웃 + 오른쪽 10px
    $cur.stop(true, true)
        .animate({ opacity: 0, marginRight: '10px' }, 100, 'linear', function () {
          $(this).hide().css({ marginRight: 0, opacity: 1 });
        });

    // 다음 이미지: 왼쪽 -10px → 0으로 페이드인
    $next.stop(true, true)
         .css({ opacity: 0, marginLeft: '-10px', display: 'block' })
         .animate({ opacity: 1, marginLeft: 0 }, 220, 'swing');
  });
});



/* 한줄리뷰 가로 스와이프 */
if(window.location.pathname.includes('storeItem.html')){
  var swiper = new Swiper('#oneSentense.swiper', {
        slidesPerView: 3,
        spaceBetween: 15,
        direction: getDirection(),
        on: {
          resize: function () {
            swiper.changeDirection(getDirection());
          },
        },
      });

      function getDirection() {
        var windowWidth = window.innerWidth;
        var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

        return direction;
      }
}


    /* 스크롤하면 아이템설명이 나오도록 함 */

    // 진입 시 1회만 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.itemTxt1, .itemTxt2, .itemTxt3');

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('itemTxt--show');
        obs.unobserve(entry.target); // 한번만 실행 (반복 원하면 이 줄 제거하고 else로 removeClass)
      }
    });
  }, {
    threshold: 0.2,                // 요소의 20%가 보이면
    rootMargin: '0px 0px -10% 0px' // 살짝 일찍 트리거
  });

  targets.forEach(el => io.observe(el));
});

/* 광고 플레이아이콘 */
$(document).on('click', '.playBtn', function(){
  const $btn = $(this);
  const on  = $btn.data('on');
  const off = $btn.data('off') || $btn.attr('src');

  // 이동 토글
  $btn.toggleClass('moved');

  // 이미지 스왑 토글
  $btn.attr('src', $btn.attr('src') === on ? off : on);

  // (원클릭만 원하면) 다음 줄 주석 해제:
  // $(this).off('click');
});
