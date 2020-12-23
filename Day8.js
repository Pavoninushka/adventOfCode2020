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

const run = () => {
    let accumulator = 0;
    let seenOperations = [];

    for (let i = 0; i < task.length; i++) {
        if (!seenOperations.includes(i)) {
            seenOperations.push(i);
        } else {
            return [false, accumulator];
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

    return [true, accumulator];
};

const part1 = () => {
    let [status, accumulator] = run();
    return accumulator;
};

console.log(`part 1 solution: ${part1()}`);

const isChangeable = (instruction) => {
    return instruction.operation === "jmp" || instruction.operation === "nop";
};

const change = (instruction) => {
    if (instruction.operation === "jmp") {
        instruction.operation = "nop";
    } else if (instruction.operation === "nop") {
        instruction.operation = "jmp";
    }
};

const part2 = () => {
    for (let instruction of task) {
        if (isChangeable(instruction)) {
            change(instruction);
            let [status, accumulator] = run();
            if (status) return accumulator;
            change(instruction);  // revert
        }
    }
    throw new Error("Cant find Broken Instruction");
};

console.log(`part 2 solution: ${part2()}`);
