module.exports = function(app) {

    //models
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);

    //services
    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
}