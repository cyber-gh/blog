let PORT = 3000;
let serverIP = `localhost:${PORT}`;
var deleteArticleEndpoint = `${window.location.origin}/api/v1/articles/delete`;
let articlesEndpoint = `${window.location.origin}/api/v1/articles`;
var currentArticles = [];
var currentIndices = [];

function isDeleteButton(btn) {
    return btn.className === "delete-article";
}

let removeArticleWithParam = function(index) {
    
    return function curried_func(e) {
        e.stopPropagation();
        removeArticle(index);
    }
};

function removeArticleFromDOM(index) {
    console.log("removing article " , index)
    var offset = 0;
    for (var i = 0; i < index; i++ ) {
        if (currentIndices[i] == 0) offset++;
    }//count how many where deleted before this one to adjust the index
    let toBeDeleted = document.getElementsByTagName("article")[index - offset];
    toBeDeleted.parentNode.removeChild(toBeDeleted);

    currentIndices[index] = 0;
    
    
    //setupListeners();
}

function removeArticle(id) {
    

    var xhhtp =  new XMLHttpRequest();
    var identifier = currentArticles[id].id;
    xhhtp.onreadystatechange= function () {
        if (this.readyState == 4) {
            removeArticleFromDOM(id);
        }
    };


    xhhtp.open("DELETE", deleteArticleEndpoint + "?id=" + identifier);

    xhhtp.setRequestHeader("Content-Type", "application/json");
    xhhtp.send();



}

function setupListeners() {

    var btns = Array.from( document.getElementsByTagName("button"))
        .filter(isDeleteButton);

    //delete listeners
    for ( var i = 0; i < btns.length; i++ ) {
        if (btns[i].className === "delete-article") {
            btns[i].onclick = null;
            if (btns[i].getAttribute('listener') !== 'true') {
                btns[i].setAttribute('listener', 'true');
                btns[i].addEventListener("click", removeArticleWithParam(i));
            }
        }
    }


}



function getArticlesAsync() {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            populateArticles(JSON.parse( this.responseText)["articles"] );

        }
    };
    xhhtp.open("GET", articlesEndpoint);
    xhhtp.send();
}

function populateArticles(data) {
    currentArticles = data;
    currentIndices = currentArticles.map( function(x) {
        return 1
    });
    document.getElementById("articles-container").innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        const el = data[i];
        console.log(el);
        addNewArticle(el.title, el.date, el.text, el.id, i);
    }
    setupListeners();
}


function addNewArticle(title, date, text, id, index) {
    var tmp = document.getElementsByTagName("template")[0];
    var articleClone = tmp.content.cloneNode(true);

    var articleTitle = articleClone.querySelector("h1.article-title");
    articleTitle.textContent = title;
    articleClone.querySelector("div.article-date").textContent = date;
    articleClone.querySelector("p.article-text").textContent = text;

    document.getElementById("articles-container").appendChild(articleClone);
    var arr = Array.from(document.getElementsByClassName("article-minimal"))

    arr[arr.length - 1].addEventListener("click", function () {
        window.location.href = "add/?id=" + id.toString()
    })

}


getArticlesAsync();