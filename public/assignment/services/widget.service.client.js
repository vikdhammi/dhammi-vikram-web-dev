(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    


        
        function WidgetService($http){
            var api = {
                findWidgetsForPageId: findWidgetsForPageId,
                createWidget: createWidget,
                findWidgetsById: findWidgetsById,
                updateWidget: updateWidget,
                deleteWidget: deleteWidget
            };
            return api;
            
            function findWidgetsForPageId(pageId){
                var url = "/api/page/"+pageId+"/widget";
                return $http.get(url);
            }

            function createWidget(pageId, widget){
                var url = "/api/page/"+pageId+"/widget";
                return $http.post(url, widget);
            }

            function findWidgetsById(widgetId){
                var url = "/api/widget/"+ widgetId;
                return $http.get(url);
            }

            function updateWidget(widgetId, widget){
                var url = "/api/widget/" + widgetId;
                return $http.put(url, widget);
            }

            function deleteWidget(widgetId){
                var url = "/api/widget/" + widgetId;
                return $http.delete(url);
            }


        }


})();
