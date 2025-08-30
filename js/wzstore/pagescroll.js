const getScrollPecent = () => {
    //스크롤양
    const scrolled = window.scrollY; //윈도우의 수직 스크롤의 위치를 px로 반환
    console.log(`${scrolled} 스크롤함.`)

    //페이지 전체 높이
    //documentElement = html요소
    //scrollHeight - 스크롤을 포함된 전체 콘텐츠의 높이를 반환(픽셀단위)
    const pageHeight = document.documentElement.scrollHeight;

    //표시영역 높이-화면의 높이를 구하는 코드
    //clientHeight - 스크롤을 제외한 실제로 브라우저 화면에서 눈에 보이는 영역
    const viewHeight = document.documentElement.clientHeight;
    console.log(`페이지 높이: ${pageHeight}, 표시영역높이: ${viewHeight}`)

    //스크롤한 비율
    //전체스크롤 가능한 범위에서 얼마나 내려왔는지 계산
    //pecentage = 스크롤한 거리 / 스크롤 가능한 전체 거리 * 100(백분율로 반환)
    const pecentage = scrolled / (pageHeight - viewHeight) * 100


    //프로그래스바의 폭
    document.querySelector("#bar").style.width= `${pecentage}%`
}
window.addEventListener('scroll', getScrollPecent)