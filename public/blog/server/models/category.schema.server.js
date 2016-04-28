module.exports = function(mongoose) {

    var CategorySchema = new mongoose.Schema({
        category: String,
        articles: [String],
        admins: [String]
    }, {collection: 'blog.category'});
    return CategorySchema;
};