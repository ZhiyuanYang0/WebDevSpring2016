module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        "username" : String,
        "password": String,
        "firstName" : String,
        "lastName" : String,
        "emails" : [String],
        "phones" : [String],
        roles: [String]
    }, {collection: "user"});

    return UserSchema;
};