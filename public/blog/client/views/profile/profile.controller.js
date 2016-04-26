(function(){
    angular
        .module("BlogApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location) {
        var vm = this;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();
    }
})();