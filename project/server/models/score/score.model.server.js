
module.exports = function () {

    var mongoose = require("mongoose");
    var ScoreSchema = require("./score.schema.server.js")();
    var Score = mongoose.model("Score", ScoreSchema);

    var api = {
        addMatchComment: addMatchComment,
        findCommentsByMatchId: findCommentsByMatchId
    };

    return api;

    function addMatchComment(comment){
        //  comment._news = newsId;
        return Score.create(comment);
    }

    function findCommentsByMatchId(matchId) {
        return Score.find({matchId: matchId});
    }
};