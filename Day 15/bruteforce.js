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
