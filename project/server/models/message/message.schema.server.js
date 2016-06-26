
module.exports = function() {
    var mongoose = require("mongoose");

    var MessageSchema = mongoose.Schema({
       receiverId: String,
        senderId: String,
        username: String,
        title: String,
        message : String,
        dateSent: {type: Date, default: Date.now()}
    }, {collection: "project.message"});

    return MessageSchema;
};