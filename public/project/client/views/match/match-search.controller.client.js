(function(){
    angular
        .module("CricketApp")
        .controller("MatchSearchController",MatchSearchController)



    function MatchSearchController(ScheduleService , $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;


        vm.viewSchedule = viewSchedule;
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
            var result = vm.matches;
            for (var m in result) {
                if (result[m].title.indexOf(searchText)) {
                    result.splice(m, 1);
                }
            }
            if(result) {
                vm.displayMatch = result;
                console.log(vm.displayMatch.unique_id);
            }
            else {
                vm.error = "Match ";
            }

        }

    }



})();
