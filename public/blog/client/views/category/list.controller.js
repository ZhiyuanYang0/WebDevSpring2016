(function(){
    angular
        .module("BlogApp")
        .controller("CategoryListController", categoryListController);

    function categoryListController($scope,
                                    ArticleService,
                                    $location,
                                    $routeParams,
                                    $sce) {
        $scope.category = $routeParams.category;

        function init() {
            ArticleService
                .findCategoryArticles($scope.category)
                .then(function(response) {
                    console.log(response.data);
                    $scope.articles = response.data;
                })
        }
        init();
    }

})();
