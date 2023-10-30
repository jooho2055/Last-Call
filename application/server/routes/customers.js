var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const path = require("path");
const {isLoggedIn, isCustomers, isMyPage} = require('../middleware/auth')

router.get(`/search`, async(req, res)=>{
    const query = `SELECT * FROM restaurants `;
    const {search} = req.query;
    console.log(search)
    try{
        if(search == null){
            var [rows, fields] = await db.query(`SELECT id, name, cuisine, status FROM restaurants WHERE status = "open"`, []);
            res.status(200).json(rows);
        }else{
            var [rows, fields] = await db.query(`SELECT id, name, cuisine, status, concat_ws(' ', name, cuisine, status) 
            as haystack FROM restaurants having haystack like ?;`, [`%${search}%`]);
            res.status(200).json(rows);
        }
    }catch(error){
        res.status(400);
    }
  });

/**
 * To get curreent order for customer
 * @params customerId
 * @path /customers/order/current/:id(\\d+)
 */
router.get(`/order/current/:id(\\d+)`, isLoggedIn, isCustomers, isMyPage,  async function(req, res){
    const {id} = req.params

    try{
        const [results, _ ] = db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 0`,[id]);
        if(results.length < 1){
          return res.status(400).json({message: "no results"})
        }
        console.log(results)
        return res.status(200).json(results)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to get current order"})
    }
})
/**
 * To get past order for customer
 * @params customerId
 * @path customers//order/past/:id(\\d+)
 */
router.get(`/order/past/:id(\\d+)`, isLoggedIn, isCustomers, isMyPage, async function(req,res){
    const {id} = req.params
    try{
        const [results, _ ] = db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 1`,[id]);
        if(results.length < 1){
            return res.status(400).json({message: "no results"})
        }
        console.log(results)
        return res.status(200).json(results)
    }catch(err){
       console.log(err)
        return res.status(400).json({message: "fail to get current order"})
    }
})

/**
 * To get list of cart
 * @params customerId
 * @path `/customers//order/cart/:id(\\d+)`
 */
    // router.get(`/order/cart/:id(\\d+)`, isLoggedIn, isCustomers, isMyPage, async function(req,res){

    // })
/**
 * To checkout cart and create order
 * @body holds menu and customer detail
 * @path `/customers/order/cart/checkout`
 * order status: 0: current, 1: done, 2: cart, 3: declined
 */
// router.post(`/order/cart/checkout`, isLoggedIn, isCustomers, async function(req, res){

// })

/**
 * To add menu in the cart
 * @body holds menu detail and customer detail
 * @path `/customers//order/cart/add`
 */
// router.post('/order/cart/add', isLoggedIn, isCustomers, async function(req,res){

// })

/**
 * To delete one menu in the cart
 * @body holds menu detail and customer detail
 * @path `/customers/order/cart/delete/menu`
 */
// router.post(`/order/cart/delete/menu`, isLoggedIn, isCustomers, async function(req,res){

// })

/**
 * To delete all the menu in the cart
 * @body holds customer detail
 * @path `/customers/order/cart/delete`
 */
// router.post('/order/cart/delete', isLoggedIn, isCustomers, async function(req,res){

// })

module.exports = router;