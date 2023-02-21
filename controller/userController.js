const User = require('../model/Users')
const Message = require('../model/Message');
const async = require('async'); 
const Join = require('../util/join')
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
                    .populate('user')
                    .populate('likes')
                    .exec(callback)
            },
        },
        (err, result) => {
            if (err) {
                return next(err)
            }
            try {
                result.GetUser.facebook = "http://www.facebook.com";
                result.GetUser.twitter = 'http://www.twitter.com'
                res.render('user/userDetail', {
                    user: req.user, 
                    title: `${result.GetUser.username}'s profile`, 
                    userDetail: result.GetUser,
                    messageList: result.GetMessages, 
                    logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                    burgerMenu: "/assets/icon/hamburger_menu_white.png",
                    searchIcon: "/assets/icon/search-white.png",
                    BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
                    MobileMenuBackground: "/assets/images/frame.jpg",
                    avatar: "/assets/images/avatar2.png",
                    BackgroundImageURL: "/assets/images/embroidery.png",
                    facebookIcon: "/assets/social_media/facebook.png",
                    discordIcon: "/assets/social_media/discord.png",
                    instagramIcon: "/assets/social_media/instagram.png",
                    linkedinIcon: "/assets/social_media/linkedin",
                    tumblrIcon: "/assets/social_media/tumblr.png",
                    twitchIcon: "/assets/social_media/twitch.png",
                    twitterIcon: "/assets/social_media/twitter.png",
                    youtubeIcon: "/assets/social_media/youtube.png",
                   
                })
            } catch (e) {
                return next(e)
            }
        }
    )    
}


exports.UserUpdate_get = (req, res, next) => {
    async.parallel(
        {
            GetUser(callback) {
                User.findById(req.params.id)
                    .exec(callback)
            },
            GetMessages(callback) {
                Message.find({ user: req.params.id })
                    .sort({ dateCreated: 'desc' })
                    .populate('user')
                    .populate('likes')
                    .exec(callback)
            },
        },
        (err, result) => {
            if (err) {
                return next(err)
            }
            try {
                res.render('user/userForm', {
                    user: req.user,
                    title: `Update profile`,
                    userDetail: result.GetUser,
                    messageList: result.GetMessages,
                    logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
                    burgerMenu: "/assets/icon/hamburger_menu_white.png",
                    searchIcon: "/assets/icon/search-white.png",
                    BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
                    MobileMenuBackground: "/assets/images/frame.jpg",
                    UpperFrame: "/assets/images/frame-top-white.png",
                    BottomFrame: "/assets/images/frame-bottom-white.png",
                    avatar: "/assets/images/avatar2.png",
                    BackgroundImageURL: "/assets/images/embroidery.png", 
                    stringDrinks: result.GetUser.favoriteDrink && result.GetUser.favoriteDrink.length > 0 ? Join(result.GetUser.favoriteDrink) : null,

                })
            } catch (e) {
                return next(e)
            }
        }
    )
}

exports.UserUpdate_post =[]