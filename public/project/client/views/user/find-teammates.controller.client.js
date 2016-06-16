
(function(){
    angular
        .module("CricketApp")
        .controller("TeamMateSearchController",TeamMateSearchController)



    function TeamMateSearchController(FlickrService , $location, $routeParams, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
       

        vm.searchTeammates = searchTeammates;

        function searchTeammates(searchText){
            UserService
                .searchTeammates(searchText)
                .then(function(response){
                   vm.users = response.data;
                });
        }

      
    }
})();
