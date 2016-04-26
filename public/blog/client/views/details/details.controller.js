(function(){
    angular
        .module("BlogApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               OmdbService,
                               $rootScope,
                               $location,
                               MovieService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                MovieService
                    .setUserLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }

    }
})();