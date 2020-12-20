let fs = require('fs');

let file = fs.readFileSync('Day7Input.txt', 'utf8');
let data = file.toString();

const processData = (task) => {
    let parents = new Map();

    for (let line of task.split("\n")) {
        let [parent, ...children] = line.match(/[a-z]+ [a-z]+(?= bag)/g);
        for (let child of children) {
            if (!parents.has(child)) {
                parents.set(child, [parent]);
            } else {
                parents.get(child).push(parent);
            }
        }
    }

    return parents;
}

const part1 = () => {
    let parents = processData(data);
    let result = [];
    let candidates = [...parents.get("shiny gold")];

    while (candidates.length !== 0) {
        let candidate = candidates.pop();
        if (!result.includes(candidate)) {
            result.push(candidate);
            if (parents.has(candidate)) {
                candidates.push(...parents.get(candidate));
            }
        }
    }
    return result.length;
}

console.log(`part 1 solution: ${part1()}`);
