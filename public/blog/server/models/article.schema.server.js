module.exports = function(mongoose) {

    var ArticleSchema = new mongoose.Schema({
        author: String,
        createTime: {type: Date, default: Date.now},
        updateTime: {type: Date, default: Date.now},
        title: String,
        body: String,
        comments: [mongoose.Schema.Types.ObjectId],
        categories: [String],
        movieId: String,
        bookId: String
    }, {collection: 'blog.article'});
    return ArticleSchema;
};