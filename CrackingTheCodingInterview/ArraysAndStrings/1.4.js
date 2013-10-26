// 1.4

// Question:

// Write a method to replace all spaces in a string with '%20'.
// You may assume that the string has sufficient space at the end 
// of the string to hold the additional characters, and that you are
// given the "true: length of the string."

function replace (string, length) {
    var answer = [];
    for (var i = 0; i < length; i++) {
        answer.push(string[i] === ' ' ? '%20' : string[i])
    }
    return answer.join('')
}