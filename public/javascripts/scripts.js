let PORT = 3000;
let serverIP = `localhost:${PORT}`;
var deleteArticleEndpoint = `http://${serverIP}/api/v1/articles/delete`;
let articlesEndpoint = `http://${serverIP}/api/v1/articles`;
var currentArticles = [];
var currentIndices = [];
function isDeleteButton(btn) {
    return btn.className === "delete-article";
}

let listenerByIndex = function(index) {
    
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


    xhhtp.open("POST", deleteArticleEndpoint);

    xhhtp.setRequestHeader("Content-Type", "application/json");
    xhhtp.send(JSON.stringify({
        id: identifier
    }));



}

function setupNavBarListeners() {
    let refresBtn = document.getElementById("refresh-articles");
    // refresBtn.addEventListener("click",
    //     function () {
    //         getArticlesAsync();
    //     });

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

window.addEventListener("load", function () {
    setupNavBarListeners();
});

function addNewArticle(title, date, text, id, index) {
    var tmp = document.getElementsByTagName("template")[0];
    var articleClone = tmp.content.cloneNode(true);

    var articleTitle = articleClone.querySelector("h1.article-title");
    articleTitle.textContent = title;
    articleClone.querySelector("div.article-date").textContent = date;
    articleClone.querySelector("p.article-text").textContent = text;



    //set up listener
    // setupModifyListener(articleClone, id);

    document.getElementById("articles-container").appendChild(articleClone);
    var arr = Array.from(document.getElementsByClassName("article-minimal"))

    arr[arr.length - 1].addEventListener("click", function () {
        window.location.href = "add/?id=" + id.toString()
    })

    // articleClone.querySelector("button.delete-article").setAttribute("article-id", id);
    // articleClone.querySelector(".delete-article").addEventListener("click", function () {
    //     alert(this.getAttribute("article-id"));
    // })
    //setupListeners();
}

function setupModifyListener(article, id) {
    console.log("adding listener");
    article.addEventListener("click", function() {

        return function () {
            console.log("called here");
            window.location.href = "add/?id=" + id.toString()
        }
    });
}

getArticlesAsync();