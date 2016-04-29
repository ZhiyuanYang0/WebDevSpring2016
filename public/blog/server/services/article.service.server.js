module.exports = function(app, articleModel, userModel, categoryModel) {
    app.post  ('/api/createArticle', createArticle);
    app.delete ('/api/article/:articleId', deleteArticle);
    app.get ('/api/article', findAllArticles);
    app.get ('/api/article/:articleId', findArticleById);

    //Category related services
    app.get('/api/category', findAllCategories);
    app.post ('/api/createCategory', createCategory);

    //User related services
    app.get('/api/user/:userId/article', findArticlesForUser);

    function findArticlesForUser(req, res) {
        console.log("I am at find articles for user server side.");
        var userId = req.params.userId;
        articleModel
            .findArticlesForUser(userId)
            .then(function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            })
    }

    function deleteArticle(req, res) {
        var articleId = req.params.articleId;
        articleModel
            .deleteArticleById(articleId)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function createArticle(req, res) {
        var article = req.body;
        articleModel
            .createArticle(article)
            .then(
                function(newArticle) {
                    res.json(newArticle);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function createCategory(req, res) {
        var category = req.body;
        categoryModel
            .createCategory(category)
            .then(
                function(newCategory) {
                    res.json(newCategory);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllArticles(req, res) {
        articleModel
            .findAllArticles()
            .then(
                function (articles) {
                    res.json(articles);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findArticleById(req, res) {
        var articleId = req.params.articleId;
        articleModel
            .findArticleById(articleId)
            .then(function(doc) {
                res.json(doc);
            },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllCategories(req, res) {
        categoryModel
            .findAllCategories()
            .then(function (categories) {
                res.json(categories);
            },
            function(err){
                res.status(400).send(err);
            })
    }

}