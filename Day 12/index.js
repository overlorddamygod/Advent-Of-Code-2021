const fs = require("fs");

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const input = data.split("\n");
    console.log(`Part 1: ${noOfDistinctPath1(input)}`);
    console.log(`Part 2: ${noOfDistinctPath2(input)}`);
});

// Part 1
const noOfDistinctPath1 = ( input ) => {
  connections = getConnections(input);
  // console.log(connections);
  return traverse(connections, "start");
}

const getConnections = (connectionsString) => {
  const connections = {};
  connectionsString.forEach( connection => {
    const [ start, end ] = connection.split("-");

    if ( end != "start") {
      if ( start in connections ) {
        connections[start].push(end);
      } else {
        connections[start] = [end];
      }
    }
    if ( start != "start" && end != "end" ) {
      if ( end in connections ) {
        connections[end].push(start)
      } else {
        connections[end] = [start];
      }
    }
  });
  return connections;
}

const traverse = (connections, key, visited={}, depth =1, sum=0) => {
  if ( isSmallCave(key) ) {
    visited[key] = true;
  }
  connections[key].forEach((node)=> {
    // console.log(`Depth ${depth} ${key} turn ${node}`)
    if (node == "end"){
      // console.log("ENDED", node)
      sum += 1;
    }
    if ( !(node in visited) && node != "end" ) {
      sum = traverse(connections, node, visited, depth+1, sum);
    }
  })
  if ( isSmallCave(key) ) {
    delete visited[key];
  }
  return sum;
}

const isSmallCave = (cave) => {
  return /^[a-z]+$/.test(cave) && cave != "start" && cave != "end";
}
const isBigCave = (cave) => {
  return /^[A-Z]+$/.test(cave) && cave != "start";
}

// Part 2
const noOfDistinctPath2 = ( input ) => {
  connections = getConnections(input);
  // console.log(connections)
  return traverse2(connections, "start");
}
// let paths = ['start']

const traverse2 = (connections, key, visited={}, depth =1, sum=0) => {
  if ( isSmallCave(key) ) {
    if ( key in visited ) {
      visited[key] += 1;
    } else {
      visited[key] = 1;
    }
  }
  connections[key].forEach((node)=> {
    // console.log(`1 Depth ${depth} ${key} turn ${node}`)
    // paths.push(node)
    if (node == "end"){
      // console.log(paths.join(","))
      sum += 1;
    } else {
      if ( isBigCave(node) || ( !(node in visited) || visited[node] <= 1 ) )  {
        // console.log("traversing")
        const isAnyCaveVIsistedTwice = Object.entries(visited).filter(a=>a[1] == 2).length > 0;
        if ( !(isAnyCaveVIsistedTwice && visited[node] == 1) ) {
          sum = traverse2(connections, node, visited, depth+1, sum);
        }
      }
    }
    // paths.pop()
  })
  if ( isSmallCave(key) ) {
    visited[key] -= 1;
  }
  return sum;
}