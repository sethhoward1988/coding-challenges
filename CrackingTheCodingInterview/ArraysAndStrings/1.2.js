// 1.2

// Question:

// Implement a function void reverse(char* str) in C or C++ which 
// reverses a null-terminated string (ending in '\0')

// We're going to simplify this by just reversing a string in JavaScript

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
}