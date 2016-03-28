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
        $scope.error = null;
        $scope.message = null;

        if (!$scope.user) {
            $location.url("/home");
        }

        function update(profile) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            UserService.updateUser($scope.user._id, profile, function(user) {
                if (user) {
                    $scope.message = "User updated successfully";
                    $rootScope.user = user;
                } else {
                    $scope.message = "Unable to update the user";
                }

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