const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    console.log(`Part 1: ${noOf1478(data.slice())}`);
    console.log(`Part 2: ${leastFuel2(data.slice())}`);
});

// Part 1
const noOf1478 = (input) => {
    // 1 : 2
    // 4 : 4
    // 7 : 3
    // 8 : 7
    // extracting only four digits segments line
    const digits = input.map(digit => digit.split(" | ")[1].split(" "));
    const noof2347InEachLine = digits.map(d=>d.map(_d=> _d.length).filter(d=>[2,3,4,7].includes(d)).reduce((sum,d)=>sum+1,0))
    const total2347 = noof2347InEachLine.reduce((sum,a)=>sum+a,0);
    return total2347;
}

// Part 2
const leastFuel2 = (input) => {
    
}

