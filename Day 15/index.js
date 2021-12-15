const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${lowestRiskPart1(data)}`);
  console.log(`Part 2: ${lowestRiskPart2(data)}`);
});

// Part 1
const lowestRiskPart1 = (input) => {
  input = input.split("\n").map((line) => line.split("").map((d) => +d));

  const start = 0;
  const end = input.length - 1;

  return dijkstra(input, [start, start], [end, end]);
};

// Reference: Day 11
const getAdjacentNodesIndex = (i, j, arr) => {
  const adjacent = [];
  if (i > 0) {
    adjacent.push([i - 1, j]);
  }
  if (i < arr.length - 1) {
    adjacent.push([i + 1, j]);
  }

  if (j > 0) {
    adjacent.push([i, j - 1]);
  }
  if (j < arr[0].length - 1) {
    adjacent.push([i, j + 1]);
  }
  return adjacent;
};

// Reference : https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7
// Dijkstra using priority queue - https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a
const dijkstra = (graph, src = [0, 0], end) => {
  let dist = {};
  const pq = new PriorityQueue();

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      const node = [i, j];
      dist[node] = Number.POSITIVE_INFINITY;
      
      if (i == src[0] && j == src[1]) {
        pq.enqueue(`${i},${j}`, 0);
      } else {
        pq.enqueue(`${i},${j}`, Number.POSITIVE_INFINITY);
      }
    }
  }

  dist[src] = 0;

  while (pq.values.length) {
    const node = pq.dequeue().val;

    // console.log(`minimumNode ${node}`);

    const [i, j] = node.split(",").map((d) => +d);

    const adjacentNodes = getAdjacentNodesIndex(i, j, graph);

    adjacentNodes.forEach((adjNode) => {
      if (dist[node] != Number.POSITIVE_INFINITY) {
        const [row, col] = adjNode;
        const weight = graph[row][col];

        if (dist[node] + weight < dist[adjNode]) {
          dist[adjNode] = dist[node] + weight;

          pq.enqueue(`${row},${col}`, dist[node] + weight);
        }
      }
    });
  }

  return dist[end];
};

// Part 2
const lowestRiskPart2 = (input) => {
  input = input.split("\n").map((line) => line.split("").map((d) => +d));

  const graph = JSON.parse(JSON.stringify(input));

  // Extend graph horizontally 4 times
  for (let times = 0; times < 4; times++) {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        let val = input[i][j];

        if (val == 9) {
          val = 1;
        } else {
          val += 1;
        }
        input[i][j] = val;
        graph[i].push(val);
      }
    }
  }
  const newGraph = JSON.parse(JSON.stringify(graph));

  // Extend graph vertivally 4 times
  for (let times = 0; times < 4; times++) {
    for (let i = 0; i < graph.length; i++) {
      newGraph.push([]);
      for (let j = 0; j < graph[0].length; j++) {
        let val = graph[i][j];

        if (val == 9) {
          val = 1;
        } else {
          val += 1;
        }
        graph[i][j] = val;
        newGraph[newGraph.length - 1].push(val);
      }
    }
  }
  // console.log(newGraph.map(a=> a.join("")).join("\n"))

  const start = 0;
  const end = newGraph.length - 1;

  return dijkstra(newGraph, [start, start], [end, end]);
};


/* 
  Priority Queue
  Code from : https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a
*/
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}