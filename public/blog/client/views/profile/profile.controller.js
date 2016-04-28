(function(){
    angular
        .module("BlogApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $routeParams) {
        var vm = this;

        var userId = $routeParams.userId;

        function init() {

            UserService
                .getDetails(userId)
                .then(function(response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                })

            //UserService
            //    .getProfile()
            //    .then(function (response) {
            //        vm.profile = response.data;
            //        console.log(vm.profile);
            //    });
        }
        return init();
    }
})();