const Message = require('../model/Message'); 
const User = require('../model/Users.js'); 
const { body, validationResult } = require('express-validator'); 
const fs = require('fs');
const path = require('path');

//This needs to be rewritten 
exports.MessageBoard = (req, res, next) => {
    Message.find({})
        .sort({dateCreated: 'desc' })
        .populate('user')
        .populate('likes')
        .exec((err, result) => {
            if (err) {
                return next(err)
            }
            res.render("index", {
                user: req.user, 
                title: "Henry\'s Speakeasy", 
                messageList: result, 
                logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                burgerMenu: "/assets/icon/hamburger_menu_white.png", 
                searchIcon: "/assets/icon/search-white.png",
                BackgroundURL: "/assets/images/TealVintageBackground2.jpg",
                MobileMenuBackground: "/assets/images/frame.jpg",
                //imports external script NewMessage.js into index.ejs
                MessageScript: "/script/NewMessage.js",
                UpperFrame: "/assets/images/frame-top-white.png",
                BottomFrame: "/assets/images/frame-bottom-white.png",
                avatar: "/assets/images/avatar2.png",
                DownArrow: '/assets/icon/down.png',
                ArtDeco: "/assets/images/art-deco-background.png",
            })
        })
}


exports.Message_post = [
    body('message')
        .isLength({ min: 1 })
        .withMessage('Your message cannot be empty.')
        .trim()
        .escape(),
    (req, res, next) => {
        var image = null;
        if (req.file) {
            image = {
                data: fs.readFileSync(path.join(__dirname, '../public/uploads/', req.file.filename)),
                contentType: req.file.mimetype
            };
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("index", {
                user: req.user,
                title: "Henry\'s Speakeasy",
                messageList: result,
                logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                burgerMenu: "/assets/icon/hamburger_menu_white.png",
                searchIcon: "/assets/icon/search-white.png",
                BackgroundURL: "/assets/images/TealVintageBackground2.jpg",
                MobileMenuBackground: "/assets/images/frame.jpg",
                //imports external script NewMessage.js into index.ejs
                MessageScript: "/script/NewMessage.js",
                UpperFrame: "/assets/images/frame-top.png",
                BottomFrame: "/assets/images/frame-bottom.png",
                avatar: "/assets/images/avatar2.png",
                errors: errors, 
                DownArrow: '/assets/icon/down.png',
            })
            return; 
        }
        const { message } = req.body; 
        const obj = {
            content: message, 
            dateCreated: Date.now(), 
            user: req.user.id, 
            likes: req.user.id,    
            image: image, 
        }

        const newMessage = new Message(obj);
        newMessage.save(err => {
            if (err)
                return next(err)
            res.redirect("/")
        })
    }

]


exports.MessageBoardPost = []