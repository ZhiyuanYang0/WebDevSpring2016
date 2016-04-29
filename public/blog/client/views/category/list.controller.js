(function(){
    angular
        .module("BlogApp")
        .controller("CategoryListController", categoryListController);

    function categoryListController($scope,
                                    ArticleService,
                                    $location,
                                    $routeParams,
                                    $sce,
                                    UserService) {
        $scope.category = $routeParams.category;
        $scope.isAuthor = isAuthor;
        $scope.currentUser = UserService.getCurrentUser();
        //$scope.findAuthor = findAuthor;

        function init() {
            ArticleService
                .findCategoryArticles($scope.category)
                .then(function(response) {
                    //console.log(response.data);
                    $scope.articles = response.data.reverse();
                })
        }
        init();

        function isAuthor(article) {
            if (!$scope.currentUser || article.authorId != $scope.currentUser._id) {
                return false;
            } else {
                return true;
            }
        }

        //function findAuthor(article) {
        //    var username;
        //    UserService
        //        .findUserById(article.authorId)
        //        .then(function(response) {
        //            username = response.data;
        //            console.log(username);
        //        })
        //
        //    return username;
        //}

    }

})();
