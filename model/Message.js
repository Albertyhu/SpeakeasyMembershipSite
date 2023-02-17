const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { DateTime, toLocaleString } = require("luxon");

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
    return dateCreated ?
        DateTime.fromJSDate(this.dateCreated).toLocaleString(newFormat) : null; 
})

module.exports = mongoose.model('Message', Message); 