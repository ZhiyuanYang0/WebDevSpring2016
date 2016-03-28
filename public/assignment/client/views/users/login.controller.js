(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.userLogin.username, $scope.userLogin.password, function(user) {
                $rootScope.user = user;
                $location.url("/profile");
                console.log(user);
            })
        }
    }
})();