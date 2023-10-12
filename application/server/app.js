const express = require("express");
const path = require("path");
const app = express();
var db = require('./conf/database');
const port = 5001;
const cors = require('cors');
let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions));

app.set("port", process.env.PORT || port);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get(`/search`, async(req, res)=>{
  const query = `SELECT * FROM restaurants `;
  const {search} = req.query;
  console.log(search)
  try{
      if(search == null){
        var [rows, fields] = await db.query(`SELECT restaurant_id, name_r, cuisine, status FROM restaurants WHERE status>0`, []);
        res.status(200).json(rows);
      }else{
        var [rows, fields] = await db.query(`SELECT restaurant_id, name_r, cuisine, status, concat_ws(' ', name_r, cuisine) as haystack FROM restaurants having haystack like ?;`, [`%${search}%`]);
        res.status(200).json(rows);
      }
  }catch(error){
    res.status(400);
  }
});

app.get("/AboutUs", (req,res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.get("/AboutUs/:name", (req,res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"), `app listening at ${port}`);
});