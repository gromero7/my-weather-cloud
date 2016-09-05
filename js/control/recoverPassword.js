//jQuery code
$(document).ready(function() {
    $('select').material_select();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $("#btn-up-pho").hide();
});


//Angular code
(function() {
    var myweatherapp = angular.module("myweatherapp", []);

    myweatherapp.controller("recoveryController", function($http, $scope, accessService) {

        //scope
        $scope.user = new userObj();
        $scope.userAction = 0;
        $scope.myProfile = false;
        $scope.toLogIn = true;
        $scope.path;
        $scope.confirmPass;
        $scope.submitProfile = false;
        $scope.editProfile = 0;
        $scope.userScheduleEditProfile;
        $scope.showUploadPhotos = false;
        $scope.toCreateNews = 0;
        $scope.loginSucc = 1;
        $scope.loginRec = 0;
        $scope.thumb = 1;


        /**
         * [sessionControl check if session is initialized
         */
        this.sessionControl = function() {

            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
                if (sessionStorage.length > 0) {

                    //get data in json and save in objAux
                    var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));

                    var user = new userObj();
                    user.construct(objAux.user_id, objAux.name, objAux.surname, objAux.nickname, objAux.location, objAux.email, objAux.birthday, objAux.password, objAux.privileges, objAux.newsletter, objAux.avatar_path);

                    $scope.userid = user.getUserId();
                    $scope.userNameAux = user.getName() + " " + user.getSurname();
                    $scope.userName = user.getName();
                    $scope.userSurname = user.getSurname();
                    $scope.userAvatarPath = user.getAvatarPath();
                    $scope.userNickname = user.getNickname();
                    $scope.userLocation = user.getLocation();
                    $scope.userEmail = user.getEmail();
                    if (user.getBirthday() == "0000-00-00") {
                        $scope.userBirthday = "";
                    } else {
                        $scope.userBirthday = user.getBirthday();
                    }
                    $scope.userPassword = user.getPassword();
                    $scope.userCheckPassword;
                    $scope.userNewsletter = user.getNewsletter();
                    $scope.userPrivileges = user.getPrivileges();
                    $scope.myProfile = true;
                    $scope.toLogIn = false;
                    $scope.defaultPhoto = "../assets/user.png";

                    if (objAux.privileges == 1) {
                        $scope.toCreateNews = 1;
                        $("toCreateNews").removeAttr("hidden");
                    }
                }

                var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                    controllerType: 0,
                    action: 10077,
                    jsonData: {
                        none: ""
                    }
                });

                promise.then(function(outPutData) {

                    if (outPutData[0] === true) {
                        if (typeof(Storage) == "undefined") {
                            alert("Your browser is not compatible with sessions. Change or update your current browser");
                        } else {
                            sessionStorage.setItem("connectedUser", JSON.stringify(outPutData[1]));
                            $scope.userAvatarPath = outPutData[1].avatar_path;
                        }
                    } else {
                        if (!angular.isArray(outPutData[1])) {
                            alert("There has been an error");
                        }
                    }
                });
            }
        }

        this.activateAnimation = function() {
            $('.materialboxed').materialbox();
        }

        this.connection = function() {
            //copy
            $scope.user = angular.copy($scope.user);

            //Server connection to verify users data
            var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10055,
                jsonData: JSON.stringify($scope.user)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    var user = new userObj();

                    user.construct(outPutData[1][0].user_id, outPutData[1][0].name, outPutData[1][0].surname, outPutData[1][0].nickname, outPutData[1][0].location, outPutData[1][0].email, outPutData[1][0].birthday, outPutData[1][0].password, outPutData[1][0].privileges, outPutData[1][0].newsletter, outPutData[1][0].avatar_path);

                    sessionStorage.setItem("connectedUser", JSON.stringify(user));

                    window.open("../index.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("Error in the server");
                    }
                }
            });
        }

        this.connectionDestroy = function() {

            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
                sessionStorage.removeItem("connectedUser");

                //destroy server session
                var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                    controllerType: 0,
                    action: 10033,
                    jsonData: {
                        none: ""
                    }
                });

                promise.then(function(outPutData) {

                    if (outPutData[0] === true) {} else {
                        if (angular.isArray(outPutData[1])) {
                            showErrors(outPutData[1]);
                        } else {
                            //alert("There is an error in the server");
                            $scope.myProfile = false;
                            window.open("../index.html", "_self");
                        }
                    }
                });
            }
        }

        this.registerUser = function() {
            //copy user
            $scope.user = angular.copy($scope.user);

            var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10011,
                jsonData: JSON.stringify($scope.user)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {

                    $scope.signUpForm.$setPristine();

                    //$scope.userArr = [];
                    var user = new userObj();
                    user.construct("", $scope.user.name, $scope.user.surname, $scope.user.nickname, $scope.user.location, $scope.user.email, $scope.user.birthday, $scope.user.password, "", $scope.user.newsletter, "");

                    window.open("../index.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }

            });
        }

        $scope.emailRecover;
        this.toShowRecover = function(){
          $scope.loginSucc = 0;
          $scope.loginRec = 1;
        }

        this.toReturnLogin = function(){
          $scope.loginSucc = 1;
          $scope.loginRec = 0;
        }

        this.recoverPassword = function(){
          var email = $scope.emailRecover;

          var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
              controllerType: 0,
              action: 10120,
              jsonData: JSON.stringify(email)
          });
        }

        this.loadPicker = function() {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        $scope.codeRecover;
        $scope.newPassword;
        $scope.repnewPassword;
        var url = window.location.href;
        var gettingurl = Array();
        gettingurl = url.split("?");
        var finalId = gettingurl[1].split("=");

        this.recoveryPassword = function(){
          var arrayValues = Array();
          arrayValues.push(finalId[1], $scope.codeRecover, $scope.newPassword);

          var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
              controllerType: 0,
              action: 10130,
              jsonData: JSON.stringify(arrayValues)
          });

          promise.then(function(outPutData){
            if(outPutData[0] === true){
              swal("Your password has succesfully changed! Redirectioning you to home...");
              $scope.recoveryForm.$setPristine();
              setTimeout(function(){
                window.open("../index.html", "_self");
              }, 2000);
            }
            else{
              swal("There has been an error. Please, make sure your parameters are correct and try again!");
            }
          });

        }

    });

    myweatherapp.filter("rounded", function() {
        return function(val, to) {
            return val.toFixed(to || 0);
        }
    });

      myweatherapp.directive("loginManagement", function() {
          return {
              restrict: 'E',
              templateUrl: "../templates/login-management.html",
              controller: function() {},
              controllerAs: 'loginManagement'
          };
      });

      myweatherapp.directive("registerManagement", function() {
          return {
              restrict: 'E',
              templateUrl: "../templates/register-management.html",
              controller: function() {},
              controllerAs: 'registerManagement'
          };
      });

    myweatherapp.factory("accessService", function($http, $log, $q) {
        return {
            getData: function(url, async, method, params, data) {
                var deferred = $q.defer();
                $http({
                        url: url,
                        method: method,
                        asyn: async,
                        params: params,
                        data: data
                    })
                    .success(function(response, status, headers, config) {
                        deferred.resolve(response);
                    })
                    .error(function(msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                        alert("Error in the server. Try later");
                    });

                return deferred.promise;
            }
        }
    });
})();
