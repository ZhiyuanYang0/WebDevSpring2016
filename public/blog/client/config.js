(function(){
    angular
        .module("BlogApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/profile/:userId", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/updateprofile", {
                templateUrl: "views/profile/edit.view.html",
                controller: "ProfileEditController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/details/:imdbID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/article", {
                templateUrl: "views/article/list.view.html",
                controller: "ListController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/createArticle", {
                templateUrl: "views/article/create.view.html",
                controller: "CreateController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/article/:articleId", {
                templateUrl: "views/article/article.view.html",
                controller: "ArticleController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/article/:articleId/edit", {
                templateUrl: "views/article/edit.view.html",
                controller: "EditController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/list/:page", {
                templateUrl: "views/article/list.view.html",
                controller: "ListController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/category", {
                templateUrl: "views/category/category.view.html",
                controller: "CategoryController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/category/:category", {
                templateUrl: "views/category/list.view.html",
                controller: "CategoryListController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/createCategory", {
                templateUrl: "views/category/edit.view.html",
                controller: "EditCategoryController",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/moviereview/:imdbId", {
                templateUrl: "views/movie/review.view.html",
                controller: "MovieReviewController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/about", {
                templateUrl: "views/footer/about.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();