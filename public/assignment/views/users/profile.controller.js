(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.user = $rootScope.user;
        $scope.getUserName = getUserName;
        $scope.getFirstName = getFirstName;
        $scope.getLastName = getLastName;
        $scope.getEmail = getEmail;
        $scope.update = update;
        $scope.profile = {};

        function update(profile) {
            console.log("profile: ");
            console.log(profile);
            UserService.updateUser($scope.user._id, profile, function(user) {
                $rootScope.user = user;

            })
        }

        function getUserName() {
            return $scope.user.username;
        }

        function getFirstName() {
            return $scope.user.firstName;
        }

        function getLastName() {
            return $scope.user.lastName;
        }

        function getEmail() {
            return $scope.user.email;
        }

    }
})();