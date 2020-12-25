let fs = require('fs');

let file = fs.readFileSync('Day9Input.txt', 'utf8');
let data = file.toString();

let task = data.split("\n").map(num => Number(num));

const isValid = (number, preamble) => {
    for (let i = 0; i < preamble.length; i++) {
        for (let j = i +1; j < preamble.length; j++) {
            if (number === preamble[i] + preamble [j]) {
                return true;
            }
        }
    }
    return false;
}

const part1 = () => {
    let preamble = task.slice(0, 25);

    for (let i = 25; i < task.length; i++) {
        if (!isValid(task[i], preamble)) {
            return task[i];
        }
        preamble.shift();
        preamble.push(task[i]);
    }
    throw new Error("No such number");
};

let resultOfPart1 = part1();
console.log(`part 1 solution: ${resultOfPart1}`);

function sumOfNumbers(array) {
    let result = 0;
    for (let item of array) {
        result += item;
    }
    return result;
}

const part2 = () => {
    let range = [];
    for (let number of task) {
        range.push(number);
        while (sumOfNumbers(range) > resultOfPart1) {
            range.shift();
        }
        if (sumOfNumbers(range) === resultOfPart1) {
            return Math.min(...range) + Math.max(...range);
        }
    }
}

console.log(`part 2 solution: ${part2()}`);
