(function (){
    angular
        .module("CricketApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($routeParams, $location, UserService, $rootScope){
         var vm = this;

         var userId = $rootScope.currentUser._id;
        vm.id = $rootScope.currentUser._id;
        console.log($rootScope.currentUser);
         vm.updateUser = updateUser;
         vm.unregister = unregister;
        vm.navigateUrl = navigateUrl;
         vm.logout = logout;

       // var id = $routeParams["userId"];
        // var id = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(userId)
                .then(function(response){
                    vm.user = response.data;
                    console.log(vm.user);
                });
        }
         init();

        function navigateUrl(){
            $location.url("/user/"+userId);
        }

        function unregister(){
            UserService
                .deleteUser(userId)
                .then(
                    function() {
                        $location.url("/login");
                    },
                    function(){
                        vm.error = "Unable to remove user";
                    }
                );
        }
         function updateUser(newUser){
             UserService
                 .updateUser(userId, newUser)
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
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }
    }


})();