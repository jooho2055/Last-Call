var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const path = require("path");
const {menuStorage, customerStorage, restaurantStorage} = require('../conf/multer')
const multer = require('multer');
const customerUpload = multer({ storage: customerStorage });
const menuUpload = multer({ storage: menuStorage });
const restaurantUpload = multer({ storage: restaurantStorage });

router.get(`/search`, async(req, res)=>{
    const {search} = req.query;
    console.log("this is search value: ", search)
    try{
        if(search == null){
            var [rows, fields] = await db.execute(`SELECT id, name, cuisine, status, img_path, concat(address, ', ', city, ', ', state, ', ', zipcode) as address FROM restaurants WHERE status = 'open';`);
            res.status(200).json(rows);
        }else{
            var [rows, fields] = await db.query(`SELECT id, name, cuisine, status, img_path, concat(address, ', ', city, ', ', state, ', ', zipcode) as address, concat_ws(' ', name, cuisine, status) as haystack FROM restaurants having haystack like ?;`, [`%${search}%`]);
            res.status(200).json(rows);
        }
    }catch(error){
        res.status(400);
}
});

router.post(`/test`,restaurantUpload.single('file'), (req, res) => {
    console.log(req.file)
    res.send('File uploaded successfully.');
});

module.exports = router;