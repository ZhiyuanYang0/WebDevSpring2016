(function(){
    angular
        .module("BlogApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile
        };
        return api;

        function getProfile() {
            return $http.get("/api/project/blog/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/api/project/blog/register", user);
        }

        function logout() {
            return $http.post("/api/project/blog/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/blog/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            return $http.post("/api/project/blog/login", credentials);
        }
    }
})();