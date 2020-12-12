let fs = require('fs');

let file = fs.readFileSync('Day1Input.txt', 'utf8');
let data = file.toString();

let task = data.split('\n')

// Part 1
let arrayOfNumbers = [];
for (let item of task) {
    arrayOfNumbers.push(Number(item));
}

function part1 () {
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        for (let j = i + 1; j < arrayOfNumbers.length; j++) {
            if (arrayOfNumbers[i] + arrayOfNumbers[j] === 2020) {
                return arrayOfNumbers[i] * arrayOfNumbers[j];
            }
        }
    }
}

console.log(`part 1 solution: ${part1(2020)}`);

function part2 () {
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        for (let j = i + 1; j < arrayOfNumbers.length; j++) {
            for (let k = j + 1; k < arrayOfNumbers.length; k++) {
                if (arrayOfNumbers[i] + arrayOfNumbers[j] + arrayOfNumbers[k] === 2020) {
                    return arrayOfNumbers[i] * arrayOfNumbers[j] * arrayOfNumbers[k];
                }
            }
        }
    }
}

console.log(`part 2 solution: ${part2()}`);
