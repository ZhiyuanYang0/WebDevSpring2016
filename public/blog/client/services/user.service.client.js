(function(){
    angular
        .module("BlogApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            logout: logout
        };
        return api;

        function createUser(user) {
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/login", credentials);
        }
    }
})();