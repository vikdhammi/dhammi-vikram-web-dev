(function(){
    angular
        .module("CricketApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                 templateUrl: "client/views/user/home.view.client.html"
            })
            .when("/login", {
                templateUrl: "client/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/news/:newsId", {
                templateUrl: "client/views/sport/news-article.view.client.html",
                controller: "NewsViewController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/userProfile/:profileId", {
                templateUrl: "client/views/user/public-user-profile.view.client.html",
                controller: "PublicUserProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/userProfile/:profileId/message", {
                templateUrl: "client/views/message/send-message.view.client.html",
                controller: "SendMessageController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/inbox", {
                templateUrl: "client/views/message/view-message.view.client.html",
                controller: "ViewMessageController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/schedule/:matchId", {
                templateUrl: "client/views/match/match-score.view.client.html",
                controller: "MatchScoreController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/schedule/:matchId/comment/:commentId", {
                templateUrl: "client/views/match/score-comment-edit.view.client.html",
                controller: "EditScoreCommentController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/news/:newsId/comment/:commentId", {
                templateUrl: "client/views/match/news-comment-edit.view.client.html",
                controller: "EditNewsCommentController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/schedule/:matchId/commentary", {
                templateUrl: "client/views/match/match-commentary.view.client.html",
                controller: "MatchCommentaryController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "client/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/profile", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/home", {
                templateUrl: "client/views/user/home.view.client.html",
                controller: "HomeController",
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
            .when("/user/:userId/home/schedule", {
                templateUrl: "client/views/user/cricket-match-schedule.view.client.html",
                controller: "CricketMatchScheduleController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/news", {
                templateUrl: "client/views/user/cricket-news.view.client.html",
                controller: "CricketNewsController",
                controllerAs: "model"
            })
            .when("/user/:userId/home/profile/search", {
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
