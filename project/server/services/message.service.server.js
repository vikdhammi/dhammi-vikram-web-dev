

module.exports = function(app, models) {

    var messageModel = models.projectMessage;

    app.post("/api/project/user/:userId/message", sendMessage);
    app.get("/api/project/:userId/inbox",findMessageByUserId);
    app.delete("/api/inbox/:messageId",deleteMessage);

    function sendMessage(req, res) {
        var message = req.body;
        var senderId = req.params.userId;
        var receiverId = req.params.profileId;
        messageModel
            .sendMessage(message)
            .then(
                function (message) {
                    res.json(message);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
       
    }

    function findMessageByUserId(req, res){
        var userId = req.params.userId;

        messageModel
            .findMessageByUserId(userId)
            .then(
                function(message){
                    res.json(message);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteMessage(req, res){
        var messageId = req.params.messageId;

        messageModel
            .deleteMessage(messageId)
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