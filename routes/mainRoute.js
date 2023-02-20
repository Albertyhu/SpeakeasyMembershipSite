const express = require('express');
const router = express.Router(); 
const MessageController = require('../controller/messageController.js'); 
const AuthController = require('../controller/authController.js'); 
const UserController = require('../controller/userController.js');
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

router.get("/", MessageController.MessageBoard)

router.get("/register", AuthController.Register_get)

router.post("/register", upload.single('profile_pic'), AuthController.Register_post)

router.get("/login", AuthController.Login_Get);

router.post("/login", AuthController.Login_Post); 

router.get("/logout", AuthController.LogOut)

module.exports = router; 
