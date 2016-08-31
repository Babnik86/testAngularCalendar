'use strict';

describe('Service: calendarEvents', function () {

  // load the service's module
  beforeEach(module('testAppApp'));

  // instantiate service
  var calendarEvents;
  beforeEach(inject(function (_calendarEvents_) {
    calendarEvents = _calendarEvents_;
  }));

  it('should do something', function () {
    expect(!!calendarEvents).toBe(true);
  });

});
