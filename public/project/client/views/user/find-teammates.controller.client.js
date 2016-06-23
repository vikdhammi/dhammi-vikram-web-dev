
(function(){
    angular
        .module("CricketApp")
        .controller("TeamMateSearchController",TeamMateSearchController)



    function TeamMateSearchController($location, $routeParams, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;


        vm.searchTeammates = searchTeammates;

        function init(){
            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        vm.users= response.data;
                    }
                );
            UserService
                .findUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                    }
                )
        }

        init();

        function searchTeammates(searchText){
            UserService
                .searchTeammates(searchText)
                .then(function(response){
                    vm.teammembers = response.data;
                    console.log(vm.users);
                });
        }
    }
})();
