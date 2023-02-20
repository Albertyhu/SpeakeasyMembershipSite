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
    profile_pic: { data: Buffer, contentType: String}, 
    //profile_pic: {type:String}
})

module.exports = mongoose.model('User', User )