(function(){
    angular
        .module("BlogApp")
        .controller("CategoryController", categoryController);

    function categoryController($scope, ArticleService, $location){

        function init(){
            ArticleService
                .findAllCategories()
                .then(function(response) {
                    $scope.categories = response.data;
                })
        }
        init();
    }

})();
