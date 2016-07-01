
module.exports = function() {
    var mongoose = require("mongoose");

    var TeamSchema = mongoose.Schema({
       name: String,
        url: String,
        homeGround: String,
        homePage: String,
        fans: Number
    }, {collection: "project.team"});

    return TeamSchema;
};