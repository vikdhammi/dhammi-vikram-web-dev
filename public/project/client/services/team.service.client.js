


(function(){
    angular
        .module("CricketApp")
        .factory("TeamService",TeamService);

    function TeamService($http) {
        var api = {
            findAllTeams: findAllTeams
        };
        return api;

       

        function findAllTeams() {
            var url = "/api/project/teams";
            return $http.get(url);
        }
        
    }

}());
        