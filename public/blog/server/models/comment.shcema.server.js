module.exports = function(mongoose) {

    var CommentSchema = new mongoose.Schema({
        author: String,
        article: mongoose.Schema.Types.ObjectId,
        createTime: {type: Date, default: Date.now},
        updateTime: {type: Date, default: Date.now},
        body : String
    }, {collection: "blog.comment"});
    return CommentSchema;
}