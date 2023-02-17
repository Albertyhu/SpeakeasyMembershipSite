const Message = require('../model/Message'); 
const { body, validationResult } = require('express-validator'); 

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
                logoURL: "/assets/images/speakeasylogo.png",
                burgerMenu: "/assets/icon/hamburger_menu_white.png", 
                searchIcon: "/assets/icon/search-white.png"
            })
        })
}

exports.MessageBoardPost = []