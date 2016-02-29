(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {"_id":123, "firstName":"Alice", "lastName":"Wonderland","username":"alice", "password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "roles": ["admin"]},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie", "password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "roles": ["student"]}
        ];

        var service = {
            //findUserByCredentials: findUserByCredentials,
            //findAllUsers: findAllUsers,
            createUser: createUser,
            //deleteUserById: deleteUserById,
            //updateUser: updateUser
        };
        return service;

        function createUser(user, callback) {
            var newUser = {
                _id:(new Date).getTime(),
                username: user.username,
                password: user.password,
                email: user.email
            };
            users.push(newUser);
            callback(newUser);
            console.log(users);
        }
    }
})();