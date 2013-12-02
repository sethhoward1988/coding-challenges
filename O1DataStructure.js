dataStructure = function () {
    
    var hashValue = {};
    var array = [];
    var length = 0;

    return {

        insert: function (value) {
            hashValue[value] = length;
            array.push(value);
            length++;          
        },

        remove: function (value) {
            // Special case, removing everything
            if(length == 1){
                hashValue = {};
                array = [];
                length = 0;
            } else {
                var switchValue = array[length - 1];
                var removeIndex = hashValue[value];
                hashValue[switchValue] = removeIndex;
                delete hashValue[value];
                array[removeIndex] = switchValue;
                array.pop();
                length--;
            }
        },

        contains: function (value) {
            if(hashValue[value] != undefined || hashValue[value] != null){
                return true;
            } else {
                return false;
            }
        },

        getRandomElement: function () {
            // We don't want to use array.length, because then it might not be O(1) depending on
            // the implementation
            return array[Math.floor(Math.random() * length)];
        }
    }
}()