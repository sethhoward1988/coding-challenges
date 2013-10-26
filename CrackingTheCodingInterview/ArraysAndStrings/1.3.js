// 1.3
// Question:
// Given two strings, write a method to decide if one is a permutation of the other.

var permutation = function (first, second) {
    // Optimize, let's rule out some basics, as in they're not the same length
    if(first.length != second.length){
        return false;
    }

    first = first.split('').sort();
    second = second.split('').sort();

    for(var i = 0; i < first.length; i++){
        if(first[i] != second[i]){
            return false;
        }
    }

    return true;

}