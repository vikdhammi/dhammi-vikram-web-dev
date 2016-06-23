
(function(){
    angular
        .module("CricketApp")
        .factory("CommentService",CommentService);

    function CommentService($http) {
        var api = {
            addNewsComment: addNewsComment,
            findCommentsByNewsId: findCommentsByNewsId
        };
        return api;

        function addNewsComment(newsId, userId, comment) {
            var newsComment = {
                newsId: newsId,
                userId: userId,
                text: comment
            };
            return $http.post("/api/project/user/" + userId + "/news/" + newsId, newsComment);

        }
        
        function findCommentsByNewsId(newsId) {
            var url = "/api/project/news/"+newsId;
            return $http.get(url);
        }
    }

}());
        