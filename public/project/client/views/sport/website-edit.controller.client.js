(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController);
    
    function EditWebsiteController($location, $routeParams, WebsiteService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init(){
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response){
                    vm.website=response.data;
                });
        }
        init();
        
        function deleteWebsite(websiteId){
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function(response){
                    var website=response.data;
                    if(website){
                        $location.url("/user/" +vm.userId+"/website");
                    }
                    else{
                        vm.error = "Unable to delete website";
                    }
                });

        }
        
        function updateWebsite(){
            if(vm.website.name) {
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(function (response) {
                        var website = response.data;

                        if (website) {
                            $location.url("/user/" + vm.userId + "/website/");
                        }
                        else {
                            vm.error = "Unable to update website";
                        }

                    });
            }
            else {
                vm.error = "*" +"Website Name cannot be left blank";
            }
        }
    }
})();
