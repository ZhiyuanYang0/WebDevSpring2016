(function() {
    angular
        .module("MovieApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "searchController"
            })
            .when("/search/:title", {
                templateUrl: "search/search.view.html",
                controller: "searchController"
            })
            .when("/detail/:imdbID", {
                templateUrl: "search/detail.view.html",
                controller:"DetailController"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();