
module.exports = function() {
  var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
       username: {type: String, required: true},
        password:  String,
        firstName: String,
        lastName: String,
        email: String,
        contact: String,
        address: String,
        dob: Date,
        google: {
            token: String,
            id: String
        },
        moderator: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});
    
    return UserSchema;
};