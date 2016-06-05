(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "your-flickr-key";
    var secret = "your-flickr-secret";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchText){
            var url = urlBase
                        .replace("API_KEY", key)
                        .replace("TEXT", searchText);
            return $http.get(url);

        }
    }
});
