(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);




    function WebsiteService($http){
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite
        };
        return api;

        function deleteWebsite(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function updateWebsite(websiteId, website){
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+ websiteId;
            return $http.get(url);
        }
        function createWebsite(developerId, name, desc){
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            return $http.post("/api/user/:userId/website", newWebsite);
        }
        function findWebsitesForUserId(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }
    }
})();
