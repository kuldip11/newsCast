let pageNo = 0, counter = 0, query = "";
let node = document.querySelector(".main-container");
let input = document.querySelector(".search");
input.addEventListener("keypress", searchHandler);

window.addEventListener("load", onLoadHandler);

function onLoadHandler() {
    renderingHandlere();
}

window.addEventListener("scroll", () => {
    if (Math.ceil(window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 50)) {
        renderingHandlere();
    }
});

function renderingHandlere() {
    let jsondata = getNews(++pageNo);
    jsondata.forEach((element) => {
        let newEle = document.createElement("div");
        let title = document.createElement('a');
        let details = document.createElement('div');

        newEle.setAttribute("class", "new");
        title.setAttribute("class", "title");
        details.setAttribute("class", "details");

        title.innerHTML = `${++counter}. ${element["title"]}`;
        title.setAttribute("href", `${element["url"]}`);
        details.innerHTML = `author: ${element["author"]}  points: ${element["points"]}  comments: ${element["num_comments"]}`;

        newEle.appendChild(title);
        newEle.appendChild(details);
        node.appendChild(newEle);

    });


}
function getNews(pageNo) {
    let searchEle = document.querySelector(".search");
    query = searchEle.value;
    if (query == "")
        query = "random";
    let api = `https://hn.algolia.com/api/v1/search?query=${query}&page=${pageNo}`;
    let xhReq = new XMLHttpRequest();
    xhReq.open("GET", `${api}`, false);
    xhReq.send(null);
    jsonObject1 = JSON.parse(xhReq.responseText);
    return jsonObject1["hits"];
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function searchHandler(evt) {
    console.log(evt.charCode);
    if (evt.charCode == 13) {
        query = input.value;
        pageNo = 0;
        counter = 0;
        removeAllChildNodes(node)
        renderingHandlere();
    }
}