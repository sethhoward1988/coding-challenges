Scrabble = function (words) {
    var wordlist = words;
    this.wordTree = {}

    this.recurseThroughTree = function (word, node) {
        if(!word || !word.length) {
            node.isWord = true;
            return;
        }   
        if(!node[word[0]]){
            var newNode = {};
            node[word[0]] = newNode;
            word = this.shiftWord(word);
            this.recurseThroughTree(word, newNode);
        } else {
            var nextNode = node[word[0]];
            word = this.shiftWord(word);
            this.recurseThroughTree(word, nextNode);
        }

    }

    this.shiftWord = function (word) {
        word = word.split('')
        word.splice(0,1);
        return word.join('');
    }

    for(var i = 0, len = wordlist.length; i < len; i++){
        // tree
        var word = wordlist[i].toLowerCase();
        this.recurseThroughTree(word, this.wordTree);
    }    
}

Scrabble.prototype = {

    findWords: function (array) {
        this.possibleWords = [];
        this.buildWord('', array, this.wordTree)
                // [ t, o, o, r, e, e]

        var maxLength = 0;
        var unique = {};
        var solutions = [];
        var uniqueSolutions = [];

        for(var z = 0, len = this.possibleWords.length; z < len; z++){
            var word = this.possibleWords[z];
            if(unique[word]){
                continue;
            }
            unique[word] = true;
            uniqueSolutions.push(word);

            if(word.length > maxLength){
                maxLength = word.length;
                solutions = [word];
            } else if (word.length == maxLength){
                solutions.push(word);
            }
        }
        
        return {
            solutions: solutions,
            all: uniqueSolutions
        };

    },

    buildWord: function (currentWord, array, node) {
        // [ o, o, r, e, e]
        if(node.isWord) {
            this.possibleWords.push(currentWord);
            return;
        }
        for(var i = 0, len = array.length; i < len; i++){
            var nextNode = node[array[i]]
            if(nextNode){
                var newCurrentWord = currentWord + array[i];
                var arrayClone = array.slice(0);
                arrayClone.splice(i, 1);
                this.buildWord(newCurrentWord, arrayClone, nextNode);
            }
        }
    }
}
