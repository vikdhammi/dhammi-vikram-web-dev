(function (){
    angular
        .module("CricketApp")
        .controller("PublicUserProfileController",PublicUserProfileController);


    function PublicUserProfileController($routeParams, $location, UserService, $rootScope){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.profileId = $routeParams.profileId;
        console.log($rootScope.currentUser);
        vm.updateUser = updateUser;
        
        vm.navigateUrl = navigateUrl;
        

        // var id = $routeParams["userId"];
        // var id = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                    console.log(vm.user);
                    UserService
                        .findUserById(vm.profileId)
                        .then(
                        function (response) {
                            vm.publicUser = response.data;
                            console.log(vm.publicUser);
                        }
                    );

                });
        }
        init();

        function navigateUrl(){
            $location.url("/user/"+vm.userId);
        }
        
        function updateUser(newUser){
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response){
                        vm.success = "Successfully updated";
                    },
                    function(error){
                        vm.error = "Unable to update";
                    }
                );

        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(){
                        $location.url("/login");
                    }
                );
        }
    }


})();