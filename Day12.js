let fs = require('fs');

let file = fs.readFileSync('Day12Input.txt', 'utf8');
let data = file.toString();

const process_data = (data) => {
    let array = [];
    for (let line of data.split("\n")) {
        let instruction = {
            command: line[0],
            value: Number(line.slice(1))
        };
        array.push(instruction);
    }
    return array;
}

class Ship {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = "E";
    }

    applyInstruction(instruction) {
        if (instruction.command === "N") {
            this.y += instruction.value;
        } else if (instruction.command === "S") {
            this.y -= instruction.value;
        } else if (instruction.command === "E") {
            this.x += instruction.value;
        } else if (instruction.command === "W") {
            this.x -= instruction.value;
        } else if (instruction.command === "F") {
            this.applyInstruction({
                command: this.direction,
                value: instruction.value
            });
        } else if (instruction.command === "R") {
            for (let i = 0; i < instruction.value / 90; i++) {
                this.turnRight90();
            }
        } else if (instruction.command === "L") {
            for (let i = 0; i < instruction.value / 90; i++) {
                this.turnLeft90();
            }
        }
    }

    turnRight90() {
        if (this.direction === "E") {
            this.direction = "S";
        } else if (this.direction === "S") {
            this.direction = "W";
        } else if (this.direction === "W") {
            this.direction = "N";
        } else if (this.direction === "N") {
            this.direction = "E";
        }
    }

    turnLeft90() {
        if (this.direction === "E") {
            this.direction = "N";
        } else if (this.direction === "N") {
            this.direction = "W";
        } else if (this.direction === "W") {
            this.direction = "S";
        } else if (this.direction === "S") {
            this.direction = "E";
        }
    }

    applyInstructions(instructions) {
        for (let instruction of instructions) {
            this.applyInstruction(instruction);
        }
    }

    get manhattanDistance() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}

const part1 = () => {
    let ship = new Ship();
    let instructions = process_data(data);
    ship.applyInstructions(instructions);
    return ship.manhattanDistance;
};

console.log(`part 1 solution: ${part1()}`);
