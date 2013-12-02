Given the array of digits (0 is also allowed), what is the minimal sum of two integers that are made of the digits contained in the array. 
For example, array: 1 2 7 8 9. The min sum (129 + 78) should be 207

function minimalSum(digits){
    digits = digits.sort();
    length = digits.length;

    firstNum = '';
    secondNum = '';

    for(var i = 0; i < length; i++){
        if(i % 2 == 0){
            firstNum += digits[i];
        } else {
            secondNum += digits[i];
        }
    }

    console.log(firstNum + ' + ' secondNum);

}

minimalSum([1,2,7,8,9]);