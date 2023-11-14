var express = require('express');
var router = express.Router();
const path = require("path");
var db = require('../conf/database');
const {isLoggedIn, isRestaurants, isMyPage} = require('../middleware/auth')
const {updateProfile, updateMenu} = require('../middleware/restaurantsManage')
const bcrypt = require('bcrypt');

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
 * @method GET
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

const PROFILE_UPDATE1 = {
    id: 1,
    username: "restaurant513",
    password: "sample1!",
    email: "rest1@sam.ple",
    phone: "12312345678",
    city: "San Francisco"
}

const PROFILE_UPDATE2 = {
    id: 2,
    username: "rest2"
}

/**
 * To update rest's profile
 * @method PUT
 * @body mush hold id 
 * @body optional: username, password, email, phone, restName, street, city, zipcode, state, cuisine
 * @Path /restaurants/profile/update
 */
router.put(`/profile/update`, async(req, res) =>{
    let {id, username, password, email, phone, restName, street, city, zipcode, state, cuisine} = req.body;
    try{
        
        const [rows, _ ] = await db.execute(`SELECT * FROM restaurants WHERE id = ?`,[id]);
        console.log(rows)

        const user = rows[0];
        
        if(username && username !== user.username){
            // const [update] = await db.execute(`UPDATE restaurants SET username = ? WHERE id = ?;`,[username,id]);
            // console.log(update);
            const result = await updateProfile(id,'username', username)
            console.log(result)
            if(result.message){
                return res.status(400).json({message: result.message})
            }
            console.log(result)
        }
        
        if(password){
            const hashedpassword = await bcrypt.hash(password,1);
            const result = await updateProfile(id,'password', hashedpassword)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(email && email !== user.email){
            const result = await updateProfile(id,'email', email)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(phone && phone !== user.phone){
            const result = await updateProfile(id,'phone', phone)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(restName && restName !== user.name){
            const result = await updateProfile(id,'name', restName)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(street && street !== user.address){
            const result = await updateProfile(id,'address', street)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(city && city !== user.city){
            const result = await updateProfile(id,'city', city)

            if(result.message){
                return res.status(400).json({message: result})
            }
        }

        if(zipcode && zipcode !== user.zipcode){
            const result = await updateProfile(id,'zipcode', zipcode)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(state && state !== user.state){
            const result = await updateProfile(id,'state', state)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }
        
        if(cuisine && cuisine !== user.cuisine){
            const result = await updateProfile(id,'cuisine', cuisine)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }
        return res.status(200).json({message: "updated"})
    }catch(err){
        return res.status(400).json({err: err.message})
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
 *  @method POST
 */
router.post('/menu/add', /*isLoggedIn, isRestaurants,*/ async (req,res)=>{
    const {restaurantId, price, originalPrice, name} = req.body
    let { desc, img } = req.body
    
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
        if(!img){
            img = null
        }

        // add menu
        var [ result, _ ] = await db.execute(`INSERT INTO menus (restaurant_id,price,original_price,
            name,description,img_path) VALUES(?,?,?,?,?,?);`,[restaurantId,price,originalPrice,name,desc,img])
        if(result && result.affectedRows !== 1){
            return res.status(400).json({meesage: 'fail to login'})
        }
        return res.status(200).json({message:"new menu is added!"})
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
        var [ results, _ ] = await db.execute(`SELECT * FROM menus WHERE restaurant_id = ?;`, [id])
        if(results < 1){
            return res.status(400).json({message: "menu haven't added yet"})
        }
        return res.status(200).json(results)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: err, err:err.message})
    }
})

/**
 * To delete menu
 * @body hold restaurantId, menuId (menu are you going to delete)
 * @path `/restaurants/menu/delete`
 * @method DELETE
 */
router.delete('/menu/delete', /*isLoggedIn, isRestaurants,*/ async function(req,res){
    const {restaurantId, menuId} = req.body
    
    // FOR DEBUG
    // const {restaurantId, menuId} = TEST_DELETE_MENU_CORRECT
    // const {restaurantId, menuId} = TEST_DELETE_MENU_CORRECT
    // console.log(restaurantId, menuId)
    
    // check working on same rest
    // if(req.session.user.userId !== restaurantId){
    //     return res.status(400).json({message: "It's not your restaurant"})
    // }

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
        var [ result, _ ] = await db.execute(`DELETE FROM menus WHERE id = ? AND restaurant_id = ?;`,
        [menuId, restaurantId])
        
        return res.status(200).json({message: "menu is deleted!"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to delete menu", err:err.message})
    }
})

/**
 * To edit menu
 * @method PUT
 * @body must contain menuId
 * @body optional: name, desc, img, quantity, price, originalPrice
 * @path /restaurants/menu/edit
 */
router.put(`/menu/edit`, /*isLoggedIn, isRestaurants,*/ async function(req,res){
    const {menuId} = req.body;

    const {name, desc, img, quantity, price, originalPrice} = req.body

    try{
        const [menus] = await db.execute(`SELECT * FROM menus WHERE id = ?;`,[menuId]);

        if(menu.length < 1){
            return res.status(400).json({message: "menu does not exist"})
        }

        const menu = menus[0]

        if(name && name !== menu.name){
            const result = await updateMenu(id,'name', name)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(desc && desc !== menu.desc){
            const result = await updateProfile(id,'description', desc)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(quantity && quantity !== menu.quantity){
            const result = await updateProfile(id,'quantity', quantity)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(price && price !== menu.price){
            const result = await updateProfile(id,'price', price)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        if(originalPrice && originalPrice !== menu.originalPrice){
            const result = await updateProfile(id,'originalPrice', originalPrice)

            if(result.message){
                return res.status(400).json({message: result.message})
            }
        }

        return res.status(200).json({message: "menu updated"})
    }catch(err){
        return res.status(400).json({message: err.meesage})
    }
} )

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

/**
 * To get current order for restaurants
 * @method GET
 * @params id (restaurant id)
 * @path /restaurants/order/current/:id(\\d+)
 */
router.get(`/order/current/:id(\\d+)`, /*isLoggedIn, isRestaurants,*/ async function(req,res){
    const {id} = req.params;
    try{
        const [orders, _ ] = await db.execute(`SELECT * from orders LEFT JOIN menus ON orders.menu_id = menus.id WHERE menus.restaurant_id = ? AND orders.status = 0 ORDER BY created_at;`,[id]);
        console.log(orders)

        return res.status(200).json(orders)

    }catch(err){
        return res.status(400).json({err:err.meesage})
    }

})


module.exports = router;
