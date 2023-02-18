const express = require('express');
const router = express.Router(); 
const MessageController = require('../controller/messageController.js'); 
const AuthController = require('../controller/authController.js'); 
const UserController = require('../controller/userController.js'); 


router.get("/", MessageController.MessageBoard)

router.get("/register", AuthController.Register_get)

router.post("/register", AuthController.Register_post)

module.exports = router; 
