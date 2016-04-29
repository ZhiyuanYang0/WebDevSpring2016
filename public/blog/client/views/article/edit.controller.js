(function(){
    angular
        .module("BlogApp")
        .controller("EditController", editController);

    function editController($scope,
                              UserService,
                              $location,
                              ArticleService,
                              $routeParams){

        $scope.createArticle = createArticle;
        $scope.addCategory = addCategory;
        $scope.clearCategories = clearCategories;
        $scope.topics = [];

        function init(){
            var currentUser = UserService.getCurrentUser();
            if (!currentUser) {
                $location.url("#login");
            }
            $scope.message = null;
            $scope.error = null;

            ArticleService
                .findAllCategories()
                .then(function(response) {
                    $scope.categories = response.data;
                })
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
