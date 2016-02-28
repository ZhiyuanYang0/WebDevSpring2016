var app = angular.module("HelloWorldApp", []);

app.controller("HelloWorldController", TheController);

function TheController($scope){

    $scope.hello = "Hello World from AngularJS";

}