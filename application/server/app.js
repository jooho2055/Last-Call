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