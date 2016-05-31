(function (){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("ProfileController",ProfileController);

    

    function ProfileController($routeParams){
        var vm = this;

        vm.updateUser = updateUser;

        var index= -1;
        var id=$routeParams.id;
        console.log(id);

        for (var i in users){
            if(users[i]._id === id){
                vm.user = users[i];
                index= i;
            }
        }

        function updateUser(newUser){
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
        }
    }

    function LoginController($location) {

        var vm =this;



        vm.login = function(username, password) {
            for (var i in users){
                if(users[i].username === username && users[i].password === password){
                   $location.url("/profile/"+ users[i]._id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        };
    }
})();