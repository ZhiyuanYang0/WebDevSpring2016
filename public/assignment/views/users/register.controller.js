(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.register = register;

        function register() {
            UserService.createUser($scope.userRegister, function(user) {
                $rootScope.user = user;
                $location.url("/profile");
                console.log("new user: " + user);
            });
        }
    }
})();