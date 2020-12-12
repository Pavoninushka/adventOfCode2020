let fs = require('fs');

let file = fs.readFileSync('Day2Input.txt', 'utf8');
let data = file.toString();

const processData = (data) => {
    let arrayData = [];
    for (let line of data.split("\n")) {
        let [policy, password] = line.split(": ");
        let [start, end, letter] = policy.split(/[- ]/);
        let lineObject = {
            start: Number(start),
            end: Number(end),
            letter: letter,
            password: password
        };
        arrayData.push(lineObject);
    }
    return arrayData;
};

//console.log(processData(data));

const part1 = () => {
    let task = processData(data);
    let result = 0;
    for (let item of task) {
        let count = 0;
        for (let i = 0; i < item.password.length; i++) {
            if (item.password[i] === item.letter) {
                count++;
            }
        }
        if (count >= item.start && count <= item.end ) {
            result++;
        }
    }
    return result;
}

console.log(`part 1 solution: ${part1()}`);

// policy   password
// 17-29 f: dafsdfsf

/* let foo = {
    start: 9,
    end: 10,
    letter: "h",
    password: "foobar"
} */

const part2 = () => {
    let task = processData(data);
    let result = 0;
    for (let item of task) {
        let first = item.password[item.start - 1] === item.letter;
        let second = item.password[item.end - 1] === item.letter;
        if ((first || second) && !(first && second)) {
            result++;
        }
    }
    return result;
};

console.log(`part 2 solution: ${part2()}`);
