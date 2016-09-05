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

    var myweatherapp = angular.module("myweatherapp", ["dcbImgFallback"]);

    myweatherapp.controller("profilesController", function($http, $scope, accessService) {

        //scope
        $scope.result1 = '';
        $scope.options1 = null;
        $scope.details1 = '';



        $scope.result2 = '';
        $scope.options2 = {
            country: 'ca',
            types: '(cities)'
        };
        $scope.details2 = '';



        $scope.result3 = '';
        $scope.options3 = {
            country: 'gb',
            types: 'establishment'
        };
        $scope.details3 = '';

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
        $scope.toCreateNews = 0;
        $scope.administrator = 0;
        $scope.obj = {
            src: "",
            selection: [],
            thumbnail: false
        };
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

        this.checkSession = function() {
            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
                if (sessionStorage.length > 0) {} else {
                    window.open("index.html", "_self");
                }
            }
        }

        var url = window.location.href;
        var gettingurl = Array();
        gettingurl = url.split("?");
        var finalId = gettingurl[1].split("=");

        var currentUserObj = JSON.parse(sessionStorage.getItem("connectedUser"));
        var currentUserId = currentUserObj.user_id;

        if (finalId[1] != "") {
            if (window.location.href.indexOf("?id=" + finalId[1]) > 0) {
                if (finalId[1] == currentUserId) {
                    window.open("profile.html", "_self");
                } else {
                    this.getUser = function() {
                        var id = finalId[1];

                        var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                            controllerType: 0,
                            action: 10110,
                            jsonData: JSON.stringify(id)
                        });

                        promise.then(function(outPutData) {
                            if (outPutData[0] === true) {
                                $scope.user = new userObj();

                                $scope.user.construct(outPutData[1][0].user_id, outPutData[1][0].name, outPutData[1][0].surname, "", outPutData[1][0].location, outPutData[1][0].email, outPutData[1][0].birthday, "", "", "", outPutData[1][0].avatar_path);
                                $scope.userNS = $scope.user.name + " " + $scope.user.surname;
                            }
                        });
                    }

                    this.getPhotosProfile = function() {
                        var id = parseInt(finalId[1]);

                        var user = new userObj();
                        user.construct(id, "", "", "", "", "", "", "", "", "", "");

                        var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                            controllerType: 3,
                            action: 40000,
                            jsonData: JSON.stringify(user)
                        });

                        promise.then(function(outPutData) {
                            if (outPutData[0] === true) {
                                $scope.photosArray = [];
                                for (var i = outPutData[1].length; i > 0; i--) {
                                    $scope.photos = new photoObj();
                                    $scope.photos.construct(outPutData[1][i - 1].photo_id, outPutData[1][i - 1].userid, outPutData[1][i - 1].photo_name, outPutData[1][i - 1].photo_path, outPutData[1][i - 1].photo_location, outPutData[1][i - 1].photo_type, outPutData[1][i - 1].photo_time);
                                    $scope.photosArray.push($scope.photos);
                                }
                            } else {
                                if (angular.isArray(outPutData[1])) {
                                    showErrors(outPutData[1]);
                                } else {
                                    //alert("Error in the server");
                                }
                            }
                        })
                    }

                    this.checkAdmin = function() {
                        var userObj = JSON.parse(sessionStorage.getItem("connectedUser"));

                        if (userObj.privileges == 1) {
                            $scope.administrator = 1;
                        } else {
                            $scope.administrator = 0;
                        }
                    }

                    this.removeUser = function() {
                        $id = finalId[1];

                        swal({
                                title: "Are you sure you want to delete this user?",
                                text: "If you are bad person, click ok",
                                type: "info",
                                showCancelButton: true,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            },
                            function() {
                                var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                                    controllerType: 0,
                                    action: 10140,
                                    jsonData: JSON.stringify($id)
                                });

                                promise.then(function(outPutData) {
                                  if(outPutData[0] === true){
                                    swal("User correctly removed!");
                                    setTimeout(function() {
                                        window.open("../index.html", "_self");
                                    }, 2000);
                                  }
                                  else{
                                    swal("There has been an error!");
                                  }
                                });
                            });
                    }

                    this.givePrivileges = function() {
                        $id = finalId[1];

                        swal({
                                title: "Are you sure you want to give privileges to this user?",
                                text: "If you are a cool person, click ok",
                                type: "info",
                                showCancelButton: true,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            },
                            function() {
                                var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                                    controllerType: 0,
                                    action: 10150,
                                    jsonData: JSON.stringify($id)
                                });

                                promise.then(function(outPutData) {
                                  if(outPutData[0] === true){
                                    swal("User correctly updated!");
                                    setTimeout(function() {
                                        window.open("../index.html", "_self");
                                    }, 2000);
                                  }
                                  else{
                                    swal("There has been an error!");
                                  }
                                });
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

                    this.activateAnimation = function() {
                        $('.materialboxed').materialbox();
                    }
                }
            } else {
                swal("Bad URL!");
                setTimeout(function() {
                    window.open("../index.html", "_self");
                }, 1000);
            }
        } else {
            swal("Bad URL!");
            setTimeout(function() {
                window.open("../index.html", "_self");
            }, 1000);
        }

        /*FINAL ANGULAR CODE*/
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
