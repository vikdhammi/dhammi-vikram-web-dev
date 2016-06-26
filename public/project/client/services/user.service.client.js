(function () {
    angular
        .module("CricketApp")
        .factory("UserService",UserService);


    function UserService($http){
        var api= {
            createUser : createUser,
            login: login,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById : findUserById,
            updateUser : updateUser,
            deleteUser: deleteUser,
            logout: logout,
            loggedIn: loggedIn,
            register: register,
            findUsers: findUsers,
            searchUsersByUsername: searchUsersByUsername
        };
        return api;

        function searchUsersByUsername(searchText){
            var url = "/api/search/"+searchText;
            return $http.get(url);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function loggedIn(){
            return $http.get("/api/project/loggedIn");
        }

        function login(username, password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", user);
        }

        function register(username, password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/register", user);
        }

        function createUser(firstName, lastName,username, password,email, contact, address){
            var user = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                contact: contact,
                address: address
            };
            return $http.post("/api/project/user", user);
        }
        function deleteUser(userId){
            var url = "/api/project/user/" + userId;
            return $http.delete(url);


        }

        function updateUser(id, newUser){
            var url = "/api/project/user/" + id;
            return $http.put(url, newUser);

        }

        function findUserById(id){
            var url = "/api/project/user/"+ id;
            return $http.get(url);
        }


        function findUserByUsernameAndPassword(username,password) {
            var  url= "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUsers(){
            var url = "api/project/user";
            return $http.get(url);
        }
    }
})();
