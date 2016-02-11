var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//Define connection attributes for mysql server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'halikannu-2015',
    //password: 'root',
    database: 'palautedb'
});

//Connect to mysql server
connection.connect(function (err) {
    if (err) {
        console.log('Could not connect to mysql server: ' + err.message);
    } else {
        console.log('Connected to mysql server:database palautedb schema');
    }
});

exports.saveUserData = function (req, res) {
    // Tässä pitää tsekata että onko käyttäjä jo olemassa ja jos on, päivittää tiedot
    //connection.query('SELECT * FROM kayttaja WHERE email=?',[req.body.email], function(error, results, fields) {
    //    if (error) {
    //        console.log(error);
    //    } else {
    //        res.status(200).send()
    //    }    
    //});
    
    connection.query('INSERT INTO kayttaja (Nimi, email, Puhelin) VALUES (?, ?, ?)', [req.body.Nimi, req.body.email, req.body.Puhelin], function(error, results, fields) {
       if (error) {
           console.log(error);
       } else {
           console.log("Success");
           res.status(200).send({status: "Käyttäjä lisätty!"});
       }
    });
}