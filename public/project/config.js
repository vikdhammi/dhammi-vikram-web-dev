(function(){
    angular
        .module("CricketApp")
        .config(Config);
    
    function Config($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "client/views/home.html"
                    })
                    .when("/login", {
                        templateUrl: "client/views/user/login.view.client.html",
                        controller: "LoginController",
                        controllerAs: "model"
                    })
                    .when("/register", {
                        templateUrl: "client/views/user/register.view.client.html",
                        controller: "RegisterController",
                        controllerAs: "model"
                    })
                    .when("/user/:id", {
                        templateUrl: "client/views/user/profile.view.client.html",
                        controller: "ProfileController",
                        controllerAs: "model"
                    })
                    .when("/user/:userId/schedule", {
                        templateUrl: "client/views/user/cricket-match-schedule.view.client.html",
                        controller: "CricketMatchScheduleController",
                        controllerAs: "model"
                    })
                    
                    .otherwise({
                        redirect: "/login"
                    });
    }
})();
