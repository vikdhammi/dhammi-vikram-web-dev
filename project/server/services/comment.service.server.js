
module.exports = function(app, models) {

    var commentModel = models.projectComment;

    app.post("/api/project/user/:userId/news/:newsId", addNewsComment);
    app.get("/api/project/news/:newsId",findCommentsByNewsId);

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
};