module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/blog/login", login);
    app.get("/api/project/blog/loggedin", loggedin);
    app.post("/api/project/blog/logout", logout);
    app.post("/api/project/blog/register", register);
    app.get("/api/project/blog/profile/:userId", profile);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                    // fetch movies this user likes
                    return movieModel.findMoviesByImdbIDs(doc.likes);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function (movies) {

                    // list of movies this user likes
                    // movies are not stored in database
                    // only added for UI rendering
                    user.likesMovies = movies;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res) {
        var user = req.body;

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}