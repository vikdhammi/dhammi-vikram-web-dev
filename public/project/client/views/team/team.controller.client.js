

(function(){
    angular
        .module("CricketApp")
        .controller("TeamController",TeamController);

    function TeamController($location, $routeParams, TeamService, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.findAllTeams = findAllTeams;
        // vm.deleteMessage = deleteMessage;

        function init(){
            findAllTeams();
        }
        init();

        function findAllTeams() {
            TeamService
                .findAllTeams()
                .then(
                    function (response) {
                        vm.teams = response.data;
                        console.log(vm.teams);
                    }
                );
        }

        // function deleteMessage(messageId) {
        //     MessageService
        //         .deleteMessage(messageId)
        //         .then(function(response){
        //             var result = response.data;
        //             if(result){
        //                 init();
        //             }
        //             else{
        //                 vm.error = "Unable to delete page";
        //             }
        //         });
        //
        // }

    }
})();
