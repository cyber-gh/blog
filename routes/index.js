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

router.post('/api/v1/articles', (req, res) => {


    if (
        !(req.body.first_name && req.body.last_name && req.body.email && req.body.email && req.body.email && req.body.date && req.body.text)
    ) {
        return res.status(403).send({
            success: 'false',
            message: "Invalid article data"
        })
    }

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
