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

            initialize: function() {
                this.layOutDay = _.bind(this.layOutDay, this);
                window.layOutDay = this.layOutDay;
                this.eventCollection = new EventCollection();
                this.render();
            },

            render: function () {
                this.renderCalendar();
                this.layOutDay([{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}]);
            },

            layOutDay: function (events) {
                if(!events){
                    return;
                }
                this.eventCollection.reset(events);
                // Analyze the collection to get proper positioning for events
                this.eventCollection.analyzeCollection(this.options);
                this.renderEvents();
            },

            renderEvents: function () {
                var that = this;
                // Clear out existing events
                this.container.empty();
                this.eventCollection.each(function(event){
                    // Create, add, and position new events
                    var eventView = new EventView({ model: event });
                    eventView.$el.css({
                        top: event.top,
                        left: event.left
                    });
                    that.container.append(eventView.$el);
                });
            },

            renderCalendar: function () {
                // Return if the calendar is already rendered (since there is no need for dynamic calendar updating)
                if(this.calendar){
                    return;
                }

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
                    time;

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

                // Push the last hour
                segments.push({
                    hour: this.formatHour(this.options.endTime > 1200 ? this.options.endTime - 1200 : this.options.endTime),
                    midHour: '',
                    meridiem: (this.options.endTime >= 1300 ? 'PM' : 'AM')
                });

                var incrementHeight = this.options.container.height / (segments.length - 1)

                // Add the hour increment to axis and set proper spacing
                for (var i = 0; i < segments.length; i++) {
                    var increment = $(this.calendarIncrementTemplate(segments[i]));
                    increment.height(incrementHeight);
                    increment.find('.hour').height(incrementHeight / 2);
                    this.axis.append(increment);
                }
            },

            formatHour: function (hour) {
                var hour = hour.toString().split(''),
                    firstHalf = hour.slice(0, hour.length - 2),
                    secondHalf = hour.slice(hour.length - 2);

                return firstHalf.join('') + ':' + secondHalf.join('');
            }

        });

        return CalendarView;

});