const express = require("express");
const path = require("path");
const app = express();
var db = require('./conf/database');
const port = 5001;

app.set("port", process.env.PORT || port);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get(`/search?search=${searchValue}`, async(req, res)=>{
  const query = `SELECT * FROM member `;
  console.log(req.query.search);
  console.log(req.query.search == null);
  if(req.query.search == null){
    var [rows, fields] = await db.query(query, []);
    res.status(200).json(rows);
  }else{
    var [rows, fields] = await db.query(query, []);
    res.status(200).json(rows);
  }
  

  res.status(200).json(rows[0]);
})

app.get("/AboutUs", (req,res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.get("/AboutUs/:name", (req,res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.get('/allMembers', async (req, res) => {
  const query = `SELECT * FROM member `;
  var [rows, fields] = await db.query(query, []);
  res.send(rows);
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), `app listening at ${port}`);
});