(function(){
    angular
        .module("BlogApp")
        .controller("CategoryController", categoryController);

    function categoryController($scope, ArticleService, $location){
        var numbers = [];

        function init(){
            ArticleService
                .findAllCategories()
                .then(function(response) {
                    $scope.categories = response.data;

                    for (var i = 0; i < $scope.categories.length; i++) {
                       // console.log($scope.categories[i]);
                        ArticleService
                            .findCategoryArticles($scope.categories[i].category)
                            .then(function(response) {
                                //console.log(response.data.length);

                            })
                    }

                })
        }
        init();
    }

})();
