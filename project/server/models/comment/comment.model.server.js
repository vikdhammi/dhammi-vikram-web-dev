
module.exports = function () {

    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var Comment = mongoose.model("Comment", CommentSchema);
    
    var api = {
        addNewsComment: addNewsComment,
        findCommentsByNewsId: findCommentsByNewsId
    };
    
    return api;
    
    function addNewsComment(comment){
      //  comment._news = newsId;
        return Comment.create(comment);
    }

    function findCommentsByNewsId(newsId) {
        return Comment.find({newsId: newsId});
    }
};