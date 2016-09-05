//jQuery code
$(document).ready(function() {

  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});


//Angular code

(function() {

  var weatherstationapp = angular.module("weatherstationapp", []);

  weatherstationapp.controller("wstationController", function($http, $scope, accessService) {

    //scope
    $scope.user = new userObj();
    $scope.weatherst = new weatherstObj();
    $scope.myProfile = false;
    $scope.toLogIn = true;
    $scope.sessionOpened = false;
    $scope.registerForm = false;
    $scope.toSignUpWeather = true;
    $scope.isRegistered = false;

    this.selectFunction = function() {
      $(document).ready(function() {
        $('select').material_select();
      })
    }


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
          user.construct(objAux.id, objAux.name, objAux.surname, objAux.nickname, objAux.location, objAux.email, objAux.birthday, objAux.password, objAux.schedule, objAux.privileges, objAux.newsletter, objAux.avatar_path);

          $scope.userNameAux = user.getName() + " " + user.getSurname();
          $scope.userName = user.getName();
          $scope.userSurname = user.getSurname();
          $scope.userAvatarPath = user.getAvatarPath();
          $scope.userNickname = user.getNickname();
          $scope.userLocation = user.getLocation();
          $scope.userEmail = user.getEmail();
          $scope.userBirthday = user.getBirthday();
          $scope.userPassword = user.getPassword();
          $scope.userCheckPassword = user.getPassword();
          $scope.userSchedule = user.getSchedule();
          $scope.userNewsletter = user.getNewsletter();

          if (!isNaN(user.getUserId())) {
            window.open("index.html", "_self");
          }
          $scope.myProfile = true;
          $scope.toLogIn = false;
        }

        var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
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
            }
          } else {
            if (!angular.isArray(outPutData[1])) {
              alert("There has been an error");
            }
          }
        });

        var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
          controllerType: 1,
          action: 20022,
          jsonData: {
            none: ""
          }
        });

        promise.then(function(outPutData) {
          if (outPutData[0] === true) {
            if (typeof(Storage) == "undefined") {
              alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
              sessionStorage.setItem("weatherRegistered", JSON.stringify(outPutData[1]));
              $scope.toSignUpWeather = false;
              $scope.isRegistered = true;
            }
          } else {
            if (!angular.isArray(outPutData[1])) {
              alert("There has been an error");
            }
          }
        });

      }
    }

    this.sessionWeatherStation = function() {

      var auxWeather = JSON.parse(sessionStorage.getItem("connectedUser"));

      var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
        controllerType: 1,
        action: 20011,
        jsonData: JSON.stringify(auxWeather.user_id)
      });

      promise.then(function(outPutData) {
        if (outPutData[0] === true) {
          var weatherst = new weatherstObj();
          weatherst.construct(outPutData[1][0].weather_id, outPutData[1][0].user_id, outPutData[1][0].model, outPutData[1][0].name, outPutData[1][0].log_path);

          sessionStorage.setItem("weatherRegistered", JSON.stringify(outPutData[1][0]));
        } else {
          if (angular.isArray(outPutData[1])) {
            showErrors(outPutData[1]);
          } else {
            //alert("Error in the server");
          }
        }
      });
    }

    /**
     * [checkSession to disallow users not registered or logged get into app]
     */
    this.checkSession = function() {
      if (typeof(Storage) == "undefined") {
        alert("Your browser is not compatible with sessions. Change or update your current browser");
      } else {
        if (sessionStorage.length > 0) {} else {
          window.open("index.html", "_self");
        }
      }
    }

    this.connectionDestroy = function() {

      if (typeof(Storage) == "undefined") {
        alert("Your browser is not compatible with sessions. Change or update your current browser");
      } else {
        sessionStorage.removeItem("connectedUser");
        sessionStorage.removeItem("weatherRegistered");

        //destroy server session
        var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
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
              window.open("index.html", "_self");
            }
          }
        });
      }
    }

    this.wsSignUp = function() {

      $scope.weatherstAux = angular.copy($scope.weatherst);
      $scope.user = angular.copy($scope.user);

      var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));
      var path = "weatherStations/User-" + objAux.user_id + "-" + $scope.weatherstAux.name + "/";

      $scope.weatherstAux.construct("", objAux.user_id, $scope.weatherstAux.model, $scope.weatherstAux.name, path);

      var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
        controllerType: 1,
        action: 20000,
        jsonData: JSON.stringify($scope.weatherstAux)
      });

      promise.then(function(outPutData) {

        if (outPutData[0] === true) {
          var weatherst = new weatherstObj();
          weatherst.construct(outPutData[1][0].weather_id, outPutData[1][0].user_id, outPutData[1][0].model, outPutData[1][0].name, outPutData[1][0].log_path);

          window.open("weatherst.html", "_self");
        } else {
          if (angular.isArray(outPutData[1])) {
            showErrors(outPutData[1]);
          } else {
            alert("There has been an error in the server, try later");
          }
        }
      });

    }

    this.loadFormRegister = function() {
      $("#buttonWsRegister").click(function(e) {
        Custombox.open({
          target: '#formRegisterWs',
          effect: 'fadein'
        });
        e.preventDefault();
      });
    }



  });


  weatherstationapp.factory("accessService", function($http, $log, $q) {
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

  weatherstationapp.directive("registerWsManagement", function() {
    return {
      restrict: 'E',
      templateUrl: "templates/register-ws-management.html",
      controller: function() {},
      controllerAs: 'registerWsManagement'
    };
  });


})();
