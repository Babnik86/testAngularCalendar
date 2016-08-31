'use strict';
/**
 * @ngdoc function
 * @name testAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testAppApp
 */
angular.module('testAppApp').controller('MainCtrl', function ($scope, $filter, $http, $q, $uibModal, $timeout, MaterialCalendarData, calendarEvents) {

    $scope.events = [];
    $scope.modal = {
        open: false,
        src: '',
        title: ''
    };
    console.log("load")
    calendarEvents.events.getAllEvents().$promise.then(function (result) {
        for (var i = 0; i < result.events.length; i++) {
            $scope.setContentViaService(result.events[i]);
            $scope.events[$scope.dateToStringdate(result.events[i].date)] = result.events[i];
        }
    });


    $scope.dayFormat = "d";

    $scope.selectedDate = null;

    $scope.firstDayOfWeek = 0;
    $scope.setDirection = function (direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };



    $scope.dayClick = function (date) {
        if (MaterialCalendarData.data[$scope.dateToStringdate(date)]) {
            $scope.selectedEventKey = MaterialCalendarData.getDayKey(date);
            console.log($scope.events)
            $scope.modal = {
                open: true,
                src: '/views/modalCalendar/modalAddUsers.html',
                title: 'Register for Event'
            }
        } else {
            $scope.event = {
                date: $scope.dateToStringdate(date)
            };
            $scope.modal = {
                open: true,
                src: '/views/modalCalendar/modalRegisterContent.html',
                title: 'Create a new Event'
            }

        }
    };

    $scope.setContentViaService = function (event) {
        var date = new Date(event.date);
        MaterialCalendarData.setDayContent(date, event.title);
    }



    $scope.tooltips = false;

    $scope.createEvent = function () {
        $scope.setContentViaService($scope.event);
        $scope.events[$scope.dateToStringdate($scope.event.date)] = {
            id: Object.keys($scope.events).length + 1,
            time: $scope.event.time.hour + ":" + $scope.event.time.minute,
            date: $scope.dateToStringdate($scope.event.date),
            title: $scope.event.title,
            description: $scope.event.description,
            attenders: {}
        };
        console.log($scope.events[$scope.dateToStringdate($scope.event.date)])
    }
    $scope.addUserToEvent = function () {
        if (!$scope.events[$scope.selectedEventKey].attenders) {
            $scope.events[$scope.selectedEventKey].attenders = {};
        }
        $scope.events[$scope.selectedEventKey].attenders.push({
            id: $scope.events[$scope.selectedEventKey].attenders.length,
            name: $scope.userEvent.name,
            email: $scope.userEvent.email
        })
        console.log($scope.events[$scope.selectedEventKey].attenders)
        $scope.userEvent = {};
    }

    $scope.dateToStringdate = function (date) {
        date = new Date(date);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

});