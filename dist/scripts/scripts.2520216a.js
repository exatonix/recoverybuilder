"use strict";angular.module("recoverybuilderApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/latest/:recoveryType/:deviceName",{templateUrl:"views/all.html",controller:"LatestCtrl"}).when("/all/:deviceName",{templateUrl:"views/all.html",controller:"AllCtrl"}).when("/requestbuild",{templateUrl:"views/requestbuild.html",controller:"RequestbuildCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("recoverybuilderApp").controller("MainCtrl",["$scope","$http","$rootScope","deviceService",function(a,b,c,d){d.async().then(function(b){a.devices=b,a.totalDevices=b.length})}]),angular.module("recoverybuilderApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("recoverybuilderApp").service("deviceService",["$log","$http",function(a,b){var c,d={async:function(){return c?a.log("Devices cached"):(a.log("items not cached"),c=b.get("https://s3.amazonaws.com/recoverybuilderwebsite/devices.json").then(function(a){return a.data})),c}};return d}]),angular.module("recoverybuilderApp").controller("LatestCtrl",["$scope","$log","$routeParams","devicefileservice",function(a,b,c,d){a.deviceName=c.deviceName,a.recoveryType=c.recoveryType,d.async().then(function(b){var c=[];void 0!==b[a.deviceName][a.recoveryType].latest&&c.push(b[a.deviceName][a.recoveryType].latest),a.recoveryFiles=c})}]),angular.module("recoverybuilderApp").controller("AllCtrl",["$scope","$routeParams","devicefileservice",function(a,b,c){a.deviceName=b.deviceName,c.async().then(function(b){var c=[];$.each(b,function(b,d){b==a.deviceName&&($.each(d.clockworkmodrecovery.files,function(a,b){c.push(b)}),$.each(d.cyanogenrecovery.files,function(a,b){c.push(b)}))}),a.recoveryFiles=c})}]),angular.module("recoverybuilderApp").service("devicefileservice",["$http","$log",function(a,b){var c,d={async:function(){return c?b.log("Devices cached"):(b.log("details not cached"),c=a.get("https://s3.amazonaws.com/recoverybuilderwebsite/devicedetails.json").then(function(a){return a.data})),c}};return d}]),angular.module("recoverybuilderApp").controller("RequestbuildCtrl",["$scope","$log","$http",function(a,b,c){a.buildDevices=[],a.recoverytype="cwmr",c.get("https://s3.amazonaws.com/recoverybuilderwebsite/cm11devices.json").then(function(b){var c=[];$.each(b.data,function(a,b){"cm-11.0"==b[1]&&c.push(b[0])}),a.buildDevices=c}),a.issueBuildRequest=function(c){var d=a.recoverytype,e=a.bootimage,f=a.koushtouch;b.log("starting build for "+c+"?email="+email+"&recoverytype="+d+"&bootimage="+e+"&koushtouch="+f),alert("Build request for "+c+" issued.  You will be emailed on completion."),"cwmr"==d?$.get("http://jenkins.unstableapps.com/job/ClockworkMod%20Recovery%20Build/buildWithParameters?token=buildrecovery&DEVICENAME="+c+"&EMAIL="+email+"&BOOTIMAGE="+e+"&KOUSHTOUCH="+f):"cm"==d?$.get("http://jenkins.unstableapps.com/job/Cyanogen%20Recovery%20Build/buildWithParameters?token=buildrecovery&DEVICENAME="+c+"&EMAIL="+email):"twrp"==d&&$.get("http://jenkins.unstableapps.com/job/TWRP%20Recovery%20Build/buildWithParameters?token=buildrecovery&DEVICENAME="+c+"&EMAIL="+email)},a.issueCustomRequest=function(){a.issueBuildRequest(a.customdevice)}}]);