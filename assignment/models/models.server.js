
module.exports = function(){

    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/web-dev');
    
    var models = {
        userModel: require("./user/user.model.server")()
        // websiteModel: require("./website.model.server")(),
        // pageModel: require("./page.model.server")(),
        // widgetModel: require("./widget.model.server")()
    };

    return models;
};