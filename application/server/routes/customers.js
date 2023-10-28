var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const path = require("path");

router.get(`/search`, async(req, res)=>{
    const query = `SELECT * FROM restaurants `;
    const {search} = req.query;
    console.log(search)
    try{
        if(search == null){
          var [rows, fields] = await db.query(`SELECT id, name, cuisine, status FROM restaurants WHERE status>0`, []);
          res.status(200).json(rows);
        }else{
          var [rows, fields] = await db.query(`SELECT id, name, cuisine, status, concat_ws(' ', name, cuisine, status) as haystack FROM restaurants having haystack like ?;`, [`%${search}%`]);
          res.status(200).json(rows);
        }
    }catch(error){
      res.status(400);
    }
  });

  module.exports = router;