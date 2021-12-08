const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(",").map(x => +x);
    console.log(`Part 1: ${leastFuel1(data.slice())}`);
    console.log(`Part 2: ${leastFuel2(data.slice())}`);
});

// Part 1
const leastFuel1 = (input) => {
    const sorted = input.sort((a,b)=>a-b);
    const median = sorted[Math.floor(sorted.length/2)];
    let fuel = 0;

    for ( const crabFuel of input ) {
        fuel += Math.abs(crabFuel - median);
    } 
    return fuel;
}

// Part 2
const leastFuel2 = (input) => {
    const mean = Math.floor(input.reduce((sum, num)=>sum+num,0)/input.length);
    let fuel = 0;

    for ( const crabFuel of input ) {
        const absDiff = Math.abs(crabFuel - mean);
        const cost = Array.from({length: absDiff}, (n, i)=> i + 1).reduce((sum, n)=> sum + n, 0);
        fuel += cost;
        console.log(`Move from ${crabFuel} to ${mean}: ${cost} fuel`)
    }
    return fuel;
}

