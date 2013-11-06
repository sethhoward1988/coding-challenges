
Menu = (function () {

    var hash = {

        currentNodeDepth: 0,

        initialize: function (json) {
            this.data = json.menu;
            this.el = document.createElement('div');
            this.el.className = "menu"
            this.render();
        },

        render: function () {
            var menu = this.createSubMenu(this.el, this.data);
            this.el.appendChild(menu);
        },

        createSubMenu: function (el, data, level) {
            var menu = document.createElement('ul'),
                length = data.length;

            // Let's keep track of levels in case we want to target deeper menus with css
            if(!level){
                level = 0;
            }

            // Run through all the data at the current level
            for(var i = 0; i < length; i++){
                var currentData = data[i],
                    item = document.createElement('li');

                // Set the title of the current list item
                item.innerText = currentData.title;

                if(currentData.submenu){
                    item.className = "submenu-" + level;

                    // Recursively call this function to create all submenus found
                    item.appendChild(this.createSubMenu(item, currentData.submenu, level + 1));
                }

                menu.appendChild(item);
            }

            return menu;

        }

    }

    var Menu = function (options) {
        this.initialize.apply(this, arguments);
    }

    for(prop in hash){
        Menu.prototype[prop] = hash[prop];
    }

    return Menu;

})();