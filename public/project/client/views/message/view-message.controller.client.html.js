
(function(){
    angular
        .module("CricketApp")
        .controller("ViewMessageController",ViewMessageController);

    function ViewMessageController($location, $routeParams, MessageService, UserService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.findMessageByUserId = findMessageByUserId;
        vm.deleteMessage = deleteMessage;

        function init(){
           
            console.log("message controller");
            findMessageByUserId();
        }
        init();

        function findMessageByUserId() {
            MessageService
                .findMessageByUserId(vm.userId)
                .then(
                    function (response) {
                        vm.messages = response.data;
                        console.log("show msg");
                        console.log(vm.messages);
                        console.log(vm.messages.length);
                    }
                );
        }
        
        function deleteMessage(messageId) {
            MessageService
                .deleteMessage(messageId)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        init();
                    }
                    else{
                        vm.error = "Unable to delete page";
                    }
                });

        }

    }
})();
