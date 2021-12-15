const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${lowestRiskPart1(data)}`);
  // console.log(`Part 2: ${lowestRiskPart2(data)}`);
});

// Part 1
const lowestRiskPart1 = (input) => {
  input = input.split("\n").map(line => line.split("").map(d => +d))

  const start = 0;
  const end = input.length - 1;

  return dijkstra(input, [start, start], [end, end])
}

// Reference: Day 11
const getAdjacentNodesIndex = (i, j, arr) => {
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

const getMinimum = (dist, visited) => {
  let min = Number.POSITIVE_INFINITY;
  let minNode;

  Object.entries(dist).forEach(([node, val]) => {
    if ( !visited[node] && dist[node] <= min ) {
      min = dist[node];
      minNode = node
    }
  })
  return minNode;
}

// Reference : https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7
const dijkstra = (graph, src = [0, 0], end) => {
  let dist = {};
  const visited = {};
  for ( let i = 0; i < graph.length; i++ ) {
    for ( let j = 0; j < graph.length; j++ ) {
      const node = [i, j];
      dist[node] = Number.POSITIVE_INFINITY;
      visited[node] = false;
    }
  }
  dist[src] = 0;

  Object.keys(dist).forEach((_, index) => {
    const node = getMinimum(dist, visited);
    
    // console.log(`minimumNode ${index+1} ${node}`)
    const [ i, j ] = node.split(",").map(d=> +d);
    visited[node] = true;

    const adjacentNodes = getAdjacentNodesIndex(i, j, graph);

    adjacentNodes.forEach(adjNode => {
      if ( !(visited[adjNode]) && dist[node] != Number.POSITIVE_INFINITY) {
        const [ row, col] = adjNode;
        
        dist[adjNode] = Math.min(dist[adjNode], dist[node] + graph[row][col]);
      }
    })
  })
  return dist[end];
}

// Part 2
const lowestRiskPart2 = (input) => {
  input = input.split("\n").map(line => line.split("").map(d => +d))

  const graph = JSON.parse(JSON.stringify(input));

  for ( let times = 0; times < 4; times++ ) {
    for ( let i = 0; i < input.length; i++ ) {
      for ( let j = 0; j < input.length; j++ ) {
        let val = input[i][j];
  
        if ( val == 9 ) {
          val = 1;
        } else {
          val += 1;
        }
        input[i][j] = val;
        graph[i].push(val)
      }
    }
  }
  const newGraph = JSON.parse(JSON.stringify(graph));

  for ( let times = 0; times < 4; times++ ) {
    for ( let i = 0; i < graph.length; i++ ) {
      newGraph.push([]);
      for ( let j = 0; j < graph[0].length; j++ ) {
        let val = graph[i][j];
  
        if ( val == 9 ) {
          val = 1;
        } else {
          val += 1;
        }
        graph[i][j] = val;
        newGraph[newGraph.length-1].push(val)
      }
    }
  }
  // console.log(newGraph.map(a=> a.join("")).join("\n"))

  const start = 0;
  const end = newGraph.length - 1;

  return dijkstra(newGraph, [start, start], [end, end])
}


// Thought of doing bfs but will be a bruteforce

// let min = Number.POSITIVE_INFINITY;

// const bfs = ( i, j, endI, endJ, arr, dist = 0, visited={}, depth = 1 ) => {
//   let queue = [];
//   visited[[i,j]] = true;

//   const adjacentNodesIndex = getAdjacentNodesIndex(i, j, arr);
//   queue = [...queue, ...adjacentNodesIndex];

//   while ( queue.length ) {
//     const popped = queue.shift();
//     const [i1, j1] = popped;
//     if ( i1 == endI && j1 == endJ ) {
//       dist += arr[i1][j1];
//       min = Math.min(min, dist)
//       dist -= arr[i1][j1];
//     } else {
//       if ( !(`${i1},${j1}` in visited) || !visited[popped] ) {
//         dist += arr[i1][j1];
//         bfs(i1, j1, endI, endJ, arr, dist, visited, depth+1)
//         dist -= arr[i1][j1];
//       }
//     }
//   }
//   visited[[i,j]] = false;
//   return visited;
// }