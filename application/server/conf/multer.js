const multer = require('multer')
const fs = require('fs')
const path = require("path");

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
})

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
})

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
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

module.exports = {customerStorage, menuStorage, restaurantStorage}