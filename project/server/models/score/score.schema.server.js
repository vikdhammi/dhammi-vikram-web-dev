
module.exports = function() {
    var mongoose = require("mongoose");

    var ScoreSchema = mongoose.Schema({
        matchId: String,
        userId : String,
        username: String,
        text : String,
        dateAdded: {type: Date, default: Date.now()}
    }, {collection: "project.score"});

    return ScoreSchema;
};