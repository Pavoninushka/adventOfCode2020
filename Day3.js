let fs = require('fs');

let file = fs.readFileSync('Day3Input.txt', 'utf8');
let data = file.toString();

const processData = (data) => {
    let arrayData = [];
    for (let line of data.split("\n")) {
        let arrays = line.split("");
        arrayData.push(arrays);
    }
    return arrayData;
}

//console.log(processData(data));

const part1 = (diff_j = 3, diff_i = 1) => {
    let task = processData(data);
    let count = 0;
    let i = 0;
    let j = 0;

    while (i < task.length) {
        if (task[i][j] === "#") {
            count++;
        }
        j = (j + diff_j) % task[i].length;
        i = i + diff_i;
    }

    return count;
}

console.log(`part 1 solution: ${part1()}`);

const part2 = () => {
    let result1 = part1(1,1);
    let result2 = part1(3,1);
    let result3 = part1(5,1);
    let result4 = part1(7,1);
    let result5 = part1(1,2);
    return result1 * result2 * result3 * result4 * result5;
}

console.log(`part 2 solution: ${part2()}`)
