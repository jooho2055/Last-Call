var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const path = require("path");

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('src');
}catch(err){
    console.log(err)
    fs.mkdirSync('src')
}

const menuStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        try{
            fs.readdirSync('src');
        }catch(err){
            console.log(err)
            fs.mkdirSync('src')
        }
        try{
            fs.readdirSync('src/menus')
        }catch(err){
            console.log(err)
            fs.mkdirSync('src/menus')
        }
        cb(null, 'src/menus/') // Ensure this directory exists
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const restaurantStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        try{
            fs.readdirSync('src');
        }catch(err){
            console.log(err)
            fs.mkdirSync('src')
        }
        try{
            fs.readdirSync('src/restaurants')
        }catch(err){
            console.log(err)
            fs.mkdirSync('src/restaurants')
        }
         cb(null, 'src/restaurants/') // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        if(file){
            cb(null, '/menusimg/' + file.originalname + '-' + Date.now() + path.extname(file.originalname))
        }else{
            cb(null, '/menusimg/' + 'samplefood.png')
        }
    }
});

const customerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        try{
            fs.readdirSync('src');
        }catch(err){
            console.log(err)
            fs.mkdirSync('src')
        }
        try{
            fs.readdirSync('src/customers')
        }catch(err){
            console.log(err)
            fs.mkdirSync('src/customers')
        }
      cb(null, 'src/customers/') // Ensure this directory exists
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: customerStorage });

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

router.post(`/test`,upload.single('file'), (req, res) => {
    res.send('File uploaded successfully.');
});

module.exports = router;