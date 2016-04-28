(function(){
    angular
        .module("BlogApp")
        .controller("ArticleController", articleController);

    function articleController($scope, ArticleService, $location, $routeParams){
        var articleId = $routeParams.articleId;
        $scope.articleId = articleId;

        function init(){
            ArticleService
                .findArticleById(articleId)
                .then(function(response) {
                    $scope.article = response.data;
                    console.log($scope.article.title);
                })
        }
        init();

    }

})();
