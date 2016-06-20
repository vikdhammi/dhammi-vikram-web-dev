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
            .when("/profile", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/schedule", {
                templateUrl: "client/views/user/cricket-match-schedule.view.client.html",
                controller: "CricketMatchScheduleController",
                controllerAs: "model"
            })
            .when("/user/:userId/search", {
                templateUrl: "client/views/user/find-teammates.view.client.html",
                controller: "TeamMateSearchController",
                controllerAs: "model"
            })

            .otherwise({
                redirect: "/login"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if (user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (res) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();
