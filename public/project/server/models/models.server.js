
module.exports = function(){

    // var mongoose = require("mongoose");
    // mongoose.connect('mongodb://localhost/web-dev');
    
    var models = {
        userModel: require("./user/user.model.server")()
    };

    return models;
};