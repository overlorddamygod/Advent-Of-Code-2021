const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    console.log(`Part 1: ${riskLevel1(data.slice())}`);
    console.log(`Part 2: ${riskLevel2(data.slice())}`);
});

// Part 1
const riskLevel1 = (input) => {
  const locations = input.map(line=> line.split("").map(d=>+d));
  let sumRisks = 0;

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[0].length; j++) {
      const currentEl = locations[i][j];
      
      const adjacentEls = getAdjacentElements(i,j, locations);
      const isLowerThanAll = adjacentEls.every(els => currentEl < els);
      // console.log(`${i}${j} ${currentEl} : ${adjacentEls} ${isLowerThanAll}`);

      // Check if the element is lower than all the adjacent elements
      if ( isLowerThanAll ) {
        sumRisks += currentEl + 1;
      }
    }
  }
  return sumRisks;
}

const getAdjacentElements = (i,j, arr) => {
  const adjacent = []
  if ( i > 0 ) {
    adjacent.push(arr[i-1][j])
  }
  if ( i < arr.length - 1 ) {
    adjacent.push(arr[i+1][j])
  }
  
  if ( j > 0 ) {
    adjacent.push(arr[i][j-1])
  }
  if ( j < arr[0].length - 1 ) {
    adjacent.push(arr[i][j+1])
  }
  return adjacent
}

// Part 2
const riskLevel2 = (input) => {
  const locations = input.map(line=> line.split("").map(d=>+d));
  const allBasinSizes = []

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[0].length; j++) {
      const currentEl = locations[i][j];

      const adjacentEls = getAdjacentElements(i,j, locations);
      const isLowerThanAll = adjacentEls.every(els => currentEl < els);
      // Check if the element is lower than all the adjacent elements
      if ( isLowerThanAll ) {
        // Do dfs to find basin size;
        const size = dfs(i,j, locations) + 1;
        allBasinSizes.push(size);
      }
    }
  }
  // Get largest three basin sizes and multiply it.
  return allBasinSizes.sort((a,b)=>(b-a)).reduce((mul, size, i)=> i < 3 ? mul * size : mul, 1);
}

const getAdjacentElementsIndex = (i, j, arr) => {
  const adjacent = []
  if ( i > 0 ) {
    adjacent.push([i-1, j])
  }
  if ( i < arr.length - 1 ) {
    adjacent.push([i+1, j])
  }
  
  if ( j > 0 ) {
    adjacent.push([i, j-1])
  }
  if ( j < arr[0].length - 1 ) {
    adjacent.push([i, j+1])
  }
  return adjacent
}

const dfs = (i,j, arr, visitedMap= {}, size=0) => {
  const locations = getAdjacentElementsIndex(i,j, arr);
  visitedMap[[i,j]] = true;

  for ( let k = 0; k < locations.length; k++ ) {
    const [ i2, j2 ] = locations[k];
    if ( !Object.keys(visitedMap).includes(`${i2},${j2}`)) {
      if ( arr[i2][j2] > arr[i][j] && arr[i2][j2] < 9 ) {
        size++;
        size = dfs(i2,j2, arr, visitedMap, size)
      }
    }
  }
  return size;
}