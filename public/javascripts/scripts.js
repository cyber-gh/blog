let PORT = 3000;
let serverIP = `localhost:${PORT}`;
var deleteArticleEndpoint = `http://${serverIP}/api/v1/articles/delete`;
let articlesEndpoint = `http://${serverIP}/api/v1/articles`;

function isDeleteButton(btn) {
    return btn.className === "delete-article";
}

let listenerByIndex = function(index) {
    return function curried_func() {
        removeArticle(index);
    }
};

function removeArticleFromDOM(index) {
    let toBeDeleted = document.getElementsByTagName("article")[index];
    toBeDeleted.parentNode.removeChild(toBeDeleted);
    setupListeners();
}

function removeArticle(id) {
    

    var xhhtp =  new XMLHttpRequest();
    var identifier = currentArticles[id].id;
    xhhtp.onreadystatechange= function () {
        if (this.readyState == 4) {
            removeArticleFromDOM(id);
        }
    };


    xhhtp.open("POST", deleteArticleEndpoint);

    xhhtp.setRequestHeader("Content-Type", "application/json");
    xhhtp.send(JSON.stringify({
        id: identifier
    }));



}

function setupNavBarListeners() {
    let refresBtn = document.getElementById("refresh-articles");
    refresBtn.addEventListener("click",
        function () {
            getArticlesAsync();
        });

}

function setupListeners() {

    var btns = Array.from( document.getElementsByTagName("button"))
        .filter(isDeleteButton);


    for ( i = 0; i < btns.length; i++ ) {
        if (btns[i].className === "delete-article") {
            btns[i].onclick = null;
            if (btns[i].getAttribute('listener') !== 'true') {
                btns[i].setAttribute('listener', 'true');
                btns[i].addEventListener("click", listenerByIndex(i));
            }
        }
    }
}



function getArticlesAsync() {
    var xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            populateArticles(JSON.parse( this.responseText)["articles"] );

        }
    };
    xhhtp.open("GET", articlesEndpoint);
    xhhtp.send();
}
var currentArticles = [];
function populateArticles(data) {
    currentArticles = data;
    document.getElementById("articles-container").innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        const el = data[i];
        console.log(el);
        addNewArticle(el.title, el.date, el.text);
    }
    setupListeners();
}

window.addEventListener("load", function () {
    setupNavBarListeners();
});

function addNewArticle(title, date, text) {
    var tmp = document.getElementsByTagName("template")[0];
    var articleClone = tmp.content.cloneNode(true);

    var articleTitle = articleClone.querySelector("h1.article-title");
    articleTitle.textContent = title;
    articleClone.querySelector("div.article-date").textContent = date;
    articleClone.querySelector("p.article-text").textContent = text;


    document.getElementById("articles-container").appendChild(articleClone);
    //setupListeners();
}

getArticlesAsync();