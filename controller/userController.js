const User = require('../model/Users')
const Message = require('../model/Message');
const async = require('async'); 

exports.UserList = (req, res, next) => {
    User.find({})
        .sort({ username: 'desc' })
        .exec((err, result) => {
            if (err) {
                return next(err)
            }
            res.render('UserList', {
                user: req.user, 
                title: "Members of Henry's Speakeasy", 
                membersList: result, 
                logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                burgerMenu: "/assets/icon/hamburger_menu_white.png",
                searchIcon: "/assets/icon/search-white.png",
                BackgroundURL: "/assets/images/TealVintageBackground2.jpg",
                MobileMenuBackground: "/assets/images/frame.jpg",
            })
        })
}

exports.UserDetail = (req, res, next) => {
    async.parallel(
        {
            GetUser(callback) {
                User.findById(req.params.id)
                    .exec(callback)
            },
            GetMessages(callback) {
                Message.find({ user: req.params.id })
                    .sort({ dateCreated: 'desc' })
                    .populate('likes')
                    .exec(callback)
            },
        },
        (err, result) => {
            if (err) {
                return next(err)
            }
            try {
                res.render('user/userDetail', {
                    user: req.user, 
                    title: `${result.GetUser.username}'s profile`, 
                    userDetail: result.GetUser,
                    messageList: result.GetMessages, 
                    logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                    burgerMenu: "/assets/icon/hamburger_menu_white.png",
                    searchIcon: "/assets/icon/search-white.png",
                    BackgroundURL: "/assets/images/TealVintageBackground2.jpg",
                    MobileMenuBackground: "/assets/images/frame.jpg",
                    UpperFrame: "/assets/images/frame-top.png",
                    BottomFrame: "/assets/images/frame-bottom.png",
                    avatar: "/assets/images/avatar2.png",
                })
            } catch (e) {
                return next(e)
            }
        }
    )    
}


exports.UserUpdate_get = (req, res, next) => {
    async.parallel({

    })
}

exports.UserUpdate_post =[]