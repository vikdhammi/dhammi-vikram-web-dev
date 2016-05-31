(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    
    function EditWidgetController($sce, $location, $routeParams, WidgetService){
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;


        function init(){
           vm.widget= WidgetService.findWidgetsById(vm.widgetId);
        }
        init();


        function updateWidget(widget){
            if(WidgetService.updateWidget(vm.widgetId,widget)){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error="Unable to update Widget";
            }

        }

        function deleteWidget(){
            if(WidgetService.deleteWidget(vm.widgetId)){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error="Unable to delete Widget";
            }

        }



    }
})();
