document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const header = document.querySelector("#mainHeader");

    if(currentPage.includes("home.html")){
        header.classList.add("atHome");

        if(window.pageYOffset === 0){
            header.classList.add("onTop");
        }
        else{
            header.classList.remove("onTop");
        }

        let postScrollPoint = window.pageYOffset;

        window.addEventListener("scroll", () => {
            const currentScrollPoint = window.pageYOffset;

            if(currentScrollPoint > postScrollPoint){
                header.classList.add("scrollDown");
                header.classList.remove("scrollUp");
            }
            else if(currentScrollPoint <= postScrollPoint){
                header.classList.add("scrollUp");
                header.classList.remove("scrollDown");
            }
            if(currentScrollPoint === 0){
                header.classList.add("onTop");
            }
            else{
                header.classList.remove("onTop");
            }
            postScrollPoint = currentScrollPoint;
        })
    }
    else{
        let postScrollPoint = window.pageYOffset;

        window.addEventListener("scroll", () => {
            const currentScrollPoint = window.pageYOffset;

            if(currentScrollPoint > postScrollPoint){
                header.classList.add("scrollDown");
                header.classList.remove("scrollUp");
            }
            else if(currentScrollPoint <= postScrollPoint){
                header.classList.add("scrollUp");
                header.classList.remove("scrollDown");
            }
            postScrollPoint = currentScrollPoint;
        })
    }
})