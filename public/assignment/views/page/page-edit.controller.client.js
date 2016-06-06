(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);
    
    function EditPageController($location, $routeParams, PageService){
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;
        //vm.page = PageService.findPageById(vm.pageId);

        function init(){
            PageService
                .findPageById(vm.pageId)
                .then(function(response){
                    vm.page = response.data;
                });
        }
        init();
        
        function  deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+ vm.userId+"/website/"+vm.websiteId+"/page/");
                    }
                    else{
                        vm.error = "Unable to delete page";
                    }
                });

        }

        function updatePage() {
            PageService
                .updatePage(vm.pageId,vm.page)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
                    }
                    else{
                        vm.error = "Unable to update page";
                    }
                });

        }

    }
})();
