(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($scope, $location, UserService) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.updateUser = updateUser;
        $scope.message = null;

        if(!$scope.currentUser) {
            $location.url("/home");
        }

        function updateUser(user) {

            UserService
                .updateUser(user)
                .then(function(response) {
                   if(response.data) {
                       UserService.setCurrentUser(response.data);
                       $scope.currentUser = UserService.getCurrentUser();
                       $scope.message = "Successfully update the profile";
                       console.log($scope.currentUser);
                       $location.url("/profile");
                   }
                });
        }
    }
})();