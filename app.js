var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var flash = require('connect-flash');
var MongoStore = require("connect-mongo")(session);


//var index = require('./routes/index');
var users = require('./routes/users');
var routes = require('./routes/index');
var settings = require('./settings');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: settings.cookieSecret,
  key: settings.db, //cookie name?
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30 days
  store: new MongoStore({
    url: 'mongodb://test:test@ds115124.mlab.com:15124/igentle11'}),
  resave: true,
  saveUninitialized: true  
}));



routes(app);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;