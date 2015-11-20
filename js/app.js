$(function(){
	disablePreload('#overall-preloader');
});
$('#overall-preloader').hide();
var rootRef = new Firebase('https://viemhonghat.firebaseio.com');
var app = angular.module('vhh', ['ui.router','ngCookies']);
var config = {
	devStatus: true,
	systemTimeZoneOffset: 7
};
app.config(function($stateProvider, $urlRouterProvider) { //Router config
	$urlRouterProvider.otherwise('/trang-chu');
	$stateProvider
	.state('home', {
		url: '/trang-chu',
		templateUrl: 'template/home.html' 
	})
	.state('login', {
		url: '/dang-nhap',
		templateUrl: 'template/login.html'
	})
	.state('logout', {
		url: '/dang-xuat',
		controller: 'logoutCtrl'
	})
	.state('forgotPassword', {
		url: '/quen-mat-khau',
		templateUrl: 'template/forgotPassword.html'
	});
});
app.controller('loginCtrl',function($scope, $state, $cookies, $location){
	log("\n===================Login State======================");
	
	$scope.paAuth = function(valid){
		if (valid) {
			log("Signing in with account: "+$scope.email+", "+$scope.password);
			nlog("Đang kiểm tra thông tin...");
			rootRef.authWithPassword({
				email    : $scope.email,
				password : $scope.password
			}, function(error, authData) {
				if (error) {
					log("Login Failed!\n"+ error);
					nlog("Đăng nhập thất bại.");
				} else {
					log("Logged in as: "+ authData.uid);
					sucessfulLogin();
				}
			});
		}else{
			log("Form is invalid!")
		};
		
	}
	$scope.OAuth = function(provider) {
		nlog("Đang đợi phản hồi...");
		rootRef.authWithOAuthPopup(provider, function(error, authData) {
			if (error) {
				nlog("Đăng nhập thất bại.");
				if (error.code === "TRANSPORT_UNAVAILABLE") {
					log(error);
					// rootRef.authWithOAuthRedirect(provider, function(error) { /* ... */ });
				}
			} else if (authData) {
				log("Logged in as: "+ authData.uid);
				sucessfulLogin();
			}
		});
	};
	function sucessfulLogin () {
		nlog("Đăng nhập thành công.");
		log("Go to \""+$cookies.lastState+"\" state >>>");
		var lastState =  $cookies.lastState || 'home';
		$state.go(lastState);
	}
});
app.controller('logoutCtrl',function($scope, $state, $cookies, $location){
	rootRef.unauth();
	log("\n===================Logout State======================");
	log("Loging out and go to Login State >>>");
	nlog("Đăng xuất...");
	$state.go('login');
});
app.controller('forgotPasswordCtrl',function($scope, $state, $cookies, $location){
	log("\n===================Forgot password State======================");
	$scope.sendEmail = function (valid) {
		if (valid) {
			log("Send password recovery email to "+$scope.email);
			log("Go to Login State >>>");
			$state.go('login');
		};
	}
});
app.controller('homeCtrl',function($scope,$state,$cookies,$location){
	ctrlInit($scope,$state,$cookies,$location);
	

});


function log(obj){if(config.devStatus){console.log(obj)}}
function nlog(message){
	$('<div class="nlm" hidden>'+message+'</div>').appendTo('.nlog').fadeIn(100).delay(3000).fadeOut(500).queue(function(){$(this).remove();});
}
function disablePreload(selection){$(selection).hide()}

function ctrlInit ($scope,$state,$cookies,$location) {
	log("\n==================="+$state.current.name+" state=======================");
	$cookies.lastState = $state.current.name;
	rootRef.onAuth(authDataCallback);
	rootRef.offAuth(authDataCallback);
	function authDataCallback(authData) {
		if (authData) {
			log("User " + authData.uid + " is logged in with " + authData.provider);
		} else {
			log("User is logged out. Need for login!\nGo to \"login\" state >>>");
			$state.go('login');
		}
	}
}