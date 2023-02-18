const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const upload = multer({ dest: '../public/uploads/' })
const MessageController = require('../controller/messageController.js'); 
const AuthController = require('../controller/authController.js'); 
const UserController = require('../controller/userController.js'); 


router.get("/", MessageController.MessageBoard)

router.get("/register", AuthController.Register_get)

router.post("/register", upload.single("profile_pic"), AuthController.Register_post)

module.exports = router; 
