const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${mostLeastDiff1(data.split("\n"), 10)}`);
  console.log(`Part 2: ${mostLeastDiff2(data.split("\n"), 40)}`);
});

// Part 1
const mostLeastDiff1 = (input, step = 1) => {
  let { polymerTemplate, rules } = parseInput(input);

  for ( let i = 0; i < step; i++ ) {
    let toBefilledTemplate = "";
    for ( let j = 0; j < polymerTemplate.length - 1; j++ ) {
      const pair = polymerTemplate[j] + polymerTemplate[j+1];
      toBefilledTemplate += pair[0] + rules[pair]
    }
    polymerTemplate = toBefilledTemplate + polymerTemplate[polymerTemplate.length -1 ];
    // console.log("Step ",i+1, polymerTemplate)
  }
  const elementCounts = polymerTemplate.split("").reduce((countMap, el) => {
    if ( el in countMap ) {
      countMap[el] += 1;
    } else {
      countMap[el] = 1;
    }
    return countMap;
  }, {})
  const { max, min } = getMinMax(elementCounts);
  return max - min;
}

const parseInput = (input) => {
  let polymerTemplate = input.shift();
  input.shift();
  const rules = {};
  for ( const rule of input ) {
    const [ el1, el2 ] = rule.split(" -> ");
    rules[el1] = el2;
  }
  return {
    polymerTemplate,
    rules
  }
}

const getMinMax = (countMap) => {
  return Object.values(countMap).reduce((maxMin, count)=> {
    return {
      max: Math.max( count, maxMin.max ),
      min: Math.min( count, maxMin.min ),
    }
  }, {max:0, min: Number.POSITIVE_INFINITY})
}

// Part 2
const mostLeastDiff2 = (input, step = 1) => {
  let { polymerTemplate, rules } = parseInput(input);

  let pairsCount = {};
  
  for ( let i = 0; i < polymerTemplate.length - 1; i++ ) {
    const pair = polymerTemplate[i] + polymerTemplate[i+1];
    if ( pair in pairsCount ) {
      pairsCount[pair] += 1;
    } else {
      pairsCount[pair] = 1;
    }
  }
  // console.log(pairsCount);
  for ( let i = 0; i < step; i++ ) {
    const allPairs = Object.fromEntries(Object.entries({...pairsCount}).filter(entry=> entry[1] > 0));

    // console.log(`Step ${i+1}`, allPairs );

    Object.keys(allPairs).forEach(pair=> {
      const toBeInserted = rules[pair];
      const currentPairCount = pairsCount[pair]
      // console.log(`${pair} insert : ${toBeInserted}`)

      const leftPair = pair[0] + toBeInserted;
      const rightPair = toBeInserted + pair[1];
      
      // console.log("NEXT", leftPair, rightPair)
      if ( leftPair in allPairs ) {
        allPairs[leftPair] += currentPairCount;
      } else {
        allPairs[leftPair] = currentPairCount;
      }
      if ( rightPair in allPairs ) {
        allPairs[rightPair] += currentPairCount;
      } else {
        allPairs[rightPair] = currentPairCount;
      }
      if ( allPairs[pair] > 0) {
        allPairs[pair] -= currentPairCount;
      }
    })
    pairsCount = allPairs;
  }

  const elementCounts = Object.entries(pairsCount).filter(([pair, val])=> val > 0).reduce((countMap, [el, count]) => {
    if ( el[0] in countMap ) {
      countMap[el[0]] += count;
    } else {
      countMap[el[0]] = count;
    }
    return countMap;
  },{});

  const lastPolymer = polymerTemplate[polymerTemplate.length-1];
  if ( lastPolymer in elementCounts ) {
    elementCounts[lastPolymer] += 1; 
  } else {
    elementCounts[lastPolymer] = 1; 
  }

  const { max, min } = getMinMax(elementCounts);
  return max - min;
}