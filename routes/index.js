var express = require('express');
var router = express.Router();
var articles = require('../db/db');
var bodyParse = require('body-parser');

/* GET home page. */


router.get('/api/v1/articles', function(req, res, next) {
    var title = "Express";
    console.log("-------------- test --------------");
    res.status(200).send({
        success: 'true',
        message: 'this works',
        articles: articles
    });


});

router.post('/api/v1/articles', (req, res) => {


   const article = {
       id: articles.length + 1,
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
