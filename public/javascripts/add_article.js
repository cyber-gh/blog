let PORT = 3000;
let serverIP = `localhost:${PORT}`;
let getSingleArticleEndpoint = `${window.location.origin}/api/v1/article`;
let modifyARticleEndpoint = `${window.location.origin}/api/v1/article/modify`;
let addArticleEndpoint = `${window.location.origin}/api/v1/articles`;
var form_mode = "add";
var article_id = undefined;

function validateForm() {
    let form = document.getElementById("add-article-form");
    console.log(form.checkValidity());


    if (!form.checkValidity()) {
        return [];
    }

   let firstName = document.getElementById("first-name").value;
   let secondName = document.getElementById("last-name").value;
   let artTitle = document.getElementById("title").value;
   let artEmail = document.getElementById("email").value;
   let artContent = document.getElementById("text").value;

   return [firstName, secondName, artEmail, artTitle, artContent]
}



function uploadNewARticle(article) {
    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4)
            alert("Reqeust done" + this.status);
            goBack();
    };

    xhhtp.open("PUT", addArticleEndpoint);

    xhhtp.setRequestHeader("Content-Type", "application/json");
    xhhtp.send(getArticleJSON(article));
}

function submitArticle() {
    console.log("submit article called");
    let article = validateForm();
    if ( article.length > 0 ) {
         if (form_mode == "add") uploadNewARticle(article);
         if (form_mode == "edit") modifyArticle(article);

    }
}

function modifyArticle(article) {
    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4)
            alert("Reqeust done" + this.status);
            goBack();
    };

    xhhtp.open("POST", modifyARticleEndpoint);

    xhhtp.setRequestHeader("Content-Type", "application/json");
    xhhtp.send(getArticleJSONWithId(article));
}

function getArticleJSON(arr) {
    var currentTIme = new Date().toDateString();
    return JSON.stringify( {
        first_name: arr[0],
        last_name: arr[1],
        email: arr[2],
        title: arr[3],
        date: currentTIme,
        text: arr[4]
    })
}

function getArticleJSONWithId(arr) {
    var currentTIme = new Date().toDateString();
    return JSON.stringify( {
        id: article_id,
        first_name: arr[0],
        last_name: arr[1],
        email: arr[2],
        title: arr[3],
        date: currentTIme,
        text: arr[4]
    })
}

function checkState() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("id");
    if (c) {
        form_mode = "edit";
        article_id = c;
        initEditForm();
    }
    
}

function populateForm(article) {    

   document.getElementById("first-name").value = article.first_name;
   document.getElementById("last-name").value = article.last_name;
   document.getElementById("title").value = article.title;
   document.getElementById("email").value = article.email;
   article.text = article.text.replace("\n","");
   document.getElementById("text").value = article.text;
    

}

function initEditForm() {
    var xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateForm(JSON.parse( this.responseText)["article"]);
        }
    };
    xhhtp.open("GET", getSingleArticleEndpoint + `?id=${article_id}`);
    xhhtp.setRequestHeader("Content-Type", "application/json");
    xhhtp.send();

    document.getElementById("done-button").textContent = "Edit article";
    
}

function goBack() {
    window.location.href = "/"
}

checkState();

