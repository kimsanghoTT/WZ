/* 서브 헤더 창열기 */
$(function () {
    $('.nav-list').on('click', function () {
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

/* 체크박스 누르면 색깔 들어오게 만들기 */
$('.checkBox').on('click', function () {
    $(this).toggleClass('checked');
})

const msgInfo = document.getElementById('msgInfo');

msgInfo.addEventListener('input', function () {
    if (this.value.length > 100) {
        this.value = this.value.substring(0, 100); // 100자 넘는 부분 잘라내기
        alert('100자 이내로 입력해주세요');
    }
});

/* 쿠폰 적용하기 */
$(function () {
  // 모든 Sale 버튼 공통 처리
  $(document).on('click', '.sale', function (e) {
    e.preventDefault();

    $('#wrap #payBefore .innerBox .sale').removeClass('is-active');
    $(this).addClass('is-active');

    // 금액계산하기
    const basePrice = 69000;
    const percent = parseInt($(this).find('span').text(), 10) || 0; /* 내가 입력한 할인율 */
    const discount = Math.floor(basePrice * percent / 100);/* 할인율게산 */
    const finalPrice = basePrice - discount; /* 정가에서 빼줌 */
 
    const $right = $('#payBefore .right');
    $right.find('p strong').text(basePrice.toLocaleString());
    $right.find('del').text(discount.toLocaleString() + '원');
    $right.find('p.total span').text(finalPrice.toLocaleString());
  });
});

$(function () {
  // 쿠폰 사용하기 클릭
  $(document).on('click', '.use.btn', function (e) {
    e.preventDefault();

    const $box = $('#payBefore .innerBox');

    if ($box.find('.first.sale.is-active').length) {
      alert('※사용기한이 지난 쿠폰입니다.');
      return;
    }

    if ($box.find('.summer.sale.is-active').length) {
      alert('적용되었습니다.');
      return;
    }

    // 아무 것도 선택 안하면?
    alert('쿠폰을 먼저 선택해주세요.');
  });
});

/* 카드를 선택하면 가상선택자가 나오도록 함 */
$('.cardArea ul li a').on('click', function(e){
  e.preventDefault();                 
  $('.cardArea ul li a').removeClass('is-on');
  $(this).addClass('is-on');
});

/* 결제카드 추가부분을 눌렀을때 */ /* -> 제이쿼리로 따로 처리함 */
$(function () {
  $(document).on('click', '.cardArea ul li a', function (e) {
    e.preventDefault();

    const $li = $(this).closest('li');


    if ($li.find('p').length) {
      alert('본인인증 후 다시 시도하세요');
      return; 
    }

    // 일반 카드: 오버레이 표시 (단일 선택)
    $('.cardArea ul li a').removeClass('is-on');
    $(this).addClass('is-on');
  });
});
/* 깃커밋푸시 */