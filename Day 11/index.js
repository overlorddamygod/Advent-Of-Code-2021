const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const p1 = data.split("\n").map(line=>line.split("").map(d=>+d))
    const p2 = data.split("\n").map(line=>line.split("").map(d=>+d))
    console.log(`Part 1: ${octopusFlash(p1)}`);
    console.log(`Part 2: ${allOctopushFlash(p2)}`);
});

// Part 1
const octopusFlash = ( input ) => {
  let totalFlashes = 0;
  
  for ( let i = 0; i < 100; i++ ) {
    for ( let j = 0; j < input.length; j++ ) {
      for ( let k = 0; k < input[0].length; k++ ) {
        input[j][k]++;
      }
    }
    let flashed = {};
    for ( let j = 0; j < input.length; j++ ) {
      for ( let k = 0; k < input[0].length; k++ ) {
        if ( input[j][k] > 9 ) {
          let [flashes, hasFlashed] = bfsFlash(j, k, input);
          flashed = {...flashed, ...hasFlashed};
          totalFlashes += flashes;
        } 
      }
    }
    Object.keys(flashed).forEach(oct=> {
      const [i, j] = oct.split(",").map(d=>+d);
      input[i][j] = 0;
    })
    // console.log(`After Step ${i+1}`);
    // console.log(input.map(i=>i.join("")).join("\n"));
  }
  return totalFlashes
}

const bfsFlash = ( i, j, arr, noOfFlashes = 0, hasFlashed={} ) => {
  let queue = [];
  arr[i][j] = 0;
  noOfFlashes++;
  hasFlashed[[i,j]] = true;

  const adjacentOctopuses = getAdjacentOctopus(i, j, arr);
  queue = [...queue, ...adjacentOctopuses];

  while ( queue.length ) {
    const popped = queue.shift();
    const [i1, j1] = popped;
    if ( !(`${i1},${j1}` in hasFlashed) ) {
      arr[i1][j1]++;
    }
    if (arr[i1][j1] > 9) {
      [noOfFlashes,_] = bfsFlash(i1, j1, arr, noOfFlashes, hasFlashed);
    }
  }
  return [noOfFlashes, hasFlashed];
}

const  getAdjacentOctopus = (i, j, arr) => {
  const vals = [-1, 0, +1]; 
  const neighbours = []
  for (let i2 of vals) { 
    for (let j2 of vals) { 
      if ((j + j2) < 0 || (j + j2) >= arr[0].length) continue
      if ((i + i2) < 0 || (i + i2) >= arr.length) continue
      if ( i + i2 == i && j + j2 == j ) continue

      neighbours.push([i + i2, j + j2]); 
    } 
  } 
  return neighbours
}

// Part 2
const allOctopushFlash = ( input ) => {
  let step = 0;
  
  while (true) { 
    for ( let j = 0; j < input.length; j++ ) {
      for ( let k = 0; k < input[0].length; k++ ) {
        input[j][k]++;
      }
    }
    let flashed = {};
    for ( let j = 0; j < input.length; j++ ) {
      for ( let k = 0; k < input[0].length; k++ ) {
        if ( input[j][k] > 9 ) {
          let [_, hasFlashed] = bfsFlash(j, k, input);
          flashed = {...flashed, ...hasFlashed};
        } 
      }
    }
    Object.keys(flashed).forEach(oct=> {
      const [i, j] = oct.split(",").map(d=>+d);
      input[i][j] = 0;
    })

    // console.log(`After Step ${step+1}`);
    // console.log(input.map(i=>i.join("")).join("\n"));

    step++
    if ( Object.keys(flashed).length == (input.length * input.length)) return step;
  }
}