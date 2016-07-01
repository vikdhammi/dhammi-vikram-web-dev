


module.exports = function(app, models) {

    var teamModel = models.projectTeam;

    
    app.get("/api/project/teams",findAllTeams);
    

    
    function findAllTeams(req, res){

        teamModel
            .findAllTeams()
            .then(
                function(team){
                    res.json(team);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
    }

    
};