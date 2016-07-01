module.exports = function(app){

    var models = require("./server/models/models.server")();

    var userService = require("./server/services/user.service.server")(app, models);
    
    var commentService = require("./server/services/comment.service.server")(app, models);
    
    var scoreService = require("./server/services/score.service.server")(app, models);
    
    var messageService = require("./server/services/message.service.server")(app, models);

    var teamService = require("./server/services/team.service.server")(app, models);

    
    
};
