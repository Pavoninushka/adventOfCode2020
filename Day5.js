let fs = require('fs');

let file = fs.readFileSync('Day3Input.txt', 'utf8');
let data = file.toString();

let task = data
    .split('\n')
    .map(item => {
        return {
            row: item.slice(0, 7).split(""),
            column: item.slice(7).split("")
        };
    });


// FBFBBFF 44
// FBFBBFB 45


const calculateId = (ticket) => {
    let left = 63
    let right = 127

    for (let rowLetter of ticket.row) {
        if (rowLetter === "F") {
            right = (right + left) / 2;
        } else {
            left = (right + left) / 2;
        }
    }
}

const part1 = () => {
    return Math.max(...task.map(item => {
        return calculateId(item);
    }))
}
