define(['backbone', 'models/eventModel'], 

    function(Backbone, Event){
    
    var EventCollection = Backbone.Collection.extend({

        model: Event,

        initialize: function () {
          
        },

        // The goal of this function is figure out what events are overlapping, understand the dimensions
        // of the calendar, and assign a width, height, top, and left to each event to put it in its
        // proper place
        analyzeCollection: function (calendarOptions) {
            var minutesInCalendar = this.getMinutesInCalendar(calendarOptions.startTime, calendarOptions.endTime),
                heightPerMinute = calendarOptions.container.height / minutesInCalendar;
            
            // Firstly, let's set what we know, each models height and proper top.
            this.each(function (event) {
                event.height = Math.round((event.get('end') - event.get('start')) * heightPerMinute);
                event.top = Math.round(heightPerMinute * event.get('start'));
            });
        },

        getMinutesInCalendar: function (start, end) {
            return ((end / 100) - (start / 100)) * 60;
        }

    });

    return EventCollection;

});