(function(){
    angular
        .module("CricketApp")
        .controller("SendMessageController",SendMessageController);
    
    function SendMessageController($location, $routeParams, MessageService, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.receiverId = $routeParams.profileId;
        vm.sendMessage = sendMessage;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        function sendMessage(title, message){
            if(title && message){
            MessageService
                .sendMessage(vm.userId,vm.receiverId, vm.user.username, title, message)
                .then(function(response){
                    vm.newMessage = response.data;
                    console.log(vm.newMessage);
                    vm.alert = "Delivered!";
                }, function (error) {
                        vm.alert = "Failed!";
                    }
                );
        }
            else {
                vm.alert = "Please enter title and content for your message";
            }
        }

    }
})();
