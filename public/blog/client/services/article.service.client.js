(function(){
    angular
        .module("BlogApp")
        .factory("ArticleService", articleService);

    function articleService($http) {
        var api = {
            createArticle: createArticle,
            updateArticle: updateArticle,
            findAllArticles: findAllArticles,
            findArticleById: findArticleById,

            //categories related api
            findAllCategories: findAllCategories,
            createCategory: createCategory
        };
        return api;

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
    }
})();