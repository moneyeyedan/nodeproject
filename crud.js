var mysql=require('mysql');
var express=require('express');
var bodyParser = require('body-parser')
var app=express();
app.use(bodyParser.json());

var con=mysql.createConnection({host:"localhost",
user:"root",
password:"mani",
database:"crud"
});
//con.connect((err)=>{
    //if(err)throw err;
   // console.log("connected");
   // con.query("create database crud",(err,result)=>{
      //  if(err)throw err;
       // console.log("database created");
   // });
//});
app.route('/mani').get((req,res)=>{
        /*Create a table named "customers":*/
        var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send("Table created");
        });
      });
app.post('/user/post',(req,res)=>{
    let user={
        "name":req.body.name,
        "address":req.body.address
    }
        /*Create a table named "customers":*/
        var sql = "insert into customers set ?";
        con.query(sql,user, function (err, result) {
          if (err) throw err;
          res.send("createdrow1");
        });
});

  app.delete('/user/delete', function (req, res) {
      let users={
          "name":req.body.name
      }
      var sql="delete from customers where ?";
      con.query(sql,users,(err,result)=>{
          if(err) throw err;
          res.send("delete row 1");
      });
  });
  app.get('/user/select',(req,res)=>{
      let url="select * from customers";
    let dis=  con.query(url,(err,result)=>{
          if(err) throw err;
          res.send(result);
      });
      
  });
app.put('/user/update',(req,res)=> {
    var newname= [req.body.name,"kogul"];
    let url="update customers set name = ? "+"where name =  ?";
    con.query(url,newname,(err,result)=>{
        if(err) throw err;
        res.send("update the value");
    });
});

var server=app.listen(2000,()=>{});