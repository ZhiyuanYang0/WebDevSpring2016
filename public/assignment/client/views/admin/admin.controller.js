(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, UserService, $location) {
        $scope.currentUser = UserService.getCurrentUser();

        function init() {
            if (!$scope.currentUser) {
                $location.url("/home");
            }
        }

        init();
    }
})();