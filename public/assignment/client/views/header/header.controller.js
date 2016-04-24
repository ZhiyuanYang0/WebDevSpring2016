(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        //$scope.logout = logout;
        //
        //function logout() {
        //    UserService.setCurrentUser(null);
        //    $location.url('/home');
        //}

        $scope.logout = logout;

        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response){
                        UserService.setCurrentUser(null);
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();