(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(user) {
            if(user) {
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function(response){
                       if(response.data) {
                           //console.log(response.data);
                           UserService
                               .setCurrentUser(response.data);
                           //console.log("CurrentUser is");
                           //console.log(UserService.getCurrentUser());
                           $location.url("/profile");
                       }
                    });
            }
        }
    }
})();