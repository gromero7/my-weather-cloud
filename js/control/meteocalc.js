//jquery code
$(document).ready(function() {

  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });

});


//Angular code

(function() {

    var myweatherapp = angular.module("myweatherapp", []);

    myweatherapp.controller("sessionController", function($http, $scope, accessService) {

      $scope.user = new userObj();
      $scope.news = new newObj();
      $scope.photos = new photoObj();
      $scope.userAction = 0;
      $scope.myProfile = false;
      $scope.toLogIn = true;
      $scope.path;
      $scope.confirmPass;
      $scope.newsArray = new Array();
      $scope.submitProfile = false;
      $scope.editProfile = 0;
      $scope.userScheduleEditProfile;
      $scope.showUploadPhotos = false;
      $scope.loginSucc = 1;
      $scope.loginRec = 0;
      $scope.toCreateNews = 0;
      $scope.obj = {
          src: "",
          selection: [],
          thumbnail: false
      };
      $scope.thumb = 1;


      /**
       * [sessionControl check if session is initialized]
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
                  $scope.defaultPhoto = "assets/user.png";

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

                  window.open("meteocalc.html", "_self");
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
                          window.open("meteocalc.html", "_self");
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

                  window.open("meteocalc.html", "_self");
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
        /**
         * [function for show the recovery of password]
         */
        this.toShowRecover = function() {
            $scope.loginSucc = 0;
            $scope.loginRec = 1;
        }

        /**
         * [function for show the login again]
         */
        this.toReturnLogin = function() {
            $scope.loginSucc = 1;
            $scope.loginRec = 0;
        }

        /**
         * [function for send an email to recover the user password]
         */
        this.recoverPassword = function() {
            var email = $scope.emailRecover;

            var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10120,
                jsonData: JSON.stringify(email)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] == true) {
                    $scope.formToRecoverPassword.$setPristine();
                    swal("We have sent to you an email to recover your password");
                    setTimeout(function() {
                        window.open("index.html", "_self");
                    }, 1000);
                } else {
                    if (outPutData[2] == true) {
                        swal("There is no email associated to any registered account. Please, make sure you have write the email correctly. ");
                    } else {
                        swal("There has been a problem. Please, try later");
                    }
                }
            });
        }


      /**************************************************************************** METEOCALC STARTS*************************************************************************/


      //FUNCTION FOR DO CALCULATIONS WITH WEATHER PARAMETERS

      /* Wind Chill */
      $scope.wcTmp;
      $scope.wcWv;
      $scope.wcRes = 0;
      this.wcCalculate = function() {
          var res = 13.12 + (0.6215 * $scope.wcTmp) - (11.37 * (Math.pow($scope.wcWv, 0.16))) + (0.3965 * $scope.wcTmp * (Math.pow($scope.wcWv, 0.16)));

          $scope.wcRes = res;
          return $scope.wcRes;
      }


      /* Rain intensity */
      $scope.riDb;
      $scope.norm;
      $scope.riRes = 0;
      this.riCalculate = function() {
          var elev = ($scope.riDb / 10);
          var res = Math.pow(((Math.pow(10, elev)) / (200)), (5 / 8));

          if (res > 195) {
              $scope.hail = "Hail";
              $scope.norm = 0;
              return $scope.hail;
          } else {
              $scope.riRes = res;
              $scope.norm = 1;
              return $scope.riRes;
          }
      }


      $scope.sl5Tmp;
      $scope.sl8Tmp;
      $scope.slSp;
      $scope.sl8Gp;
      $scope.slRes;
      this.slCalculate = function() {
          var t850 = $scope.sl8Tmp;
          var t500 = $scope.sl5Tmp;
          var sp = $scope.slSp;
          var gp850 = $scope.sl8Gp;

          var res = ((100 * t850) + (50 * t500) + 2100 + (gp850 - 1350) + (50 * (sp - t850)) - 500);

          if (res <= 0) {
              res = 0;
              $scope.slRes = res;
              return $scope.slRes;
          } else {
              $scope.slRes = res;
              return $scope.slRes;
          }
      }


      $scope.tdSec;
      $scope.tdRes = 0;
      this.tdCalculate = function() {

          var res = $scope.tdSec * 343;

          $scope.tdRes = res;
          return $scope.tdRes;
      }

      /**************************************************************************** METEOCALC ENDS*************************************************************************/





        /*FINAL ANGULAR CODE*/
    });

    myweatherapp.filter("rounded", function() {
        return function(val, to) {
            return val.toFixed(to || 0);
        }
    });

    myweatherapp.directive('fallbackSrc', function() {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function() {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                });
            }
        }
        return fallbackSrc;
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

    myweatherapp.directive("newsManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/news-management.html",
            controller: function() {},
            controllerAs: 'newsManagement'
        };
    });

    myweatherapp.directive("calculatorManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/calculator-management.html",
            controller: function() {},
            controllerAs: 'calculatorManagement'
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
    /*FINAL FUNCTION ANGULAR*/
})();
