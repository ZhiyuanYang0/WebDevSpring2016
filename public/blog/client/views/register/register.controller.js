(function(){
    angular
        .module("BlogApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {
            vm.message = null;
            vm.error = null;
        }
        init();

        function register(user) {

            if (!user || !user.username) {
                vm.error = "Please enter the username.";
                return;
            } else if (!user.password) {
                vm.error = "Please enter the password.";
                return;
            } else if (!user.password2 || user.password != user.password2) {
                vm.error = "The password doesn't match."
                return;
            }

            if (!user.email) {
                user.email = "zhiyuanyang0@gmail.com";
            }

            UserService
                .register(user)
                .then(
                    function(response) {

                        var user = response.data;
                        if(user != null) {
                            console.log("Register user is:");
                            console.log(user);
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        } else {
                            $scope.error = "The user is already exist.";
                        }
                    },
                    function(err) {
                        //$scope.error = err;
                    }
                );
        }
    }
})();