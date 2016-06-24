(function (){
    angular
        .module("CricketApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($routeParams, $location, UserService, $rootScope){
         var vm = this;

         vm.userId = $rootScope.currentUser._id;
        console.log($rootScope.currentUser);
         vm.updateUser = updateUser;
         vm.unregister = unregister;
        vm.navigateUrl = navigateUrl;
         vm.logout = logout;

       // var id = $routeParams["userId"];
        // var id = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                    console.log(vm.user);
                });
        }
         init();

        function navigateUrl(){
            $location.url("/user/"+vm.userId);
        }

        function unregister(){
            UserService
                .deleteUser(vm.userId)
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
                )
        }
    }


})();