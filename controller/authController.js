const User = require('../model/Users'); 
const { body, validationResult } = require('express-validator'); 

exports.Login_Get = (req, res, next) => {
}

exports.Login_Post = {}

exports.Register_get = (req, res, next) => {
    res.render("register", {
        title: "Create an account", 
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
    })
}

exports.Register_post = []