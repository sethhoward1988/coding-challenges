// Problem: Sending in a string, return the first instance of the second variable, a char

// strchr(char *s, char c)

// strchr("Hello", 'l')
// > 2

// strchr("Hello", 'q')
// > 5


function strchr(string, char) {

    var length = string.length;
        
    for(var i = 0; i < length; i++){
        if(char == string[i]){
            return i;
        }
    }
    
    return length;
    
}

// O(n)

// http://stackoverflow.com/questions/7425533/in-javascript-does-the-string-array-length-property-do-any-processing

// Problem two: This time, send in multiple chars and find the first instance of any char in the string

// strcspn(char *s1, char* s2)

// strchr("Hello", "Ho")
// > 0

// strchr("Hello", "lq")
// > 2

// strchr("Hello", "qr")
// > 5

// strchr("hello", 'asdfjk')

// Answer 1
function strchr2(string, values){
    var values = values.split(''),
        valuesLength = values.length,
        firstInstance = string.length,
        index;
    
    for(var i = 0; i < valuesLength; i++){
        index = strchr(string, values[i]);
        if(index < firstInstance){
            firstInstance = index;
        }
    }
    
    return firstInstance;
    
}

// Answer 2
function strchr2(string, values) {
    var values = values.split(''),
        valueLength = values.length,
        length = string.length;
    
    var characters = {};
    
    // Insert values into our chacters table
    for(var z = 0; z < valueLength; z++){
       characters[values[z]] = true;
    }
    
    for(var i = 0; i < length; i++){
        if(characters[string[i]]){
            return i;
        }
    }

    return length;
    
}

// O(n + m)
