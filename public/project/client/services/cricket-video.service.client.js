
(function(){
    angular
        .module("CricketApp")
        .factory("VideoService",VideoService);

        var key = "AIzaSyBEf4Glb0l6BvTmlw8fFXsQH8owm2Q25lA";
    
        function VideoService($http){
            var api = {
                viewVideos: viewVideos
            };
            
            return api;
        }
})();