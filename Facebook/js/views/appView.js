define(['backbone','views/calendarView'], 

    function (Backbone, CalendarView) {

        var AppView = Backbone.View.extend({

            el: '#app',

            initialize: function() {
                this.render();
            },

            render: function () {
                this.calendarView = new CalendarView();
                this.$el.append(this.calendarView.$el);
            }

        });

        return AppView;

});