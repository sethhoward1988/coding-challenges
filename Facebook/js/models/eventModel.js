
define(['backbone'], 

    function(Backbone){

        var Event = Backbone.Model.extend({

            initialize: function () {
                this.priority = 0;
                this.isPositioned = false;
                this.exposure = 1;
            },

            parse: function (data) {
                // Let's not allow start and end times to be more granular
                // than one minute
                data.start = parseInt(data.start, 10);
                data.end = parseInt(data.end, 10);

                return data;
            }

        });

        return Event;

});