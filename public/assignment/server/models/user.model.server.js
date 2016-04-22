var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("userModel", UserSchema);

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
        var deferred = q.defer();
        userModel.create(user, function(err, newUser){
            //console.log(doc)
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(newUser);
            }
        });
        return deferred.promise;
    }


    function findAllUsers() {
        var deferred = q.defer();
        userModel.findAll(function(err, users){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        userModel.findById(id, function(err, user){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        //return userModel.update({_id: userId}, {$set: newUser});
        console.log("I am in the updateUser service");
        console.log(newUser);
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: newUser}, function(err, user) {
            if(err){
                deferred.reject(err);
            }else{
                userModel.find({_id: userId},function(err, user){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId},function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                userModel.find(function(err, users){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(userName) {
        var deferred = q.defer();
        userModel.findOne({username: userName}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel
            .findOne({username : credentials.username, password: credentials.password},
                function(err, user){

                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;
    }

}