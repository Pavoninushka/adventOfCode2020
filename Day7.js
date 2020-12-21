let fs = require('fs');

let file = fs.readFileSync('Day7Input.txt', 'utf8');
let data = file.toString();

const processDataPart1 = (task) => {
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
    let parents = processDataPart1(data);
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

const processDataPart2 = (task) => {
    let parents = new Map();

    for (let line of task.split("\n")) {
        let [parent, ...children] = line.match(/^[a-z]+ [a-z]+|\d+ [a-z]+ [a-z]+(?= bag)/g);
        parents.set(parent, children.map(child => {
            let [quantity, color] = child.match(/^\d+|[a-z]+ [a-z]+/g);
            return {
                quantity: Number(quantity),
                color: color
            };
        }));
    }
    return parents;
};

const countPack = (color, map) => {
    let result = 0;

    for (let child of map.get(color)) {
        result += child.quantity;
        result += countPack(child.color, map) * child.quantity;
    }
    return result;
};

const part2 = () => {
    let parents = processDataPart2(data);
    return countPack("shiny gold", parents);
};

console.log(`part 2 solution: ${part2()}`);
