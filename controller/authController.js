const User = require('../model/Users'); 
const { body, validationResult } = require('express-validator');
const fs = require('fs'); 
const path = require('path');
const passport = require("passport");
const bcrypt = require('bcrypt');
const checkEmail =require('../util/checkEmail.js')

var dummyData = {
    username: "Bob",
    email: "bob@gmail.com",
    password: "test123",
    confirm_password: "test123",
}

exports.Login_Get = (req, res, next) => {
    const { username, email, password, confirm_password } = dummyData;  
    res.render('login', {
        user: req.user, 
        title: "Log into your account",
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
        DownArrow: '/assets/icon/down.png',
        //username: username,
        //email: email,
        //password: password,
    })
}

exports.Login_Post = passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
})

exports.Register_get = (req, res, next) => {
    const { username, email, password, confirm_password } = dummyData;  

    res.render("register", {
        user: req.user, 
        title: "Create an account", 
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
        DownArrow: '/assets/icon/down.png',
    })
}

exports.Register_post = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage("You must type your username.")
        .escape(),
    body("email")
        .trim()
        .isLength({ min: 1 })
        .withMessage("You must type your email address. ")
        .escape(),
    body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Your password must be at least 4 characters long."),
    body("confirm_password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Your password must be at least 4 characters long."),
   
    async (req, res, next) => {
        //const profile_pic = req.file ? req.file.path : null;
        var profile_pic = null; 
        if (req.file) {
            profile_pic = {
                data: fs.readFileSync(path.join(__dirname, '../public/uploads/', req.file.filename)),
                contentType: req.file.mimetype
            };
        }
        
        const {
            username,
            email,
            password,
            confirm_password,
        } = req.body;

        const errors = validationResult(req); 
        if (!checkEmail(req.body.email)) {
            const obj = {
                msg: "The email format is not valid. It must be something along the lines of Bob@email.com."
            }
            errors.errors.push(obj)
        }
        if (!errors.isEmpty()) {
            res.render("register", {
                user: req.user, 
                username: username, 
                email: email,
                password: password, 
                profile_pic: profile_pic,
                confirm_password: confirm_password, 
                title: "Create an account",
                logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                burgerMenu: "/assets/icon/hamburger_menu_white.png",
                searchIcon: "/assets/icon/search-white.png",
                BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
                MobileMenuBackground: "/assets/images/frame.jpg",
                UpperFrame: "/assets/images/frame-top.png",
                BottomFrame: "/assets/images/frame-bottom.png",
                error: errors.array(), 
            })
            return; 
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const obj = {
                username: username.replace(/\s/g, ''),
                email: email,
                password: hashedPassword,
                profile_pic: profile_pic, 
                joinedDate: Date.now(), 
                admin: false,
                member: false,
            }
            const newUser = new User(obj); 
            newUser.save(err => {
                if (err) {
                    console.log("Error in trying to save user: ", err.message)
                    return next(err);
                }
                console.log("User is successfully created.")
                res.redirect("/join");
            })
        } catch (e) {
            console.log("Error in trying to create new user: ", e.message)
            res.status(500).json({ error: 'Server error' });
        }
    }
]


exports.LogOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}