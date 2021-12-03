const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n").map(x => x.trim());
    console.log(`Part 1: ${powerConsumption(data)}`);
    console.log(`Part 2: ${lifeSupportRating(data)}`);
});

// Part 1
const powerConsumption = (report) => {
    const bitLength = report[0].length;

    let gammaRate = [];
    let epsilonRate = [];

    for ( let i = 0; i < bitLength; i++ ) {
        let zeroCount = 0;
        let oneCount = 0;
        for ( let j = 0; j < report.length; j++ ) {
            const bit = report[j][i];
            if ( bit == "0" ) zeroCount++;
            if ( bit == "1" ) oneCount++;
        }
        if (zeroCount > oneCount) {
            gammaRate.push("0");
            epsilonRate.push("1");
        } else {
            gammaRate.push("1");
            epsilonRate.push("0");
        }
    }
    gammaRate = parseInt(gammaRate.join(""), 2)
    epsilonRate = parseInt(epsilonRate.join(""), 2)
    return gammaRate * epsilonRate;
}

// Part 2
const lifeSupportRating = (report) => {
    const bitLength = report[0].length;

    let oxygen = [...report];
    let co2 = [...report];

    for ( let i = 0; i < bitLength; i++ ) {
        if ( oxygen.length == 1 ) break;

        let { "0": zeroCount, "1": oneCount } = getZeroOneCount(i, oxygen);

        if (zeroCount > oneCount) {
            oxygen = oxygen.filter(rep=> rep[i] == "0")
        } else {
            oxygen = oxygen.filter(rep=> rep[i] == "1")
        }
    }

    for ( let i = 0; i < bitLength; i++ ) {
        if ( co2.length == 1 ) break;

        let { "0": zeroCount, "1": oneCount } = getZeroOneCount(i, co2);

        if (zeroCount > oneCount) {
            co2 = co2.filter(rep=> rep[i] == "1")
        } else {
            co2 = co2.filter(rep=> rep[i] == "0")
        }
    }

    oxygenRating = parseInt(oxygen[0], 2)
    co2Rating = parseInt(co2[0], 2)

    return oxygenRating * co2Rating;
}

const getZeroOneCount = (index, binaryNumArray) => {
    let count = {
        0: 0,
        1: 0
    }
    for ( let j = 0; j < binaryNumArray.length; j++ ) {
        const bit = binaryNumArray[j][index];
        count[bit]++;
    }
    return count;
}