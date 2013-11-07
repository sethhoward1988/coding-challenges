// Create a Menu Class
Menu = (function () {

    var hash = {

        initialize: function (json) {
            this.data = json.menu;
            this.el = document.createElement('div');
            this.el.className = "main-menu";
            this.render();
        },

        render: function () {
            var menu = this.createSubMenu(document.createElement('ul'), this.data);
            this.el.appendChild(menu);
        },

        createSubMenu: function (el, data, level) {
            var length = data.length;

            // Let's keep track of levels in case we want to target deeper menus with css
            if(!level){
                level = 0;
            }

            // Run through all the data at the current level
            for(var i = 0; i < length; i++){
                var currentData = data[i],
                    link = document.createElement('a'),
                    item = document.createElement('li');

                link.href = currentData.href ? currentData.href : '';
                item.innerText = currentData.title;
                link.appendChild(item);

                if(currentData.submenu){
                    var submenu = document.createElement('ul');
                    submenu.className = "submenu-" + level;
                    item.className = "has-sub-" + level;

                    // Recursively call this function to create all submenus found
                    this.createSubMenu(submenu, currentData.submenu, level + 1);
                    item.appendChild(submenu);
                }

                el.appendChild(link);
            }

            return el;

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

