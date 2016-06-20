(function (){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);


    function RegisterController($routeParams, $location, UserService){
         var vm = this;

         vm.createUser = createUser;

        // function createUser(username, password, repassword){
        //     if(password === repassword){
        //         var newUser = {
        //             _id: (new Date()).getTime()+"",
        //             username: username,
        //             password: password
        //         };
        //
        //         if(UserService.createUser(newUser)){
        //             $location.url("/user/"+newUser._id);
        //         }
        //         else{
        //             vm.error="Unable to create User";
        //         }
        //     }
        //     else{
        //         vm.error="Both passwords dont match";
        //     }
        // }

        function createUser(username, password, repassword){
            if(password === repassword){
                  UserService
                      .register(username, password)
                      .then(function (response){
                          var user = response.data;
                          if(user){
                              $location.url("/user/"+user._id);
                          }
                      },
                          function (error) {
                              vm.error = error;
                          }
                      );
            }
            else{
                vm.error="Both passwords don't match";
            }
        }



    }


})();