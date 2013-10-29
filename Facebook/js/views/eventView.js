define(['backbone'], 

    function (Backbone) {

        var EventView = Backbone.View.extend({

            className: 'event',

            eventTemplate: _.template(
                '<div class="bar"></div>' +
                '<div class="event-content">' +
                    '<div class="title">{{ title }}</div>' +
                    '<div class="locale">{{ locale }}</div>' +
                    '<div class="description">{{ description }}</div>' +
                '</div>'
            ),

            initialize: function () {
                this.render();
            },

            render: function () {
                // Render the event element
                var el = this.eventTemplate({
                        title: this.model.get('title') ? this.model.get('title') : 'Sample Item',
                        locale: this.model.get('locale') ? this.model.get('locale') : 'Sample Location',
                        description: this.model.get('description') ? this.model.get('description') : ''
                    });

                this.$el.append(el);

            }

        });

        return EventView;

});