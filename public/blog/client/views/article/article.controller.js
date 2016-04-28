(function(){
    angular
        .module("BlogApp")
        .controller("ArticleController", articleController);

    function articleController($scope, ArticleService, $location, $routeParams){
        var articleId = $routeParams.articleId;
        $scope.articleId = articleId;
        $scope.deleteArticle = deleteArticle;

        function init(){
            ArticleService
                .findArticleById(articleId)
                .then(function(response) {
                    $scope.article = response.data;
                    console.log($scope.article.title);
                })
        }
        init();

        function deleteArticle(article) {
            console.log(article);
            ArticleService
                .deleteArticle(article)
                .then(function(response) {
                    $location.url("/article");
                    $scope.message = "Successfully delete the article.";
                })
        }

    }

})();
