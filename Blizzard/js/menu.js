
Menu = function () {

    var hash = {

        initialize: function () {
            console.log('Initializing new menu');
        }

    }

    var Menu = function (options) {
        this.initialize.apply(this, arguments);
    }

    for(prop in hash){
        Menu.prototype[prop] = hash[prop];
    }

    return Funnelchart;

}