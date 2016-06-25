
(function(){
    angular
        .module("CricketApp")
        .controller("EditNewsCommentController",EditNewsCommentController);

    function EditNewsCommentController($location, $routeParams, CommentService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.commentId = $routeParams.commentId;
        vm.newsId = $routeParams.newsId;
        vm.updateNewsComment = updateNewsComment;

        function init(){
            CommentService
                .findCommentByCommentId(vm.commentId)
                .then(function(response){
                    vm.comment = response.data;
                });
        }
        init();

        
        
        function updateNewsComment() {
            CommentService
                .updateNewsComment(vm.commentId, vm.comment)
                .then(function (response) {
                    var result = response.data;
                    if (result) {
                        $location.url("/user/" + vm.userId + "/home/news/" + vm.newsId);
                    }
                    else {
                        vm.error = "Unable to update page";
                    }


                });

        }



    }
})();
