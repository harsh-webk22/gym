const express = require('express');
const mysql= require('mysql')
const app = express();
const http = require('http');
const https = require('https')
const cors = require('cors')
const path = require("path");
const fs = require('fs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(express.static(__dirname+"/public"))


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/thefitness365.life/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/thefitness365.life/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/thefitness365.life/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

app.get('/hey', (req, res)=>{
    res.json({
        message: "heyyy"
    })
   //  res.sendFile(path.join(__dirname, './public/index.html'));
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:"gym"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// //get latest 10 users
app.get('/getUser', (req, res)=>{
    const query = 'SELECT * FROM customers ORDER BY joining_date DESC LIMIT 10';
    con.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).send('Error executing MySQL query');
        return;
        }
        res.json(results);
    });
})

// //get due payment list
app.get('/duePayment', (req, res)=>{
    const today =new Date().toISOString().slice(0, 10);
    const query = `SELECT * FROM customers WHERE expiry_date < '${today}'`;
    con.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).send('Error executing MySQL query');
            return;
        }
        console.log(results)
        res.json(results);
    });
})

// //get all user
app.get('/allUser', (req, res)=>{
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) {
            return res.json([]);
        };
        res.json(result);
    });
})



// //create user
app.post('/customers', (req, res) => {
    const { name, number,fees, dob,  age, gender, expiry_date, joining_date } = req.body;

    // insert new customer into customers table
    const sql = 'INSERT INTO customers (name, number, age, fees, dob, gender, expiry_date, joining_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [name, number, age, fees, dob, gender, expiry_date, joining_date], (err, result) => {
      if (err) {
        return res.staus(400).json({
            message:"Error in saving data"
        })
      };
      res.status(200).send('Customer added successfully!');
    });
  });

// //update user
app.post('/updateUser', (req, res)=>{
    var {number , expiry} = req.body
    // expiry = new Date(expiry).toISOString().slice(0, 10);
    var sql = `UPDATE customers SET expiry_date = ${ expiry} WHERE number = ${number}`;
    con.query(sql, function (err, result) {
        if (err) {
            return res.status(400).json({
                message:"Error in updating customers"
            })
        }
            res.send("customer updated")
        });
})


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
