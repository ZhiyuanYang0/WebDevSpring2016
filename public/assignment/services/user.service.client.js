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
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByCredentials(username, password, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    callback(users[i]);
                    //console.log("findUserByCredentials: " + user[i]);
                }
            }
        }

        function findAllUsers(callback) {
             callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id:(new Date).getTime(),
                username: user.username,
                password: user.password,
                email: user.email,
                roles: "user"
            };
            users.push(newUser);
            callback(newUser);
            console.log(users);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                }
                callback(users);
            }
        }

        function updateUser(userId, user, callback) {
            console.log("User: ");
            console.log(user);
            console.log("email: " + user.email);
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    if(user.username) {
                        users[i].username = user.username;
                    }
                    if(user.password) {
                        users[i].password = user.password;
                    }
                    if (user.firstName) {
                        users[i].firstName = user.firstName;
                    }
                    if (user.lastName) {
                        users[i].lastName = user.lastName;
                    }
                    if (user.email) {
                        users[i].email = user.email;
                    }
                    callback(users[i]);
                    break;
                }
            }
        }
    }
})();