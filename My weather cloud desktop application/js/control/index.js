//jQuery code
$(document).ready(function() {

});



//Angular code
(function() {
    var myweatherapp = angular.module("myweatherapp", ["ng-currency"]);

    myweatherapp.controller("sessionController", function($http, $scope, fileUpload, accessService) {

        //scope
        $scope.user = new userObj();
        $scope.userAction = 0;
        $scope.myProfile = false;
        $scope.toLogIn = true;
        $scope.path;
        $scope.confirmPass;
        $scope.newsArray = new Array();
        $scope.submitProfile = false;

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
                    user.construct(objAux.user_id, objAux.name, objAux.surname, objAux.nickname, objAux.location, objAux.email, objAux.birthday, objAux.password, objAux.schedule, objAux.privileges, objAux.newsletter, objAux.avatar_path);

                    $scope.userid = user.getUserId();
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
                    $scope.userPrivileges = user.getPrivileges();
                    $scope.toLogIn = false;

                }

                var promise = accessService.getData("http://www.provenapps.cat/~daw16-18/php/controller/MainController.php", true, "POST", {
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
                            //window.open("mainWindow","_self");
                        }
                    } else {
                        if (!angular.isArray(outPutData[1])) {
                            alert("There has been an error");
                        }
                    }
                });
            }
        }

        this.checkSession = function() {
            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
                if (sessionStorage.length > 0) {} else {
                    window.open("index.html", "_self");
                }
            }
        }


        this.connection = function() {
            //copy
            $scope.user = angular.copy($scope.user);

            //Server connection to verify users data
            var promise = accessService.getData("http://www.provenapps.cat/~daw16-18/php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10055,
                jsonData: JSON.stringify($scope.user)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    var user = new userObj();

                    user.construct(outPutData[1][0].user_id, outPutData[1][0].name, outPutData[1][0].surname, outPutData[1][0].nickname, outPutData[1][0].location, outPutData[1][0].email, outPutData[1][0].birthday, "", outPutData[1][0].schedule, "", outPutData[1][0].newsletter, outPutData[1][0].avatar_path);

                    sessionStorage.setItem("connectedUser", JSON.stringify(user));

                    window.open("upload.html", "_self");
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
                sessionStorage.removeItem("weatherRegistered");

                //destroy server session
                var promise = accessService.getData("http://www.provenapps.cat/~daw16-18/php/controller/MainController.php", true, "POST", {
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

        $scope.createNewsFile = function() {

            //get data in json and save in objAux
            var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));

            var user_id = objAux.user_id;
            var file = $scope.realTimeFile;

            console.log('File is ');
            console.dir(file);

            var uploadUrl = "http://www.provenapps.cat/~daw16-18/php/other/weatherst_upload.php";
            fileUpload.uploadFileToUrl(file, uploadUrl, "", user_id, "", "", "", "");

        };

        $("#uploadButton").click(function(){
            setInterval(function(){
                $scope.createNewsFile();
            }, 60000);
        });

    });

    myweatherapp.filter("rounded",function(){
        return function(val,to){
            return val.toFixed(to || 0);
        }
    });

    myweatherapp.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    myweatherapp.service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl, name, user_id, photoname, location, date, type) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('name', name);
            fd.append('user_id', user_id);
            fd.append('photoname', photoname);
            fd.append('location', location);
            fd.append('date', date);
            fd.append('type', type);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                })
                .success(function() {
                    console.log("Success");
                })
                .error(function() {
                    console.log("Success");
                });
        }
    }]);

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
