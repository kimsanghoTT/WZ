$(function() {
    $('.list-contain').on('click', function(e) {
        const subMenu = $(this).closest('li').find('.sub');
        subMenu.stop().slideToggle(600);
        
        // 화살표 회전 효과
        $(this).find('.arrow-down').toggleClass('rotate-up');
    });
});