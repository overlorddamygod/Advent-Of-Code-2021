const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n").map(x => x.trim());
    console.log(`Part 1: ${noOfOverlaps1(data.slice())}`);
    console.log(`Part 2: ${noOfOverlaps2(data.slice())}`);
});

// Part 1
const noOfOverlaps1 = (input) => {
    const area = {};
    input.forEach(line=> {
        const [ [x1, y1], [x2, y2] ] = line.split(" -> ").map(point=>point.split(",").map(d=>+d));
        let generatedPoints;
        if ( x1 == x2 ) {
            const length = Math.abs(y2 - y1) + 1;
            const minY = Math.min(y1, y2);

            generatedPoints = Array.from({length},(p,i)=> {
                return [x1, minY + i];
            })
        } else if ( y1 == y2 ) {
            const length = Math.abs(x2 - x1) + 1;
            const minX = Math.min(x1,x2);

            generatedPoints = Array.from({length},(p,i)=> {
                return [minX + i, y1];
            })
        }
        if ( generatedPoints ) {
            generatedPoints.forEach((point)=> {
                const strigifiedPoint = point;
                if ( strigifiedPoint in area ) {
                    area[strigifiedPoint] += 1;
                } else {
                    area[strigifiedPoint] = 1;
                }
            })
        }
    })
    /* Visualizing the matrix

        const areaViz = Array.from({length:9+1},(a,i)=>Array.from({length: 9+1}, b=>"."));
        Object.entries(area).forEach((entry)=> {
            const [i, j] = entry[0].split(",").map(d=>+d)
    
            areaViz[j][i] = entry[1]
        })
    
        areaViz.forEach((ar)=> {
            console.log(ar.join(""))
        })

    */

    const overlappedCount = Object.values(area).filter(num => num > 1).length;
    return overlappedCount;
}

// Part 2
const noOfOverlaps2 = (input) => {
    const area = {};
    let max = -1;
    input.forEach((line,i)=> {
        const [ [x1, y1], [x2, y2] ] = line.split(" -> ").map(point=>point.split(",").map(d=>+d));
        max = Math.max(max, x1,x2, y1, y2)
        let generatedPoints;
        if ( x1 == x2 ) {
            const length = Math.abs(y2 - y1) + 1;
            const minY = Math.min(y1, y2);

            generatedPoints = Array.from({length},(p,i)=> {
                return [x1, minY + i];
            })
        } else if ( y1 == y2 ) {
            const length = Math.abs(x2 - x1) + 1;
            const minX = Math.min(x1,x2);

            generatedPoints = Array.from({length},(p,i)=> {
                return [minX + i, y1];
            })
        } else {
            generatedPoints = getDiagonalPoints(x1, y1, x2, y2).map(p=>p)
        }

        if ( generatedPoints ) {
            generatedPoints.forEach((point)=> {
                if ( point in area ) {
                    area[point] += 1;
                } else {
                    area[point] = 1;
                }
            })
        }
    })

    /* Visualizing the matrix

        const areaViz = Array.from({length:max+1},(a,i)=>Array.from({length: max+1}, b=>"."));
        Object.entries(area).forEach((entry)=> {
            const [i, j] = entry[0].split(",").map(d=>+d)
        
            areaViz[j][i] = entry[1]
        })
        
        areaViz.forEach((ar,i)=> {
            console.log(ar.join(""))
        })
        
    */

    const overlappedCount = Object.values(area).filter(num => num > 1).length;
    return overlappedCount;
}

const getDiagonalPoints  = (x1, y1, x2, y2) => {
    const points = [[x1,y1],[x2,y2]];
    // There must be a better way to do it.
    if ( x2 < x1 ) {
        const y = y1;
        y1 = y2;
        y2 = y;
    }
    let minX = Math.min(x1, x2);
    let maxX = Math.max(x1, x2);

    while ( minX < maxX - 1 ) {
        const y = y2 > y1 ? ++y1: --y1;
        const point = [++minX, y]
        points.push(point)
    }
    return points
  }