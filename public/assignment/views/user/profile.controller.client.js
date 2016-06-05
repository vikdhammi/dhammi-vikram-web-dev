(function (){
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);


    function ProfileController($routeParams, $location, UserService){
         var vm = this;

         vm.updateUser = updateUser;
         vm.unregister = unregister;

         var id=$routeParams.id;

        function init(){
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                });
        }
         init();

        function unregister(){
            UserService
                .deleteUser(id)
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
    }


})();