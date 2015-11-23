
$('#overall-preloader').hide();
var rootRef = new Firebase('https://viemhonghat.firebaseio.com');
var app = angular.module('vhh', ['ui.router','ngCookies']);
var config = {
	devStatus: true,
	systemTimeZoneOffset: 7
};
var patients;
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
	})
	.state('user', {
		url: '/nguoi-dung',
		templateUrl: 'template/user.html'
	});
});
app.controller('loginCtrl',function($scope, $state, $cookies){
	log("\n===================Login State======================");
	disablePreload('#overall-preloader');
	$scope.paAuth = function(valid){
		if (valid) {
			log("Signing in with account: "+$scope.email+", "+$scope.password);
			loginByPassword($scope.email,$scope.password,$cookies,$state);
		}else{
			log("Form is invalid!");
			nlog("Thông tin nhập vào không đúng, vui lòng kiểm tra lại.")
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
				config.authData = authData;
				sucessfulLogin ($cookies,$state)
			}
		});
	}
	$scope.goBack = function () {
		var lastState =  $cookies.lastState || 'home';
		log("Go to \""+lastState+"\" state >>>");
		$state.go(lastState);
	}
});
app.controller('logoutCtrl',function($scope, $state, $cookies){
	log("\n===================Logout State======================");
	disablePreload('#overall-preloader');
	rootRef.unauth();
	log("Logged out and go to Login State >>>");
	nlog("Đăng xuất...");
	$state.go('login');
});
app.controller('forgotPasswordCtrl',function($scope, $state, $cookies){
	log("\n===================Forgot password State======================");
	disablePreload('#overall-preloader');
	$scope.sendEmail = function (valid) {
		if (valid) {
			log("Send password recovery email to "+$scope.email);
			rootRef.resetPassword({
				email: $scope.email
			}, function(error) {
				if (error) {
					switch (error.code) {
						case "INVALID_USER":
						log("The specified user account does not exist.");
						break;
						default:
						log("Error resetting password:"+error);
					}
				} else {
					log("Password reset email sent successfully!");
					nlog("Email khôi phục mật khẩu cho "+$scope.email+" đã được gửi!");
					log("Go to Login State >>>");
					$state.go('login');
				}
			});
		};
	}
});
app.controller('homeCtrl',function($scope,$state,$cookies){
	ctrlInit($scope,$state,$cookies);
	changeDisplayName($scope);
	psRef = rootRef.child('patients'); //Patients Reference.
	$scope.loading = true;
	nlog('Đang tải Danh sách bệnh nhân...');
	psRef.once('value',function(snapshot) {
		log(snapshot.val());
		$scope.loading = false;
		$scope.$apply();
		nlog('Tải xuống Danh sách bệnh nhân thành công.');
	});
	$scope.showAddPatientForm = function() {
		
	}
});


function log(obj){if(config.devStatus){console.log(obj)}}
function nlog(message){
	$('<div class="nlm" hidden>'+message+'</div>').appendTo('.nlog').fadeIn(100).delay(3000).fadeOut(500).queue(function(){$(this).remove();});
}
function disablePreload(selection){$(selection).hide()}

function ctrlInit ($scope,$state,$cookies) {
	log("\n==================="+$state.current.name+" state=======================");
	$cookies.lastState = $state.current.name;
	rootRef.onAuth(authDataCallback);
	rootRef.offAuth(authDataCallback);
	function authDataCallback(authData) {
		if (authData) {
			log("User " + authData.uid + " is logged in with " + authData.provider);
			config.authData = authData;
		} else {
			if ($cookies.user) {
				var email = $cookies.user.email;
				var password = $cookies.user.password;
				log("Qick Signing in from Cookies with account: "+email+", "+password);
				nlog("Đăng nhập lại từ thông tin lưu trữ.");
				loginByPassword(email,password,$cookies,$state);
				
			}else{
				log("User is logged out. Need for login!\nGo to \"login\" state >>>");
				$state.go('login');
			}
		}
		disablePreload('#overall-preloader');
	}
}
function loginByPassword (email, password, $cookies, $state) {
	nlog("Đang kiểm tra thông tin...");
	rootRef.authWithPassword({
		email    : email,
		password : password
	}, function(error, authData) {
		if (error) {
			log("Login Failed!\n"+ error);
			nlog("Đăng nhập thất bại.");
			$state.go('login');
		} else {
			log("Logged in as: "+ authData.uid + " by "+authData.provider+" provider");
			if ($cookies.user) {
				$cookies.user.email = email;
				$cookies.user.password = password;
			} else{
				$cookies.user = {email:email,password:password};
			};
			config.authData = authData;
			sucessfulLogin($cookies,$state);
		}
	});
}
function sucessfulLogin ($cookies,$state) {
	nlog("Đăng nhập thành công.");
	var lastState =  $cookies.lastState || 'home';
	log("Go to \""+lastState+"\" state >>>");
	$state.go(lastState);
}
function changeDisplayName ($scope) {
	var authData = config.authData;
	if (!$scope.displayName) {
		switch (authData.provider) {
			case 'google': 
				$scope.displayName = authData.google.displayName;
				break;
			case 'facebook':
				$scope.displayName = authData.facebook.displayName;
				break;
			case 'password':
				if (authData.password.displayName) {
					$scope.displayName = authData.password.displayName
				} else{
					$scope.displayName = "Đang cập nhật ...";
					rootRef.child('users/'+authData.uid+'/displayName').once('value', function (snapshot) {
						authData.password.displayName = snapshot.val();
						$scope.displayName = snapshot.val();
						$scope.$apply();
					});
				};
				break;
			default:
				$scope.displayName = "Người quản lý";
		}
	};
}
function dataTransferOn () {
	
}
function dataTransferOff () {
	
}