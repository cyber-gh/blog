var express = require('express');
var router = express.Router();
var articles = require('../db/db');
var bodyParse = require('body-parser');

/* GET home page. */


router.get('/api/v1/articles', function(req, res, next) {
    var title = "Express";
    res.status(200).send({
        success: 'true',
        message: 'this works',
        articles: articles
    });


});


router.get("/api/v1/article", function(req, res, next) {
    var id = req.query.id
    console.log("request article with id = ", id)

    let rs = articles.find( x => 
        x.id == id
        );

    console.log(rs)    
    if (!rs) {
        res.status(404).send({
            success: 'false',
            message: "resource not found"
        })
    } else {
        res.status(200).send( {
            success: 'true',
            message: "article found",
            article: rs
        })
    }
})

router.post("/api/v1/article/modify", function(req, res, next)  {
    if (
        !(req.body.id && req.body.first_name && req.body.last_name && req.body.email && req.body.email && req.body.email && req.body.date && req.body.text)
    ) {
        console.log(req.body);
        return res.status(403).send({
            success: 'false',
            message: "Invalid article data"
        })
    } else {


        const article = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            title: req.body.title,
            date: req.body.date,
            text: req.body.text
        };
        var foundIt = false
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id == article.id) {
                foundIt = true;
                articles[i] = article
            }
        } //treat if not found 
        return res.status(200).send({
            success: 'truee',
            message: "modfiied sucessfully"
        })
    }
})


router.post('/api/v1/articles', (req, res) => {


    if (
        !(req.body.first_name && req.body.last_name && req.body.email && req.body.email && req.body.email && req.body.date && req.body.text)
    ) {
        res.status(403).send({
            success: 'false',
            message: "Invalid article data"
        })
    } else {

    

        const article = {
            id: articles.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            title: req.body.title,
            date: req.body.date,
            text: req.body.text
        };
        articles.push(article);

        return res.status(201).send({
            success: 'true',
            message: 'article added successfully',
            article
        })
    }
});

router.post('/api/v1/articles/delete', (req, res) =>  {
    let id = req.body.id;

    articles = articles.filter(function (item) {
        return item.id != id;
    });

    return res.status(201).send( {
        success: 'true',
        message: 'article deleted',
        id
    })

});

module.exports = router;
