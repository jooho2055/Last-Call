// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// // const local = require('../middleware/localStrategy');
// var db = require('./database');
// const bcrypt = require('bcrypt');

// passport.serializeUser(function(user,done){
//     done(null, {username: user.username, role:'customers'});
// });

// passport.deserializeUser(function(id, done){
// done(null,id);
// })

// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'pwd',
//     }, async (username, pwd, done)=>{
//     console.log(username,pwd);
//     const [rows, _ ] = await db.execute(`SELECT * FROM customers WHERE username = ?`, [username]);
//     const user = rows[0]
//     console.log(user);
//     if(!user){
//         console.log("user not exists")
//         return done(null,false)
//     }
//     const result = await bcrypt.compare(pwd,user.password)
//     console.log(result)
//     if(!result){
//         console.log("wrong pwd");
//         return done(null,false)
//     }
//     return done(null,user)
// }))

// module.exports = passport