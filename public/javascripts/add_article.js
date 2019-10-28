let PORT = 3000;
let serverIP = `localhost:${PORT}`;
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

let addArticleEndpoint = `http://${serverIP}/api/v1/articles`;

function submitArticle() {
    console.log("submit article called");
    let article = validateForm();
    if ( article.length > 0 ) {
        let xhhtp = new XMLHttpRequest();

        xhhtp.onreadystatechange = function () {
            if (this.readyState === 4)
                alert("Reqeust done" + this.status)
        };

        xhhtp.open("POST", addArticleEndpoint);

        xhhtp.setRequestHeader("Content-Type", "application/json");
        xhhtp.send(getArticleJSON(article));

    }
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

