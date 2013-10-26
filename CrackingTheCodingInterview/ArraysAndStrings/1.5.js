// 1.5

// Question:

// Implement a method to perform basic string compression
// using the counts of repeated characters. For example,
// the string aabcccccaaa would become a2b1c5a3. If the
// "compressed" string would not become smaller than the
// original string, your method should return the original
// string.

function compress (string) {
    
    var answer = '',
        currentChar,
        count;

    for (var i = 0; i < string.length;){
        currentChar = string[i]
        count = 1;
        while (string[i + count] == currentChar){
            count++;
        }
        answer += currentChar + count;
        i += count;
    }

    return (answer.length < string.length ? answer : string );
    
}