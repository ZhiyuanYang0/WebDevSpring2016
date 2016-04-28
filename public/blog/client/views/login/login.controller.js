
(function(){
    angular
        .module("BlogApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }

            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    } else {
                        vm.error = "There is no such username and password pair.";
                    }
                });
        }
    }
})();