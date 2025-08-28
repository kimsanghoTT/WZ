export const fetchData = async () => {
    const response = await fetch("../source/data.json");
    const data = await response.json();
    return Object.values(data);
}

document.addEventListener("DOMContentLoaded", async () => {
    //헤더 렌더링
    const renderHeader = async () => {
        const mainHeader = document.getElementById("mainHeader");
        
        const res = await fetch("layout.html");
        const htmlText = await res.text(); 

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html"); 
        const header = doc.getElementById("mainHeader").innerHTML; 
        
        mainHeader.innerHTML = header;
    };
    await renderHeader(); 

    //타겟 컨텐츠 맞춤 렌더링
    const renderContents = async () => {
        const contentData = await fetchData();
        const category = window.location.search.slice(1);
        let filteredData;
        switch (category){
            case "animation":
                filteredData = contentData.filter(content => content.category === category);
                console.log(filteredData);
                break;
            case "movie":
                filteredData = contentData.filter(content => content.category === category);
                console.log(filteredData);
                break;
            case "documentary":
                filteredData = contentData.filter(content => content.category === category);
                console.log(filteredData);
                break;
            case "varietyShow":
                filteredData = contentData.filter(content => content.category === category);
                console.log(filteredData);
                break;
            case "drama":
                break;
            case "musical":
                filteredData = contentData.filter(content => content.category === category);
                console.log(filteredData);
                break;
            default:
                break;
        }
    }
    renderContents();
})