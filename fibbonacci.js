// Fibbonacci Recursive
function fib(n) {
    if (n == 0 || n == 1) {
      return n;
    } else {
      return fib(n - 1) + fib(n - 2);
    }
}

// Fibbonacci Series with low memory usage
function fib(n) {
    var counter = 0,
        previous = [0,1];
    
    while(counter != n){
        previous.push(previous[0] + previous[1]);
        previous.shift();
        counter++;
    }

    return previous[0];
}

// Time Complexity
// O(n)

// Ideally you would memoize this
memo = [];

function fib(n) {
    var counter, previous;

    if(memo[n]){
        return memo[n];
    } else if(memo.length) {
        // If we don't have it, pick up from the last one we do have
        counter = memo.length;
        previous = memo.slice(memo.length - 1, 2);
    } else {
        // Worst case, memo is empty
        counter = 0,
        previous = [0,1];
    }
    
    while(counter != n){
        var nthResult = previous[0] + previous[1];
        memo[counter] = nthResult;
        previous.push(nthResult);
        previous.shift();
        counter++;
    }
    return previous[0];
}