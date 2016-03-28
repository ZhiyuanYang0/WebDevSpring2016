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
            deleteUserById: deleteUserById,
            updateUser: updateUser,

            //$http get set
            setCurrentUser : setCurrentUser,
            getCurrentUser: getCurrentUser,

            //new services
            findUserByUsername: findUserByUsername
        };
        return service;

        function findUserByCredentials(username, password) {
            return $http.get('/api/assignment/user?username='+ username + '&password='+ password);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user/findAllUsers');
        }

        function createUser(user) {
            return $http.post('/api/assignment/user/', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/'+userId);
        }

        function updateUser(currentUser) {
            return $http.put('/api/assignment/user/' + currentUser._id, currentUser);
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