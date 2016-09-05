//jQuery code
$(document).ready(function() {
    $('select').material_select();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $("#btn-up-pho").hide();

    $("#cropImage").click(function() {
        $("#croppedImg").removeAttr("hidden");
        $("#btn-up-pho").show();
    })
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

    myweatherapp.controller("profileController", function($http, $scope, fileUpload, accessService) {

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

        this.activateAnimation = function() {
            $('.materialboxed').materialbox();
        }

        this.checkSession = function() {
            if (typeof(Storage) == "undefined") {
                alert("Your browser is not compatible with sessions. Change or update your current browser");
            } else {
                if (sessionStorage.length > 0) {} else {
                    window.open("../index.html", "_self");
                }
            }
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

                    //window.open("index.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }

            });
        }

        this.loadPicker = function() {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        /****************************************************************************PROFILE *************************************************************************/



        this.updateProfile = function() {
            var newsCheck = false;
            if ($("#newsletterEdit").is(":checked")) {
                newsCheck = true;
            } else {
                newsCheck = false;
            }

            var objAuxProf = JSON.parse(sessionStorage.getItem("connectedUser"));
            var userUpdate = new userObj();
            userUpdate.construct(objAuxProf.user_id, $("#userUpdateName").val(), $("#userUpdateSurname").val(), objAuxProf.nickname, $("#Autocomplete").val(), $("#userUpdateEmail").val(), $("#userUpdateBirthday").val(), $("#userUpdatePass1").val(), objAuxProf.privileges, newsCheck, objAuxProf.avatar_path);
            var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                controllerType: 0,
                action: 10099,
                jsonData: JSON.stringify(userUpdate)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {

                    var user = new userObj();
                    user.construct(objAuxProf.user_id, $("#userUpdateName").val(), $("#userUpdateSurname").val(), objAuxProf.nickname, $("#Autocomplete").val(), $("#userUpdateEmail").val(), $("#userUpdateBirthday").val(), $("#userUpdatePass1").val(), objAuxProf.privileges, newsCheck, objAuxProf.avatar_path);

                    sessionStorage.setItem("connectedUser", JSON.stringify(user));

                    window.open("profile.html", "_self");
                } else {
                    if (angular.isArray(outPutData[1])) {
                        showErrors(outPutData[1]);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }

            });
        }

        $("#cropImage").click(function() {
            $scope.thumb = 1;
        });

        $scope.renewPhoto = function() {
            var user_id = $scope.userid;
            var file = $scope.uploadPhotoProfile;
            var object = $scope.obj.selection;
            var type = file.type;
            console.log('File is ');
            console.dir(file);

            var uploadUrl = "../php/other/renewPhoto_upload.php";
            if (file.size > 2048000) {
                swal("ERROR! You must upload images with size less to 2MB!");
            } else {
                if (type == "image/png" || type == "image/jpeg") {
                    swal({
                            title: "Are you sure you want to upload this profile photo?",
                            text: "If you are sure click at OK",
                            type: "info",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function() {
                            fileUpload.uploadFileToUrl(file, uploadUrl, object, user_id, "", "", "", type);

                            setTimeout(function() {
                                //get data in json and save in objAux
                                var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));

                                var user = new userObj();
                                user.construct(objAux.user_id, objAux.name, objAux.surname, objAux.nickname, objAux.location, objAux.email, objAux.birthday, objAux.password, objAux.privileges, objAux.newsletter, objAux.avatar_path);

                                //Server connection to verify users data
                                var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                                    controllerType: 0,
                                    action: 10000,
                                    jsonData: JSON.stringify(user)
                                });
                                promise.then(function(outPutData) {
                                    if (outPutData[0] === true) {
                                        var user = new userObj();

                                        user.construct(outPutData[1][0].user_id, outPutData[1][0].name, outPutData[1][0].surname, outPutData[1][0].nickname, outPutData[1][0].location, outPutData[1][0].email, outPutData[1][0].birthday, "", "", outPutData[1][0].newsletter, outPutData[1][0].avatar_path);
                                        sessionStorage.setItem("connectedUser", JSON.stringify(user));
                                        $scope.userAvatarPath = outPutData[1][0].avatar_path;
                                        window.open("profile.html", "_self");

                                    } else {
                                        if (angular.isArray(outPutData[1])) {
                                            showErrors(outPutData[1]);
                                        } else {
                                            alert("Error in the server");
                                        }
                                    }
                                });
                                swal("Profile photo updated!");
                            }, 8000);
                            $scope.thumb = 0;
                        });
                }
            }
        }

        this.modalToUpload = function() {
            $scope.showUploadPhotos = true;
            Custombox.open({
                target: '#formToUploadPhotos',
                effect: 'fadein'
            });
        }


        $scope.uploadFile = function() {
            var user_id = $scope.userid;
            var name = $scope.nameOfPhoto;
            var file = $scope.myFile;
            var location = $scope.photoLocation;
            var date = $scope.photoTime;
            var type = file.type;

            swal({
                    title: "Are you sure you want to upload this image?",
                    text: "If you are sure click at OK",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function() {
                    console.log('file is ');
                    console.dir(file);

                    var uploadUrl = "../php/other/filePhoto_upload.php";
                    var text = $scope.name;
                    fileUpload.uploadFileToUrl(file, uploadUrl, text, user_id, name, location, date, type);
                    setTimeout(function() {
                        swal("Photo uploaded!");
                        setTimeout(function() {
                            window.open("profile.html", "_self");
                        }, 2000);
                    }, 20000);
                });
        };

        this.getPhotos = function() {

            var user = JSON.parse(sessionStorage.getItem("connectedUser"));

            var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                controllerType: 3,
                action: 40000,
                jsonData: JSON.stringify(user)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    $scope.photosArray = [];
                    for (var i = outPutData[1].length; i > 0; i--) {
                        var photos = new photoObj();
                        photos.construct(outPutData[1][i - 1].photo_id, outPutData[1][i - 1].userid, outPutData[1][i - 1].photo_name, outPutData[1][i - 1].photo_path, outPutData[1][i - 1].photo_location, outPutData[1][i - 1].photo_type, outPutData[1][i - 1].photo_time);
                        $scope.photosArray.push(photos);
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

        this.removePhoto = function(id) {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this photo!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                            controllerType: 3,
                            action: 40010,
                            jsonData: JSON.stringify(id)
                        });
                        swal("Deleted!", "Your imaginary file has been deleted.", "success");
                        setTimeout(function() {
                            window.open("profile.html", "_self");
                        }, 2000);
                    } else {
                        swal("Cancelled", "Your imaginary file is safe :)", "error");
                    }
                });
        }

        /**************************************************************************** END PROFILE *************************************************************************/

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
