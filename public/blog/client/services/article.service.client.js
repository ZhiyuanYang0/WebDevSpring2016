(function(){
    angular
        .module("BlogApp")
        .factory("ArticleService", articleService);

    function articleService($http) {
        var api = {
            createArticle: createArticle,
            updateArticle: updateArticle,
            deleteArticle: deleteArticle,
            findAllArticles: findAllArticles,
            findArticleById: findArticleById,

            //categories related api
            findAllCategories: findAllCategories,
            createCategory: createCategory,
            findCategoryArticles: findCategoryArticles,

            //user related api
            findArticlesForUser: findArticlesForUser,
            findUserArticlesNumber: findUserArticlesNumber
        };
        return api;

        function findUserArticlesNumber(userId) {
            return $http.get('/api/user/'+userId+'/article/num');
        }

        function findCategoryArticles(category) {
            return $http.get('/api/category/'+category)
        }

        function createArticle(article) {
            console.log("I am at create article client service.");
            return $http.post('/api/createArticle', article);
        }

        function updateArticle(articleId, article) {
            return $http.put('/api/article/'+articleId, article);
        }

        function findAllArticles() {
            return $http.get('/api/article');
        }

        function findArticleById(articleId) {
            return $http.get('/api/article/'+articleId);
        }

        function findAllCategories() {
            return $http.get('/api/category');
        }

        function createCategory(category) {
            console.log("I am at create category client side.");
            return $http.post('/api/createCategory', category);
        }

        function deleteArticle(article) {
            return $http.delete('/api/article/'+article._id);
        }

        function findArticlesForUser(userId) {
            return $http.get('/api/user/'+userId+'/article');
        }
    }
})();