const express = require('express');
const mysql= require('mysql')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(express.static("public"))

app.get('/hey', (req, res)=>{
    res.json({
        message: "heyyy"
    })
})

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database:"gym"
//   });
  
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


// // //get latest 10 users
// app.get('/getUser', (req, res)=>{
//     const query = 'SELECT * FROM customers ORDER BY joining_date DESC LIMIT 10';
//     con.query(query, (error, results, fields) => {
//         if (error) {
//             console.error('Error executing MySQL query:', error);
//             res.status(500).send('Error executing MySQL query');
//         return;
//         }
//         res.json(results);
//     });
// })

// // //get due payment list
// app.get('/duePayment', (req, res)=>{
//     const today =new Date().toISOString().slice(0, 10);
//     console.log(today)
//     console.log(today < new Date("2024-03-16T14:44:38.122Z"))
//     const query = `SELECT * FROM customers WHERE expiry_date < '${today}'`;
//     con.query(query, (error, results, fields) => {
//         if (error) {
//             console.error('Error executing MySQL query:', error);
//             res.status(500).send('Error executing MySQL query');
//             return;
//         }
//         console.log(results)
//         res.json(results); 
//     });
// })

// // //get all user
// app.get('/allUser', (req, res)=>{
//     con.query("SELECT * FROM customers", function (err, result, fields) {
//         if (err) throw err;
//         res.json(result);
//     });    
// })


// // //create user
// app.post('/customers', (req, res) => {
//     console.log(req.body)
//     const { name, number,fees, dob,  age, gender, expiry_date, joining_date } = req.body;
  
//     // insert new customer into customers table
//     const sql = 'INSERT INTO customers (name, number, age, fees, dob, gender, expiry_date, joining_date) VALUES (?, ?, ?, ?, ?, ?)';
//     con.query(sql, [name, number, age, fees, dob, gender, expiry_date, joining_date], (err, result) => {
//       if (err) throw err;
//       console.log(result);
//       res.status(200).send('Customer added successfully!');
//     });
//   });

// // //update user
// app.post('/updateUser', (req, res)=>{
//     console.log(req.body)
//     var {number , expiry} = req.body
//     // expiry = new Date(expiry).toISOString().slice(0, 10);
//     var sql = `UPDATE customers SET expiry_date = ${ expiry} WHERE number = ${number}`;
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//             console.log(result.affectedRows + " record(s) updated");
//             res.send("customer updated")
//         });
// })


app.listen(80, ()=>{
    console.log("app is running")
})