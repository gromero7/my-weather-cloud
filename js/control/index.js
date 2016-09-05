//jQuery code
$(document).ready(function() {

    //to allow open the material select
    $('select').material_select();

    //to allow swipe navbar in mobile widths
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $("#btn-up-pho").hide();
});


//Angular code
(function() {
    var myweatherapp = angular.module("myweatherapp", ["ng-currency", "ngAutocomplete", "dcbImgFallback", "ngJcrop"]);

    myweatherapp.config(function(ngJcropConfigProvider) {

        // Used to differ the uplaod example
        ngJcropConfigProvider.setJcropConfig('upload', {
            bgColor: 'black',
            bgOpacity: .4,
            aspectRatio: 1,
            maxWidth: 600,
            maxHeight: 600
        });
    });

    myweatherapp.controller("sessionController", function($http, $scope, fileUpload, accessService) {

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
        $scope.loginSucc = 1;
        $scope.loginRec = 0;
        $scope.session = false;
        $scope.obj = {
            src: "",
            selection: [],
            thumbnail: false
        };
        $scope.thumb = 1;


        /**
         * [check if session is initialized]
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
                            $scope.userAvatarPath = outPutData[1].avatar_path;
                            $scope.session = true;
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

        /**
         * [check if session is created. If not it redirect you to main page]
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

        /**
         * [function to log in into application]
         */
        this.connection = function() {
            //copy
            $scope.user = angular.copy($scope.user);

            //Server connection to verify users data
            var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10055,
                jsonData: JSON.stringify($scope.user)
            });
            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    var user = new userObj();

                    user.construct(outPutData[1][0].user_id, outPutData[1][0].name, outPutData[1][0].surname, outPutData[1][0].nickname, outPutData[1][0].location, outPutData[1][0].email, outPutData[1][0].birthday, outPutData[1][0].password, outPutData[1][0].privileges, outPutData[1][0].newsletter, outPutData[1][0].avatar_path);

                    sessionStorage.setItem("connectedUser", JSON.stringify(user));

                    window.open("index.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("Error in the server");
                    }
                }
            });
        }

        /**
         * [function for log out of application]
         */
        this.connectionDestroy = function() {

            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
                sessionStorage.removeItem("connectedUser");

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

        /**
         * [function for register a user]
         */
        this.registerUser = function() {

            //copy user
            $scope.user = angular.copy($scope.user);

            var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
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

                    window.open("index.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }

            });
        }

        //load the date picker
        this.loadPicker = function() {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        /**
         * [function for search profiles]
         */
        this.searchProfiles = function() {

            var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10100,
                jsonData: {
                    none: ""
                }
            });

            promise.then(function(outPutData) {
                if (outPutData[0] == true) {
                    $scope.usersArrayProfile = [];
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var user = new userObj();
                        user.construct(outPutData[1][i].user_id, outPutData[1][i].name, outPutData[1][i].surname, outPutData[1][i].nickname, outPutData[1][i].location, outPutData[1][i].email, outPutData[1][i].birthday, outPutData[1][i].password, outPutData[1][i].privileges, outPutData[1][i].newsletter, outPutData[1][i].avatar_path);
                        $scope.usersArrayProfile.push(user);
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

        /**************************************************************************** NEWS *************************************************************************/

        /**
         * [function for show the news in the main page]
         */
        this.newsToShow = function() {

            $scope.news = angular.copy($scope.news);
            $scope.newsArray = angular.copy($scope.newsArray);

            var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
                controllerType: 2,
                action: 30000,
                jsonData: {
                    none: ""
                }
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    $scope.newsArray = [];
                    for (var i = outPutData[1].length; i > 0; i--) {
                        var news = new newObj();
                        news.construct(outPutData[1][i - 1].new_id, outPutData[1][i - 1].title, outPutData[1][i - 1].description, outPutData[1][i - 1].photo_new_path, outPutData[1][i - 1].font);
                        $scope.newsArray.push(news);
                    }
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        //alert("Error in the server");
                    }
                }
            });
        }

        this.modalToCreateNew = function() {
            Custombox.open({
                target: '#formToCreateNews',
                effect: 'fadein'
            });
        }

        /**
         * [function for create news]
         */
        $scope.createNewsFile = function() {
            $scope.newsArray = angular.copy($scope.newsArray);

            var new_id = ($scope.newsArray.length + 1);
            var title = $scope.title_new;
            var description = $scope.desc_new;
            var file = $scope.createFile;
            var font_new = $scope.font_new;
            var type = file.type;
            console.log('File is ');
            console.dir(file);

            var uploadUrl = "php/other/fileNew_upload.php";

            if (file.size > 2048000) {
                swal("Image size too big! Please upload a photo with size minor to 2MB.");
            } else {
                if (type == "image/jpg" || type == "image/png" || type == "image/JPG" || type == "image/jpeg") {
                    swal({
                            title: "Are you sure you want to create this new?",
                            text: "If you are sure click ok!",
                            type: "info",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function() {
                            fileUpload.uploadFileToUrl(file, uploadUrl, font_new, new_id, title, description, "", "");
                            setTimeout(function() {
                                swal("New created!");
                                window.open("index.html", "_self");
                            }, 5000);
                        });
                } else {
                    swal("File you are trying to upload is not a valid image. Please upload a valid image.");
                }
            }
        };

        /**
         * [function for remove news]
         */
        this.removeNew = function(id) {

            swal({
                    title: "Are you sure you want to remove this new?",
                    text: "The news can not be recovered again.",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function() {
                    var promise = accessService.getData("php/controller/MainController.php", true, "POST", {
                        controllerType: 2,
                        action: 30010,
                        jsonData: JSON.stringify(id)
                    });

                    setTimeout(function() {
                        swal("New has been removed correctly!");
                        window.open("index.html", "_self");
                    }, 1000);
                });
        }

        /**************************************************************************** END NEWS *************************************************************************/

        $("#edit_profile").click(function() {
            $scope.editProfile = 1;
            swal("Now you can edit your profile!");
        });

    });

    myweatherapp.filter("rounded", function() {
        return function(val, to) {
            return val.toFixed(to || 0);
        }
    });

    myweatherapp.directive("loginManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/login-management.html",
            controller: function() {},
            controllerAs: 'loginManagement'
        };
    });

    myweatherapp.directive("registerManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/register-management.html",
            controller: function() {},
            controllerAs: 'registerManagement'
        };
    });

    myweatherapp.directive("newsManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/news-management.html",
            controller: function() {},
            controllerAs: 'newsManagement'
        };
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
