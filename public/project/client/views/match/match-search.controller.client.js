(function(){
    angular
        .module("CricketApp")
        .controller("MatchSearchController",MatchSearchController)

    function MatchSearchController(ScheduleService , $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.viewSchedule = viewSchedule;
        vm.searchResults =[];   
       vm.searchTeam = searchTeam;

        function init() {
            viewSchedule();

        }

        init();

        function viewSchedule() {
            ScheduleService
                .viewSchedule()
                .then(function (response) {
                    console.log(response.data);
                    vm.matches = response.data;
                });
        }

        function searchTeam(searchText) {
            var result = vm.matches.data;
            for( var i =0; i< result.length; i++) {
                console.log(result[i].title);
                if(result[i].title.indexOf(searchText,0)!=-1){
                    console.log(result[i].unique_id);
                  //  result.splice[i,1];
                    vm.searchResults.push(result[i]);
                   // vm.getId = result[i].unique_id;
                  //  $location.url("/user/"+vm.userId+"/home/schedule/"+vm.getId);
                   // return;
                }
                
        }
            console.log(vm.searchResults);
            
    }}

})();
