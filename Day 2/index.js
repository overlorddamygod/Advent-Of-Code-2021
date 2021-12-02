const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    console.log(`Part 1: ${submarinePosition(data)}`);
    console.log(`Part 2: ${revisedSubmarinePosition(data)}`);
});

// Part 1
const submarinePosition = (commands) => {
    let horizontalPos = 0;
    let depthPos = 0;
    for ( let i = 0; i < commands.length; i++ ) {
        let [ direction, units ] = commands[i].split(" ");

        units = +units;

        switch ( direction ) {
            case "forward":
                horizontalPos += units;
                break;
            case "down":
                depthPos += units;
                break;
            case "up":
                depthPos -= units;
                break;
            default:
                throw new Error("Unreachable");
        }
    }
    return horizontalPos * depthPos;
}

// Part 2
const revisedSubmarinePosition = (commands) => {
    let horizontalPos = 0;
    let depthPos = 0;
    let aim = 0;
    for ( let i = 0; i < commands.length; i++ ) {
        let [ direction, units ] = commands[i].split(" ");

        units = +units;

        switch ( direction ) {
            case "forward":
                horizontalPos += units;
                depthPos += aim * units;
                break;
            case "down":
                aim += units;
                break;
            case "up":
                aim -= units;
                break;
            default:
                throw new Error("Unreachable");
        }
    }
    return horizontalPos * depthPos;
}