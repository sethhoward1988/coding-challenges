define(['backbone'], 

    function (Backbone) {

        var EventView = Backbone.View.extend({

            className: 'event',

            eventTemplate: _.template(
                '<div class="title">{{ title }}</div>' +
                '<div class="sub-title">{{ subTitle }}</div>' +
                '<div class="description">{{ description }}</div>'
            ),

            initialize: function () {
                this.render();
            },

            render: function () {
                
            }

        });

        return EventView;

});