(function (){
    angular
        .module("CricketApp")
        .controller("LoginController",LoginController);



    function LoginController($location, UserService) {

        var vm =this;

        vm.login = function(username, password) {

            if(username && password) {
                UserService
                    .login(username, password)
                    .then(function (response) {
                            console.log(response.data);
                            var user = response.data;
                            if (user) {
                                $location.url("/user/" + user._id + "/profile");
                            }
                            else {
                                vm.error = "User not found";
                            }
                        },
                        function (error) {
                            vm.error = "User not found!";
                        });


            }
            else {
                vm.error = "Required fields missing!";
            }
        }
    }
})();