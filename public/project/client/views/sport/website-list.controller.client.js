(function(){
    angular
        .module("CricketApp")
        .controller("WebLoginController",WebLoginController);
    
    function WebLoginController($routeParams, WebsiteService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        function init(){

           WebsiteService
               .findWebsitesForUserId(vm.userId)
               .then(function(response) {
                   vm.websites = response.data;
               });
        }
        init();

    }
})();
