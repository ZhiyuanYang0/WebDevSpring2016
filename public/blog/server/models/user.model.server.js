// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        userLikesMovie: userLikesMovie,

        //admin function
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        removeUser: removeUser,
        findUserByUsername: findUserByUsername,

        //user update it's profile
        updateUserById : updateUserById
    };
    return api;

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }


    function findAllUsers() {
        return UserModel.find();
    }

    function updateUser(userId, user) {
        delete user._id;
        return UserModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function updateUserById(userId, newUser) {
        //return userModel.update({_id: userId}, {$set: newUser});


        delete newUser._id;

        var deferred = q.defer();
        UserModel.update({_id: userId}, {$set: newUser}, function(err, user) {
            if(err){
                deferred.reject(err);
            }else{
                UserModel.find({_id: userId},function(err, user){
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

    // add movie to user likes
    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (movie.imdbID);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    // use user model find by id
    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }
}