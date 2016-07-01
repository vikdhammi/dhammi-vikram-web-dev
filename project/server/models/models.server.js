
module.exports = function(){

    
    var models = {
        projectUserModel: require("./user/user.model.server.js")(),
        projectComment: require("./comment/comment.model.server.js")(),
        projectScore: require("./score/score.model.server")(),
        projectMessage: require("./message/message.model.server")(),
        projectTeam: require("./team/team.model.server")()
    };

    return models;
};