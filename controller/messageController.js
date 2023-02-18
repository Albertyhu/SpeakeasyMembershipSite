const Message = require('../model/Message'); 
const User = require('../model/Users.js'); 
const { body, validationResult } = require('express-validator'); 

//This needs to be rewritten 
exports.MessageBoard = (req, res, next) => {
    Message.find({})
        .populate('user')
        .populate('likes')
        .exec((err, result) => {
            if (err) {
                return next(err)
            }
            res.render("index", {
                title: "Henry\'s Speakeasy", 
                messageList: result, 
                logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                burgerMenu: "/assets/icon/hamburger_menu_white.png", 
                searchIcon: "/assets/icon/search-white.png",
                BackgroundURL: "/assets/images/TealVintageBackground2.jpg",
                MobileMenuBackground: "/assets/images/frame.jpg",
            })
        })
}

exports.MessageBoardPost = []