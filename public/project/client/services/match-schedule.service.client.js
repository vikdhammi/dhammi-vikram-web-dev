(function(){
    angular
        .module("CricketApp")
        .factory("ScheduleService",ScheduleService);

    var key = "3rpcv3wdu7jubcaapp6n7nja";
    var urlBase = "http://api.sportradar.us/cricket-t1/matches/schedule.xml?api_key=API_KEY";


    function ScheduleService($http){
        var api = {
            viewSchedule: viewSchedule
        };
        return api;

        function viewSchedule(){
            var url = urlBase
                        .replace("API_KEY", key)
            return $http.get(url);

        }
    }
})();
