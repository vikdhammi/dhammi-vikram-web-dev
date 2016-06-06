(function(){
   angular
       .module("WebAppMaker")
       .controller("FlickrImageSearchController",FlickrImageSearchController)

    

    function FlickrImageSearchController(FlickrService , $location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText){
            FlickrService
                .searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;

                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var newWidget = {
                url: url,
                widgetType: "IMAGE",
                width: "100%",
                _id: vm.widgetId,
                pageId: vm.pageId

            };
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                    }
                    else {
                        vm.error = "Unable to add flickr";
                    }
                });

        }
    }
})();
