(function(){
    angular
        .module("CricketApp")
        .factory("ScheduleService",ScheduleService);

   // var key = "3rpcv3wdu7jubcaapp6n7nja";
   // var urlBase = "http://api.sportradar.us/cricket-t1/matches/schedule.xml?api_key=API_KEY";



    function ScheduleService($http){
        var api = {
            viewSchedule: viewSchedule
        };
        return api;

        /*function viewSchedule(){
            var url = urlBase
                        .replace("API_KEY", key)
            return $http.get(url);

        }*/

        function viewSchedule(){
            var request = require("request");

            var options = { method: 'GET',
                url: 'http://cricapi.com/api/cricket',
                headers:
                { 'postman-token': '194ccbfe-a790-9108-706e-9928097735cf',
                    'cache-control': 'no-cache' } };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                console.log(body);
            });
        }
    }


})();
