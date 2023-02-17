const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const createError = require('http-errors')

const flash = require('express-flash')

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

//initializePassport(passport)

const mongoDb = `${process.env.MONGOURL}`; 

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", __dirname + '/views');
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

//This is used for catching errors 
app.use(flash())

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

app.use(express.urlencoded({ extended: false }));

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
        title: "Error",
        error: err.message,
    });
});

app.listen(3000, () => console.log("app listening on port 3000!"));