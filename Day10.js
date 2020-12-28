let fs = require('fs');

let file = fs.readFileSync('Day10Input.txt', 'utf8');
let data = file.toString();

let task = data.split("\n").map(number => Number(number)).sort(function(a,b){
    return a - b;
});
task.unshift(0);

console.log(task);

const part1 = () => {
    let oneJolt = 1;
    let threeJolt = 1;
    for (let i = 0; i < task.length; i++) {
        if (task[i + 1] - task[i] === 1) {
            oneJolt++;
        } else if (task[i + 1] - task[i] === 3) {
            threeJolt++;
        }
    }
    return oneJolt * threeJolt;
}

console.log(`part 1 solution: ${part1()}`);

let memory = new Map();

const sumOfEnds = (i) => {
    if (memory.has(i)) {
        return memory.get(i);
    }

    if (i === task.length - 1)  {
        return 1;
    }

    let result = 0

    if (task[i + 1] - task[i] <= 3) {
        result += sumOfEnds(i + 1);
    }
    if (task[i + 2] - task[i] <= 3) {
        result += sumOfEnds(i + 2);
    }
    if (task[i + 3] - task[i] <= 3) {
        result += sumOfEnds(i + 3);
    }

    memory.set(i, result);

    return result;
}

const part2 = () => {
   return sumOfEnds(0);
}

console.log(`part 2 solution: ${part2()}`);
