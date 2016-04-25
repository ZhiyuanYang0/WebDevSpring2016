(function(){
    angular
        .module("BlogApp")
        .controller("NavigationController", navigationController);

    function navigationController($location, UserService) {
        var vm = this;

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