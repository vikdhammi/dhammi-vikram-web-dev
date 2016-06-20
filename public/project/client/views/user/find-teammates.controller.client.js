
(function(){
    angular
        .module("CricketApp")
        .controller("TeamMateSearchController",TeamMateSearchController)



    function TeamMateSearchController($location, $routeParams, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
       

        vm.searchTeammates = searchTeammates;

        function searchTeammates(searchText){
            UserService
                .register(searchText)
                .then(function(response){
                   vm.users = response.data;
                    console.log(vm.users);
                });
        }
    }
})();
