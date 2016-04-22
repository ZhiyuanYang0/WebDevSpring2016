module.exports = function(app, userModel) {

    //create RESTful api
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', login);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUserById);
    app.delete('api/assignment/user/:id', deleteUserById);

    function createUser(req, res) {
        //console.log("I am at createUser server side.")
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                    req.login(user, function (err, doc) {
                        //console.log(doc)
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credential = {
            username:username,
            password:password
        };
        userModel
            .findUserByCredentials(credential)
            .then(function(user){
                res.json(user);
            }),
            function (err) {
                res.status(400).send(err);
            }
        ;
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel
            .updateUser(id, user)
            .then(
                function(updatedUser){
                res.json(updatedUser);
            },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel
            .remove(userId)
            .then(
                function(users){
                res.json(users);
            },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}