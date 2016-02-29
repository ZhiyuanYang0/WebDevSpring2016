(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();