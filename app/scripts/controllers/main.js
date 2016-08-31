'use strict';
/**
 * @ngdoc function
 * @name testAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testAppApp
 */
angular.module('testAppApp').controller('MainCtrl', function ($scope, $filter, calendarEvents, localStorageService) {
    $scope.events = [];
    $scope.modal = {
        open: false,
        title: ''
    };
    if (localStorageService.get("events")) {
        $scope.events = localStorageService.get("events");
    } else {
        calendarEvents.events.getAllEvents().$promise.then(function (result) {
            $scope.events = result.events;
            localStorageService.set("events", result.events);
        });
    }

    $scope.modalCloseAll = false;
    $scope.calendarOptions = {
        dayNamesLength: 1,
        mondayIsFirstDay: true,
        eventClick: function (date) {
            $scope.selectedEvent = date.event[0];
            $scope.modal = {
                open: 'registerUser',
                title: 'Register for Event'
            };
        },
        dateClick: function (date) {
            $scope.selectedDay = date;
            if (date.event.length < 1) {
                $scope.modalCloseAll = true;
                $scope.modal = {
                    open: 'addEvent',
                    title: 'Create a new Event'
                };

            }
        }
    };

    $scope.createEvent = function () {
        var newEvents = {
            id: (Math.random().toString(16) + "000000000").substr(2, 8),
            time: $scope.event.time.hour + ":" + $scope.event.time.minute,
            date: $scope.selectedDay.date,
            title: $scope.event.title,
            description: $scope.event.description,
            attenders: []
        };
        $scope.event = {};
        localStorageService.set("events", localStorageService.get("events").concat(angular.copy(newEvents)));
        $scope.selectedDay.event.push(angular.copy(newEvents));
    }

    $scope.addUserToEvent = function () {
        if (!$scope.selectedEvent.attenders) {
            $scope.selectedEvent.attenders = [];
        }

        var newUser = {
            id: (Math.random().toString(16) + "000000000").substr(2, 8),
            name: angular.copy($scope.userEvent.name),
            email: angular.copy($scope.userEvent.email)
        }
        $scope.userEvent = {};
        $scope.selectedEvent.attenders.push(angular.copy(newUser));
        var tmpLocal = localStorageService.get("events")
        $filter('getElementByProperty')('id', $scope.selectedEvent.id, tmpLocal).attenders = angular.copy($scope.selectedEvent.attenders);
        localStorageService.set("events", tmpLocal);
    }

    $scope.clearLocalStorage = function () {
        localStorageService.remove("events");
    }

});