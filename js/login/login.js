import { checkLogin } from "../layout.js";

document.addEventListener("DOMContentLoaded", async () => {

    //레이아웃 렌더링
    await renderHeader(); 
    checkLogin();
    await renderFooter();
})

const renderHeader = async () => {
    const mainHeader = document.getElementById("mainHeader");

    const res = await fetch("layout.html");
    const htmlText = await res.text(); 

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html"); 
    const header = doc.getElementById("mainHeader").innerHTML; 

    mainHeader.innerHTML = header;
};

const renderFooter = async () => {
    const mainFooter = document.getElementById("mainFooter");

    const response = await fetch("layout.html");
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const footer = doc.getElementById("mainFooter").innerHTML;

    mainFooter.innerHTML = footer;
}