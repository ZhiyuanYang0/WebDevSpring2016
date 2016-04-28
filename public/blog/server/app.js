// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var movieModel   = require("./models/movie.model.server.js")(db, mongoose);
    var articleModel = require("./models/article.model.server.js")(db, mongoose);
    var categoryModel = require("./models/category.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, movieModel, userModel);
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel);
    var articleService = require("./services/article.service.server.js")(app, articleModel, userModel, categoryModel);
}