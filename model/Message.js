const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { DateTime, toLocaleString } = require("luxon");
const ParseText = require('../util/parseText'); 
const he = require('he')
const Message = new Schema({
    content: { type: String, required: true },
    dateCreated: { type: Date, required: true }, 
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    likes: [{type: Schema.Types.ObjectId, ref: "User"}], 
})

Message.virtual("DateFormatted").get(function () {
    var newFormat = {
        hour: '2-digit',
        minute: '2-digit',
        day: 'long',
        month: 'long',
        year: 'numeric',
        timeZoneName: 'short'
    }
    return this.dateCreated ?
       // DateTime.fromJSDate(this.dateCreated).toLocaleString(newFormat) : null; 
        DateTime.fromJSDate(this.dateCreated).toLocaleString(DateTime.DATETIME_SHORT) : null; 

})

Message.virtual("UnescapedMessage").get(function () {
    //return this.content ? ParseText(this.content) : null; 
    return this.content ? he.decode(this.content) : null; 
})

module.exports = mongoose.model('Message', Message); 