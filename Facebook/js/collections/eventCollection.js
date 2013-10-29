define(['backbone', 'models/eventModel'], 

    function(Backbone, Event){
    
    var EventCollection = Backbone.Collection.extend({

        model: Event,

        initialize: function () {
            
        },

        // The goal of this function is figure out what events are overlapping, understand the dimensions
        // of the calendar, and assign a width, height, top, and left to each event to put it in its
        // proper place
        analyzeCollection: function (calendarOptions, calendarSwimLaneCount) {
            var minutesInCalendar = this.getMinutesInCalendar(calendarOptions.startTime, calendarOptions.endTime),
                heightPerMinute = calendarOptions.container.height / minutesInCalendar;
            
            // Firstly, let's set what we know, each models height and proper top.
            this.each(function (event) {
                event.height = (Math.round((event.get('end') - event.get('start')) * heightPerMinute)) - calendarOptions.eventVerticalBorder;
                event.top = Math.round(heightPerMinute * event.get('start'));

                var start = event.get('start');
                var end = event.get('end');

                var overlappingEvents = this.filter(function(event){
                    return  event.get('start') >= start && event.get('start') <= end;
                })

                if(overlappingEvents.length){
                    // We've got multiple events here
                    var highestLaneCount = overlappingEvents.length
                    var highestPriority = 0;

                    // Check to see if others have a priority
                    _.each(overlappingEvents, function(overlappedEvent){
                        if(overlappedEvent.swimLaneCount > highestLaneCount){
                            highestLaneCount = overlappedEvent.swimLaneCount;
                        }
                        if(overlappedEvent.priority > highestPriority){
                            highestPriority = overlappedEvent.priority
                        }
                    });
                    event.swimLaneCount = overlappingEvents.length;
                } else {
                    // Yay, we're not double booked
                    swimLaneCount = 1;
                    priority = 0;
                }

            });

            this.each(function (event) {
                var overlappingEvents = this.filter(function(event){
                    return  event.get('start') >= start && event.get('start') <= end;
                });

                if(overlappingEvents.length){
                    // We've got multiple events here
                    var highestLaneCount = event.swimLaneCount
                    var highestPriority = event.priority;

                    // Check to see if others have a priority
                    _.each(overlappingEvents, function(overlappedEvent){
                        if(overlappedEvent.swimLaneCount > highestLaneCount){
                            highestLaneCount = overlappedEvent.swimLaneCount;
                        }
                        if(overlappedEvent.priority > highestPriority){
                            highestPriority = overlappedEvent.priority
                        }
                    });
                    event.swimLaneCount = overlappingEvents.length;
                } else {
                    // Yay, we're not double booked
                    swimLaneCount = 1;
                    priority = 0;
                }
            })

            // var swimLaneCount = 0;
            
            // Analyze every minute and find the count of the most overlapped time frame
            // for(var i = 0; i < minutesInCalendar; i++){
            //     var eventsAtMinute = this.filter(function(event){
            //         return i > event.get('start') && i < event.get('end');
            //     })

            //     if(swimLaneCount < eventsAtMinute.length){
            //         swimLaneCount = eventsAtMinute.length;
            //     }

            //     // Sort so incoming events without a priority will be placed at the beginning
            //     eventsAtMinute.sort(function (event){ return event.cid });
            //     var highestLaneCount = 0;
            //     _.each(eventsAtMinute, function (event, index) {
            //         event.priority = index;
            //         // if(!event.swimLaneCount || event.swimLaneCount < swimLaneCount){
            //         //     event.swimLaneCount = swimLaneCount;
            //         // }
            //         if(event.swimLaneCount > highestLaneCount || swimLaneCount > highestLaneCount){
            //             highestLaneCount = event.swimLaneCount > swimLaneCount ? even.swimLaneCount : swimLaneCount;
            //         }
            //     });

            //     _.each(eventsAtMinute, function (event, index) {
            //         event.swimLaneCount = highestLaneCount;
            //     })
            // }
        },

        getMinutesInCalendar: function (start, end) {
            return ((end / 100) - (start / 100)) * 60;
        }

    });

    return EventCollection;

});