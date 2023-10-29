module.exports = {
    isLoggedIn: function(req,res,next){
        if(req.session.user){
            next();
        }else{
            console.log("It is not logged in");
            return res.status(400).json({msessage: "it's not logged in"});
        }
    },

    isNotLoggedIn: function(req,res,next){
        if(!req.session.user){
            next();
        }else{
            console.log("It is logged in");
            return res.status(400).json({message: "it's logged in"});
        }
    },

    isMyProfile: function(req,res,next){
        var {id} = req.params;
        if( id == res.session.user.userId){
            next();
        }else{
            return res.status(400).json({message: "it's not your profile"})
        }
    }
}

/**
 * session auth
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