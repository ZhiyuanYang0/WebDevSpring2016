module.exports = function(db, mongoose) {

    var ArticleSchema = require("./article.schema.server.js")(mongoose);
    var ArticleModel = mongoose.model('Article', ArticleSchema);

    var api = {
        createArticle: createArticle,
        findAllArticles: findAllArticles,
        findArticleById: findArticleById
    }
    return api;

    function createArticle(article) {
        return ArticleModel.create(article);
    }

    function findAllArticles() {
        return ArticleModel.find();
    }

    function findArticleById(articleId) {
        return ArticleModel.findOne({_id: articleId});
    }
};