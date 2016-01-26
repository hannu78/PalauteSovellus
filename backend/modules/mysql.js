var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//Define connection attributes for mysql server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'halikannu-2015',
    database: 'palautedb'
});

//Connect to mysql server
connection.connect(function (err) {
    if (err) {
        console.log('Could not connect to mysql server: ' + err.message);
    } else {
        console.log('Connected to mysql server:database friends_schema');
    }
});