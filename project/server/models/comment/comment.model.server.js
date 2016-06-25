
module.exports = function () {

    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var Comment = mongoose.model("Comment", CommentSchema);
    
    var api = {
        addNewsComment: addNewsComment,
        findCommentsByNewsId: findCommentsByNewsId,
        findCommentByCommentId: findCommentByCommentId,
        updateNewsComment: updateNewsComment,
        deleteComment: deleteComment
    };
    
    return api;
    
    function addNewsComment(comment){
      //  comment._news = newsId;
        return Comment.create(comment);
    }

    function findCommentsByNewsId(newsId) {
        return Comment.find({newsId: newsId});
    }

    function findCommentByCommentId(commentId){
        return Comment.findById(commentId);
    }

    function updateNewsComment(commentId, newComment){
        delete newComment._id;
        return Comment.update({_id: commentId},{
            $set: newComment
        });
    }
    function deleteComment(commentId){
        return Comment.remove({_id: commentId});
    }
};