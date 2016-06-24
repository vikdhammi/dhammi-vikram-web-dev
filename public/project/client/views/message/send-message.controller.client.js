(function(){
    angular
        .module("CricketApp")
        .controller("SendMessageController",SendMessageController);
    
    function SendMessageController($location, $routeParams, MessageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.receiverId = $routeParams.profileId;
        vm.sendMessage = sendMessage;

        function sendMessage(title, message){
            MessageService
                .sendMessage(vm.userId,vm.receiverId,title, message)
                .then(function(response){
                    vm.newMessage = response.data;
                    console.log(vm.newMessage);
                    vm.alert = "Delivered!";
                }, function (error) {
                        vm.alert = "Failed!";
                    }
                );
        }

    }
})();
