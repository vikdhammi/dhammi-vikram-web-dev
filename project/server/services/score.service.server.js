

module.exports = function(app, models) {

    var scoreModel = models.projectScore;

    app.post("/api/project/user/:userId/schedule/:matchId", addMatchComment);
    app.get("/api/project/schedule/:matchId",findCommentsByMatchId);
    app.get("/api/comment/:commentId",findCommentByCommentId);
    app.put("/api/comment/:commentId",updateComment);
    app.delete("/api/comment/:commentId",deleteComment);
    

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

    function findCommentByCommentId(req, res){
        var commentId = req.params.commentId;

        scoreModel
            .findCommentByCommentId(commentId)
            .then(
                function(comment) {
                    res.json(comment);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function updateComment(req, res){
        var commentId = req.params.commentId;
        var newComment = req.body;

        scoreModel
            .updateComment(commentId, newComment)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    
    function deleteComment(req, res){
        var commentId = req.params.commentId;

        scoreModel
            .deleteComment(commentId)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }
};