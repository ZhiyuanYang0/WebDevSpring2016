(function(){
    angular
        .module("BlogApp")
        .controller("EditCategoryController", editCategoryController);

    function editCategoryController($scope, ArticleService, $location, $routeParams){

        var topic = $routeParams.topic;
        $scope.topic = topic;

        $scope.createCategory = createCategory;

        function init(){
            $scope.message = null;
            $scope.error = null;
        }
        init();

        function createCategory(category) {
            console.log(category);

            if (!category) {
                $scope.error = "Please enter the new category.";
            } else if (category.length > 20) {
                $scope.error = "The category is too long.";
            } else if (category.length < 2) {
                $scope.error = "The category is too short.";
            } else {
                var newCategory = {"category" : category};
                console.log(newCategory);
                ArticleService
                    .createCategory(newCategory)
                    .then(function(response) {
                        console.log(response.data);
                        $scope.message = "Successfully add a new category.";
                    })
            }

        }
    }

})();
