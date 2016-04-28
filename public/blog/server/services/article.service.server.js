module.exports = function(app, articleModel, userModel, categoryModel) {
    app.post  ('/api/createArticle', createArticle);
    app.delete ('/api/article/:articleId', deleteArticle);
    app.get ('/api/article', findAllArticles);
    app.get ('/api/article/:articleId', findArticleById);

    //Category related services
    app.get('/api/category', findAllCategories);
    app.post ('/api/createCategory', createCategory);

    function deleteArticle(req, res) {
        console.log("I am at delete article server side.");
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
        console.log("I am at createArticle server side.");
        console.log(article);
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
        console.log("I am at createCategory server side.");
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