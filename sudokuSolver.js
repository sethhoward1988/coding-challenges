var sudoku =    [[4,3,5,2,6,9,7,8,1],
                [6,8,2,5,7,1,4,9,3],
                [1,9,7,8,3,4,5,6,2],
                [8,2,6,1,9,5,3,4,7],
                [3,7,4,6,8,2,9,1,5],
                [9,5,1,7,4,3,6,2,8],
                [5,1,9,3,2,6,8,7,4],
                [2,4,8,9,5,7,1,3,6],
                [7,6,3,4,1,8,2,5,9]];

function isSolved(sudoku) {
    
    var squares = getSquares(sudoku);

    for(var i = 0, len = squares.length; i < len; i++){
        if(!isLengthSolved(squares[i])){
            return false;
        }
    }

    for(var i = 0, len = sudoku.length; i < len; i++){
        if(!isLengthSolved(sudoku[i])){
            return false;
        }
    }

    var columns = getColumns(sudoku);

    for(var i = 0, len = columns.length; i < len; i++){
        if(!isLengthSolved(squares[i])){
            return false;
        }
    }

    return true; // Sudoku is solved

}

function getSquares(sudoku) {
    var squares = [];
    
    var rowsOfThree = []
    var index = 0;
    
    for(var i = 0, len = sudoku.length; i < len; i++){

    }


    for(var i = 0, len = sudoku[0].length; i < len; i++){
        for(var z = 0, len = sudoku.length; i < len; i++){

        }
    }

    return squares;

}

function getColumns(sudoku) {
    var columns = [];
    for(var i = 0, len = sudoku[0].length; i < len; i++){
        var column = [];
        for(var z = 0, len = sudoku.length; z < len; i++){
            column.push(sudoku[i][z]);
        }
    }
    return columns;
}

function isLengthSolved(length){

    //All numbers 1-9 are used without duplicates
    var hash = {};
    
    for(var i = 0, len = length.length; i < len; i++){
        if(hash[length[i].toString()]){
            console.log('False');
            return false; // Duplicate
        } else {
            hash[length[i].toString()] = true;
        }
    }
    console.log('true');
    return true; // properly solved

}

isSolved(sudoku);