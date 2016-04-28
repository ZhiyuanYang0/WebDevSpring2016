(function(){
    angular
        .module("BlogApp")
        .controller("ListController", listController);

    function listController($scope, ArticleService, $location){

        function init(){
            ArticleService
                .findAllArticles()
                .then(function(response) {
                    $scope.articles = response.data;
                })
        }
        init();
    }

})();
