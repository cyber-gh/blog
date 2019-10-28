
function validateForm() {
   let artTitle = document.getElementById("title").value;
   let artEmail = document.getElementById("email").value;
   let artContent = document.getElementById("content").value;
   let shouldPublishNow = document.getElementById("shouldPublish");

   if ( !artTitle || !artEmail || !artContent) {
       alert("Invalid data");
       return [];
   }

   return [artTitle, artEmail, artContent, shouldPublishNow.checked]
}

let addArticleEndpoint = "http://localhost:8081/api/v1/articles";

function submitArticle() {
    console.log("submit article called");
    let article = validateForm();
    if ( article.length > 0 ) {
        var xhhtp = new XMLHttpRequest()

        xhhtp.onreadystatechange = function () {
            if (this.readyState === 4)
                alert("Reqeust done" + this.status)
        };

        xhhtp.open("POST", addArticleEndpoint);

        xhhtp.setRequestHeader("Content-Type", "application/json");
        xhhtp.send(JSON.stringify({
            title:article[0],
            date:"2pm",
            text: article[2]
        }));



    }


}