
module.exports = function () {

    var mongoose = require("mongoose");
    var TeamSchema = require("./team.schema.server.js")();
    var Team = mongoose.model("Team", TeamSchema);
    
    var api = {
        findAllTeams: findAllTeams
        
    };
    
    return api;
    
    
    function findAllTeams() {
        return Team.find({});
    }
    
};