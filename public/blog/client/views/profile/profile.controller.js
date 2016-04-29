(function(){
    angular
        .module("BlogApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $routeParams, ArticleService) {

        var vm = this;
        vm.articles = [];
        vm.findArticlesForUser = findArticlesForUser;
        vm.deleteArticle = deleteArticle;

        var userId = $routeParams.userId;

        function init() {

            UserService
                .getDetails(userId)
                .then(function(response) {
                    vm.profile = response.data;
                    //console.log(vm.profile);
                })

            findArticlesForUser(userId);

            UserService
                .findUserById(userId)
                .then(function(response) {
                    vm.user = response.data;
                })

        }
        init();

        function findArticlesForUser(userId) {
            ArticleService
                .findArticlesForUser(userId)
                .then(function(response) {
                    console.log(response.data);
                    vm.articles = response.data;
                })
        }

        function deleteArticle(article) {
            ArticleService
                .deleteArticle(article)
                .then(function(response) {
                    console.log(response);
                    init();
                })
        }
    }
})();