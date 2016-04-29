(function(){
    angular
        .module("BlogApp")
        .controller("MovieReviewController", movieReviewController);

    function movieReviewController($routeParams,
                                   OmdbService,
                                   $rootScope,
                                   $location,
                                   $scope,
                                   ArticleService,
                                   UserService) {

        var imdbId = $routeParams.imdbId;
        var currentUser = UserService.getCurrentUser();
        $scope.createArticle = createArticle;
        $scope.addCategory = addCategory;
        $scope.clearCategories = clearCategories;
        $scope.topics = [];

        function init() {
            if (!currentUser) {
                $location.url("/login");
                return;
            }
            $scope.message = null;
            $scope.error = null;

            ArticleService
                .findAllCategories()
                .then(function(response) {
                    $scope.categories = response.data;
                })

            OmdbService
                .findMovieByImdbID (imdbId)
                .then(function(response){
                    $scope.data = response.data;
                    console.log(response.data);
                });

        }
        init();

        function createArticle(article) {
            article.categories = $scope.topics;

            if (!article || !article.title) {
                $scope.error = "Please enter the title of the article.";
            } else if (article.title.length > 150) {
                $scope.error = "The title is too long.";
            } else if (article.body.length < 1) {
                $scope.error = "The article is too short.";
            } else {
                article.authorId = UserService.getCurrentUser()._id;
                article.movieId = imdbId;

                ArticleService
                    .createArticle(article)
                    .then(function(response) {
                        $scope.message = "Successfully update the article.";
                    })
            }
        }

        function addCategory(category) {
            if ($scope.topics.indexOf(category) == -1) {
                $scope.topics.push(category);
            }
        }

        function clearCategories() {
            $scope.topics = [];
        }

    }
})();