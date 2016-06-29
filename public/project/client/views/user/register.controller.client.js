(function (){
    angular
        .module("CricketApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($routeParams, $location, UserService){
        var vm = this;

        vm.createUser = createUser;


        function createUser(firstName, lastName, username, password, repassword, email, contact, address){
            if(password === repassword){
                UserService
                    .register(firstName, lastName, username, password, email,contact, address)
                    .then(function (response){
                        var user = response.data;
                        if(user){
                            $location.url("/user/"+user._id+"/profile");
                        }
                    });
            }
            else{
                vm.error="Both passwords dont match";
            }
        }


    }


})();