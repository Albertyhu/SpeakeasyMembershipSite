const nodemailer = require('nodemailer');
const he = require('he'); 

exports.ContactForm_get = (req, res, next) => {
    res.render('contact', {
        user: req.user,
        title: "Have something in mind? Share your thoughts with us.",
        logoURL: "/assets/images/SpeakeasyLogo-JustText.png",
        burgerMenu: "/assets/icon/hamburger_menu_white.png",
        searchIcon: "/assets/icon/search-white.png",
        BackgroundURL: "/assets/images/ParisBackground.jpg",
        MobileMenuBackground: "/assets/images/frame.jpg",
        UpperFrame: "/assets/images/frame-top.png",
        BottomFrame: "/assets/images/frame-bottom.png",
        DownArrow: '/assets/icon/down.png',
    })
}

exports.ContactForm_post = (req, res, next) => {
    const { email, subject, message } = req.body; 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'hualbert.y@gmail.com',
            pass: `${process.env.GMAIL_PASSWORD}`,
        },
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        }
    });

    const mailOptions = {
        from: email,
        to: 'hualbert.y@gmail.com',
        subject: 'New message from contact form',
        text: 'Hello, you have received a new message from the contact form on your website:'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return next(error)
        } else {
            res.redirect('/contact/thankyou')
        }
    });
}