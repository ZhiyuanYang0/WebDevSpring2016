(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            updateUserProfile : updateUserProfile,

            //$http get set
            setCurrentUser : setCurrentUser,
            getCurrentUser: getCurrentUser,

            //new services
            findUserByUsername: findUserByUsername,

            //new features by PassportJS
            login : login,
            logout : logout,
            register : register

        };
        return service;

        // Passport Related functions
        function logout() {
            return $http.post("/api/logout");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function createUser(user) {
            return $http.post('/api/user', user);
        }


        function findUserByCredentials(username, password) {
            //console.log("I am at findUserByCredentials.")
            return $http.get('/api/assignment/user?username='+ username + '&password='+ password);
        }

        function findAllUsers() {
            //console.log("I am at find all users client side.");
            return $http.get("/api/user");
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function updateUser(userId, user) {
            console.log("userId");
            return $http.put('/api/user/'+userId, user);
        }

        function updateUserProfile(user) {
            console.log("I am at update User client side.")
            return $http.put('/api/assignment/user/' + $rootScope.currentUser._id, user);
        }

        function getCurrentUser()
        {
            return $rootScope.currentUser;
        }

        function setCurrentUser (user)
        {
            $rootScope.currentUser = user;
        }

        //new services
        function findUserByUsername(username)
        {
            return $http.get('/api/assignment/user?username=' + username);
        }


    }
})();