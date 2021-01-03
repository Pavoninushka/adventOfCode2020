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

class ShipWithWaypoint {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.waypoint = {
            x: 10,
            y: 1
        }
    }

    applyInstruction(instruction) {
        if (instruction.command === "N") {
            this.waypoint.y += instruction.value;
        } else if (instruction.command === "S") {
            this.waypoint.y -= instruction.value;
        } else if (instruction.command === "E") {
            this.waypoint.x += instruction.value;
        } else if (instruction.command === "W") {
            this.waypoint.x -= instruction.value;
        } else if (instruction.command === "F") {
            this.x += this.waypoint.x * instruction.value;
            this.y += this.waypoint.y * instruction.value;
        } else if (instruction.command === "R") {
            this.turn(instruction.value);
        } else if (instruction.command === "L") {
            this.turn(-instruction.value);
        }
    }

    //    y
    //    ^
    // ...|...         90               180
    // ...|..x      (x=+3, y=+1)   (x=+3, y=+1)
    // ---o--->x
    // ...|...      (x=+1, y=-3)
    // ...|...
    // ...|...      (x=-3, y=-1)

    turn(angle) {
        if (angle === 90 || angle === -270) {
            [this.waypoint.x, this.waypoint.y] = [this.waypoint.y, -this.waypoint.x];
        } else if (angle === 180 || angle === -180) {
            this.turn(90);
            this.turn(90);
        } else if  (angle === 270 || angle === -90) {
            this.turn(180);
            this.turn(90);
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

const part2 = () => {
    let ship = new ShipWithWaypoint();
    let instructions = process_data(data);
    ship.applyInstructions(instructions);
    return ship.manhattanDistance;
};

console.log(`part 2 solution: ${part2()}`);
