(function(){
    angular
        .module("BlogApp")
        .controller("ArticleController", articleController);

    function articleController($scope, ArticleService, $location, $routeParams, $sce,
                               OmdbService){
        var articleId = $routeParams.articleId;
        $scope.articleId = articleId;
        $scope.deleteArticle = deleteArticle;

        function init(){
            ArticleService
                .findArticleById(articleId)
                .then(function(response) {
                    $scope.article = response.data;
                    var content = $scope.article.body;
                    $scope.content  = $sce.trustAsHtml(content);
                    console.log($scope.article.title);

                    if($scope.article.movieId) {
                        OmdbService
                            .findMovieByImdbID($scope.article.movieId)
                            .then(function (response) {
                                $scope.data = response.data;
                                console.log(response.data);
                            });
                    }
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
