

(function(){
    angular
        .module("CricketApp")
        .factory("ScoreService",ScoreService);

    function ScoreService($http) {
        var api = {
            addMatchComment: addMatchComment,
            findCommentsByMatchId: findCommentsByMatchId
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
    }

}());
