// 1.7

// Question

// Write an algorithm such that if an element in an MxN matrix is 0, 
// its entire row and column are set to 0

nullifyMatrix = function (matrix) {
    var nullifiedRows = [];
    var nullifiedColumns = [];
    for(var i = 0; i < matrix.length; i++){
        for(var z = 0; z < matrix[0].length; z++){
            if(matrix[i][z] == 0){
                nullifiedRows.push(i);
                nullifiedColumns.push(z);
            }
        }
    }
    for(var i = 0; i < nullifiedRows.length; i++){
        matrix = nullifyRow(matrix, nullifiedRows[i]);
    }
    for(var i = 0; i < nullifiedColumns.length; i++){
        matrix = nullifyColumn(matrix, nullifiedColumns[i]);
    }
    return matrix;
}

nullifyColumn = function (matrix, index) {
    for(var i = 0; i < matrix.length; i++){
        matrix[i][index] = 0;
    }
    return matrix;
}

nullifyRow = function (matrix, index) {
    var width = matrix[index].length
    var newRow = []
    for(var i = 0; i < width; i++){
        newRow.push(0);
    }
    matrix[index] = newRow;
    return matrix;
}

// Actual answer ends here, the rest is just for testing

createTestMatrix = function () {
    var width = getRandomInt(2,10);
    var height = getRandomInt(2,10);
    var matrix = [];
    for(var i = 0; i < width; i++){
        var row = []
        for(var z = 0; z < height; z++){
            row.push(getRandomInt(0,9));
        }
        matrix.push(row);
    }
    return matrix;
}

displayMatrix = function (matrix) {
    for(var i = 0; i < matrix.length; i++){
        console.log(matrix[i].join(' '));
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main thread

var matrix = createTestMatrix();

displayMatrix(matrix);

matrix = nullifyMatrix(matrix);
console.log('');

displayMatrix(matrix);