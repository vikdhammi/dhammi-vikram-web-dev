
module.exports = function() {
    var mongoose = require("mongoose");

    var CommentSchema = mongoose.Schema({
       newsId: String,
        userId : String,
        text : String,
        dateAdded: {type: Date, default: Date.now()}
    }, {collection: "project.comment"});

    return CommentSchema;
};