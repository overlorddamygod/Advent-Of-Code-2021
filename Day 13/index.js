const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  const input = data.split("\n");
  console.log(`Part 1: ${noOfDots(input, 1)}`);
  console.log(`Part 2: ${noOfDots(input, null)}`);
});

/* 
  Part 1: for 1 fold pass 1 as second parameter
  Part 2: for all folds pass null or blank as second parameter
*/
const noOfDots = (input, noOfFold) => {
  const coordinates = {};
  let maxX = 0;
  let maxY = 0;

  for (const line of input) {
    const xy = line.split(",");
    if (xy.length == 2) {
      const parseXY = xy.map((d) => +d);
      coordinates[parseXY] = true;

      maxX = Math.max(maxX, parseXY[0]);
      maxY = Math.max(maxY, parseXY[1]);
    } else if (line != "") {
      let [foldAlong, unit] = line.split(" ")[2].split("=");
      unit = +unit;

      let subtractionVal = parseInt(unit * 2);
      // console.log(`${foldAlong} ${unit} ${subtractionVal}`)

      Object.keys(coordinates).forEach((coord) => {
        let [x, y] = coord.split(",").map((d) => +d);
        if (foldAlong == "y") {
          if (y > unit) {
            const newY = Math.abs(y - subtractionVal);

            coordinates[[x, newY]] = true;
            delete coordinates[`${x},${y}`];
          }
        } else if ( foldAlong == "x" ) {
          if (x > unit) {
            const newX = Math.abs(x -  subtractionVal);

            coordinates[[newX, y]] = true;
            delete coordinates[`${x},${y}`];
          }
        }
      });
      if ( foldAlong == "x" ) {
        maxX = unit;
      } else if ( foldAlong == "y" ) {
        maxY = unit;
      }

      visualize(coordinates, maxX, maxY);

      if ( noOfFold ) {
        noOfFold--;
        if ( noOfFold == 0 ) break;
      }
    } else {
      maxX +=1;
      maxY +=1;
    }
  }
  return Object.keys(coordinates).length;
};

const visualize = (coordinatesMap, maxX, maxY) => {
  for (let y = 0; y < maxY; y++) {
    let line = "";
    for (let x = 0; x < maxX; x++) {
      if (`${x},${y}` in coordinatesMap) {
        line += "# ";
      } else {
        line += ". ";
      }
    }
    console.log(line);
  }
};