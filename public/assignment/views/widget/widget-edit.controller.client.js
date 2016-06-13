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
           WidgetService
               .findWidgetsById(vm.widgetId)
               .then(function(response){
                   vm.widget = response.data;
               });
        }
        init();


        function updateWidget(widget){
            //if(widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        var result = response.data;
                        if (result) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                        else {
                            vm.error = "Unable to update Widget";
                        }
                    });
           // }
            //else {
                //vm.error= "*" +"Widget Name is a required!";
            //}
        }

        function deleteWidget(){
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                    else{
                        vm.error="Unable to delete Widget";
                    }
                });

        }
        
    }
})();
