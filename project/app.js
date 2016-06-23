module.exports = function(app){

    var models = require("./server/models/models.server")();

    var userService = require("./server/services/user.service.server")(app, models);
    
    var commentService = require("./server/services/comment.service.server")(app, models);
    
};
