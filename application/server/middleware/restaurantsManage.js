// All helper function for restaurants management

module.exports = {
    isYourRest: function(req,res,next){
        if(req.session.user.userId !== restaurantId){
            return res.status(400).json({message: "It's not your restaurant"})
        }
        next()
    },

    menuExists: async function(req,res,next){
        const {menuId} = req.body
        try{
            // get menu from database
            var [ result, _ ] = await db.execute(`SELECT * FROM menus WHERE id = ?;`,
            [menuId])
    
            // check menu exists  
            if(result.length < 1){
                return res.status(400).json({message: "menu does not exists"})
            }
    
            next()
        }catch(err){
            console.log(err)
            return res.status(400).json({message: "fail"})
        }
    },

    checkMenuOwner: async function(req,res,next){
        const {menuId} = req.body

        try{
            // get menu from database
            var [ result, _ ] = await db.execute(`SELECT * FROM menus WHERE id = ?;`,
            [menuId])
    
            // check menu exists  
            if(result.length < 1){
                return res.status(400).json({message: "menu does not exists"})
            }
    
            const menu = result[0]
    
            if( menu.fk_menus_restaurant !== restaurantId)
                return res.status(400).json({message: "This menu is not in your restaurant"})
    
            next()
        }catch(err){
            console.log(err)
            return res.status(400).json({message: "fail"})
        }
    },
}