(function(){
    angular
        .module("CricketApp")
        .controller("CricketNewsController",CricketNewsController);



    function CricketNewsController(ScheduleService , $location, $routeParams, $resource){
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.news = $resource("http://cricapi.com/api/cricketNews",{callback: "JSON_CALLBACK"},{get: {method: "JSONP"}});


        //vm.viewNews = viewNews;

        function init(){
            vm.newsResults = vm.news.get();
             console.log("news controller");
         //   console.log(vm.newsResults);
            viewNews();
        }
        init();

        function viewNews(){
            ScheduleService
                .viewNews()
                .then(function(response){
                    console.log("news func controller");
                    console.log(response.data);
                    vm.schedules = response.data;
                    vm.pub = response.data.provider.pubDate;

                });
        }
        
        


    }
})();
