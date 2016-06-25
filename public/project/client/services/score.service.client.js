

(function(){
    angular
        .module("CricketApp")
        .factory("ScoreService",ScoreService);

    function ScoreService($http) {
        var api = {
            addMatchComment: addMatchComment,
            findCommentsByMatchId: findCommentsByMatchId,
            findCommentByCommentId: findCommentByCommentId,
            updateComment: updateComment,
            deleteComment: deleteComment
        };
        return api;

        function addMatchComment(matchId, userId, comment) {
            var matchComment = {
                matchId: matchId,
                userId: userId,
                text: comment
            };
            return $http.post("/api/project/user/" + userId + "/schedule/" + matchId, matchComment);

        }

        function findCommentsByMatchId(matchId) {
            var url = "/api/project/schedule/"+matchId;
            return $http.get(url);
        }

        function findCommentByCommentId(commentId){
            var url = "/api/comment/"+ commentId;
            return $http.get(url);
        }

        function updateComment(commentId, comment){
            var url = "/api/comment/" + commentId;
            return $http.put(url, comment);
        }

       

        function deleteComment(commentId){
            var url = "/api/comment/" + commentId;
            return $http.delete(url);
        }
    }

}());
