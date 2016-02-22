var express = require("express");
var mysql = require("./mysql");

var router = express.Router();

router.put('/', function (req, res) {
    console.log("Updatea pukkaa!");
    mysql.saveUserData(req, res);
});

router.get('/', function (req, res) {
   mysql.findByEmail(req, res); 
});

module.exports = router;