
function longestSequence(grid) {
    var answers = []
    for(var i = 0;i < grid.length;i++){
        for(var z = 0; z < grid[i].length; z++){
            var answer = [], toContinue = true,
                currentLocation = [i,z]
                currentValue = grid[i][z]
                exhaustedLocations = [currentLocation]

            answer.push(currentValue)
            while(toContinue){
                var nextMove = findNextMove(currentValue, currentLocation, grid)
                if(nextMove.value){
                    answer.push(nextMove.value)
                    currentValue = nextMove.value
                    currentLocation = nextMove.location
                } else {
                    toContinue = false
                }
            }
            answers.push(answer)
        }
    }
    var solution = []
    var longest = 0
    for(var i = 0; i < answers.length; i++){
        if(answers[i].length > longest){
            longest = answers[i].length
            solution = [answers[i]]
        } else if (answers[i].length == longest){
            solution.push(answers[i])
        }
    }
    for(var i = 0;i<solution.length;i++){
        console.log('Possible Solution: ' + solution[i].join(' > '))
    }
}

function findNextMove(currentValue, currentLocation, grid) {
    //Sniff around for the lowest next potential move.
    var potentialMoves = [], bestValue = 0, exhaustedPosition = false,
        gridMaxLength = grid[0].length -1,
        gridMaxHeight = grid.length - 1

    
    if(currentLocation[0] - 1 >= 0){ //Top
        potentialMoves.push([currentLocation[0] - 1, currentLocation[1]])
        if(currentLocation[1] + 1 <= gridMaxLength) //TopRight
            potentialMoves.push([currentLocation[0] - 1, currentLocation[1] + 1])
        if(currentLocation[1] - 1 >= 0) //TopLeft
            potentialMoves.push([currentLocation[0] - 1, currentLocation[1] - 1])
    }
    
    if(currentLocation[1] + 1 <= gridMaxLength){ //Right
        potentialMoves.push([currentLocation[0], currentLocation[1] + 1])
    }
    
    if(currentLocation[0] + 1 <= gridMaxHeight){ //Bottom
        potentialMoves.push([currentLocation[0] + 1, currentLocation[1]])
        if(currentLocation[1] + 1 <= gridMaxLength) // BottomRight
            potentialMoves.push([currentLocation[0] + 1, currentLocation[1] + 1])
        if(currentLocation[1] - 1 >= 0) // BottomLeft
            potentialMoves.push([currentLocation[0] + 1, currentLocation[1] - 1])
    }

    if(currentLocation[0] + 1 <= gridMaxHeight){ //Left
        potentialMoves.push([currentLocation[0] + 1, currentLocation[1]])
    }

    for(var i = 0;i <potentialMoves.length; i++){
        var value = grid[potentialMoves[i][0]][potentialMoves[i][1]]
        if(!isExhausted(potentialMoves[i]) && value >= currentValue){
            if(bestValue == 0){
                bestValue = value
                exhaustedPosition = potentialMoves[i]
            } else {
                if(value < bestValue){
                    bestValue = value
                    exhaustedPosition = potentialMoves[i]
                }
            }
        }
    }
    if(bestValue){
        exhaustedLocations.push(exhaustedPosition)    
    }
    return {
        value: bestValue,
        location: exhaustedPosition
    }
}

function isExhausted (location) {
    for(var i = 0; i < exhaustedLocations.length; i++){
        if(exhaustedLocations[i][0] == location[0] && exhaustedLocations[i][1] == location[1])
            return true
    }
    return false
}

longestSequence(
    [[8,2,4]
    ,[0,7,1]
    ,[3,7,9]]
);