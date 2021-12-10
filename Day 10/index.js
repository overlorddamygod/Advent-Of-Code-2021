const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    console.log(`Part 1: ${syntaxErrorScore1(data.slice())}`);
    console.log(`Part 2: ${middleScore(data.slice())}`);
});

// Part 1
const syntaxErrorScore1 = (input) => {
  const pointsMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  }
  let score = 0;
  for ( let i = 0; i < input.length; i++ ){
    const line = input[i];
    const [ isValid, brace ] = checkIsValid(line);
    // console.log(line, isValid, brace)
    if ( !isValid ) {
      score += pointsMap[brace];
    }
  }
  return score;
}

const checkIsValid = (string) => {
  const stack = [];

  const bracesMap = {
    "}": "{",
    "]": "[",
    ">": "<",
    ")": "(",
  };

  for ( let i = 0; i < string.length; i++ ) {
    const currentBrace = string[i];
    if ( Object.values(bracesMap).includes(currentBrace) ) {
      stack.push(currentBrace);
    } else {
      const popped = stack.pop();
      if ( popped != bracesMap[currentBrace] ) {
        return [ false, currentBrace];
      }
    }
  }
  return [ true, null ];
}

// Part 2
const middleScore = (input) => {
  const pointsMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  }
  
  let scores = [];
  for ( let i = 0; i < input.length; i++ ){
    const line = input[i];
    const [ isValid, remainingString ] = getRemainingString(line);
    if ( isValid ) {
      const remainingStringPoints = remainingString.reduce((sum, brace)=> {
        return sum * 5 + pointsMap[brace];
      }, 0);
      // console.log(line, remainingString, remainingStringPoints)
      scores.push(remainingStringPoints);
    }
  }
  const sortedScores = scores.sort((a,b)=>a-b);
  return sortedScores[Math.floor(sortedScores.length/2)];
}

const getRemainingString = (string) => {
  const stack = [];

  const bracesMapCloseOpen = {
    "}": "{",
    "]": "[",
    ">": "<",
    ")": "(",
  };
  const bracesMapOpenClose = {
    "{": "}",
    "[": "]",
    "<": ">",
    "(": ")",
  };

  for ( let i = 0; i < string.length; i++ ) {
    const currentBrace = string[i];
    if ( Object.values(bracesMapCloseOpen).includes(currentBrace) ) {
      stack.push(currentBrace);
    } else {
      const popped = stack.pop();
      if ( popped != bracesMapCloseOpen[currentBrace] ) {
        return [ false, null];
      }
    }
  }
  return [ true, stack.reverse().map(brace=> bracesMapOpenClose[brace]) ];
}