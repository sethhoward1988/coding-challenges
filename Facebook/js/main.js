requirejs.config({

    baseUrl: 'js',
    
    paths:{
        'backbone': 'vendor/backbone',
        'underscore': 'vendor/underscore',
        'jquery': 'vendor/jquery',
        'moment':'vendor/moment'
    },

    shim:{

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'underscore':{
            exports: '_',
            init: function(){
                var underscore = window._
                underscore.templateSettings = {
                    interpolate : /\{\{([\s\S]+?)\}\}/g,
                    evaluate: /\<\@(.+?)\@\>/gim
                };
                return _;
            }
        },

        'jquery':{
            exports: '$'
        }
    }
});

requirejs(['app'], function(AppController){
    var ac = AppController();
});
