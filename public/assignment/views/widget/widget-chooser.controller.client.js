(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);
    
    function WidgetChooserController($sce, $location, $routeParams, WidgetService){
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.addHeading = addHeading;
        vm.addImage = addImage;
        vm.addYoutube = addYoutube;
        vm.addHtml = addHtml;
        vm.addText = addText;


        function init(){
           WidgetService
               .findWidgetsForPageId(vm.pageId)
               .then(function(response){
                   vm.widgets = response.data;
               });
        }
        init();
        
        function addHtml(){
            var newWidget = {
              name: "HtmlWidget",
         //       _page: vm.pageId,
                type: "HTML"
            };
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }
                    else{
                        vm.error="Unable to create Widget";
                    }


                });

        }

        function addText(){
            var newWidget = {
                name: "Text Widget",
            //   _page: vm.pageId,
                type: "TEXT"
            };
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }
                    else{
                        vm.error="Unable to create Widget";
                    }


                });

        }
        
        function addHeading(){
            var newWidget = {
          //      _id: (new Date()).getTime()+"",
                name: "Header Widget",
                _page: vm.pageId,
                type: "HEADER"
            };
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }
                    else{
                        vm.error="Unable to create Widget";
                    }


                });

        }

        function addImage(){
            var newWidget={
         //       _id: (new Date()).getTime()+"",
                name: "Image Widget",
                _page: vm.pageId,
                type: "IMAGE"
            };
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }
                    else{
                        vm.error="Unable to create Widget";
                    }
                });
        }

        function addYoutube(){
            var newWidget={
          //      _id: (new Date()).getTime()+"",
                name: "Youtube Widget",
                _page: vm.pageId,
                type: "YOUTUBE"
            };

            WidgetService
                .createWidget(vm.pageId,newWidget)
                .then(function(response){
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }
                    else{
                        vm.error="Unable to create Widget";
                    }
                });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();
