(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

   

    function PageService($http){
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;
        
        function findPageByWebsiteId(websiteId){
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }
        
        function createPage(websiteId, name){
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                websiteId: websiteId
            };
            return $http.post("/api/website/"+websiteId+"/page", newPage);
        }

        function deletePage(pageId){
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        function updatePage(pageId, page){
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function findPageById(pageId){
            var url = "/api/page/"+ pageId;
            return $http.get(url);
        }
    }

}());
