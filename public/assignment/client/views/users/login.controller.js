(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, $rootScope, UserService) {
        //$scope.login = login;
        //
        //function login(user) {
        //    if(user) {
        //        UserService
        //            .findUserByCredentials(user.username, user.password)
        //            .then(function(response){
        //               if(response.data) {
        //                   //console.log(response.data);
        //                   UserService
        //                       .setCurrentUser(response.data);
        //                   //console.log("CurrentUser is");
        //                   //console.log(UserService.getCurrentUser());
        //                   $location.url("/profile");
        //               }
        //            });
        //    }
        //}

        $scope.login = login;
        $scope.error = null;
        $scope.message = null;

        function login(user)
        {
            if(user)
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {
                            if (response.data) {
                                $rootScope.currentUser = response.data;
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            $scope.error = "There is no such username and password pair.";
                        }
                    );
        }
    }
})();