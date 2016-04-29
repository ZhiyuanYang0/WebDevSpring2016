(function(){
    angular
        .module("BlogApp")
        .controller("ArticleController", articleController);

    function articleController($scope, ArticleService, $location, $routeParams, $sce,
                               OmdbService, UserService){
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

                    if($scope.article.movieId) {
                        OmdbService
                            .findMovieByImdbID($scope.article.movieId)
                            .then(function (response) {
                                $scope.data = response.data;
                            });
                    }

                    UserService
                        .findUserById($scope.article.authorId)
                        .then(function(response) {
                            $scope.author = response.data;

                            console.log($scope.author.username);

                            ArticleService
                                .findUserArticlesNumber($scope.author._id)
                                .then(function(response){
                                    $scope.number = response.data.length;
                                })
                        })
                })

        }
        init();

        function deleteArticle(article) {
            ArticleService
                .deleteArticle(article)
                .then(function(response) {
                    $location.url("/article");
                    $scope.message = "Successfully delete the article.";
                })


        }

    }

})();
