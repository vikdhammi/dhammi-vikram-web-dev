(function(){
    angular
        .module("CricketApp")
        .controller("NewsViewController",NewsViewController);
    
    function NewsViewController($location, $routeParams, ScheduleService, CommentService, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.newsId =$routeParams.newsId;
        console.log(vm.newsId);
        vm.viewNews= viewNews;
        vm.addNewsComment = addNewsComment;
        vm.findCommentsByNewsId = findCommentsByNewsId;
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
           // vm.newsResults = vm.news.get();
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                });
            console.log("news controller");
            //   console.log(vm.newsResults);
            viewNews();
            findCommentsByNewsId();
        }
        init();

        function viewNews(){
            ScheduleService
                .viewNews()
                .then(function(response){
                    console.log("news func controller");
                    console.log(response.data);
                    vm.schedules = response.data;
                    console.log(vm.schedules);
                    vm.pub = response.data.provider.pubDate;
                });
        }

        function addNewsComment(comment) {
            CommentService
                .addNewsComment(vm.newsId,vm.userId,vm.user.username,comment)
                .then(
                    function(response){
                        vm.comments = response.data;
                        console.log(vm.comments);
                        init();
                    }
                );
        }

        function findCommentsByNewsId() {
            CommentService
                .findCommentsByNewsId(vm.newsId)
                .then(
                    function (response) {
                        vm.postedComments = response.data;
                        console.log("in find comments");
                        console.log(vm.postedComments);
                        console.log(vm.postedComments.length);
                    }
                );
        }

        function deleteComment(commentId) {
            CommentService
                .deleteComment(commentId)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        init();
                        $location.url("/user/"+vm.userId+"/home/news/"+vm.newsId);
                    }
                    else{
                        vm.error = "Unable to delete comment!";
                    }
                });

        }

        
    }
})();
