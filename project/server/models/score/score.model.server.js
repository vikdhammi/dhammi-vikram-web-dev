
module.exports = function () {

    var mongoose = require("mongoose");
    var ScoreSchema = require("./score.schema.server.js")();
    var Score = mongoose.model("Score", ScoreSchema);

    var api = {
        addMatchComment: addMatchComment,
        findCommentsByMatchId: findCommentsByMatchId,
        findCommentByCommentId: findCommentByCommentId,
        updateComment: updateComment,
        deleteComment: deleteComment
    };

    return api;

    function addMatchComment(comment){
        //  comment._news = newsId;
        return Score.create(comment);
    }

    function findCommentsByMatchId(matchId) {
        return Score.find({matchId: matchId});
    }

    function findCommentByCommentId(commentId){
        return Score.findById(commentId);
    }

    function updateComment(commentId, newComment){
        delete newComment._id;
        console.log(newComment);
        console.log(commentId);
        return Score.update({_id: commentId},{
            $set: newComment

        });
    }
    function deleteComment(commentId){
        return Score.remove({_id: commentId});
    }

};