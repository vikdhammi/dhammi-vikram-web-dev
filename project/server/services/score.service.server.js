

module.exports = function(app, models) {

    var scoreModel = models.projectScore;

    app.post("/api/project/user/:userId/schedule/:matchId", addMatchComment);
    app.get("/api/project/schedule/:matchId",findCommentsByMatchId);

    function addMatchComment(req, res) {
        var comment = req.body;
        var matchId = req.params.newsId;
        var userId = req.params.userId;
        scoreModel
            .addMatchComment(comment)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // pages.push(page);
        // res.sendStatus(200);
    }

    function findCommentsByMatchId(req, res){
        var matchId = req.params.matchId;

        scoreModel
            .findCommentsByMatchId(matchId)
            .then(
                function(news){
                    res.json(news);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
    }
};