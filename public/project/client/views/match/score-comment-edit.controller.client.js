
(function(){
    angular
        .module("CricketApp")
        .controller("EditScoreCommentController",EditScoreCommentController);

    function EditScoreCommentController($location, $routeParams, ScoreService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.commentId = $routeParams.commentId;
        vm.matchId = $routeParams.matchId;
        vm.updateComment = updateComment;

        function init(){
            ScoreService
                .findCommentByCommentId(vm.commentId)
                .then(function(response){
                    vm.comment = response.data;
                });
        }
        init();

        

        function updateComment() {
                ScoreService
                    .updateComment(vm.commentId, vm.comment)
                    .then(function (response) {
                        var result = response.data;
                            if (result) {
                                $location.url("/user/" + vm.userId + "/home/schedule/" + vm.matchId);
                            }
                            else {
                                vm.error = "Unable to update page";
                            }


                    });

        }



    }
})();
