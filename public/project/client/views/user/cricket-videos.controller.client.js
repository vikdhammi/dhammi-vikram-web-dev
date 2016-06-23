(function(){
    angular
        .module("CricketApp")
        .controller("CricketVideosController",CricketVideosController)



    function CricketVideosController(VideoService , $location, $routeParams){
        var vm = this;
        vm.userId = $routeParams.userId;


        vm.viewVideos = viewVideos;

        function init(){
            viewVideos();
        }
        init();

        function viewVideos(){
            VideoService
                .viewVideos(searchText)
                .then(function(response){
                    console.log("schedule controller");
                    console.log(response.data);
                    vm.videos = response.data;
                });
        }


    }
})();
