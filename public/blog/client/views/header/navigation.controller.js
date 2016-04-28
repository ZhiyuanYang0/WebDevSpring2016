(function(){
    angular
        .module("BlogApp")
        .controller("NavigationController", navigationController);

    function navigationController($scope, $location, UserService) {
        var vm = this;
        $scope.subjects = ["good", "apple"];

        vm.logout = logout;

        function init() {
            vm.$location = $location;
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