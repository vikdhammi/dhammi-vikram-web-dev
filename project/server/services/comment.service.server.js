
module.exports = function(app, models) {

    var commentModel = models.projectComment;

    app.post("/api/project/user/:userId/news/:newsId", addNewsComment);
    app.get("/api/project/news/:newsId",findCommentsByNewsId);
    app.put("/api/comment/news/:commentId",updateNewsComment);
    app.get("/api/comment/news/:commentId",findCommentByCommentId);
    app.delete("/api/comment/:commentId",deleteComment);

    function addNewsComment(req, res) {
        var comment = req.body;
        var newsId = req.params.newsId;
        var userId = req.params.userId;
        commentModel
            .addNewsComment(comment)
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

    function findCommentsByNewsId(req, res){
        var newsId = req.params.newsId;

        commentModel
            .findCommentsByNewsId(newsId)
            .then(
                function(news){
                    res.json(news);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
    }

    function updateNewsComment(req, res){
        var commentId = req.params.commentId;
        var newComment = req.body;

        commentModel
            .updateNewsComment(commentId, newComment)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function findCommentByCommentId(req, res){
        var commentId = req.params.commentId;

        commentModel
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

    function deleteComment(req, res){
        var commentId = req.params.commentId;

        commentModel
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