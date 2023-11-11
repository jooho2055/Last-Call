var express = require('express');
var router = express.Router();
const path = require("path");
const bcrypt = require('bcrypt');
var db = require('../conf/database');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');
const cors = require('cors')

router.use(cors())

// for customer sign up
router.post('/signup/customer',async (req,res)=>{
    // get user info from body
    var {fname, lname, username, email, pwd, phone} = req.body;
    
    try{
        // hashing password
        var hasedPasswrod = await bcrypt.hash(pwd,1);
        
        // Insert user into database 
        var [result, _] = await db.execute(`INSERT INTO customers(firstname, lastname, username, password, phone, 
            email, points, created_at, updated_at) VALUES(?,?,?,?,?,?,0,NOW(),NOW());`,
            [fname, lname, username, hasedPasswrod, phone, email]);
        console.log(result);

        return res.status(200).json({message: "welcome!"});
    }catch(err){
        // catch All errors
        return res.status(400).json(err)
    }
})

// for restaurant sign up
router.post('/signup/restaurant',async (req,res)=>{
    // get user info from body
    var {username, rname, city,pwd, cuisine, email, phone, state, street, zip} = req.body;
    try{
        // hashing password
        var hasedPasswrod = await bcrypt.hash(pwd,1);

        // Insert user into database 
        var [result, _ ] = await db.execute(`INSERT INTO restaurants(address, state, city, 
            zipcode, name, phone, cuisine, username, email, password, status, created_at, updated_at)
            Values(?,?,?,?,?,?,?,?,?,?,'close',Now(),Now());`,[street,state,city,zip,rname,phone,cuisine,username,email,hasedPasswrod]);
        // console.log(result);
        // check succeed to add
        if(result && result.affectedRows !== 1){
            return res.status(400).json({meesage: 'fail to login'})
        }
        return res.status(200).json({message:"welcome"});
    }catch(err){
        // catch All errors
        return res.status(400).json(err);
    }
})


/**
 * session login
 */
// session login
router.post('/signin',isNotLoggedIn, async function(req, res){
    var {username, pwd,loginas} = req.body;
    
    if(!username || !pwd){
        return res.status(400).json({message: "Enter username and password"});
    }
    if(loginas === 'customer'){
        var [rows, _ ] = await db.execute(`SELECT id, username, password, email FROM customers WHERE username = ?`, [username]);
    }else{
        var [rows, _ ] = await db.execute(`SELECT id, username, password, email FROM restaurants WHERE username = ?`, [username])
    }
    var user = rows[0];
    
    if(!user){
        console.log("user not exists")
        return res.status(400).json({message: "user not exists"});
    }
    var checkPwd = await bcrypt.compare(pwd, user.password);
    if(!checkPwd){
        return res.status(400).json({message: "wrong password"});
    }

    if(loginas === 'customer'){
        req.session.user = {
            userId: user.id,
            email: user.email,
            username: user.username,
            role: "customers"
        };
    }else{
        req.session.user = {
            userId: user.id,
            email: user.email,
            username: user.username,
            role: "restaurants"
        };
    }
    req.session.save(function(err){
        console.log("logged in");
        return res.status(200).json(req.session.user)
    })
})

// session logout
router.get('/signout',isLoggedIn, (req, res, next)=>{
    
    req.session.destroy(
        function(err){
            if(err){
                console.log("fail to log out")
                return res.status(400).json({message: err})
            }
            console.log("logged out")
            return res.status(200).json({message: "logged out"})
         }
    )
    // console.log(req.session)
})



/**
 * passport login
const passport = require('../conf/passport');
router.get('/signout', isLoggedIn, (req, res, next)=>{
    console.log('signout')
    console.log(req.session)
    // delete passport
    req.logout();
    // delete session
    req.session.destroy(()=>{
        res.cookie('connect.sid','',{maxAge:0});
    })
    res.status(200).send({mes: "logged out"})
})

router.post('/signin', isNotLoggedIn, async (req,res,next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.log(authError);
            return res.status(400);
        }
        if(!user){
            console.log("wrong pwd");
            return res.status(400);
        }
        return req.login(user,loginError => {
            if(loginError){
                console.log(loginError);
                return res.status(400);
            }
            return res.status(200);
        });
    })(req,res,next);
})
 */

module.exports = router;