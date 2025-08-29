$(function () {
  $('.list-contain').on('click', function (e) {
    e.stopPropagation();

    const clickedLi = $(this).closest('li');
    const subMenu = clickedLi.find('.sub');

    $('.sub').not(subMenu).slideUp(300);
    $('.arrow-down').not($(this).find('.arrow-down')).removeClass('rotate-up');

    subMenu.stop().slideToggle(600);
    $(this).find('.arrow-down').toggleClass('rotate-up');
  });

  $(document).on('click', function () {
    $('.sub').slideUp(300);
    $('.arrow-down').removeClass('rotate-up');
  });

  $('.sub').on('click', function (e) {
    e.stopPropagation();
  });
});