define(['backbone'], 

    function (Backbone) {

        var EventView = Backbone.View.extend({

            className: 'event',

            eventTemplate: _.template(
                '<div class="title">{{ title }}</div>' +
                '<div class="locale">{{ locale }}</div>' +
                '<div class="description">{{ description }}</div>'
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

                // Set proper heigh/width (assigned in collections analyze function)
                this.$el.css({
                    width: this.model.width,
                    height: this.model.height
                });

                this.$el.append(el);

            }

        });

        return EventView;

});