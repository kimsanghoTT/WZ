document.addEventListener('DOMContentLoaded', async () => {
    // 1. URL에서 검색어 가져오기
    const urlParams = new URLSearchParams(window.location);
    const searchQuery = urlParams.get('query'); // 'q' -> 'query'로 수정

    // 검색 결과 메시지 및 컨테이너 요소 가져오기
    const resultInfo = document.getElementById('result-info');
    const searchResultContainer = document.querySelector('.search-result');

    if (searchQuery) {
        resultInfo.textContent = `'${searchQuery}'에 대한 검색 결과를 불러오는 중...`;

        // 2. 검색 데이터 가져오기
        const searchResults = await getSearchData(searchQuery);
        console.log(searchResults);

        // 3. 검색 결과 컨테이너 초기화
        searchResultContainer.innerHTML = '';

        // 4. 검색 결과 동적 생성 및 추가
        if (searchResults.length > 0) {
            resultInfo.textContent = `'${searchQuery}'에 대한 검색 결과입니다.`;
            searchResults.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                
                resultItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <img src=${item.image_poster}>
                `;
                searchResultContainer.appendChild(resultItem);
            });
        } else {
            resultInfo.textContent = `'${searchQuery}'에 대한 검색 결과가 없습니다.`;
        }
    } else {
        // 검색어가 없는 경우
        resultInfo.textContent = '검색어를 입력해 주세요.';
    }
});

const getSearchData = async (word) => {
    try{
        const response = await fetch('data.json');
        const data = await response.json();
        const dataList = Object.values(data);
        const searchResults = dataList.filter(item => item.title.includes(word));

        console.log(searchResults);
        
        return searchResults;
    }catch{
        console.log("오류 발생");
        return [];
    }
}

