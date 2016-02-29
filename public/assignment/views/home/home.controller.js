(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope) {
        $scope.user = $rootScope.user;
    }
})();