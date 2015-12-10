//Load node modules
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var uuid = require('uuid');

//Start express
var app = express();

//====================MIDDLEWARE===================================================
// express session middleware
app.use(session({
    secret: uuid.v1(),
    cookie: {maxAge: (7 * 24 * 3600000)},
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Make express to listen to port 3000
app.listen(3000);