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
    }

})();
