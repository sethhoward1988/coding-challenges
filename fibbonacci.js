// Fibbonacci Series

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