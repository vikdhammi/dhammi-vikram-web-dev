
module.exports = function(){

    
    var models = {
        projectUserModel: require("./user/user.model.server.js")(),
        projectComment: require("./comment/comment.model.server.js")()
    };

    return models;
};