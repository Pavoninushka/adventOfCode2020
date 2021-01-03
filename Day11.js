let fs = require('fs');

let file = fs.readFileSync('Day11Input.txt', 'utf8');
let data = file.toString();

const processData = (line) => {
    let rows = [];

    for (let allRows of line.split("\n")) {
        let row = allRows.split("");
        rows.push(row);
    }
    return rows;
}

const SHIFTS = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
    [+1, +1],
    [+1, 0],
    [+1, -1],
    [0, -1],
];

const countOccupiedAdjacent = (i, j, matrix) => {
    let result = 0;

    for (let [shiftI, shiftJ] of SHIFTS) {
        let newI = i + shiftI;
        let newJ = j + shiftJ;
        if (newI >= 0 && newI < matrix.length && matrix[newI][newJ] === "#") {
            result++;
        }
    }
    return result;
}

const countOccupiedVisible = (i, j, matrix) => {
    let result = 0;
    for (let [shiftI, shiftJ] of SHIFTS) {
        let newI = i + shiftI;
        let newJ = j + shiftJ;
        while (newI >= 0 && newI < matrix.length && newJ >= 0 && newJ < matrix[0].length) {
            if (matrix[newI][newJ] === "#") {
                result++;
                break;
            } else if (matrix[newI][newJ] === "L") {
                break;
            } else {
                newI += shiftI;
                newJ += shiftJ;
            }
        }
    }
    return result;
};

const nextState = (matrix, count, numberOccupiedSeats) => {
    let newState = [];
    for (let i = 0; i < matrix.length; i++) {
        let newRow = [];
        for (let j = 0; j < matrix[i].length; j++) {
            let currentState = matrix[i][j];
            let nextState = currentState;

            if (currentState === "L" && count(i, j, matrix) === 0) {
                nextState = "#";
            } else if (currentState === "#" && count(i, j, matrix) >= numberOccupiedSeats) {
                nextState = "L";
            }
            newRow.push(nextState);
        }
        newState.push(newRow);
    }
    return newState;
}

const isEqualMatrix = (matrix1, matrix2) => {
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1[i].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

const countOccupied = (matrix) => {
    let sumOfOccupied = 0;
    for (let row of matrix) {
        for (let seat of row) {
            if (seat === "#") {
                sumOfOccupied++;
            }
        }
    }
    return sumOfOccupied;
}

const part1Part2 = (count, numberOccupiedSeats) => {
    let currentMatrix = processData(data);

    while (true) {
        let nextMatrix = nextState(currentMatrix, count, numberOccupiedSeats);
        if (isEqualMatrix(currentMatrix, nextMatrix)) {
            break;
        }
        currentMatrix = nextMatrix;
    }
    return countOccupied(currentMatrix);
}

const part1 = () => {
    return part1Part2(countOccupiedAdjacent,4);
}

console.log(`part 1 solution: ${part1()}`);

const part2 = () => {
    return part1Part2(countOccupiedVisible,5);
}

console.log(`part 2 solution: ${part2()}`);
