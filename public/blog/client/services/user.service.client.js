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
            getProfile: getProfile,

            updateUserProfile : updateUserProfile,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };
        return api;

        function findAllUsers() {
            return $http.get("/api/user");
        }

        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/user/'+userId, user);
        }

        function getProfile() {
            return $http.get("/api/project/blog/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        // Passport Related functions
        function logout() {
            return $http.post("/api/logout");
        }

        function getCurrentUser()
        {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function updateUserProfile(user) {
            return $http.put('/api/assignment/user/' + $rootScope.currentUser._id, user);
        }

    }
})();