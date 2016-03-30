module.exports = function(app, userModel) {

    //create RESTful api
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', login);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUserById);
    app.delete('api/assignment/user/:id', deleteUserById);

    function createUser(req, res) {
        console.log("I am at server side.")
        var user = req.body;
        user = userModel.createUser(user);
        res.json(user);
    }

    function login(req, res) {
        console.log("I am at log.")
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null)
        {
            var credentials = {
                username: username,
                password: password};
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        user = userModel.updateUser(userId, user);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

}