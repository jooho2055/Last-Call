require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const sessions = require('express-session');
const mysqlStore = require('express-mysql-session')(sessions);
const port = 5001;
var db = require('./conf/database');
const cors = require('cors');
let corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5001'],
  credentials: true
}

app.use(cors(corsOptions));
const maxAge = 1000*60*60*24*7;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const customersRouter = require('./routes/customers');
const restaurantsRouter = require('./routes/restaurants');



app.set("port", process.env.PORT || port);

const sessionStore = new mysqlStore({ }, require('./conf/database'))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(cookieParser());

app.use(sessions({
  secret: "LastCAll!@#$^",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly: true,
    secure: false,
    maxAge: maxAge
  }
}));

app.use(function(req,res,next){
    console.log("This is session: ",req.session);
    if(req.session.user){
      console.log("is LoggedIn")
      res.locals.isLoggedIn = true;
      res.locals.user = res.session.user;
    }
    next()
})

app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/customer", customersRouter);
// app.use("/restaurant", restaurantsRouter);
 
app.get('*', (res, req) =>{
    req.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.use((req,res,next) =>{
    next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})

/**
 * Error Handler
 */
app.use(function(err, req, res, next){
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  console.log("!!!!!!");
  res.status(err.status || 500);
  res.render("error");
});


app.listen(app.get("port"), () => {
    console.log(app.get("port"), `app listening at ${port}`);
});

// module.exports = router;