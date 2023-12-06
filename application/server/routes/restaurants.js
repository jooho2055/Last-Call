var express = require('express');
var router = express.Router();
const path = require("path");
var db = require('../conf/database');
const {isLoggedIn, isRestaurants, isMyPage} = require('../middleware/auth')
const bcrypt = require('bcrypt');
const cors = require('cors')

let corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5001'],
    credentials: true
  }
  
router.use(cors(corsOptions))


// This is vars for debug
const TESTMENU_CORRECT = {
    restautrantId: 11,
    price: 10,
    originalPrice: 16,
    name: "pasta"
}

const TESTMENU_WRONG = {
    restautrantId: 1,
    price: 10,
    orignalPrice: 16,
    name: "pasta"
}

const TEST_DELETE_MENU_CORRECT = {
    restaurantId:11, 
    menuId: 7
}

const TEST_DELETE_MENU_WRONG1 = {
    restaurantId:1, 
    menuId: 2
}

const TEST_DELETE_MENU_WRONG2 = {
    restaurantId:11, 
    menuId: 2
}

const TEST_DELETE_MENU_WRONG3 = {
    restaurantId:11, 
    menuId: 9999
}

const TEST_SET_MENU_CORRECT = {
    restaurantId:11, 
    menuId:8, 
    quantity:7
}

// correct
const TEST_SET_MENU_WRONG1 = {
    restaurantId:11, 
    menuId:8, 
    quantity:6
}

// no change
const TEST_SET_MENU_WRONG2 = {
    restaurantId:11, 
    menuId:8, 
    quantity:6
}

// diff rest
const TEST_SET_MENU_WRONG3 = {
    restaurantId:11, 
    menuId:4, 
    quantity:6
}

// menu not exist
const TEST_SET_MENU_WRONG4 = {
    restaurantId:11, 
    menuId:9999, 
    quantity:6
}



/**
 * To get restaurants info
 * @params hold restaurants id
 * @Path `/restaurants/info/:id
 */
router.get(`/info/:id(\\d+)`,async(req,res) => {
    const {id} = req.params;
    console.log(id)
        try{
            var [result, _ ] = await db.execute(`SELECT * FROM restaurants WHERE id = ?`,[id]);
            const restauranat = result[0]
            return res.status(200).json(restauranat)
        }catch(err){
            console.log(err)
            return res.status(400).json({message: "fail to bring your profile"})
        }
})
/**
 * To update rest's profile
 * @Method PUT
 * @body 
 * @Path /restaurants/profile/update
 */
// router.put(`/profile/update`, async(req, res) =>{
//     let {id, username, password, email, phone, restName, street, city, zipcode, state, cuisine} = req.body;

//     try{
//         const [rows, _ ] = await db.execute(`SELECT * FROM restaurants WHERE id = ?`,[id]);
    
//         const user = rows[0];
    
//         var hashedPasswrod = await bcrypt.hash(pwd,1);
        
//         var [results, _ ] = await db.execute(`UPDATE restaurants SET username = ? AND password = ? AND email = ? AND phone = ? AND restName = ? `)
//     }
// })


/**
 * To get restaurants profile
 * @params hold restaurants id
 * @Path `/restaurants/profile/:id(\\d+)`
 */
router.get(`/profile/:id(\\d+)`, /*isLoggedIn, isRestaurants, isMyPage,*/
    async function(req,res){
        const {id} = req.params;
        console.log(id)
        try{
            var [result, _ ] = await db.execute(`SELECT  * FROM restaurants WHERE id = ?`,[id]);
            const restauranat = result[0]
            return res.status(200).json(restauranat)
        }catch(err){
            console.log(err)
            return res.status(400).json({message: "fail to bring your profile"})
        }
    }
)

/**
 *  To add new menu for restaurant 
 *  @Post
 *  @Body must hold restautrantId, price, orignalPrice, name 
 *  @Options img, desc
 *  @path `/restaurants/menu/add`
 */
router.post(`/menu/add`, /*isLoggedIn, isRestaurants,*/ async function(req,res){
    const {restaurantId, price, originalPrice, name} = req.body
    var { desc, img } = req.body
    
    // TEST
    // var {restautrantId, price, orignalPrice, desc, name, img} = TESTMENU_CORRECT
    // var {restautrantId, price, orignalPrice, desc, name, img} = TESTMENU_WRONG
    // console.log(restautrantId, price, orignalPrice, name, desc, img)
    
    // check correct body form
    if(!(restaurantId && price && orignalPrice && name)){
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
        if(!img){
            img = null
        }

        // add menu
        var [ result, _ ] = await db.execute(`INSERT INTO menus (fk_menus_restaurant,price,original_price,
            name,description,img_path) VALUES(?,?,?,?,?,?);`,[restaurantId,price,orignalPrice,name,desc,img])
        return res.status(200).json({message:"new menu is added!"})
    }catch(err){
        return res.status(400).json({message: "fail to add menu"})
    }
})

/**
 * To get all the menus from restaurants
 * @params hold restaurantsId
 * @path `/restaurants/menu/list/:id(\\d+)`
 */
router.get(`/menu/list/:id(\\d+)`, /*isLoggedIn,*/ async function(req,res){
    const { id } = req.params
    try{
        var [ results, _ ] = await db.execute(`SELECT * FROM menus WHERE fk_menus_restaurant = ?;`, [id])
        if(results < 1){
            return res.status(400).json({message: "menu haven't added yet"})
        }
        return res.status(200).json(results)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: err})
    }
})

/**
 * To delete menu
 * @body hold restaurantId, menuId (which menu are you going to delete)
 * @path `/restaurants/menu/delete`
 */
router.post('/menu/delete', /*isLoggedIn, isRestaurants,*/ async function(req,res){
    const {restaurantId, menuId} = req.body
    
    // FOR DEBUG
    // const {restaurantId, menuId} = TEST_DELETE_MENU_CORRECT
    // const {restaurantId, menuId} = TEST_DELETE_MENU_CORRECT
    // console.log(restaurantId, menuId)
    
    // check working on same rest
    if(req.session.user.userId !== restaurantId){
        return res.status(400).json({message: "It's not your restaurant"})
    }

    try{
        // get menu from database
        var [ result, _ ] = await db.execute(`SELECT * FROM menus WHERE id = ?;`,
        [menuId])

        // check menu exists  
        if(result.length < 1){
            return res.status(400).json({message: "menu does not exists"})
        }

        var menu = result[0]

        // check menu owner
        if( menu.fk_menus_restaurant !== restaurantId)
            return res.status(400).json({message: "This menu is not in your restaurant"})

        // delete menu
        var [ result, _ ] = await db.execute(`DELETE FROM menus WHERE id = ? AND fk_menus_restaurant = ?;`,
        [menuId, restaurantId])
        
        return res.status(200).json({message: "menu is deleted!"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to delete menu"})
    }
})

/**
 * To set up quantity for menu
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
    if(req.session.user.userId !== restaurantId){
        return res.status(400).json({message: "It's not your restaurant"})
    }

    try{
         // get menu from database
         var [ result, _ ] = await db.execute(`SELECT * FROM menus WHERE id = ?;`,
         [menuId])
 
         // check menu exists  
         if(result.length < 1){
             return res.status(400).json({message: "menu does not exists"})
         }

         var menu = result[0]

         // check menu owner
        if( menu.fk_menus_restaurant !== restaurantId)
            return res.status(400).json({message: "This menu is not in your restaurant"})

        // check update value
        if( menu.quantity === quantity)
            return res.status(400).json({message: "Quantity didn't changed"})

        // update quantity
        var [ result, _ ] = await db.execute(`UPDATE menus SET quantity=? WHERE id = ?;`,
        [quantity, menuId])
        console.log(result)
        return res.status(200).json({message: "quantity is updated"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to update"})
    }

})


module.exports = router;