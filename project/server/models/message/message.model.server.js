
module.exports = function () {

    var mongoose = require("mongoose");
    var MessageSchema = require("./message.schema.server.js")();
    var Message = mongoose.model("Message", MessageSchema);
    
    var api = {
        sendMessage: sendMessage,
        findMessageByUserId: findMessageByUserId,
        deleteMessage: deleteMessage
    };
    
    return api;
    
    function sendMessage(message){
      //  comment._news = newsId;
        return Message.create(message);
    }

    function findMessageByUserId(userId) {
        return Message.find({receiverId: userId});
    }

    function deleteMessage(messageId){
        return Message.remove({_id: messageId});
    }
};