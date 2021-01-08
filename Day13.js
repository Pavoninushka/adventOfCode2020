let fs = require('fs');

let file = fs.readFileSync('Day13Input.txt', 'utf8');
let data = file.toString().replace(/,x/g, "");

const process_data = (data) => {
    let array = [];
    data.replace(/x/g, "");
    let [timestamp, buses] = data.split("\n");
    array.push(Number(timestamp));
    array.push(buses.split(",").map(item => Number(item)));
    return array;
};

const busStops = (bus, earliestTimeStamp) => {
    return {
        timeToWait: bus - earliestTimeStamp % bus,
        bus: bus
    }
};

const part1 = () => {
    let buses = process_data(data);
    let timeToWaitAndBuses = [];
    for (let bus of buses[1]) {
        timeToWaitAndBuses.push(busStops(bus, buses[0]));
    }
    let minTimeToWaitAndBus = timeToWaitAndBuses[0];
    for (let timeToWaitAndBus of timeToWaitAndBuses) {
        if (timeToWaitAndBus.timeToWait < minTimeToWaitAndBus.timeToWait) {
            minTimeToWaitAndBus = timeToWaitAndBus;
        }
    }
    return minTimeToWaitAndBus.timeToWait * minTimeToWaitAndBus.bus;
};

console.log(`part 1 solution: ${part1()}`);
