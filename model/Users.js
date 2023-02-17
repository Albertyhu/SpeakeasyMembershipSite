const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon");

const User = new Schema({
    member: { type: Boolean, required: true }, 
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, required: true },
    joinedDate: { type: Date }, 
    profilePic: {}, 
})

module.exports = mongoose.model('User', User )