const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const { DateTime, toLocaleStrin } = require("luxon");

const User = new Schema({
    member: { type: Boolean, required: true }, 
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, required: true },
    joinedDate: { type: Date }, 
    profile_pic: { data: Buffer, contentType: String }, 
    biography: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    tiktok: {type: String},
    twitch: { type: String },
    pinterest: { type: String }, 
    tumblr: { type: String },
    discord: { type: String },
    linkedin: { type: String }, 
})

User.virtual("url").get(function () {
    return `/user/${this._id}`; 
})

User.virtual('JoinDateFormatted').get(function () {
    return this.joinedDate ? DateTime.fromJSDate(this.joinedDate).toLocaleString(DateTime.DATETIME_SHORT)
        : null;
})

User.virtual('CountSocialMedia').get(function () {
    var count = 0;
    if (this.facebook && this.facebook != "") {
        count++;
    }
    if (this.twitter && this.twitter != "") {
        count++;
    }
    if (this.instagram && this.instagram != "") {
        count++;
    }
    if (this.youtube && this.youtube != "") {
        count++;
    }
    if (this.tiktok && this.tiktok != "") {
        count++;
    }
    if (this.twitch && this.twitch != "") {
        count++;
    }
    if (this.pinterest && this.pinterest != "") {
        count++;
    }
    if (this.tumblr && this.tumblr != "") {
        count++;
    }
    if (this.discord && this.discord != "") {
        count++;
    }
    if (this.linkedin && this.linkedin != "") {
        count++;
    }
    return count; 

})

module.exports = mongoose.model('User', User )