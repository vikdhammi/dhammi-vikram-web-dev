
module.exports = function() {
  var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
       username: {type: String, required: true},
        password: {type: String, minLength : 4, required: true},
        firstName: {type: String, minLength: 4 },
        lastName: String,
        email: String,
        phone: String,
        dob: Date,
    //    websites: [Website],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});
    
    return UserSchema;
};