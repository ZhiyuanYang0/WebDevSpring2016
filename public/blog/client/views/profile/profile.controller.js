(function(){
    angular
        .module("BlogApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location) {
        var vm = this;

        function init() {

        }
        return init();
    }
})();