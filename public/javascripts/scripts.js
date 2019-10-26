function isDeleteButton(btn) {
    return btn.className === "delete-article";
}

let listenerByIndex = function(index) {
    return function curried_func() {
        let toBeDeleted = document.getElementsByTagName("article")[index];
        toBeDeleted.parentNode.removeChild(toBeDeleted);
        setupListeners();
    }
};

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
            btns[i].addEventListener("click", listenerByIndex(i));
        }
    }
}

let articlesEndpoint = "http://localhost:3000/api/v1/articles";

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

function populateArticles(data) {
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
    setupListeners();
});

function addNewArticle(title, date, text) {
    var tmp = document.getElementsByTagName("template")[0];
    var articleClone = tmp.content.cloneNode(true);

    var articleTitle = articleClone.querySelector("h1.article-title");
    articleTitle.textContent = title;
    articleClone.querySelector("div.article-date").textContent = date;
    articleClone.querySelector("p.article-text").textContent = text;


    document.getElementById("articles-container").appendChild(articleClone);
    setupListeners();
}

getArticlesAsync();