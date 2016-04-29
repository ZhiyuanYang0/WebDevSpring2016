module.exports = function(db, mongoose) {

    var ArticleSchema = require("./article.schema.server.js")(mongoose);
    var ArticleModel = mongoose.model('Article', ArticleSchema);

    var api = {
        createArticle: createArticle,
        deleteArticleById: deleteArticleById,
        findAllArticles: findAllArticles,
        findArticleById: findArticleById,
        findArticlesForUser: findArticlesForUser,
        findCategoryArticles: findCategoryArticles
    }
    return api;

    function findCategoryArticles(category) {
        return ArticleModel.find({categories: category})
    }

    function findArticlesForUser(userId) {
        return ArticleModel.find({authorId: userId});
    }

    function createArticle(article) {
        return ArticleModel.create(article);
    }

    function deleteArticleById(articleId) {
        return ArticleModel.remove({_id: articleId});
    }

    function findAllArticles() {
        return ArticleModel.find();
    }

    function findArticleById(articleId) {
        return ArticleModel.findOne({_id: articleId});
    }
};