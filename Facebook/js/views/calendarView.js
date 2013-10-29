define(['backbone','collections/eventCollection', 'views/eventView'], 

    function (Backbone, EventCollection, EventView) {

        var CalendarView = Backbone.View.extend({

            className: 'calendar',

            options: {
                container: {
                    width: 600,
                    height: 720,
                    paddingLeft: 10,
                    paddingRight: 10
                },

                eventHorizontalBorder: 5,
                eventVerticalBorder: 2,

                startTime: 900,
                endTime: 2100
            },

            calendarIncrementTemplate: _.template(
                '<div class="increment">' +
                    '<div class="hour">' +
                        '<span>{{ hour }}</span><span>{{ meridiem }}</span>' +
                    '</div>' +
                    '<div class="mid-hour">' +
                        '<span>{{ midHour }}</span>' +
                    '</div>' +
                '</div>'
            ),

            // Setup Methods --------------------------------------------

            initialize: function() {
                this.setup();
                this.eventCollection = new EventCollection();
                this.render();
            },

            setup: function () {
                this.layOutDay = _.bind(this.layOutDay, this);
                window.layOutDay = this.layOutDay;
            },

            // Rendering Methods -----------------------------------------

            render: function () {
                this.renderCalendar();
                this.layOutDay([{"start":167,"end":474},{"start":198,"end":242},{"start":125,"end":623},{"start":620,"end":658},{"start":304,"end":511},{"start":54,"end":105},{"start":420,"end":515},{"start":315,"end":376},{"start":261,"end":454}]);
                // this.layOutDay([{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}]);
                // this.testCalendar();

            },

            renderCalendar: function () {
                // Return if the calendar is already rendered (since there is no need for dynamic calendar updating)
                if(this.calendar){
                    return;
                }

                // Create axis and container, set any needed styles, append to calendar element
                this.axis = $('<div class="axis"></div>');
                this.container = $('<div class="container"></div>')
                    .css({
                        width: this.options.container.width,
                        height: this.options.container.height,
                        paddingLeft: this.options.container.paddingLeft,
                        paddingRight: this.options.container.paddingRight
                    });

                this.renderAxis();
                this.$el.append(this.axis);
                this.$el.append(this.container);

            },

            renderAxis: function () {
                var segments = [],
                    startTime = this.options.startTime,
                    time, increment, incrementHeight;

                while(startTime < this.options.endTime){
                    // Create objects for each hour on the axis
                    time = startTime > 1200 ? startTime - 1200 : startTime;
                    segments.push({
                        hour: this.formatHour(time),
                        midHour: this.formatHour(time + 30),
                        meridiem: (startTime >= 1300 ? 'PM' : 'AM')
                    });
                    startTime += 100;
                }

                incrementHeight = this.options.container.height / segments.length;

                // Push the last hour
                segments.push({
                    hour: this.formatHour(this.options.endTime > 1200 ? this.options.endTime - 1200 : this.options.endTime),
                    midHour: '',
                    meridiem: (this.options.endTime >= 1300 ? 'PM' : 'AM')
                });



                // Add the hour increment to axis and set proper spacing
                for (var i = 0; i < segments.length; i++) {
                    increment = $(this.calendarIncrementTemplate(segments[i]));

                    increment.height(incrementHeight);
                    increment.find('.hour').height(incrementHeight / 2);
                    this.axis.append(increment);
                }
            },

            renderEvents: function () {
                // The base width is how long a base element should be
                var baseWidth = this.options.container.width / this.swimLaneCount,
                    that = this;

                // Clear out existing events from the DOM
                this.container.empty();

                this.eventCollection.each(function(event){
                    // Create, add, and position new events
                    var eventView = new EventView({ model: event }),
                        eventWidth = baseWidth * event.exposure;

                    eventView.$el.css({
                        top: event.top,
                        left: (event.priority * eventWidth) + that.options.container.paddingLeft,
                        height: event.height
                    });

                    // Add some data to the element, for debugging purposes
                    eventView.$el.attr('data-priority', event.priority);
                    eventView.$el.attr('data-swimLane', that.swimLaneCount);

                    // We need to remove the border widths because they will expand the boxes and we don't want
                    // any overlapping (even a pixel) of events
                    eventView.$el.find('.event-content').width(eventWidth - that.options.eventHorizontalBorder);
                    
                    // Apeend the event to our calendar container
                    that.container.append(eventView.$el);
                });
            },

            layOutDay: function (events) {
                if(!events){
                    return;
                }
                
                // Reset the collection to release existing events
                this.eventCollection.reset(events);

                // Analyze the collection to get proper positioning for events
                this.eventCollection.analyzeCollection(this.options);
                this.swimLaneCount = this.eventCollection.getSwimLaneCount();
                
                this.renderEvents();
            },


            // Testing Methods ---------------------------------------------

            testCalendar: function () {
                var that = this,
                    counter = 25,
                    test = function () {
                        var data = that.getRandomData(counter);
                        
                        this.layOutDay(data);
                        // console.log(JSON.stringify(data));
                        console.log(data.length)
                        counter++;
                        setTimeout(function(){
                            test();
                        }, 1000);
                    };

                test();   
            },

            
            // Utility Methods -------------------------------------------
            
            formatHour: function (hour) {
                var hour = hour.toString().split(''),
                    firstHalf = hour.slice(0, hour.length - 2),
                    secondHalf = hour.slice(hour.length - 2);

                return firstHalf.join('') + ':' + secondHalf.join('');
            },

            getRandomNumberBetween: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            // Returns random layout data
            getRandomData: function (eventCount) {
                var data = [],
                    start, end;

                for(var i = 0; i < eventCount; i++) {
                    start = this.getRandomNumberBetween(0, (11 * 60));
                    end = this.getRandomNumberBetween(start, (12 * 60));
                    data.push({
                        start: start,
                        end: end,
                    });
                }

                return data;
            }

        });

        return CalendarView;

});