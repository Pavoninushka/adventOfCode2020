let fs = require('fs');

let file = fs.readFileSync('Day10Input.txt', 'utf8');
let data = file.toString();

let task = data.split("\n").map(number => Number(number)).sort(function(a,b){
    return a - b;
});

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
} return oneJolt * threeJolt;
}

console.log(`part 1 solution: ${part1()}`);
