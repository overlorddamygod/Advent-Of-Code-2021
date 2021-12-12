const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const input = data.split("\n");
    console.log(`Part 1: ${noOfDistinctPath1(input)}`);
    console.log(`Part 2: ${noOfDistinctPath2(data.split("\n"))}`);
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
      delete visited[node];
    }
  })
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

  // return traverse2(connections, "start");
}

const traverse2 = (connections, key, visited={}, depth =1, sum=0) => {
  if ( isSmallCave(key) ) {
    if ( key in visited ) {
      visited[key] += 1;
    } else {
      visited[key] = 0;
    }
  }
  console.log(visited)
  connections[key].forEach((node)=> {
    // console.log(`1 Depth ${depth} ${key} turn ${node}`)
    if (node == "end"){
      // console.log("ENDED", node)
      sum += 1;
    }
  
    if ( (isBigCave(node) || ( !(node in visited) || visited[node] <= 1 ) )  && node != "end" ) {
      // console.log(`2 Depth ${depth} ${key} turn ${node}`)

      sum = traverse2(connections, node, visited, depth+1, sum);
      if ( node in visited ) {
        // if ( visited[node] == 1 || visited[node] == 2 ) {
          visited[node] -= 1;
          
        // }
        if ( visited[node] == 0) {
          console.log(`LOL ${node} ${visited[node]}`)
          console.log("SAD")
          delete visited[node];
        }
        // if ( visited[node] == 2 ) {
        //   visited[node] = 6;
        //   // delete visited[node]
        // }
      }
    }
  })
  // console.log()
  return sum;
}