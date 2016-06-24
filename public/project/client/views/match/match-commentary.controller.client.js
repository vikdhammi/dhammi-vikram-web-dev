
(function(){
    angular
        .module("CricketApp")
        .controller("MatchCommentaryController",MatchCommentaryController);


    function MatchCommentaryController($location, $routeParams, ScheduleService,$sce){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.matchId = $routeParams.matchId;
//        console.log(vm.newsId);
        vm.viewCommentary= viewCommentary;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeHtmlCommentary=getSafeHtmlCommentary;
        
        // vm.addMatchComment = addMatchComment;
        // vm.findCommentsByMatchId = findCommentsByMatchId;

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
            // vm.newsResults = vm.news.get();
            console.log("commentary controller");
            //   console.log(vm.newsResults);
            viewCommentary();
           // findCommentsByMatchId();
        }
        init();

        function viewCommentary(){
            ScheduleService
                .viewCommentary(vm.matchId)
                .then(function(response){
                    console.log("match comm controller");
                    console.log(response.data);
                    vm.commentary = response.data;
               //     vm.pub = response.data.provider.pubDate;
                    //vm.match.innings_requirement = vm.match.innings-requirement;
                    // console.log(vm.match.innings-requirement);
                });
        }

        function getSafeHtml(commentary){
            return $sce.trustAsHtml(commentary.commentary);
        }

        function getSafeHtmlCommentary(){
            return getSafeHtml(vm.commentary);
        }

        

        // function addMatchComment(comment) {
        //     ScoreService
        //         .addMatchComment(vm.matchId,vm.userId)
        //         .then(
        //             function(response){
        //                 vm.comments = response.data;
        //                 console.log(vm.comments);
        //                 init();
        //             }
        //         );
        // }

        // function findCommentsByMatchId() {
        //     ScoreService
        //         .findCommentsByMatchId(vm.matchId)
        //         .then(
        //             function (response) {
        //                 vm.postedComments = response.data;
        //                 console.log("in score comments");
        //                 console.log(vm.postedComments);
        //                 console.log(vm.postedComments.length);
        //             }
        //         );
        // }
    }
})();
