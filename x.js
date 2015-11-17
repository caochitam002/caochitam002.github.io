var rootRef = new Firebase('https://viemhonghat.firebaseio.com/'),
authData,
newObj,
countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],
vietnameseProvinces = ["Hà Nội","Hồ Chí Minh","Sài Gòn","An Giang","Bà Rịa - Vũng Tàu","Bạc Liêu","Bắc Giang","Bắc Kạn","Bắc Ninh","Bến Tre","Bình Dương","Bình Định","Bình Phước","Bình Thuận","Cao Bằng","Cà Mau","Cần Thơ","Hải Phòng","Đà Nẵng","Gia Lai","Hòa Bình","Hà Giang","Hà Nam","Hà Tĩnh","Hưng Yên","Hải Dương","Hậu Giang","Điện Biên","Đắk Lắk","Đắk Nông","Đồng Nai","Đồng Tháp","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Long An","Lào Cai","Lâm Đồng","Lạng Sơn","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Thanh Hóa","Thái Bình","Thái Nguyên","Thừa Thiên - Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Tây Ninh","Vĩnh Long","Vĩnh Phúc","Yên Bái"],
datePatern = "^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$";
config = {
	devStatus: false,
	systemTimeZoneOffset: 7
};
Number.prototype.format = function(n, x, s, c) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
	num = this.toFixed(Math.max(0, ~~n));
	return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
var vhh = angular.module('vhh', ['ui.router','firebase']);
vhh.config(function($stateProvider, $urlRouterProvider) { //Router config
	$urlRouterProvider.otherwise('/index');
	$stateProvider
	.state('index', {
		url:'/index',
		templateUrl: 'templates/index.html',
		controller: 'indexCtrl'
	})
	.state('login', {
		url:'/login',
		templateUrl: 'templates/login.html',
		controller: 'loginCtrl'
	})
	.state('patient', {
		url:'/benh-nhan',
		templateUrl: 'templates/patient.html',
		controller: 'patientCtrl'
	})
	.state('patient.add', {
		url:'/them-moi',
		templateUrl: 'templates/edit-patient.html',
		controller: 'editPatientCtrl'
	})
	.state('patient.edit', {
		url:'/{id}',
		templateUrl: 'templates/edit-patient.html',
		controller: 'editPatientCtrl'
	})
	.state('patient.export', {
		url:'/{id}/xuat-thuoc',
		templateUrl: 'templates/export-patient.html',
		controller: 'exportPatientCtrl'
	})
	.state('patient.currency', {
		url:'/{id}/tai-khoan',
		templateUrl: 'templates/currency-detail.html',
		controller: 'currencyDetailCtrl'
	})
});
vhh.filter('currency', function () {
	return function (v) {
		return toCurrency(v)
	};
});
vhh.filter('sysTime', function () {
	return function (timeStr) {
		return getSysTime(timeStr)
	};
});
vhh.filter('searchPatient', function () {
	return function (ps, query) {
		query = query.toLowerCase();
		var filtered = [];
		for (var i = ps.length - 1; i >= 0; i--) {
			if(searchInChild(ps[i],query)){
				var summary = getSummary(ps[i]);
				if(summary) ps[i].summary = summary;
				filtered.push(ps[i]);
			}
		};
		return filtered;
	};
});
vhh.filter('addressFocus', function () {
	return function (a) {
		if(a == null || a == '') return false;
		a = toWordOnly(toASCII(a));
		for (var i = countries.length - 1; i >= 0; i--) {
			b = toWordOnly(toASCII(countries[i]));
			if(a.search(b) != -1 && b !== 'vietnam'){
				return countries[i];
			}
		};
		for (var i = vietnameseProvinces.length - 1; i >= 0; i--) {
			b = toWordOnly(toASCII(vietnameseProvinces[i]));
			if(a.search(b) != -1){
				return vietnameseProvinces[i];
			}
		};
		return false;
	};
});
vhh.filter('summary', function () {
	return function (p) {
		return getSummary(p);
	};
});
vhh.filter('toArray', function () {
	return function (obj) {
		var array = [];
		
		return array;
	};
});
vhh.controller("indexCtrl", ["$rootScope", "$firebaseAuth", "$state", function ($rootScope, $firebaseAuth, $state) {
	checkAuthStatus($state);
}]);
vhh.controller("loginCtrl", ["$scope", "$rootScope", "$firebaseAuth", "$state", function($scope, $rootScope, $firebaseAuth, $state) {
	rootRef.unauth();
	$scope.paAuth = function(){
		log("Signing in with account: "+$scope.email+", "+$scope.password);
		rootRef.authWithPassword({
			email    : $scope.email,
			password : $scope.password
		}, function(error, authData) {
			if (error) {
				log("Login Failed!", error);
			} else {
				log("Logged in as:", authData.uid);
				checkAuthStatus($state);
			}
		});
	}
	$scope.OAuth = function(provider){
		$firebaseAuth(rootRef).$authWithOAuthPopup(provider).then(function(authData) {
			log("Logged in as:", authData.uid);
			checkAuthStatus($state);
		}).catch(function(error) {
			log("Authentication failed:"+ error);
		});
	}
}]);
vhh.controller("testCtrl", ["$scope","$rootScope", "$firebaseAuth", "$state", function ($scope,$rootScope, $firebaseAuth, $state) {
	log('TESK OK!')
}]);
vhh.controller("patientCtrl", ["$scope","$rootScope", "$firebaseAuth", "$state", "$firebaseObject", "$firebaseArray", function ($scope,$rootScope, $firebaseAuth, $state, $firebaseObject, $firebaseArray) {
	checkAuthStatus($state);
	//Variable Initial
	$scope.ref = rootRef.child('patients');
	//Scope function
	$scope.expand = function ($event) {
		$($event.target).removeClass('ellipsis');
	}
	$scope.collapse = function ($event) {
		$($event.target).addClass('ellipsis')
	}
	//Secondary function
	$(document).keyup(function(e) {
		if (e.keyCode == 115) $state.go('patient.add');
	});

	//Scope variable
	runIcon();
	$scope.patients = $firebaseArray($scope.ref.orderByChild('createTime'));
	$scope.patients.$loaded(function () {
		stopIcon();
	});

	//Functions
	function runIcon() {
		$('.search-logo .static').hide();
		$('.search-logo .dynamic').show();
	}
	function stopIcon() {
		$('.search-logo .dynamic').hide();
		$('.search-logo .static').show();
	}
}]);
vhh.controller("editPatientCtrl", function($scope,$rootScope, $firebaseAuth, $state, $firebaseObject) {
	checkAuthStatus($state);
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {hideFocusFrame();$state.go('patient');}
	});
	var today = new Date();
	if($state.current.name === 'patient.edit'){
		$scope.isAdding = false;
		$scope.ref = rootRef.child('patients').child($state.params.id);
		$scope.patient = $firebaseObject($scope.ref);
		$scope.patient.$loaded(function () {
			$scope.panelTitle = $scope.patient.name;
			if($scope.patient.credit){
				if($scope.patient.credit.balance != 0){
					$scope.balance = $scope.patient.credit.balance;
				}
			}
			timeInit(new Date($scope.patient.createTime));
			showFocusFrame();
		})
		$scope.deleteCurrentPatient = function () {
			if(confirm("Bạn chắc chắn muốn xóa bệnh nhân này?")){
				$scope.ref.remove(function (error) {
					if (error) {
						nlog("Không thể xóa bệnh nhân này");
					}else{
						$state.go('patient');
						nlog("Xóa bệnh nhân thành công");
					}
				});
			}
		}
		$scope.goExportFrame = function () {
			$state.go('patient.export',{id:$state.params.id});
		}
	}
	if ($state.current.name === 'patient.add'){
		$scope.isAdding = true;
		timeInit(today);
		$scope.panelTitle="Thêm bệnh nhân";
		showFocusFrame();
	}
	$scope.fixCurrency = function (balance) {
		balance = parseInt(toNumbOnly(balance ? balance.toString() : '0'))	;
		// $scope.newBalance = balance;
		if($scope.patient)
			$scope.patient.credit = {balance: balance};
		else
			$scope.patient = {credit: {balance: balance}};
		$scope.balance = toCurrency(balance);
	}
	$scope.savePatient = function () {
		// if (isValid) {
			// var creditHistory = {time: (new Date()).getTime(), status: 1};
			// if ($scope.patient.credit) {
			// 	if ($scope.patient.credit.balance) {
			// 		if($scope.patient.credit.balance > $scope.newBalance){
			// 			creditHistory.credit = $scope.patient.credit.balance - $scope.newBalance;
			// 			creditHistory.balance = $scope.newBalance;
			// 			creditHistory.reason = "Rút tiền nhanh";
			// 			$scope.patient.credit.balance = $scope.newBalance;

			// 		}else if($scope.patient.credit.balance < $scope.newBalance){
			// 			creditHistory.credit = $scope.newBalance - $scope.patient.credit.balance;
			// 			creditHistory.balance = $scope.newBalance;
			// 			creditHistory.reason = "Nạp tiền nhanh";
			// 			$scope.patient.credit.balance = $scope.newBalance;
			// 		}else{
			// 			creditHistory = null;
			// 		}
			// 	}else{
			// 		if($scope.newBalance != 0){
			// 		creditHistory.credit = $scope.newBalance;
			// 		creditHistory.balance = $scope.newBalance;
			// 		creditHistory.reason = "Nạp tiền nhanh";
			// 		$scope.patient.credit.balance = $scope.newBalance;
			// 		}else{
			// 			creditHistory = null;
			// 		}
			// 	};


			// 	// if($scope.patient.credit.balance){
			// 	// 	if($scope.patient.credit.balance > $scope.newBalance){
			// 	// 		//Nap tien
			// 	// 	}
			// 	// 	if($scope.patient.credit.balance < $scope.newBalance){
			// 	// 		//Rut tien
			// 	// 	}
			// 	// 	$scope.patient.credit.balance = $scope.newBalance;
			// 	// }else{
			// 	// 	$scope.patient.credit.balance = $scope.newBalance;
			// 	// 	//Nap tien
			// 	// }
			// }else{
			// 	if ($scope.newBalance != 0) {
			// 		creditHistory.credit = $scope.newBalance;
			// 		creditHistory.balance = $scope.newBalance;
			// 		creditHistory.reason = "Nạp tiền nhanh";
			// 		$scope.patient.credit = {balance: $scope.newBalance};
			// 	} else{
			// 		creditHistory = null;
			// 	};
			// };
			timeCollect();
			if(!$scope.isAdded){
				if($scope.isAdding){
					$scope.ref = rootRef.child('patients').push($scope.patient, function(error) {
						if (error) {log(error)}
							else {
								nlog('Thêm bệnh nhân thành công!');
								if ($scope.patient.credit) {
									$scope.ref.child("credit/history").push({time: (new Date()).getTime(), status: 1, reason: "Nạp tiền lần đầu", credit: $scope.patient.credit ? $scope.patient.credit.balance : 0, balance: $scope.patient.credit ? $scope.patient.credit.balance: 0});
								};
								$state.go('patient.edit',{id:$scope.ref.key()});
							}
						});
				}else{
					$scope.patient.$save().then(function(){
						nlog("Sửa thông tin thành công!")
					});
				}
			}
			$scope.isAdded = true;
		// }else nlog("Nội dung nhập chưa đúng, không thể lưu!");
		
	}
	function timeInit (cTime) {
		$scope.hours = pad(cTime.getHours());
		$scope.minutes = pad(cTime.getMinutes());
		$scope.date = pad(cTime.getDate());
		var t1 = cTime.getMonth();
		var t2 = parseInt(t1)+1;
		if (month = 0) {
			$scope.month = pad(12);
		}else{
			$scope.month = pad(t2);
		}
		$scope.year = pad(cTime.getFullYear());
	}
	function timeCollect(){
		var cTime;
		if($scope.isAdding) cTime = new Date();
		else cTime = new Date($scope.patient.createTime);

		cTime.setMinutes($scope.minutes);
		cTime.setHours($scope.hours);
		cTime.setDate($scope.date);
		cTime.setMonth(parseInt($scope.month)-1);
		cTime.setYear($scope.year);
		$scope.patient.createTime = cTime.getTime();
	}
	$scope.exit = function () {
		hideFocusFrame();
		$state.go('patient');
	}
	$scope.editcBirthYear = function () {
		if(exists("patient.circulator.birthYear",$scope)){
			var y = parseInt($scope.patient.circulator.birthYear);
			if(y){
				if(y<100){
					$scope.patient.circulator.birthYear = today.getFullYear() - y
				}
			}
		}
	}
	$scope.editBirthYear = function () {
		if(exists("patient.birthYear",$scope)){
			var y = parseInt($scope.patient.birthYear);
			if(y){
				if(y<100){
					$scope.patient.birthYear = today.getFullYear() - y
				}
			}
		}
	}
});
vhh.controller("exportPatientCtrl", function ($scope,$rootScope, $firebaseAuth, $state, $firebaseObject,$firebaseArray) {
	checkAuthStatus($state);
	$scope.isAdding = true;
	$scope.ref = rootRef.child('patients').child($state.params.id);
	$scope.patient = $firebaseObject($scope.ref);
	$scope.patient.$loaded(function () {
		$scope.exportList = $firebaseArray($scope.ref.child('export').orderByChild("status").equalTo(1));
		timeInit(new Date());
		showFocusFrame();
	})
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {hideFocusFrame();$state.go('patient.edit',{id:$state.params.id});}
	});
	$scope.exit = function () {
		hideFocusFrame();
		$state.go('patient');
	}
	function timeInit (cTime) {
		$scope.hours = pad(cTime.getHours());
		$scope.minutes = pad(cTime.getMinutes());
		$scope.date = pad(cTime.getDate());
		var t1 = cTime.getMonth();
		var t2 = parseInt(t1)+1;
		if (month = 0) {
			$scope.month = pad(12);
		}else{
			$scope.month = pad(t2);
		}
		$scope.year = pad(cTime.getFullYear());
	}
	function timeCollect(){
		var cTime;
		if($scope.patient.exportInfo){
			if ($scope.patient.exportInfo.exTime) cTime = new Date($scope.patient.exportInfo.exTime);
			else cTime = new Date();
		}else cTime = new Date();
		cTime.setMinutes($scope.minutes);
		cTime.setHours($scope.hours);
		cTime.setDate($scope.date);
		cTime.setMonth(parseInt($scope.month)-1);
		cTime.setYear($scope.year);
		if($scope.exportInfo){
			$scope.exportInfo.exTime = cTime.getTime();
			$scope.exportInfo.status = 1;
		}else{
			$scope.exportInfo = {exTime: cTime.getTime(), status: 1};
		}
	}
	$scope.fixCurrency = function (price) {
		price = parseInt(toNumbOnly(price ? price.toString() : '0'))	;
		if($scope.exportInfo)
			$scope.exportInfo.price = price
		else
			$scope.exportInfo = {price: price};
		$scope.price = toCurrency(price);
	}
	$scope.save = function (isValid) {
		timeCollect();
		if ($scope.isAdding) {
			if($scope.patient.credit){
				$scope.patient.credit.balance = parseInt($scope.patient.credit.balance) - parseInt($scope.exportInfo.price);
			}else{
				$scope.patient.credit = {balance: -parseInt($scope.exportInfo.price)}
			}
			
			$scope.patient.$save().then(function () {
				var hisRef = $scope.ref.child('credit/history');
				$scope.exportInfo.creditHisID = hisRef.push({credit: (- parseInt($scope.exportInfo.price)), time: (new Date()).getTime(), balance: $scope.patient.credit.balance, reason: "Xuất thuốc", status:1}).key();
				
				var exRef = $scope.ref.child('export');
				var newEx = exRef.push($scope.exportInfo,function (e) {
					if(e){
						nlog("Không thể xuất thuốc")
					}else{
						nlog("Xuất thuốc thành công");
						$scope.edit(newEx.key());
					}
			});
			});
		}
		else{

			var creditHisRef = $scope.ref.child('credit/history/'+$scope.exportInfo.creditHisID);
			var creditHis = $firebaseObject(creditHisRef);
			creditHis.$loaded(function () {
				$scope.tempCredit = parseInt($scope.exportInfo.price) + parseInt(creditHis.credit);
				$scope.patient.credit.balance = parseInt($scope.patient.credit.balance) - parseInt($scope.tempCredit);
				$scope.patient.$save().then(function () {
					creditHis.credit = -$scope.exportInfo.price;
					creditHis.balance = $scope.patient.credit.balance;
					creditHis.time = $scope.exportInfo.exTime;
					creditHis.$save();
					$scope.exportInfo.$save().then(function() {
						nlog("Sửa phiếu xuất thành công.")
					}).catch(function(error) {
						alert('Lỗi! Không thể sửa phiếu xuất này');
					});
				})
			});
		}
	}
	$scope.edit = function (id) {
		$scope.editID = id;
		$scope.isAdding = false;
		var exRef = $scope.ref.child('export/'+id);
		$scope.exportInfo = $firebaseObject(exRef);
		$scope.exportInfo.$loaded(function(){
			timeInit(new Date($scope.exportInfo.exTime));
			$scope.price = toCurrency($scope.exportInfo.price);
		})
	}
	$scope.deleteEx = function (ex) {
		var i = $scope.exportList.$indexFor(ex.$id);
		if(confirm("Thật sự muốn xóa suất thuốc này?")){
			if(confirm("Có muốn trả tiền lại tài khoản không?")){
				if($scope.patient.credit){
					if($scope.patient.credit.balance){
						$scope.patient.credit.balance = parseInt($scope.patient.credit.balance) + parseInt(ex.price);
						$scope.patient.$save().then(function () {
							var creditHistoryRef = $scope.ref.child('credit/history');
							creditHistoryRef.push({credit: parseInt(ex.price), time: (new Date(ex.exTime)).getTime(), balance: $scope.patient.credit.balance, reason: "Xóa suất thuốc (Trả thuốc)", status:1, exID: ex.$id});
						});

					}
				}
			}
			log($scope.exportList[i].status);
			$scope.exportList[i].status = 0;
			log($scope.exportList[i].status);
			$scope.exportList.$save(i).then(function () {
				nlog("Xóa lịch sử xuất thuốc thành công");
			})
		}
	}
});
vhh.controller("currencyDetailCtrl",  function ($scope,$rootScope, $firebaseAuth, $state, $firebaseObject, $firebaseArray) {
	checkAuthStatus($state);
	$scope.ref = rootRef.child('patients').child($state.params.id);
	$scope.creditHisList = $firebaseArray($scope.ref.child('credit/history').orderByChild("status").equalTo(1));
	$scope.patient = $firebaseObject($scope.ref);
	$scope.patient.$loaded(function () {
		showFocusFrame();
	})
	$scope.exit = function () {
		window.history.back();
	}
	$scope.showNapTien = function () {
		$scope.sum = true;
		$('.naptien').show();
		$('.ruttien-btn').prop("disabled",false);
		$('.naptien-btn').prop("disabled",true);
	}	
	$scope.showRutTien = function () {
		$scope.sum = false;
		$('.naptien').show();
		$('.naptien-btn').prop("disabled",false);
		$('.ruttien-btn').prop("disabled",true);
	}
	$scope.tinhtien = function () {
		if($scope.creditValue){
			if($scope.sum){
				if($scope.patient.credit){
					$scope.patient.credit.balance = parseInt($scope.patient.credit.balance) + parseInt($scope.creditValue);
				}else{
					$scope.patient.credit = {balance : parseInt($scope.creditValue)};
				};
				var credit = $scope.creditValue;
				$scope.patient.$save().then(function(){
					$scope.ref.child('credit/history').push({credit: parseInt(credit), time: (new Date()).getTime(), balance: $scope.patient.credit.balance, reason: "Nạp tiền", status: 1});
					nlog("Nạp tiền thành công!");
				});
				
			}else{
				if($scope.patient.credit){
					var sobitru = parseInt($scope.patient.credit.balance);
					var sotru = parseInt($scope.creditValue);
					$scope.patient.credit.balance = sobitru - sotru;
				}else{
					$scope.patient.credit = {balance: -sotru};
				}
				
				$scope.patient.$save().then(function(){
					$scope.ref.child('credit/history').push({credit: sotru, time: (new Date()).getTime(), balance: $scope.patient.credit.balance, reason: "Rút tiền", status: 1});
					nlog("Rút tiền thành công!");
				});			
			}
		}
		$scope.credit = '';
		delete $scope.creditValue;
	}
	$scope.fixCurrency = function (price) {
		price = parseInt(toNumbOnly(price ? price.toString() : '0'));
		$scope.creditValue = price;
		$scope.credit = toCurrency(price);
	}
});
function showFocusFrame() {	
	$('body').css({overflow:'hidden'});
	$('#focusFrame').show();
}
function hideFocusFrame() {
	$('#focusFrame').hide()
	$('body').css({overflow:'auto'});
}
function checkAuthStatus($state,dest){
	log('==========================\nCurrent state: '+$state.current.name);
	var goHome =function (){$state.go('patient');}
	var goLogin = function (){$state.go('login');}
	authData = rootRef.getAuth();
	if (authData) {
		rootRef.child('users').child(authData.uid).child('roles').on('value', function(snapshot){
			var data = snapshot.val();
			if(data){
				log("Admin role: "+data.administrator);
				if (data.administrator !== true) {
					goLogin();
				}
				else{
					var cState = $state.current.name
					if (cState === 'index' || cState === 'login') goHome()
				}
			}else{goLogin();}
		}, function(e){
			goLogin();
        });
	} else {
		goLogin();
	}
}
function searchInChild(obj, query, key){
	if(typeof obj === "object"){
		var found = false;	
		for(var k in obj) {
			if(searchInChild(obj[k], query, k)) found = true;
		}
		return found;
	}else if(key === "createTime" || key === "exTime"){
		if(getSysTime(obj).search(toASCII(query)) != -1) return true;
		else return false;
	}else if(typeof obj === "string") {
		if(toASCII(obj).search(toASCII(query)) != -1) return true;
		else return false;
	}else{
		return false;
	}
}
function toASCII (str) {
	str= str.toLowerCase(); 
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str= str.replace(/đ/g,"d");
    return str;
}
function toWordOnly (str) {
	return str.replace(/[^\w]/ig, '');
}
function toNumbOnly (str) {
	return str.replace(/[^0-9-]/ig, '');
}
function log (message){
	if (config.devStatus) {console.log(message)}
}
function nlog(message){
	$('<div class="nlm" hidden>'+message+'</div>').appendTo('.nlog').fadeIn(100).delay(2000).fadeOut(500).queue(function(){$(this).remove();});
}
function pad (str, lenght) {
	if(str === '0' || str == 0) return '00';
	if(str){
		str = str.toString();
		var p = '00';
		if(lenght){
			p = Array(lenght+1).join("0");
			return  p.substring(0, p.length - str.length) + str
		}else{
			return p.substring(0, p.length - str.length) + str
		}
	}else return ''
}
function getSysTime (timeStr) {
	var time;
	if(timeStr) {
		time = new Date(timeStr)
	}else {
		time = new Date();
	}
	var utc = time.getTime() + (time.getTimezoneOffset() * 60000);
	var newTime = new Date(utc + (3600000*config.systemTimeZoneOffset));
	return newTime.getDate()+'/'+(newTime.getMonth()+1)+'/'+newTime.getFullYear()+' '+newTime.getHours()+':'+newTime.getMinutes();
}
function getSummary (patient) {
	var summary='';
	function addSummary (str) {
		if(summary != '') summary += ', ';
		summary += str; 
	}
	if(patient){
		if (patient.birthYear) {addSummary((2015-parseInt(patient.birthYear)).toString() + ' tuổi')};
		if (exists('condition.pharyngitis.diagnose',patient)) {addSummary('Bị '+patient.condition.pharyngitis.diagnose)};
		if (exists('condition.pharyngitis.time',patient)) {summary+=' '+patient.condition.pharyngitis.time};
		if (exists('condition.pharyngitis.pustule.checked',patient)) {addSummary('có hạt')};
		if (exists('condition.respiratory.neckItchy.checked',patient)) {addSummary('ngứa cổ')};
		if (exists('condition.respiratory.sputum.checked',patient)) {addSummary('có đờm')};
		if (exists('condition.respiratory.halitosis.checked',patient)) {addSummary('hơi thở hôi')};
		if (exists('condition.respiratory.diffSwallowing.checked',patient)) {addSummary('nuốt vướng')};
		if (exists('condition.respiratory.hemorrhage.checked',patient)) {addSummary('xuất huyết')};
		if (exists('condition.respiratory.cough.checked',patient)) {addSummary('ho')};
		if (exists('condition.respiratory.sinusitis.checked',patient)) {addSummary('viêm xoang')};
		if (exists('condition.respiratory.rhinitis.checked',patient)) {addSummary('viêm mũi dị ứng')};
		if (exists('condition.respiratory.bronchitis.checked',patient)) {addSummary('viêm phế quản')};
		if (exists('condition.respiratory.tuberculosis.checked',patient)) {addSummary('lao phổi')};
		if (exists('condition.circulatory.heartDisease.checked',patient)) {addSummary('bệnh tim')};
		if (exists('condition.circulatory.bloodPressure.checked',patient)) {addSummary('huyết áp')};
		if (exists('condition.circulatory.hyperlipidemia.checked',patient)) {addSummary('máu nhiễm mỡ')};
		if (exists('condition.circulatory.bloodPoisoning.checked',patient)) {addSummary('nhiễm độc máu')};
		if (exists('condition.circulatory.atherosclerosis.checked',patient)) {addSummary('xơ vữa động mạch')};
		if (exists('condition.circulatory.thrombosis.checked',patient)) {addSummary('huyết khối tĩnh mạch')};
		if (exists('condition.circulatory.gout.checked',patient)) {addSummary('gout')};
		if (exists('condition.circulatory.diabetes.checked',patient)) {addSummary('tiểu đường')};
		if (exists('condition.digestion.gerd.checked',patient)) {addSummary('GERD')};
		if (exists('condition.digestion.hepaticSteatosis.checked',patient)) {addSummary('gan nhiễm mỡ')};
		if (exists('condition.digestion.hemorrhoids.checked',patient)) {addSummary('trĩ')};
		if (exists('condition.digestion.stomach.checked',patient)) {addSummary('đau dạ dày')};
		if (exists('condition.digestion.diarrhea.checked',patient)) {addSummary('tiêu chảy')};
		if (exists('condition.digestion.constipation.checked',patient)) {addSummary('táo bón')};
		if (exists('condition.digestion.enteritis.checked',patient)) {addSummary('viêm ruột')};
		if (exists('condition.digestion.colitis.checked',patient)) {addSummary('viêm đại tràng')};
		if (exists('condition.digestion.proctitis.checked',patient)) {addSummary('viêm trực tràng')};
		if (exists('condition.digestion.defecation.detail',patient)) {addSummary('đại tiện: '+patient.condition.digestion.defecation.detail)};
		if (exists('condition.digestion.shit.detail',patient)) {addSummary(patient.condition.digestion.shit.detail)};
		if (exists('condition.excrete.urinaryRetention.checked',patient)) {addSummary('bí tiểu')};
		if (exists('condition.excrete.painfulUrination.checked',patient)) {addSummary('tiểu buốt')};
		if (exists('condition.excrete.splitUrine.checked',patient)) {addSummary('tiểu rắc')};
		if (exists('condition.excrete.yellowUrine.checked',patient)) {addSummary('tiểu vàng')};
		if (exists('condition.excrete.opaqueUrine.checked',patient)) {addSummary('tiểu đục')};
		if (exists('condition.excrete.effervesceUrine.checked',patient)) {addSummary('tiểu nhiều bọt')};
		if (exists('condition.digestion.acne.checked',patient)) {addSummary('nhiều mụn')};
		if (exists('condition.digestion.seborrheicDermatitis.checked',patient)) {addSummary('viêm da tiết bã')};
		if (exists('condition.digestion.eczema.checked',patient)) {addSummary('bệnh chàm')};
		if (exists('condition.digestion.psoriasis.checked',patient)) {addSummary('vẩy nến')};
		if (exists('condition.digestion.sweatyPalms.checked',patient)) {addSummary('ra mồ hôi tay')};
		if (exists('condition.skeletal.heelPain.checked',patient)) {addSummary('gai gót chân')};
		if (exists('condition.skeletal.joints.checked',patient)) {addSummary('bệnh khớp')};
		if (exists('condition.skeletal.neckNshoulder.checked',patient)) {addSummary('viêm vai gáy')};
		if (exists('condition.skeletal.sciaticNerve.checked',patient)) {addSummary('đau thần kinh tọa')};
		if (exists('condition.skeletal.spinal.checked',patient)) {addSummary('đau cột sống')};
		if (exists('condition.obstetrics.disease.checked',patient)) {addSummary('bệnh phụ khoa')};
		if (exists('condition.obstetrics.pregnant.checked',patient)) {addSummary('đang mang thai')};
		if (exists('condition.obstetrics.lactating.checked',patient)) {addSummary('đang cho con bú')};
		if (exists('condition.routine.drink.checked',patient)) {addSummary('uống rượu bia nhiều')};
		if (exists('condition.routine.smoke.checked',patient)) {addSummary('hút thuốc nhiều')};
		if (exists('condition.routine.ice.checked',patient)) {addSummary('uống đá lạnh nhiều')};
		if (exists('condition.routine.eating.checked',patient)) {addSummary('ăn uống thất thường')};
		if (exists('condition.routine.cooler.checked',patient)) {addSummary('dùng máy lạnh nhiều')};
		if (exists('condition.routine.smog.checked',patient)) {addSummary('hít khói bụi nhiều')};
		if (exists('condition.routine.late.checked',patient)) {addSummary('thức khuya nhiều')};
		if (exists('condition.routine.sit.checked',patient)) {addSummary('thường ngồi lâu')};
		if (exists('condition.routine.masturbate.checked',patient)) {addSummary('thường thủ dâm')};
		if (exists('condition.routine.sex.checked',patient)) {addSummary('quan hệ nhiều')};
		if (exists('condition.another',patient)) {addSummary(patient.condition.another)};
		if (exists('condition.request',patient)) {addSummary(patient.condition.request)};
		if (summary == '') return false
			else {
				summary +='.';
				return summary;
			}
	}else return false;
}
function exists (objStr, inputObj) {
	var temp;
	if(inputObj){
		temp = inputObj;
	}else{
		temp = window;
	}
	objStr.split(".").forEach(function (element, index) {
		if(temp[element]){
			temp = temp[element];
		}else temp = false;
	});
	return temp;
}
function toCurrency (v) {
	if(v){
		var c = parseInt(v.toString().replace(/[^-0-9]/ig, '')).format(0, 3, '.', ',');
		if(c == NaN)
			return '0';
		else return c;
	}else return '0';
}