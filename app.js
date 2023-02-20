const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const createError = require('http-errors');
var bodyParser = require('body-parser');
const flash = require('express-flash')

const initializePassport = require('./passport-config.js')

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

initializePassport(passport)

const mongoDb = `${process.env.MONGOURL}`; 

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

//This is used for catching errors 
app.set("views", __dirname + '/views');
app.set("view engine", "ejs");

//The module “body-parser” enables reading (parsing) HTTP-POST data.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//secret is the encryption key used to encrypt the passwords 
//resave: Do we want to resave if nothing is changed?
//saveUninitialized: do we want to save an empty value.  
app.use(session({
    secret: `${process.env.ENCRYPT_KEY}`,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(flash())


//Exporting the routes didn't work for the authentication system
const mainRouter = require('./routes/mainRoute')
app.use("/", mainRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.render("error", {
        user: req.user, 
        title: "Error",
        error: err.message,
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
    });
});

app.listen(3000, () => console.log("app listening on port 3000!"));