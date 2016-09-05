//jQuery code
$(document).ready(function() {

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $(".errorImage").error(function() {

    }).attr("src", "../../assets/user.png");

});


//Angular code

(function() {

    var weatherstationapp = angular.module("weatherstationapp", ['chart.js', 'dcbImgFallback']);

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
                    user.construct(objAux.id, objAux.name, objAux.surname, objAux.nickname, objAux.location, objAux.email, objAux.birthday, objAux.password, objAux.privileges, objAux.newsletter, objAux.avatar_path);

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
                    $scope.userNewsletter = user.getNewsletter();

                    if (!isNaN(user.getUserId())) {
                        window.open("index.html", "_self");
                    }
                    $scope.myProfile = true;
                    $scope.toLogIn = false;
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
                        }
                    } else {
                        if (!angular.isArray(outPutData[1])) {
                            alert("There has been an error");
                        }
                    }
                });

            }
        }

        /**
         * [checkSession to disallow users not registered or logged get into app]
         */
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
                sessionStorage.removeItem("weatherRegistered");

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

        this.loadGetData = function() {
            setInterval(function() {
                $scope.getData();
            }, 60000);
        }

        $scope.getData = function() {
            $scope.sensorLost = 0;

            var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));
            var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                controllerType: 1,
                action: 20033,
                jsonData: JSON.stringify(objAux)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    $scope.weatherDataArray = [];
                    var weatherData = new weatherDataObj();
                    weatherData.construct(outPutData[1].date, outPutData[1].time, outPutData[1].temp, outPutData[1].hum, outPutData[1].dew, outPutData[1].wspeed, outPutData[1].wlatest, outPutData[1].bearing, outPutData[1].rrate, outPutData[1].rfall, outPutData[1].press, outPutData[1].currentwdir, outPutData[1].beaufortnumber, outPutData[1].windunit, outPutData[1].tempunitnodeg, outPutData[1].pressunit, outPutData[1].rainunit, outPutData[1].windrun, outPutData[1].presstrendval, outPutData[1].rmonth, outPutData[1].ryear, outPutData[1].rfallY, outPutData[1].intemp, outPutData[1].inhum, outPutData[1].wchill, outPutData[1].temptrend, outPutData[1].tempTH, outPutData[1].TtempTH, outPutData[1].tempTL, outPutData[1].TtempTL, outPutData[1].windTM, outPutData[1].TwindTM, outPutData[1].wgustTM, outPutData[1].TwgustTM, outPutData[1].pressTH, outPutData[1].TpressTH, outPutData[1].pressTL, outPutData[1].TpressTL, outPutData[1].version, outPutData[1].build, outPutData[1].wgust, outPutData[1].heatindex, outPutData[1].humidex, outPutData[1].UV, outPutData[1].ET, outPutData[1].SolarRad, outPutData[1].avgbearing, outPutData[1].rhour, outPutData[1].forecastnumber, outPutData[1].isdaylight, outPutData[1].SensorContactLost, outPutData[1].wdir, outPutData[1].cloudbasevalue, outPutData[1].cloudbaseunit, outPutData[1].apptemp, outPutData[1].SunshineHours, outPutData[1].CurrentSolarMax, outPutData[1].IsSunny);
                    $scope.weatherDataArray.push(weatherData);
                }

                if ($scope.weatherDataArray[0].isdaylight == 1) {
                    $scope.weatherDataArray[0].isdaylight = "Daylight";
                } else {
                    $scope.weatherDataArray[0].isdaylight = "Darkness";
                }

                if ($scope.weatherDataArray[0].SensorContactLost == 1) {
                    $scope.sensorLost = 1;
                } else {
                    $scope.weatherDataArray[0].SensorContactLost = "Connected";
                }
            });
        }

        this.loadCharts = function() {

            var objAux = JSON.parse(sessionStorage.getItem("connectedUser"));
            var promise = accessService.getData("../php/controller/MainController.php", true, "POST", {
                controllerType: 1,
                action: 20044,
                jsonData: JSON.stringify(objAux)
            });

            promise.then(function(outPutData) {
                if (outPutData[0] === true) {
                    $scope.weatherDataArray = [];
                    var tempPickMax = [];
                    var tempPickMin = [];
                    var pressPickMax = [];
                    var pressPickMin = [];
                    var dateToShowTempMax = [];
                    var dateToShowTempMin = [];
                    var dateToShowPressMax = [];
                    var dateToShowPressMin = [];
                    for (var i = 0; i < outPutData[1].length; i++) {
                        var weatherData = new weatherDataObj();
                        weatherData.construct(outPutData[1][i].date, outPutData[1][i].time, outPutData[1][i].temp, outPutData[1][i].hum, outPutData[1][i].dew, outPutData[1][i].wspeed, outPutData[1][i].wlatest, outPutData[1][i].bearing, outPutData[1][i].rrate, outPutData[1][i].rfall, outPutData[1][i].press, outPutData[1][i].currentwdir, outPutData[1][i].beaufortnumber, outPutData[1][i].windunit, outPutData[1][i].tempunitnodeg, outPutData[1][i].pressunit, outPutData[1][i].rainunit, outPutData[1][i].windrun, outPutData[1][i].presstrendval, outPutData[1][i].rmonth, outPutData[1][i].ryear, outPutData[1][i].rfallY, outPutData[1][i].intemp, outPutData[1][i].inhum, outPutData[1][i].wchill, outPutData[1][i].temptrend, outPutData[1][i].tempTH, outPutData[1][i].TtempTH, outPutData[1][i].tempTL, outPutData[1][i].TtempTL, outPutData[1][i].windTM, outPutData[1][i].TwindTM, outPutData[1][i].wgustTM, outPutData[1][i].TwgustTM, outPutData[1][i].pressTH, outPutData[1][i].TpressTH, outPutData[1][i].pressTL, outPutData[1][i].TpressTL, outPutData[1][i].version, outPutData[1][i].build, outPutData[1][i].wgust, outPutData[1][i].heatindex, outPutData[1][i].humidex, outPutData[1][i].UV, outPutData[1][i].ET, outPutData[1][i].SolarRad, outPutData[1][i].avgbearing, outPutData[1][i].rhour, outPutData[1][i].forecastnumber, outPutData[1][i].isdaylight, outPutData[1][i].SensorContactLost, outPutData[1][i].wdir, outPutData[1][i].cloudbasevalue, outPutData[1][i].cloudbaseunit, outPutData[1][i].apptemp, outPutData[1][i].SunshineHours, outPutData[1][i].CurrentSolarMax, outPutData[1][i].IsSunny);
                        $scope.weatherDataArray.push(weatherData);
                    }
                    var dataArray = $scope.weatherDataArray;


                    var arrayTempsMax = [];
                    var arrayTempsMin = [];
                    var arrayPressMax = [];
                    var arrayPressMin = [];
                    var datePick = dataArray[0].date;

                    //get data from all logs of accum-realtime
                    for (var i = 0; i < dataArray.length; i++) {
                        if (datePick != dataArray[i].date) {
                            arrayTempsMax.push(datePick, dataArray[i - 1].tempTH);
                            arrayTempsMin.push(datePick, dataArray[i - 1].tempTL);
                            arrayPressMax.push(datePick, dataArray[i - 1].pressTH);
                            arrayPressMin.push(datePick, dataArray[i - 1].pressTL);
                            datePick = dataArray[i].date;
                        }
                    }

                    //create 2d array with date and data
                    arrayTempsMax.push(dataArray[dataArray.length - 1].date, dataArray[dataArray.length - 1].tempTH);
                    arrayTempsMin.push(dataArray[dataArray.length - 1].date, dataArray[dataArray.length - 1].tempTL);
                    arrayPressMax.push(dataArray[dataArray.length - 1].date, dataArray[dataArray.length - 1].pressTH);
                    arrayPressMin.push(dataArray[dataArray.length - 1].date, dataArray[dataArray.length - 1].pressTL);

                    //loop for max temp
                    for (var i = 0; i < arrayTempsMax.length; i++) {
                        if (i % 2 == 0) {
                            tempPickMax.push(arrayTempsMax[i]);
                        } else {
                            dateToShowTempMax.push(arrayTempsMax[i]);
                        }
                    }

                    //loop for min temp
                    for (var i = 0; i < arrayTempsMin.length; i++) {
                        if (i % 2 == 0) {
                            tempPickMin.push(arrayTempsMin[i]);
                        } else {
                            dateToShowTempMin.push(arrayTempsMin[i]);
                        }
                    }

                    //loop for max pressure
                    for (var i = 0; i < arrayPressMax.length; i++) {
                        if (i % 2 == 0) {
                            pressPickMax.push(arrayPressMax[i]);
                        } else {
                            dateToShowPressMax.push(arrayPressMax[i]);
                        }
                    }

                    //loop for min pressure
                    for (var i = 0; i < arrayPressMin.length; i++) {
                        if (i % 2 == 0) {
                            pressPickMin.push(arrayPressMin[i]);
                        } else {
                            dateToShowPressMin.push(arrayPressMin[i]);
                        }
                    }
                    /*
                    console.log(tempPick);
                    console.log(dateToShow);

                    var d = new Date();
                    var month = new Array();
                    month[0] = "January";
                    month[1] = "February";
                    month[2] = "March";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "August";
                    month[8] = "September";
                    month[9] = "October";
                    month[10] = "November";
                    month[11] = "December";
                    var numMonth = d.getMonth();
                    var n = month[d.getMonth()];
                    var monthArray = new Array();

                    if (numMonth == 1 || numMonth == 3 || numMonth == 5 || numMonth == 7 || numMonth == 8 || numMonth == 10 || numMonth == 12) {
                        for (var i = 0; i < 32; i++) {
                            monthArray[i] = i + 1;
                        }
                    } else if (numMonth == 4 || numMonth == 6 || numMonth == 9 || numMonth == 11) {
                        for (var i = 0; i < 31; i++) {
                            monthArray[i] = i + 1;
                        }
                    }*/

                    //Max temp chart
                    var ctxTempMax = document.getElementById("chart-temperature-max");
                    var myLineChart = new Chart(ctxTempMax, {
                        type: 'line',
                        data: {
                            labels: tempPickMax,
                            datasets: [{
                                label: "Max temperature",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "#fdd835",
                                borderColor: "#f9a825",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#fdd835",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#fdd835",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: dateToShowTempMax,
                            }]
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        fullWidth: false
                    });

                    //Min temp chart
                    var ctxTempMin = document.getElementById("chart-temperature-min");
                    var myLineChart = new Chart(ctxTempMin, {
                        type: 'line',
                        data: {
                            labels: tempPickMin,
                            datasets: [{
                                label: "Min temperature",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "#fff9c4",
                                borderColor: "#ffee58",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#fff9c4",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#fff9c4",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: dateToShowTempMin,
                            }]
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        fullWidth: false
                    });


                    //Max pressure chart
                    var ctxPressMax = document.getElementById("chart-pressure-max");
                    var myLineChart = new Chart(ctxPressMax, {
                        type: 'line',
                        data: {
                            labels: pressPickMax,
                            datasets: [{
                                label: "Max pressure",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "#d81b60 ",
                                borderColor: "#ad1457",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#d81b60",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#d81b60",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: dateToShowPressMax,
                            }]
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        fullWidth: false
                    });

                    //Min pressure chart
                    var ctxPressMin = document.getElementById("chart-pressure-min");
                    var myLineChart = new Chart(ctxPressMin, {
                        type: 'line',
                        data: {
                            labels: pressPickMin,
                            datasets: [{
                                label: "Min pressure",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "#ea80fc",
                                borderColor: "#e040fb",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#ea80fc",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#ea80fc",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: dateToShowPressMin,
                            }]
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        fullWidth: false
                    });
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

    (function(ChartJsProvider) {
        ChartJsProvider.setOptions({
            colours: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        });
    });

    weatherstationapp.directive('fallbackSrc', function() {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function() {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                });
            }
        }
        return fallbackSrc;
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
            templateUrl: "../templates/register-ws-management.html",
            controller: function() {},
            controllerAs: 'registerWsManagement'
        };
    });

    weatherstationapp.directive("realtimeDataManagement", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/realtime-data-management.html",
            controller: function() {},
            controllerAs: 'realtimeDataManagement'
        };
    });


})();
