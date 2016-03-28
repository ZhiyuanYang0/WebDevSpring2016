module.exports = function(app) {

    //models
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);
}