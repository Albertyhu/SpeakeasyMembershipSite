const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const { DateTime, toLocaleStrin } = require("luxon");
const he = require('he')

const User = new Schema({
    member: { type: Boolean, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, required: true },
    joinedDate: { type: Date },
    profile_pic: { data: Buffer, contentType: String },
    biography: { type: String },
    SocialMediaLinks: [{
        platform: { type: String },
        link: {type: String}
    }],
    
})

User.virtual("url").get(function () {
    return `/user/${this._id}`; 
})

User.virtual('JoinDateFormatted').get(function () {
    return this.joinedDate ? DateTime.fromJSDate(this.joinedDate).toLocaleString(DateTime.DATETIME_SHORT)
        : null;
})

User.virtual('unescaped_username').get(function () {
    return this.username ? he.decode(this.username) : null;
})

User.virtual('unescaped_drinks').get(function () {
    if (typeof this.favoriteDrink != 'undefined' && this.favoriteDrink.length > 0) {
        var decodedDrinkArray = []; 
        this.favoriteDrink.forEach(drink => {
            decodedDrinkArray.push(he.decode(drink));
        })
        return decodedDrinkArray; 
    }
})

User.virtual('unescaped_email').get(function () {
    return this.email ? he.decode(this.email) : null; 
})



module.exports = mongoose.model('User', User )