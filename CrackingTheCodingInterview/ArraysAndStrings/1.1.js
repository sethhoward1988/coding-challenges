
// Question:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

String.prototype.areCharactersUnique = function () {
    // Assume true
    var response = true,
        string = this,
        uniqueCharacters = {};

    // Optimize, if value is higher than number of characters, we must be repeated somewhere! (Assuming ASCII input)
    if(string.length > 128 ){
        return false
    }

    // Iterate through characters in the string
    for(var i = 0; i < string.length; i++){
        // Check if current character is in our hash
        if(uniqueCharacters[string[i]]){
            // Character exists, exit
            response = false;
            break;
        } else {
            // Character is unique, push into hash
            uniqueCharacters[string[i]] = true;
        }
    }

    return response;

}