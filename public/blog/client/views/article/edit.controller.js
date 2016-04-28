(function(){
    angular
        .module("BlogApp")
        .controller("EditController", editController);

    function editController($scope,
                            UserService,
                            $location,
                            $routeParams,
                            ArticleService){

        var articleId = $routeParams.articleId;
        $scope.articleId = articleId;
        $scope.updateArticle = updateArticle;

        function init(){
            console.log(articleId);
            $scope.message = null;
            $scope.error = null;
        }
        init();

        function updateArticle(article) {
            console.log(article);

            if (!article.title) {
                $scope.error = "Please enter the title of the article.";
            } else if (article.title.length > 150) {
                $scope.error = "The title is too long.";
            } else if (article.body.length < 80) {
                $scope.error = "The article is too short.";
            } else {
                ArticleService
                    .updateArticle(articleId, article)
                    .then(function(response) {
                        init();
                        $scope.message = "Successfully update the article.";
                    })
            }
        }
    }

})();
