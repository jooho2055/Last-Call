// here is all helper function for authentication
module.exports = {
    // check it is logged in
    isLoggedIn: function(req,res,next){
        if(req.session.user){
            next();
        }else{
            console.log("It is not logged in");
            return res.status(400).json({msessage: "it's not logged in"});
        }
    },

    // check is not logged in
    isNotLoggedIn: function(req,res,next){
        if(!req.session.user){
            next();
        }else{
            console.log("It is logged in");
            return res.status(400).json({message: "it's logged in"});
        }
    },

    // check is my page
    isMyPage: function(req,res,next){
        // get id from params
        var {id} = req.params;
        id = parseInt(id) // string to Int
        
        // handle wrong access
        if( id !== req.session.user.userId){
            return res.status(400).json({message: "wrong access(It is not your page!)"})
        }

        next()
    },

    // check user is customers
    isCustomers: function(req,res,next){
        if(req.session.user.role !== 'customers'){
            return res.status(400).json({message: "It's not customers"})
        }
        next()
    },

    // check user is reataurnats
    isRestaurants: function(req,res,next){
        if(req.session.user.role !== 'restaurants'){
            return res.status(400).json({message: "It's not restaurants"})
        }
        next()
    } ,

}

/**
 * This if for passport auth
 */
// check logged in
// exports.isLoggedIn = (req,res,next) => {
//     //check auth
//     if(req.isAuthenticated()){
//         next();
//     }else{
//         console.log("is not logged in")
//         res.status(400).send("It is not logged in");
//     }
// }

// exports.isNotLoggedIn = (req,res,next) => {
//     if(!req.isAuthenticated()){
//         next();
//     }else{
//         console.log("is logged in")
//         res.status(400).send("It is logged in");
//     }
// }