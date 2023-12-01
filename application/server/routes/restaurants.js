const express = require('express');
const router = express.Router();
const path = require("path");
const db = require('../conf/database');
const {isLoggedIn, isRestaurants, isMyPage} = require('../middleware/auth')
const {getRestaurantsById,updateRestImgById,updateMenuImgById,getRestInfoById,addMenu,getMenusByRestId,
    getMenuById,getCartsByMenuId,deleteCartsByMenuId,getOrdersByMenuId,deleteOrdersByMenuId,deleteMenuById,
    updateMenuQuantityById,updateMenuInfo,getRestCurrentOrdersById
} = require('../conf/queries')
const {updateProfile, updateMenu} = require('../middleware/restaurantsManage')
const bcrypt = require('bcrypt');

const multer = require('multer');
const {menuStorage, restaurantStorage} = require('../conf/multer')
const menuUpload = multer({ storage: menuStorage });
const restaurantUpload = multer({ storage: restaurantStorage });

/**
 * To get restaurants info
 * @params hold restaurants id
 * @Path `/restaurants/info/:id
 * @method GET
 */
router.get(`/info/:id(\\d+)`,async(req,res) => {
    const {id} = req.params;

    try{
        const [result, _ ] = await db.execute(getRestInfoById,[id]);
        const restauranat = result[0]
        return res.status(200).json(restauranat)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to bring your profile"})
    }
})

/**
 * To update rest's profile
 * @method PUT
 * @body id username, password, email, phone, restName, street, city, zipcode, state, cuisine
 * @Path /restaurants/profile/update
 */
router.put(`/profile/update`, async(req, res) =>{
    let {id, username, password, email, phone, restName, street, city, zipcode, state, cuisine} = req.body;
    try{
        
        const [restaurant, _ ] = await db.execute(getRestaurantsById,[id]);

        if(restaurant.length > 0){
            const [result, resultField] = await db.execute(updatRestProfile,
                [username, email, phone, city, street, restName, zipcode, state, cuisine, id]);
        }
        return res.status(200).json({message: "updated"})
    }catch(err){
        return res.status(400).json({err: err.message})
    }
})

/**
 * To update restaurnat profile img
 * @ContentType multipart/form-data
 * @Body restaurantId
 * @Path `/restaurants/profile/image`
 * @Method POST
 */
router.post('/profile/image' ,restaurantUpload.single('file'), async(req,res)=>{    
    const {path} = req.file
    const {restaurantId} = req.body

    try{
        const [result, field] = await db.execute(updateRestImgById,[path,restaurantId]);

        if(result.affectedRows>0){
            return res.status(200).json({message:"image updated"})
        }
        return res.status(400).json({message:"fail to update"})
    }catch(err){
        return res.status(400).json({message:err})
    }
})

/**
 * To get restaurants profile
 * @params hold restaurants id
 * @Path `/restaurants/profile/:id(\\d+)`
 * @method GET
 */
router.get(`/profile/:id(\\d+)`, /*isLoggedIn, isRestaurants, isMyPage,*/
    async function(req,res){
        const {id} = req.params;
        console.log(id)
        try{
            var [result, _ ] = await db.execute(getRestaurantsById,[id]);
            const restauranat = result[0]
            return res.status(200).json(restauranat)
        }catch(err){
            console.log(err)
            return res.status(400).json({message: "fail to bring your profile"})
        }
    }
)

TEST_ADD_MENU = {
    restaurantId: 1,
    price: 5,
    originalPrice: 10,
    name: "TEST",
}
/**
 *  To add new menu for restaurant 
 *  @Post
 *  @Body must hold restautrantId, price, orignalPrice, name 
 *  @Options img, desc
 *  @path `/restaurants/menu/add`
 *  @method POST
 */
router.post('/menu/add', /*isLoggedIn, isRestaurants,*/ async (req,res)=>{
    let {restaurantId, price, originalPrice, name} = req.body
    // let {restaurantId, price, originalPrice, name} = TEST_ADD_MENU
    if(typeof(restaurantId) === "string"){
        restaurantId = parseInt(restaurantId)
    }

    if(typeof(price) === "string"){
        price = parseFloat(price)
    }

    if(typeof(originalPrice) === "string"){
        originalPrice = parseFloat(originalPrice)
    }

    let { desc } = req.body
    
    // TEST
    // var {restautrantId, price, orignalPrice, desc, name, img} = TESTMENU_CORRECT
    // var {restautrantId, price, orignalPrice, desc, name, img} = TESTMENU_WRONG
    // console.log(restautrantId, price, orignalPrice, name, desc, img)
    
    // check correct body form
    if(!restaurantId || !price || !originalPrice || !name){
        return res.status(400).json({message: "missed inputs"})
    }

    // check working on same rest
    // if(restaurantId !== req.session.user.userId){
    //     return res.status(400).json({message: "It is not your restaurants"})
    // }

    try{
        // handle default value
        if(!desc){
            desc = null
        }

        // add menu
        const [ newMenu, resultField ] = await db.execute(addMenu,[restaurantId,price,originalPrice,name,desc])
        console.log(newMenu)
        console.log(resultField)
        if(newMenu && newMenu.affectedRows !== 1){
            return res.status(400).json({meesage: 'fail to add menu'})
        }

        return res.status(200).json({message:"new menu is added!", menuId:newMenu.insertId})
    }catch(err){
        return res.status(400).json({message: "fail to add menu"})
    }
})

/**
 * To get all the menus from restaurants
 * @params hold restaurantsId
 * @path `/restaurants/menu/list/:id(\\d+)`
 * @method GET
 */
router.get(`/menu/list/:id(\\d+)`, /*isLoggedIn,*/ async function(req,res){
    const { id } = req.params
    try{
        var [ menus, menusField ] = await db.execute(getMenusByRestId, [id])
        if(menus.length < 1){
            return res.status(400).json({message: "menu haven't added yet"})
        }
        return res.status(200).json(menus)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: err, err:err.message})
    }
})

TEST_DELETE = {
    restaurantId:"1",
    menuId: 16
}
/**
 * To delete menu
 * @body hold restaurantId, menuId (menu are you going to delete)
 * @path `/restaurants/menu/delete`
 * @method DELETE
 */
router.delete('/menu/delete', /*isLoggedIn, isRestaurants,*/ async function(req,res){
    let {restaurantId, menuId} = req.body
    // let {restaurantId, menuId} = TEST_DELETE
    // FOR DEBUG
    // const {restaurantId, menuId} = TEST_DELETE_MENU_CORRECT
    // const {restaurantId, menuId} = TEST_DELETE_MENU_CORRECT
    // console.log(restaurantId, menuId)
    if(typeof(restaurantId) === "string"){
        restaurantId = parseInt(restaurantId)
    }

    if(typeof(menuId) === "string"){
        menuId = parseInt(menuId)
    }

    // check working on same rest
    // if(req.session.user.userId !== restaurantId){
    //     return res.status(400).json({message: "It's not your restaurant"})
    // }

    try{
        // get menu from database
        const [ menus, menuField ] = await db.execute(getMenuById,[menuId])
        
        const menu = menus[0]

        // check menu exists  
        if(menus.length < 1 || menu.restaurant_id !== restaurantId){
            return res.status(400).json({message: "menu does not exists"})
        }


        // check menu owner
        // if( )
        //     return res.status(400).json({message: "This menu is not in your restaurant"})

      
        const deleteCart = await db.execute(deleteCartsByMenuId,[menuId]);
                
        const deleteOrders = await db.execute(deleteOrdersByMenuId, [menuId])
        
        // delete menu
        const [ result, resultField ] = await db.execute(deleteMenuById,[menuId])
        
        return res.status(200).json({message: "menu is deleted!"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to delete menu", err:err.message})
    }
})

const TEST = {
    menuId: 3,
    name: "smaple",
    quantity: 10,
    desc: null,
    price: 15,
    originalPrice: 300
}
/**
 * To edit menu
 * @method PUT
 * @body must contain menuId
 * @body optional: name, desc, img, quantity, price, originalPrice
 * @path /restaurants/menu/edit
 */
router.post(`/menu/edit`, /*isLoggedIn, isRestaurants,*/ async function(req,res){

    let {menuId, name, desc, quantity, price, originalPrice} = req.body
    // let {menuId, name, desc, quantity, price, originalPrice} = TEST;
    try{
        const [menus] = await db.execute(getMenuById,[menuId]);

        if(menus.length < 1){
            return res.status(400).json({message: "menu does not exist"})
        }
        
        if(!desc || desc.length < 0){
            desc = null;
        }

        const [update, updateField] = await db.execute(updateMenuInfo,[name,price,quantity,originalPrice,desc,menuId])

        return res.status(200).json({message: "menu updated"})
    }catch(err){
        return res.status(400).json({message: err.meesage})
    }
} )

/**
 * To update menu img
 * @ContentType multipart/form-data
 * @Body menuId
 * @Path `/restaurants/menus/image`
 * @Method POST
 */
router.post('/menus/image' ,menuUpload.single('file'), async(req,res)=>{    
    const {path} = req.file
    const {menuId} = req.body

    try{
        const [result, field] = await db.execute(updateMenuImgById,[path,menuId]);

        if(result.affectedRows>0){
            return res.status(200).json({message:"image updated"})
        }
        return res.status(400).json({message:"fail to update"})
    }catch(err){
        return res.status(400).json({message:err})
    }
})

/**
 * To set up quantity for menu
 * @method POST
 * @body must holds restaurantId, menuId, quantity(to update)
 * @path `/restaurants/menu/setqauntity`
 */
router.post('/menu/setqauntity', /*isLoggedIn, isRestaurants,*/ async function(req, res){
    const {restaurantId, menuId, quantity} = req.body

    //For DEBUG
    // const {restaurantId, menuId, quantity} = TEST_SET_MENU_CORRECT
    // const {restaurantId, menuId, quantity} = TEST_SET_MENU_WRONG1
    // const {restaurantId, menuId, quantity} = TEST_SET_MENU_WRONG2
    // const {restaurantId, menuId, quantity} = TEST_SET_MENU_WRONG3
    // const {restaurantId, menuId, quantity} = TEST_SET_MENU_WRONG4
    // console.log(restaurantId, menuId, quantity)

    // check working on same rest
    // if(req.session.user.userId !== restaurantId){
    //     return res.status(400).json({message: "It's not your restaurant"})
    // }

    try{
         // get menu from database
         const [ result, resultField ] = await db.execute(getMenuById,[menuId])
 
         // check menu exists  
         if(result.length < 1){
             return res.status(400).json({message: "menu does not exists"})
         }

         const menu = result[0]

         // check menu owner
        if( menu.restaurant_id !== restaurantId)
            return res.status(400).json({message: "This menu is not in your restaurant"})

        // check update value
        if( menu.quantity === quantity)
            return res.status(500).json({message: "Quantity didn't change"})

        // update quantity
        const [ update, updateField ] = await db.execute(updateMenuQuantityById,[quantity, menuId])
        return res.status(200).json({message: "quantity is updated"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to update"})
    }
})

/**
 * To get current order for restaurants
 * @method GET
 * @params id (restaurant id)
 * @path /restaurants/order/current/:id(\\d+)
 */
router.get(`/order/current/:id(\\d+)`, /*isLoggedIn, isRestaurants,*/ async function(req,res){
    const {id} = req.params;
    try{
        const [orders, _ ] = await db.execute(getRestCurrentOrdersById,[id]);

        return res.status(200).json(orders)
    }catch(err){
        return res.status(400).json({err:err.meesage})
    }
})


module.exports = router;
