(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);
    
    function NewPageController($location, $routeParams, PageService){
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.createPage = createPage;

        function createPage(name){
            PageService
                .createPage(vm.websiteId, name)
                .then(function(response){
                    var newPage = response.data;
                    if(newPage){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                    else{
                        vm.error="Unable to create page";
                    }
                });


        }


    }
})();
