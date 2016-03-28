(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope, $location) {
            $scope.isUser = isUser;
            $scope.isAdmin = isAdmin;
            $scope.logout = logout;

            function isUser() {
                return $rootScope.user;
            }

            function isAdmin() {
                if(!$rootScope.user) {
                    return false;
                } else if($rootScope.user.roles.indexOf("admin") == -1) {
                    return false;
                } else {
                    return true;
                }
            }

            function logout() {
                $rootScope.user = null;
                $scope.user = null;
                $location.url('home');
            }
    }
})();