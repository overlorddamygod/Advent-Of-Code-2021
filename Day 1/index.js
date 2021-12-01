const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n").map((d)=>+d);
    console.log(`Part 1: ${noOfDepthIncreased(data)}`);
    console.log(`Part 2: ${noOfDepthIncreasedWindowed(data)}`);
});

// Part 1
const noOfDepthIncreased = (depths) => {
    let increasedCount = 0;
    for ( let i = 1; i < depths.length; i++ ) {
        let currentDepth = depths[i];
        let previousDepth = depths[i-1];

        if ( currentDepth > previousDepth ) {
            increasedCount++;
        }
    }
    return increasedCount;
}

// Part 2
const noOfDepthIncreasedWindowed = (depths) => {
    let increasedCount = 0;
    let prevWindowSum = null;
    for ( let i = 0; i < depths.length - 2; i++ ) {
        currentWindowSum = depths[i] + depths[i+1] + depths[i+2];
        if ( prevWindowSum && currentWindowSum > prevWindowSum ) {
            increasedCount++;
        }
        prevWindowSum = currentWindowSum;
    }
    return increasedCount;
}