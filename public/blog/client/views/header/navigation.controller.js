(function(){
    angular
        .module("BlogApp")
        .controller("NavigationController", navigationController);

    function navigationController($scope, $location, UserService, ArticleService) {
        var vm = this;
        $scope.subjects = ["good", "apple"];

        vm.logout = logout;

        function init() {
            vm.$location = $location;

            ArticleService
                .findAllCategories()
                .then(function(response) {
                    vm.categories = response.data;
                })

        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();