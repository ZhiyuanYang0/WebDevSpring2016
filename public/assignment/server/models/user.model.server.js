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
        updateUserById : updateUserById,
        removeUser: removeUser,

        //user model request
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;


    function updateUserById(userId, newUser) {
        //return userModel.update({_id: userId}, {$set: newUser});
        console.log("I am in the updateUser service");
        console.log(newUser);

        delete newUser._id;

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

    function createUser(user) {
        return userModel.create(user);
    }


    function findAllUsers() {
        return userModel.find();
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function updateUser(userId, user) {
        return userModel.update({_id: userId}, {$set: user});
    }

    //function deleteUser(userId) {
    //    var deferred = q.defer();
    //    userModel.remove({_id: userId},function(err, users){
    //        if(err){
    //            deferred.reject(err);
    //        }
    //        else{
    //            userModel.find(function(err, users){
    //                if(err){
    //                    deferred.reject(err);
    //                }
    //                else{
    //                    deferred.resolve(users);
    //                }
    //            });
    //        }
    //    });
    //    return deferred.promise;
    //}

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
        //console.log("I am at passport login service.");
        return userModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    function removeUser(userId) {
        return userModel.remove({_id: userId});
    }

}