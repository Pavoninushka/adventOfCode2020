let fs = require('fs');

let file = fs.readFileSync('Day5Input.txt', 'utf8');
let data = file.toString();

let task = data
    .split('\n')
    .map(item => {
        return {
            row: item.slice(0, 7).split(""),
            column: item.slice(7).split("")
        };
    });

const calculateId = (ticket) => {
    let left = 0;
    let right = 127;

    for (let rowLetter of ticket.row) {
        if (rowLetter === "F") {
            right = Math.floor((right + left) / 2);
        } else {
            left = Math.ceil((right + left) / 2);
        }
    }

    let row = left;

    left = 0;
    right = 7;

    for (let columnLetter of ticket.column) {
        if (columnLetter === "L") {
            right = Math.floor((right + left) / 2);
        } else {
            left = Math.ceil((right + left) / 2);
        }
    }

    let column = left;
    return row * 8 + column;
}

const part1 = () => {
    return Math.max(...task.map(item => {
        return calculateId(item);
    }))
}

console.log(`part 1 solution: ${part1()}`);

const part2 = () => {
    let idSet = task.map(item => calculateId(item));
    idSet.sort((a, b) => a - b);
    for (let i = 1; i < idSet.length; i++) {
        if (idSet[i] !== idSet[i - 1] + 1) {
            return idSet[i - 1] + 1;
        }
    }
};

console.log(`part 2 solution: ${part2()}`);
