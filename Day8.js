let fs = require('fs');

let file = fs.readFileSync('Day8Input.txt', 'utf8');
let data = file.toString();

let task = data
    .split('\n')
    .map(instruction => {
        return {
            operation: instruction.slice(0, 3),
            argument: Number(instruction.slice(4))
        };
    });

//console.log(task);

const part1 = () => {
    let accumulator = 0;
    let seenOperations = [];

    for (let i = 0; i < task.length; i++) {
        if (!seenOperations.includes(i)) {
            seenOperations.push(i);
        } else {
            return accumulator;
        }
        if (task[i].operation === "jmp" ) {
            i += task[i].argument - 1;
        } else if (task[i].operation === "nop") {
            // do nothing
        } else if (task[i].operation === "acc" ) {
            accumulator += task[i].argument;
        } else {
            throw new Error(`unknown operation: ${task[i].operation}`);
        }
    }
    throw new Error("finite loop");
};

console.log(`part 1 solution: ${part1()}`);
