(function(){
    angular
        .module("BlogApp")
        .controller("SearchController", searchController);

    function searchController() {
        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(movie) {
            console.log(movie);
        }
    }
})();