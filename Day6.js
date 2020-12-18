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

const numberOfYesPart1 = (group) => {
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
        sumOfAnswers += numberOfYesPart1(group);
    }
    return sumOfAnswers;
}

console.log(`part 1 solution: ${part1()}`);

const intersection = (string1, string2) => {
    let array1 = string1.split("");
    let array2 = string2.split("");
    let resultArray = array1.filter(item => array2.includes(item));
    return resultArray.join('');
}

const numberOfYesPart2 = (group) => {
    if (group.length === 1) {
        return group[0].length;
    }
    let lastMember = group.pop();
    let secondToLastMember = group.pop();
    let oneIntersection = intersection(lastMember, secondToLastMember);
    group.push(oneIntersection);
    return numberOfYesPart2(group);
};

const part2 = () => {
    let sumOfAnswers = 0;
    let groups = processLine(data);
    for (let group of groups) {
        sumOfAnswers += numberOfYesPart2(group);
    }
    return sumOfAnswers;
}

console.log(`part 2 solution: ${part2()}`);
