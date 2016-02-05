//Load node modules
var express = require("express");
var path = require("path");
var https = require("https");
var fs = require("fs");
var bodyParser = require("body-parser");
var session = require("express-session");
var uuid = require('uuid');

var mysql = require("./modules/mysql");
var userData = require("./modules/userData");

//Start express
var app = express();

var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    requestCert: false,
    rejectUnauthorized: false
}
app.set('port', 3000);
app.set('ip', "127.0.0.1");
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

app.use('/', express.static(path.join(__dirname, '../frontend/view')));
app.use('/frontend/module', express.static(path.join(__dirname, '../frontend/module')));
app.use('/frontend/lib', express.static(path.join(__dirname, '../frontend/lib')));
app.use('/frontend/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/frontend/modules', express.static(path.join(__dirname, '../frontend/modules')));
app.use('/frontend/controllers', express.static(path.join(__dirname, '../frontend/controllers')));
app.use('/frontend/factories', express.static(path.join(__dirname, '../frontend/factories')));

app.use('/userdata', userData);

app.use(function (req, res, next) {
    //console.log(req.session);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // check if there was a token
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
           if (err) {
               return res.status(401).send;
           } else {
               req.decoded = decoded;
               //console.log(req.decoded);
           } 
        });
    } else {
        res.status(403).send;
    }
    //console.log(token);
    next();
});

//app.get('/logout', function (req, res) {
//    req.session.destroy();
//    res.redirect('/');
//});
// This router checks whether client is logged in or not
//app.get('/isLogged', function(req, res){
    // User is logged in if session contains username attribute
//    if (req.session.username) {
//        res.status(200).send(['Ok']);
//    } else {
//        res.status(401).send(['Unauthorized']);
//    }
//});
//Start https service
https.createServer(options, app).listen(app.get('port'), app.get('ip'), function() {
    console.log("Express server started");
});
//Make express to listen to port 3000
//app.listen(3000);