'use strict';

/**
 * @ngdoc service
 * @name testAppApp.calendarEvents
 * @description
 * # calendarEvents
 * Factory in the testAppApp.
 */
angular.module('testAppApp')
    .factory('calendarEvents', function ($resource) {

        var Events = function () {
            this.getAllEvents = function () {
                var responseEvents = $resource('/scripts/events.json', {

                }, {
                    getAllEventsOptions: {
                        method: 'GET',
                        isArray: false
                    }
                });
                return responseEvents.getAllEventsOptions();

            };
        };
        return {
            events: new Events($resource)
        }
    });