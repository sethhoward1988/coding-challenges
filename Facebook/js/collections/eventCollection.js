define(['backbone', 'models/eventModel'], 

    function(Backbone, Event){
    
    var EventCollection = Backbone.Collection.extend({

        model: Event,

        initialize: function (authModel) {
          
        },

        analyzeCollection: function (container) {
            console.log('analyzing stuff');
        }

    });

    return EventCollection;

});