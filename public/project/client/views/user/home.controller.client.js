(function (){
    angular
        .module("CricketApp")
        .controller("HomeController",HomeController);


    function HomeController($routeParams, $location, UserService, $rootScope){
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.navigateUrl = navigateUrl;
        vm.logout = logout;
        vm.slide = slide;
        vm.login = login;

        // var id = $routeParams["userId"];
        // var id = $rootScope.currentUser._id;
        var slides = []
        function init(){
            $('.carousel').carousel({
                interval: 5000 //changes the speed
            });
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

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        }

        function login(){
            $location.url("/login");
        }

    }


})();