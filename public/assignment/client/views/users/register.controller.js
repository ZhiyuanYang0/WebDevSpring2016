(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        //$scope.register = register;
        //$scope.error = null;
        //
        //function register(user) {
        //    $scope.message = null;
        //    if (user != null && user.username != null && user.password != null
        //          && user.password2 != null && user.password2 == user.password
        //          && user.email != null) {
        //        var emails = [];
        //        emails.push(user.email);
        //        user.emails = emails;
        //
        //        UserService
        //            .createUser(user)
        //            .then(function(response) {
        //                if (response.data) {
        //                    UserService.setCurrentUser(response.data);
        //                    $location.url("/profile");
        //                } else {
        //                    $scope.error = "The user already exist. Please log in.";
        //                }
        //            });
        //    } else {
        //        $scope.error = "Please fill all the fileds and provides a match password."
        //    }
        //}

        $scope.register = register;
        $scope.error = null;

        function register(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $scope.error = "Your passwords don't match";
            }
            else
            {
                UserService
                    .register(user)
                    .then(
                        function(response) {

                            var user = response.data;
                            if(user != null) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            } else {
                                $scope.error = "The user is already exist.";
                            }
                        },
                        function(err) {
                            //$scope.error = err;
                        }
                    );
            }
        }
    }
})();