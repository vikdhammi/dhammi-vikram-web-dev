(function(){
   angular
       .module("CricketApp")
       .controller("CricketMatchScheduleController",CricketMatchScheduleController)

    

    function CricketMatchScheduleController(ScheduleService , $location, $routeParams){
        var vm = this;
        vm.userId = $routeParams.userId;
        

            vm.viewSchedule = viewSchedule;

            function init(){
                viewSchedule();
            }
        init();
        
        function viewSchedule(){
            ScheduleService
                .viewSchedule()
                .then(function(response){
                   console.log("schedule controller");
                    console.log(response.data);
                    vm.schedules = response.data;
                    vm.pub = response.data.provider.pubDate;
                });
        }

        
    }
})();
