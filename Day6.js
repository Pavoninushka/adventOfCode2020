let fs = require('fs');

let file = fs.readFileSync('Day6Input.txt', 'utf8');
let data = file.toString();

const processLine = (line) => {
    let groups = [];

    for (let group of line.split("\n\n")) {
        let member = group.split("\n");
        groups.push(member);
    }
    return groups
};

const numberOfYes = (group) => {
    let result = [];

    for (let member of group) {
        for (let answer of member.split("")) {
          if (!result.includes(answer)) {
              result.push(answer);
          }
        }
    }
    return result.length;
};

const part1 = () => {
    let sumOfAnswers = 0;
    let groups = processLine(data);
    for (let group of groups) {
        sumOfAnswers += numberOfYes(group);
    }
    return sumOfAnswers;
}

console.log(`part 1 solution: ${part1()}`);
