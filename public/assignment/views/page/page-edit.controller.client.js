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

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
        
        function  deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result){
                $location.url("/user/"+ vm.userId+"/website/"+vm.websiteId+"/page/");
            }
            else{
                vm.error = "Unable to delete page";
            }
        }

        function updatePage(page) {
            var result = PageService.updatePage(pageId,page);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
            }
            else{
                vm.error = "Unable to update page";
            }
        }

    }
})();
