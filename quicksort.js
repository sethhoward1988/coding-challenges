// QuickSort Example

var array = [4,2,6,5,3,9];

// [2,3,4,5,6,9]
function quickSort (array) {
    var pivot = parseInt(array.length / 2, 10);
    var startPointer = 0;
    var endPointer = array.length - 1;
    while(array[startPointer] < )
}





function bubbleSort(array){
    var start = ++
    var sorted = false;
    var passCount = 0;
    while(!sorted){
        // Make a pass
        sorted = true;
        for(var i = 0; i < array.length - passCount; i++){
            if(array[i] > array[i+1]){
                // Swap them
                var temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
                sorted = false;
            }
        }
        console.log(passCount);
        passCount++;
    }
    return array;
}