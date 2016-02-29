(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($scope, $location, $rootScope, UserService) {
            $scope.update = update;

            function update() {
                UserService.updateUser($rootScope.user._id, $scope.userProfile, function(user) {
                    $rootScope.user = user;
                    $location.url("/profile");
                    console.log($scope.userProfile);
                })
            }

    }
})();