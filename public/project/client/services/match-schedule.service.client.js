(function(){
    angular
        .module("CricketApp")
        .factory("ScheduleService",ScheduleService);

   // var key = "3rpcv3wdu7jubcaapp6n7nja";
   var urlBase = "http://cricapi.com/api/cricketScore/?unique_id=UNIQUE_ID";



    function ScheduleService($http){
        var api = {
            viewSchedule: viewSchedule,
            viewNews: viewNews,
            viewScore: viewScore,
            findNewsById: findNewsById,
            viewCommentary: viewCommentary
        };
        return api;

        /*function viewSchedule(){
            var url = urlBase
                        .replace("API_KEY", key)
            return $http.get(url);

        }*/

        function viewSchedule(){
           // var request = require("request");

            url = 'http://cricapi.com/api/cricket';
            return $http.get(url);  

        }

        function viewNews() {
            url = 'http://cricapi.com/api/cricketNews';
            return $http.get(url);
        }

        function findNewsById(newsId){
            var url = urlBase
                            .replace("UNIQUE_ID",newsId)
            return $http.get(url);
        }

        function viewScore(matchId){
            url = 'http://cricapi.com/api/cricketScore/?unique_id='+matchId;
            return $http.get(url);
        }

        function viewCommentary(matchId){
            url = 'http://cricapi.com/api/cricketCommentary?unique_id='+matchId;
            return $http.get(url);
        }
    }


})();
