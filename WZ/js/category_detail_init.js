export const fetchData = async () => {
    const res = await fetch("../data.json");
    const data = await res.json();
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


    //타겟 컨텐츠 데이터 전달
    const setContentsData = async () => {
        const contentData = await fetchData();
        const category = window.location.search.slice(1);

        const mainText = [
            {
                category: "animation",
                title: "애니메이션",
                desc: "따뜻한 감성과 무한한 상상력이 어우러진, 애니메이션의 세계로 초대합니다."
            },
            {
                category: "movie",
                title: "영화",
                desc: "따뜻한 감성과 깊은 이야기가 어우러진, 영화의 세계로 초대합니다."
            },
            {
                category: "documentary",
                title: "다큐멘터리",
                desc: "진실과 깊은 통찰이 담긴, 다큐멘터리의 세계로 초대합니다."
            },
            {
                category: "varietyshow",
                title: "예능",
                desc: "즐거움과 웃음이 넘치는, 예능의 세계로 초대합니다."
            },
            {
                category: "drama",
                title: "드라마",
                desc: "가슴을 울리는 감동과 진한 여운이 가득한, 드라마의 세계로 초대합니다."
            },
            {
                category: "musical",
                title: "뮤지컬",
                desc: "감미로운 선율과 눈부신 무대가 펼쳐지는, 뮤지컬의 세계로 초대합니다."
            }
        ];



        // 화면에 렌더링 함수

        let filteredData;

        function renderContent() {

            const title = document.querySelector('.category-detail-main-visual-title');
            const desc = document.querySelector('.category-detail-main-visual-text');
            const main = document.querySelector('.category-detail-main-visual');

            const textFind = mainText.find(item => item.category === category);

            if (textFind && filteredData.length > 0) {
                title.innerHTML = textFind.title;
                desc.innerHTML = textFind.desc;


                main.style.background = `
                linear-gradient(to bottom, rgba(0, 0, 0, 0.3), #21252B 99%),
                url(${filteredData[0].image_default})`;
                main.style.backgroundRepeat = 'no-repeat';
                main.style.backgroundPosition = 'center';
                main.style.backgroundSize = 'cover';
            }

        }

        switch (category) {
            case "animation":
                filteredData = contentData.filter(content => content.category === category);
                renderContent();
                break;
            case "movie":
                filteredData = contentData.filter(content => content.category === category);
                renderContent()
                break;
            case "documentary":
                filteredData = contentData.filter(content => content.category === category);
                renderContent()
                break;
            case "varietyShow":
                filteredData = contentData.filter(content => content.category === category);
                renderContent()
                break;
            case "drama":
                filteredData = contentData.filter(content => content.category === category);
                renderContent()
                break;
            case "musical":
                filteredData = contentData.filter(content => content.category === category);
                renderContent()
                break;
            default:
                break;
        }
    };

    await setContentsData();


})


