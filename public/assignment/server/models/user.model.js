var users = require("./user.mock.json")

module.exports = function(app) {

    var api = {
        //general request
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,

        //user model request
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(id) {
        for (var u in users) {
            if (users[u]._id == id) {
                return users[u];
            }
        }
        return null;
    }

    function updateUser(id, updateUser) {
        for (var u in users) {
            if (users[u]._id == id) {
                users[u] = updateUser;
                return users[u];
            }
        }
        return null;
    }

    function deleteUser(id) {
        for (var u in users) {
            if (users[u]._id == id) {
                users.splice(u, 1);
            }
        }
        return users;
    }

    function findUserByUsername(username) {
        for (var u in users) {
            if (users[u].username == username) {
                return users[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in users) {
            if(users[u].username == credentials.username && users[u].password == credentials.password) {
                return users[u];
            }
        }
        return null;
    }

}