
module.exports = function() {
  var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
       username: {type: String},
        password: {type: String, minLength : 4},
        firstName: {type: String, minLength: 4 },
        lastName: String,
        facebook:{
            token: String,
            id: String,
            displayName: String
        },
        email: String,
        phone: String,
        dob: Date,
    //    websites: [Website],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});
    
    return UserSchema;
};