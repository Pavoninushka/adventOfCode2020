let fs = require('fs');

let file = fs.readFileSync('Day4Input.txt', 'utf8');
let data = file.toString();

const processLine = (line) => {
    let passport = {};

    for (let pair of line.split(" ")) {
        let [property, value] = pair.split(":");
        passport[property] = value;
    }

    return passport;
}

const processData = (data) => {
    let newData = data.replace(/\n/g, " ");
    let passports = [];

    for (let line of newData.split(/\s\s\s*/)) {
        let passport = processLine(line);
        passports.push(passport);
    }

    return passports;
};

// console.log(processData(data));

const isValidPart1 = (passport) => {
    let listRequired = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    for (let item of listRequired) {
        if (!passport.hasOwnProperty(item)) {
            return false;
        }
    }
    return true;
};

const countValidPasswords = (isValid) => {
    let passports = processData(data);
    let numberOfPassports = 0;

    for (let passport of passports) {
        if (isValid(passport)) {
            numberOfPassports++;
        }
    }
    return numberOfPassports;
};

const part1 = () => {
    return countValidPasswords(isValidPart1);
};

console.log(`part 1 solution: ${part1()}`);

const isValidHgt = (value) => {
    if (value.endsWith("cm")) {
        let number = Number(value.slice(0, value.length - 2));
        return 150 <= number && number <= 193;
    }
    if (value.endsWith("in")) {
        let number = Number(value.slice(0, value.length - 2));
        return 59 <= number && number <= 76;
    }
}

const isValidPart2 = (passport) => {
    if (!(1920 <= Number(passport.byr) && Number(passport.byr) <= 2002)) {
        return false;
    }
    if (!(2010 <= Number(passport.iyr) && Number(passport.iyr) <= 2020)) {
        return false;
    }
    if (!(2020 <= Number(passport.eyr) && Number(passport.eyr) <= 2030)) {
        return false;
    }
    if (!isValidHgt(passport.hgt)) {
        return false;
    }
    if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) {
        return false;
    }
    if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl)) {
        return false;
    }
    if (!/^[0-9]{9}$/.test(passport.pid)) {
        return false;
    }

    return true;
};

const part2 = () => {
    return countValidPasswords(isValidPart2);
}

console.log(`part 2 solution: ${part2()}`);
