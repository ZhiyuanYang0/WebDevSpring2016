module.exports = function(db, mongoose) {

    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var CommentModel = mongoose.model('Comment', CommentSchema);



};