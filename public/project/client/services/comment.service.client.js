
(function(){
    angular
        .module("CricketApp")
        .factory("CommentService",CommentService);

    function CommentService($http) {
        var api = {
            addNewsComment: addNewsComment,
            findCommentsByNewsId: findCommentsByNewsId,
            updateNewsComment: updateNewsComment,
            findCommentByCommentId: findCommentByCommentId,
            deleteComment: deleteComment
        };
        return api;

        function addNewsComment(newsId, userId, username, comment) {
            var newsComment = {
                newsId: newsId,
                userId: userId,
                username: username,
                text: comment
            };
            return $http.post("/api/project/user/" + userId + "/news/" + newsId, newsComment);

        }
        
        function findCommentsByNewsId(newsId) {
            var url = "/api/project/news/"+newsId;
            return $http.get(url);
        }

        function findCommentByCommentId(commentId){
            var url = "/api/comment/news/"+ commentId;
            return $http.get(url);
        }


        function updateNewsComment(commentId, comment){
            var url = "/api/comment/news/" + commentId;
            return $http.put(url, comment);
        }

        function deleteComment(commentId){
            var url = "/api/comment/" + commentId;
            return $http.delete(url);
        }
        
    }

}());
        