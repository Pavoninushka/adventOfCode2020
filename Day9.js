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

console.log(`part 1 solution: ${part1()}`);
