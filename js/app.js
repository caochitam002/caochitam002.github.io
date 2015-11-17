var app = angular.module('vhh', ['ui.router']);
var templates = {};
templates.login = '';
app.config(function($stateProvider, $urlRouterProvider) { //Router config
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'template/home.html' 
    })
    .state('login', {
        url: '/login',
        templateUrl: 'template/login.html'
    });
});
        //app.controller('loginCtrl',function($scope){});
        //app.controller('indexCtrl',function($scope){});