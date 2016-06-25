
(function(){
    angular
        .module("CricketApp")
        .controller("TeamMateSearchController",TeamMateSearchController);



    function TeamMateSearchController($location, $routeParams, UserService, $rootScope){
        var vm = this;

        var userId = $routeParams.userId;


        vm.searchTeammates = searchTeammates;

        function init(){

        }

        init();

        function searchTeammates(searchText){
            UserService
                .searchUsersByUsername(searchText)
                .then(function(response) {
                    var teammembers = response.data;
                    for (var u in teammembers) {
                        if (teammembers[u]._id == userId) {
                            teammembers.splice(u, 1);
                        }
                    }
                    vm.users = teammembers;
                    console.log(vm.users);
                },
                function(error){
                    vm.error = "User not found!";
                });
        }
    }
})();
