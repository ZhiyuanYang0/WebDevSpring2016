(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.register = register;
        $scope.message = null;

        function register(user) {
            $scope.message = null;
            if (user != null && user.username != null && user.password != null
                  && user.password2 != null && user.password2 == user.password
                  && user.email != null) {
                var emails = [];
                emails.push(user.email);
                user.emails = emails;

                UserService
                    .createUser(user)
                    .then(function(response) {
                       UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    });
            } else {
                $scope.message = "Please fill all the fileds and provides a match password."
            }
        }
    }
})();