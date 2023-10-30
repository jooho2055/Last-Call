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
            var [rows, fields] = await db.query(`SELECT id, name, cuisine, status FROM restaurants WHERE status = "open";`, []);
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
        const [results, _ ] = await db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 0;`,[id]);
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
        const [results, _ ] = await db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 1;`,[id]);
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
router.get(`/order/cart/:id(\\d+)`, isLoggedIn, isCustomers, isMyPage, async function(req,res){
    const {id} = req.params
    try{
        var [results, _ ] = await db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 2;`, [id])
        if(results.length < 1){
            return res.status(400).json({message: "cart is empty"})
        }
        console.log(results)
        return res.status(200).json(results)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to get cart"})
    }
})

/**
 * To checkout cart and create order
 * @body holds customerId
 * @path `/customers/order/cart/checkout`
 * order status: 0: current, 1: done, 2: cart, 3: declined
 */
router.post(`/order/cart/checkout`, isLoggedIn, isCustomers, async function(req, res){
    const {customerId} = req.body

    if(req.session.user.userId !== customerId){
        return res.status(400).json({message: "wrong access!"})
    }

    try{
        var [items, _ ] = await db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 2;`, [customerId])
        if(items.length < 1){
            return res.status(400).json({message: "cart is empty"})
        }
        items.map(async function(item){
            var [result, _ ] = await db.execute(`UPDATE orders SET status=0 WHERE id = ?;`,[item.id])
            console.log(result)
        })
        return res.status(200).json({message: "thank you"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to get cart"})
    }

})

DEBUG_CART_ADD = {
  customerId:1, 
  menuId:8, 
  restaurantId:11
}

/**
 * To add menu in the cart
 * @body holds menuId, customerId, restaurantId
 * @path `/customers//order/cart/add`
 */
router.post('/order/cart/add', isLoggedIn, isCustomers, async function(req,res){
    const {customerId, menuId, restaurantId} = req.body
    // const {customerId, menuId, restaurantId} = DEBUG_CART_ADD;
    if(req.session.user.userId !== customerId){
        return res.status(400).json({message: "wrong access!"})
    }

    try{
        var [result, _ ] = await db.execute(`SELECT * FROM menus WHERE id = ?;`,[menuId])
        if(result.length < 1){
            return res.status(400).json({message: "menu does not exist"})
        }
        var menu = result[0]
        if(menu.fk_menus_restaurant !== restaurantId){
            return res.status(400).json({message: "error rest don't match with menu"})
        }
        var [result, _ ] = await db.execute(`INSERT INTO orders (fk_orders_menu,fk_orders_customer) VALUES(?,?);`,
        [menuId, customerId])
        console.log(result)

        return res.status(200).json({message: "new item is added!"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to get cart"})
    }
})

DEBUG_CART_DELETE_MENU = {
  customerId:1, 
  menuId:8, 
  restaurantId:99
}
/**
 * To delete one menu in the cart
 * @body holds menuId and customerId
 * @path `/customers/order/cart/delete/menu`
 */
router.post(`/order/cart/delete/menu`, isLoggedIn, isCustomers, async function(req,res){
    const {menuId, customerId} = req.body
    // const {menuId, customerId} = DEBUG_CART_DELETE_MENU
    if(req.session.user.userId !== customerId){
        return res.status(400).json({message: "wrong access!"})
    }

    try{
        var [item, _ ] = await db.execute(`SELECT * FROM orders WHERE fk_orders_menu = ? AND fk_orders_customer = ? AND status = 2;`, 
        [menuId, customerId]);
        
        if( item.length < 1){
          return res.status(400).json({message: "item does not exist"})
        }

        var [result, _ ] = await db.execute(`DELETE FROM orders WHERE fk_orders_menu = ? AND fk_orders_customer = ? AND status = 2;`,
        [menuId, customerId])
        console.log(result)

        return res.status(200).json({message: "Item is deleted"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message:"fail to delete menu"})
    }

})

DEBUG_CART_DELETE = {
  customerId: 1
}
/**
 * To delete all the menu in the cart
 * @body holds customer detail
 * @path `/customers/order/cart/delete`
 */
router.post('/order/cart/delete', isLoggedIn, isCustomers, async function(req,res){
    const { customerId} = req.body
    // const {customerId} = DEBUG_CART_DELETE
    if(req.session.user.userId !== customerId){
        return res.status(400).json({message: "wrong access!"})
    }

    try{
        var [items , _ ] = await db.execute(`SELECT * FROM orders WHERE fk_orders_customer = ? AND status = 2;`, 
        [customerId]);

        if( items.length < 1){
            return res.status(400).json({message: "item does not exist"})
        }
        
        var [result, _ ] = await db.execute(`DELETE FROM orders WHERE fk_orders_customer = ? AND status = 2;`,
        [customerId])
        console.log(result)

        return res.status(200).json({message: "cart is deleted"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message:"fail to empty cart"})
    }
})

module.exports = router;