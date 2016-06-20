
module.exports = function(){

    
    var models = {
        projectUserModel: require("./user/user.model.server.js")()
    };

    return models;
};