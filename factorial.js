// Write a function to return the factorial of a given number
function factorial(n) {
    if(n == 1){
        return 1;
    } else {
        return n * factorial(n - 1);    
    }
}

// O(n)