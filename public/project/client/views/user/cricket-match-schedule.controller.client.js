(function(){
   angular
       .module("CricketApp")
       .controller("CricketMatchScheduleController",CricketMatchScheduleController)

    

    function CricketMatchScheduleController(ScheduleService , $location, $routeParams){
        var vm = this;
        vm.userId = $routeParams.userId;
        

        vm.viewSchedule = viewSchedule;


        function viewSchedule(){
            ScheduleService
                .viewSchedule()
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.schedules = data.schedules;

                });
        }

        
    }
})();
