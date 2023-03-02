const express = require('express');
const router = express.Router(); 
const MessageController = require('../controller/messageController.js'); 
const AuthController = require('../controller/authController.js'); 
const UserController = require('../controller/userController.js');
const ContactController = require('../controller/contactController.js'); 
const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.fieldname}${ext}`;
        //const filename = `${file.fieldname}-${Date.now()}`
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    return next();
}

router.get("/", checkAuthenticated, MessageController.MessageBoard)

router.post("/", upload.single('image'), MessageController.Message_post)

router.get("/register", AuthController.Register_get)

router.post("/register", upload.single('profile_pic'), AuthController.Register_post)

router.get("/login", checkNotAuthenticated, AuthController.Login_Get);

router.post("/login", AuthController.Login_Post); 

router.get("/logout", AuthController.LogOut)

router.get('/contact', ContactController.ContactForm_get);

router.post('/contact', ContactController.ContactForm_post);

router.get('/contact/thankyou', (req, res, next) => {
    res.render("contact-PostSubmittion", {
        user: req.user,
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/ParisBackground.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
        SpeakEasyLogo: "/assets/images/speakeasylogo.png",
        DownArrow: '/assets/icon/down.png',
    })
})

router.get('/users', UserController.UserList); 

router.get('/user/:id', UserController.UserDetail);

router.get('/user/:id/update', checkCurrentUserID, UserController.UserUpdate_get); 

router.post('/user/:id/update', upload.single('profile_pic'), UserController.UserUpdate_post); 

router.get('/user/:id/changepassword', checkCurrentUserID, AuthController.ChangePassword_get); 

router.post('/user/:id/changepassword', AuthController.ChangePassword_post);

router.get('/passwordchanged', (req, res) => {
    res.render('partials/authentication/passwordChangeResult', {
        user: req.user,
        title: "Your password has successfully been changed.",
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/BirdCageBackground2.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
        DownArrow: '/assets/icon/down.png',
    })
})

router.get('/join/:id', checkAuthenticated, UserController.MembershipInitiation_get);

router.post('/join/:id', UserController.MembershipInitiation_post);

router.get('/about', (req, res, next) => {
    res.render('static/about', { 
        user: req.user, 
        title: "About Us", 
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/Faint-line-background-small.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        SpeakEasyLogo: "/assets/images/speakeasylogo.png",
        DownArrow: '/assets/icon/down.png',
    })
})

router.get('/privacypolicy', (req, res) => {
    res.render('static/privacypolicy', {
        user: req.user,
        title: "Privacy Policy",
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/Faint-line-background-small.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        SpeakEasyLogo: "/assets/images/speakeasylogo.png",
        DownArrow: '/assets/icon/down.png',
    })
})

router.get('/terms&conditions', (req, res) => {
    res.render('static/termsandconditions', {
        user: req.user,
        title: "Privacy Policy",
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/Faint-line-background-small.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        SpeakEasyLogo: "/assets/images/speakeasylogo.png",
        DownArrow: '/assets/icon/down.png',
    })
})


//This function is necessary to keep the user logged in once he is authenticated 
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else {
        return next()
    }
}

//This is for the update page. It prevents the user from editing other people's profiles
function checkCurrentUserID(req, res, next) {
    if (req.isAuthenticated() && req.params.id == req.user.id) {
        return next()
    }
    res.redirect('/')
}

module.exports = router; 
