(function(){
    angular
        .module("CricketApp")
        .controller("MatchScoreController",MatchScoreController);


    function MatchScoreController($location, $routeParams, ScheduleService, ScoreService, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.matchId = $routeParams.matchId;
//        console.log(vm.newsId);
        vm.viewScore= viewScore;
       vm.addMatchComment = addMatchComment;
        vm.findCommentsByMatchId = findCommentsByMatchId;
        vm.deleteComment = deleteComment;

        // vm.deleteWebsite = deleteWebsite;
        // vm.updateWebsite = updateWebsite;

        // function init(){
        //     ScheduleService
        //         .findNewsById(vm.newsId)
        //         .then(function(response){
        //             vm.news=response.data;
        //         });
        // }
        // init();
        //
        // function deleteWebsite(websiteId){
        //     WebsiteService
        //         .deleteWebsite(websiteId)
        //         .then(function(response){
        //             var website=response.data;
        //             if(website){
        //                 $location.url("/user/" +vm.userId+"/website");
        //             }
        //             else{
        //                 vm.error = "Unable to delete website";
        //             }
        //         });
        //
        // }
        //
        // function updateWebsite(){
        //     if(vm.website.name) {
        //         WebsiteService
        //             .updateWebsite(vm.websiteId, vm.website)
        //             .then(function (response) {
        //                 var website = response.data;
        //
        //                 if (website) {
        //                     $location.url("/user/" + vm.userId + "/website/");
        //                 }
        //                 else {
        //                     vm.error = "Unable to update website";
        //                 }
        //
        //             });
        //     }
        //     else {
        //         vm.error = "*" +"Website Name cannot be left blank";
        //     }
        // }


        function init(){
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                });
            // vm.newsResults = vm.news.get();
            console.log("score controller");
            //   console.log(vm.newsResults);
            viewScore();
           findCommentsByMatchId();
        }
        init();

        function viewScore(){
            ScheduleService
                .viewScore(vm.matchId)
                .then(function(response){
                    console.log("match func controller");
                    console.log(response.data);
                    vm.match = response.data;
                    vm.pub = response.data.provider.pubDate;
                    //vm.match.innings_requirement = vm.match.innings-requirement;
                   // console.log(vm.match.innings-requirement);
                });
        }

        function addMatchComment(comment) {
            ScoreService
                .addMatchComment(vm.matchId,vm.userId,vm.user.username, comment)
                .then(
                    function(response){
                        vm.comments = response.data;
                        console.log(vm.comments);
                        init();
                    }
                );
        }

        function findCommentsByMatchId() {
            ScoreService
                .findCommentsByMatchId(vm.matchId)
                .then(
                    function (response) {
                        vm.postedComments = response.data;
                        console.log("in score comments");
                        console.log(vm.postedComments);
                        console.log(vm.postedComments.length);
                    }
                );
        }

        function deleteComment(commentId) {
            ScoreService
                .deleteComment(commentId)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        init();
                        $location.url("/user/"+vm.userId+"/home/schedule/"+vm.matchId);
                    }
                    else{
                        vm.error = "Unable to delete comment!";
                    }
                });

        }
    }
})();
