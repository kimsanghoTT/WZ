const getSearchData = async (word) => {
    try{
        const response = await fetch('../data.json');
        const data = await response.json();
        const dataList = Object.values(data);
        const searchResults = dataList.filter(item => item.title.includes(word));
        
        return searchResults;
    }catch{
        console.log("오류 발생");
        return [];
    }
}


const handleHeaderSearchBtn = () => {
    const searchInput = document.getElementById('mainSearch');
    const searchWord = searchInput.value;
    
    getSearchData(searchWord);

    console.log(getSearchData(searchWord));
}