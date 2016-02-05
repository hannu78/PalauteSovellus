var main_module = angular.module('main_module', ['ngRoute', 'ngResource', 'flash']);

main_module.config(function ($routeProvider) {
    $routeProvider.when ('/', {
        templateUrl: 'partial_userview.html',
        controller: 'userDataController'
    }).when ('/function', {
        templateUrl: 'partial_functionview.html'
    })
});