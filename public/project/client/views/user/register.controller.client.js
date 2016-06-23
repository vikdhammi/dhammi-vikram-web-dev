(function (){
    angular
        .module("CricketApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($routeParams, $location, UserService){
         var vm = this;

         vm.createUser = createUser;
        

        function createUser(username, password, repassword, email){
            if(password === repassword){
                  UserService
                      .createUser(username, password, email)
                      .then(function (response){
                          var user = response.data;
                          if(user){
                              $location.url("/user/"+user._id+"/home");
                          }
                      });
            }
            else{
                vm.error="Both passwords dont match";
            }
        }



    }


})();