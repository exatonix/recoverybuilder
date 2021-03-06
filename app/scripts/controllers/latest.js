'use strict';

/**
 * @ngdoc function
 * @name recoverybuilderApp.controller:LatestCtrl
 * @description
 * # LatestCtrl
 * Controller of the recoverybuilderApp
 */
angular.module('recoverybuilderApp')
  .controller('LatestCtrl', function ($scope, $log, $routeParams, devicefileservice) {
    //load current items database
    $scope.deviceName = $routeParams.deviceName;
    $scope.recoveryType = $routeParams.recoveryType;

    devicefileservice.async().then(function(data) {
    	var fileList = [];
    	
    	if( data[$scope.deviceName][$scope.recoveryType].latest !== undefined) {
            fileList.push( data[$scope.deviceName][$scope.recoveryType].latest );
        }

	    $scope.recoveryFiles = fileList;
    });
  });
