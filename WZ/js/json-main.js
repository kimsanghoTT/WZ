  // 페이지가 로드되었을 때 실행
  window.addEventListener('DOMContentLoaded', () => {
    fetch('data.json') // JSON 파일 경로
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        // Object.entries를 사용해 Map으로 변환
        const myMap = new Map(Object.entries(jsonData));
        
        // Map 사용 예시
        console.log(myMap);
        console.log("key2의 값:", myMap.get("key2"));
      })
      .catch(error => {
        console.error('JSON 파일을 불러오는 중 오류 발생:', error);
      });
  });

  // 클릭한 장르 가져오기 부분 수정
document.querySelectorAll('.sub li a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const selectedGenre = link.getAttribute('data-genre');
    currentGenre = selectedGenre;
    updateSlides(data[currentGenre]);
  });
});