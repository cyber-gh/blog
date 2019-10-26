

var express = require('express');
// var  bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded( {extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const PORT = 8081;
app.listen(PORT);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;



