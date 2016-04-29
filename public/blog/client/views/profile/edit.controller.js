(function () {
    "use strict";
    angular
        .module("BlogApp")
        .controller("ProfileEditController", profileEditController)

    function profileEditController($scope, $location, UserService) {

        $scope.updateUser = updateUser;
        $scope.message = null;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    $scope.currentUser = response.data;
                });

            if (!$scope.currentUser) {
                $location.url("/home");
            }
            //console.log("Current user is:");
            //console.log($scope.currentUser);
            //console.log($scope.currentUser.username);
        }

        init();

        function updateUser(user) {

            UserService
                .updateUserProfile(user)
                .then(function(response) {
                    if(response.data) {
                        UserService.setCurrentUser(response.data[0]);
                        $scope.currentUser = UserService.getCurrentUser();
                        $scope.message = "Successfully update the profile";
                        $location.url("/updateprofile");
                        console.log(response.data);
                        init();
                    }
                });
        }
    }
})();