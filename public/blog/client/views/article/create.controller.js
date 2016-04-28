(function(){
    angular
        .module("BlogApp")
        .controller("CreateController", createController);

    function createController($scope,
                            UserService,
                            $location,
                            ArticleService){

        $scope.createArticle = createArticle;
        $scope.addCategory = addCategory;
        $scope.clearCategories = clearCategories;
        $scope.topics = [];

        function init(){
            $scope.message = null;
            $scope.error = null;

            ArticleService
                .findAllCategories()
                .then(function(response) {
                    $scope.categories = response.data;
                    console.log(response.data);
                })
        }
        init();

        function createArticle(article) {
            console.log(article);

            if (!article || !article.title) {
                $scope.error = "Please enter the title of the article.";
            } else if (article.title.length > 150) {
                $scope.error = "The title is too long.";
            } else if (article.body.length < 1) {
                $scope.error = "The article is too short.";
            } else {
                ArticleService
                    .createArticle(article)
                    .then(function(response) {
                        console.log(response.data);
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
