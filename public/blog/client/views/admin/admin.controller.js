(function () {
    "use strict";
    angular
        .module("BlogApp")
        .controller("AdminController", AdminController)

    function AdminController($location, $scope, UserService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        $scope.sortType     = 'user.username';
        $scope.sortReverse  = false;

        function init() {
            $scope.error = null;
            $scope.message = null;
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            var currentUser = UserService.getCurrentUser();
            if (currentUser._id === user._id) {
                init();
                $scope.error = "You cannot delete yourself.";
                return;
            }

            UserService
                .deleteUser(user._id)
                .then(function(response) {
                    init();
                    $scope.message = "Successfully delete user.";
                });
        }

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(function(response) {
                    init();
                    $scope.message = "Successfully update user.";
                });
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(function(response) {
                    init();
                    $scope.message = "Successfully add user.";
                });
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();