
(function(){
    angular
        .module("CricketApp")
        .controller("TeamMateSearchController",TeamMateSearchController);



    function TeamMateSearchController($location, $routeParams, UserService, $rootScope) {
        var vm = this;

        vm.userId = $routeParams.userId;

        vm.searchTeammates = searchTeammates;
        vm.deleteUser = deleteUser;
        vm.makeAdmin = makeAdmin;

        function init() {
            // vm.newsResults = vm.news.get();
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                });

        }

        init();

        function searchTeammates(searchText) {
            UserService
                .searchUsersByUsername(searchText)
                .then(function (response) {
                        var teammembers = response.data;
                        for (var u in teammembers) {
                            if (teammembers[u]._id == vm.userId) {
                                teammembers.splice(u, 1);
                            }
                        }
                        vm.users = teammembers;

                    if(vm.users.length < 1){
                        vm.error = "User not found!";
                    }
                    
                    },
                    function (error) {
                        vm.error = "User not found!";
                    });
        }

        function deleteUser(delUserId) {
            UserService
                .deleteUser(delUserId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/home/profile/search/");
                        console.log("user deleted");
                    },
                    function () {
                        console.log("user not deleted");
                        vm.error = "Unable to remove user";
                    }
                );
        }

        function makeAdmin(adminId, admin) {
            if (admin.moderator) {
                vm.error = "User already an admin";
            }
            else {
                admin.moderator = true;
                console.log(admin);
                UserService
                    .updateUser(adminId, admin)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/home/profile/search");
                        },
                        function (err) {
                            vm.error = "Error occurred!";
                        }
                    );
            }
        }
    }
})();
