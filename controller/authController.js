const User = require('../model/Users'); 
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


exports.Login_Get = (req, res, next) => {
}

exports.Login_Post = {}

var dummyData = {
    username: "Bob",
    email: "bob@gmail.com",
    password: "test123",
    confirm_password: "test123",
}

exports.Register_get = (req, res, next) => {
    const { username, email, password, confirm_password } = dummyData;  

    res.render("register", {
        title: "Create an account", 
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
        username: username,
        email: email,
        password: password,
        confirm_password: confirm_password, 
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
        .withMessage("Your password must be at least 4 characters long.")
        .escape(),
    body("confirm_password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Your password must be at least 4 characters long.")
        .escape(),
    (req, res, next) => {
        var image_file = null;
        if (req.file) {
            image_file = { data: req.file.buffer, contentType: req.file.mimetype };
        }
        const { username, email, password, confirm_password, profile_pic } = req.body;
        console.log('username: ', username)

        const error = validationResult(req); 
        if (!error.isEmpty()) {
           // console.log("error: ", error)
            res.render("register", {
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
                error: error.array(), 
            })
            return; 
        }
        try {
            const obj = {
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password, 
                profilePic: image_file, 
                joinedDate: Date.now(), 
            }
            const newUser = new User(obj); 
            newUser.save(err => {
                if (err) {
                    console.log("Error in trying to save user: ", err.message)
                    return next(err);
                }
                console.log("User is successfully created.")
                res.redirect("/");
            })
        } catch (e) {
            console.log("Error in trying to create new user: ", e.message)
            res.status(500).json({ error: 'Server error' });
        }
    }
]