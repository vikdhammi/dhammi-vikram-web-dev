

(function(){
    angular
        .module("CricketApp")
        .factory("MessageService",MessageService);

    function MessageService($http) {
        var api = {
            sendMessage: sendMessage,
            findMessageByUserId: findMessageByUserId,
            deleteMessage: deleteMessage
        };
        return api;

        function sendMessage(userId, receiverId, sentBy, title, message) {
            var newMessage = {
                senderId: userId,
                receiverId: receiverId,
                username: sentBy,
                title: title,
                message: message
            };
            return $http.post("/api/project/user/" + userId + "/message", newMessage);

        }

        function findMessageByUserId(userId) {
            var url = "/api/project/"+userId+"/inbox";
            return $http.get(url);
        }

        function deleteMessage(messageId){
            var url = "/api/inbox/" + messageId;
            return $http.delete(url);
        }
    }

}());
        