class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    // creating object from queue element
    let qElement = new QElement(element, priority);
    let contain = false;

    // iterating through the entire item array to add element at the correct location of the Queue
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    // return the dequeued element and remove it. if the queue is empty returns Underflow
    if (this.isEmpty())
      return "Underflow";
    return this.items.shift();
  }

  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  front() {
    // returns the highest priority element in the Priority queue without removing it.
    if (this.isEmpty())
      return "No elements in Queue";
    return this.items[0];
  }
  has(element) {
    for (let i = 0; i < this.items.length; i++) {
      if (element == this.items[i]) {
        return true
      } else {
        return false
      }
    }
  }
  rear() {
    // returns the lowest priority element of the queue
    if (this.isEmpty())
      return "No elements in Queue";
    let rear = this.items[this.items.length - 1]
    this.items.length = this.items.length - 1
    return rear;
  }
  printPQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i].element + " ";
    return str;
  }
}

let myMap = new Map();
// Creating the grid 
function grid() {
  let gridContainer = document.querySelector(".grid");
  let container = document.createElement("div");
  container.id = "main";
  container.className = "container";

  for (i = 0; i < 20; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.id = "row " + i;

    for (k = 0; k < 60; k++) {
      let box = document.createElement("div");
      box.className = "box";
      box.id = k + '-' + i;
      row.appendChild(box);
      let loc = {
        x: k,
        y: i,
        parent: null,
        fScore: Number.MAX_VALUE,
        gScore: Number.MAX_VALUE,
        aStarParent: null
      }
      myMap.set(box, loc)
    }
    container.appendChild(row);
  }
  gridContainer.appendChild(container);
}

grid();

function getNodeId(x, y) {
  let node = x + '-' + y;
  return document.getElementById(node)
}

function setCoor() {
  let startX = document.getElementById('startX').value
  let startY = document.getElementById('startY').value
  let endX = document.getElementById('endX').value
  let endY = document.getElementById('endY').value
  start = getNodeId(startX, startY);
  end = getNodeId(endX, endY);
  start.className = 'box box-start'
  end.className = 'box box-end'
}
setCoor()

function addEventListeners() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      node.addEventListener("mouseover", function () {
        node.className = 'box box-wall'
      });
    }
  }
}

function wipeBoard() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      node.style.backgroundColor = '';
      if (document.querySelector('.box-start')) {
        document.querySelector('.box-start').classList.remove('box-start')
      } else if (document.querySelector('.box-end')) {
        document.querySelector('.box-end').classList.remove('box-end')
      }
    }
  }
}

function updateCoor() {
  // set new node values
  let startX = document.getElementById('startX').value
  let startY = document.getElementById('startY').value
  let endX = document.getElementById('endX').value
  let endY = document.getElementById('endY').value
  start = getNodeId(startX, startY);
  end = getNodeId(endX, endY);

  // Wipe the board
  wipeBoard();

  //Set new start and end points
  start.className = 'box box-start';
  end.className = 'box box-end';
}

function clearGrid() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.className == 'box box-wall') {
        node.className = 'box';
      } else {
        node.className = 'box'
      }
    }
  }
  setCoor()
}

function clearPath() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-wall' || node.classList == 'box box-start' || node.classList == 'box box-end') {
        continue
      } else {
        node.className = 'box';
      }
    }
  }
  setCoor()
}

async function generateRandomObstacles(delay = 0) {
  clearGrid()
  for (i = 0; i < 11; i++) {
    for (j = 0; j < 33; j++) {
      let randX = Math.floor(Math.random() * 60);
      let randY = Math.floor(Math.random() * 20);
      let node = getNodeId(randX, randY)
      if (node.classList == 'box box-start' || node.classList == 'box box-end') {
        continue
      } else {
        node.className = 'box box-wall'
      }
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
    }
  }
}

/*
function randomizeNodePos() {
  wipeBoard()
  let startRandX = Math.floor(Math.random() * 59);
  let startRandY = Math.floor(Math.random() * 19);
  let startNode = getNodeId(startRandX, startRandY)
  let endRandX = Math.floor(Math.random() * 59);
  let endRandY = Math.floor(Math.random() * 19);
  let endNode = getNodeId(endRandX, endRandY)

  startNode.className = 'box box-start'
  endNode.className = 'box box-end'
}
*/

function draggableNodes() {
  let start = document.querySelector('.box-start').id
  let end = document.querySelector('.box-end')
  node.addEventListener("ondragstart", function () {
    node.className = 'box box-wall'
  });
}

// BREADTH FIRST SEARCH || Depth First Search || Djiksta || A *
let row = 20
let col = 60

// Pass in node id as a string
function getYaxis(node) { // row
  a = node.split('-')
  return parseInt(a[1], 10)
}

function getXaxis(node) { // col
  a = node.split('-')
  return parseInt(a[0], 10)
}

function isValid(x, y) {
  let node = getNodeId(x, y)
  if (y < 0 || y >= row) return false;
  if (x < 0 || x >= col) return false;
  if (node.className == 'box box-wall') return false;
  return true;
}

// explore all neighbors
function exploreLocation(location) {
  let x = parseInt(location.x, 10);
  let y = parseInt(location.y, 10);
  let allNeighbors = [];

  //top
  if (isValid(x, y - 1)) allNeighbors.push({
    x: x,
    y: y - 1,
    node: getNodeId(x, y - 1)
  });
  //bottom
  if (isValid(x, y + 1)) allNeighbors.push({
    x: x,
    y: y + 1,
    node: getNodeId(x, y + 1)
  });
  //left
  if (isValid(x - 1, y)) allNeighbors.push({
    x: x - 1,
    y: y,
    node: getNodeId(x - 1, y)
  });
  //right
  if (isValid(x + 1, y)) allNeighbors.push({
    x: x + 1,
    y: y,
    node: getNodeId(x + 1, y)
  });
  return allNeighbors;
}

async function findPath(delay = 50) {
  let end = document.querySelector('.box-end').id
  let endCoor = [getXaxis(end), getYaxis(end)]
  let a = myMap.get(getNodeId(endCoor[0], endCoor[1])) // works
  let path = []
  setCoor()

  for (i = 0; i < 1000; i++) {
    parent = a.parent
    if (parent == null) {
      break
    } else {
      path.push(parent)
    }
    a = myMap.get(parent)
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
    if (path[i].classList == 'box box-start') {
      break
    } else {
      path[i].className = 'box box-path'
    }
  }
}

async function aStarFindPath(delay = 50) {
  let end = document.querySelector('.box-end').id
  let endCoor = [getXaxis(end), getYaxis(end)]
  let a = myMap.get(getNodeId(endCoor[0], endCoor[1])) // works
  let path = []
  setCoor()

  for (i = 0; i < 1000; i++) {
    parent = a.aStarParent
    if (parent == null) {
      break
    } else {
      path.push(parent)
    }
    a = myMap.get(parent)
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
    if (path[i].classList == 'box box-start') {
      break
    } else {
      path[i].className = 'box box-path'
    }
  }
}

// It works || running time is faster now
async function BFS(delay = 0) {
  let start = document.querySelector('.box-start').id
  let end = document.querySelector('.box-end')
  let location = {
    x: getXaxis(start),
    y: getYaxis(start),
  }
  let queue = [];
  queue.push(location);
  let counter = 0

  while (queue.length) {
    let currentLocation = queue[counter];
    counter = counter + 1
    let neighbors = exploreLocation(currentLocation);
    for (neighbor of neighbors) {
      if (neighbor.node == end) {
        location = getNodeId(neighbor.x, neighbor.y)
        let a = myMap.get(location)
        let node = getNodeId(currentLocation.x, currentLocation.y)
        a.parent = node;
        return findPath()

      } else if (neighbor.node.classList != "box box-visited") {
        queue.push(neighbor);
        location = getNodeId(neighbor.x, neighbor.y)
        let a = myMap.get(location)
        let node = getNodeId(currentLocation.x, currentLocation.y)
        a.parent = node;
        location.className = 'box box-visited';

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );
      }
    }
  }
  queue = []
  return false;
}

// It works
async function DFS(delay = 25) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end').id
  let startId = start.id // string
  let endCoor = [getXaxis(end), getYaxis(end)]
  let stack = []

  let location = {
    x: getXaxis(startId),
    y: getYaxis(startId),
  }

  stack.push(location);
  while (stack.length) {
    let node = stack.pop();
    let coor = getNodeId(node.x, node.y)
    if (node.x == endCoor[0] && node.y == endCoor[1])
      return node;
    if (coor.classList != 'box box-visited') {
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      coor.className = 'box box-visited';
      start.className = 'box box-start'
      let neighbors = exploreLocation(node);
      for (neighbor of neighbors) {
        if (node.classList != ".box-visited") {
          stack.push(neighbor);
        }
      }
    }
  }
}


function Dijkstra() {
  let start = document.querySelector('.box-start').id
  let end = document.querySelector('.box-end').id
  let endCoor = [getXaxis(end), getYaxis(end)]

  let distances = {};

  // Stores the reference to previous nodes
  let prev = {};
  let pq = new PriorityQueue();

  // Set distances to all nodes to be infinite except startNode
  pq.enqueue(start, 0);
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; k++) {
      let node = getNodeId(j, i)
      if (node.classList = '.box-start') {
        distances[start] = 0
      } else if (node.classList = '.box-wall') {
        continue
      } else {
        distances[node] = Infinity
      }
    }
  }

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue();
    let currNode = minNode.data;
    let weight = minNode.priority;
    // explore neighbors
    let neighbors = exploreLocation()
    for (neighbor of neighbors) {
      let alt = distances[currNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = currNode;
        pq.enqueue(neighbor.node, distances[neighbor.node]);
      }
    }
  }
  return distances;
}

// The heuristic function that returns the distance between two points
function manhattanDistance(p1, p2) {
  let x1 = getXaxis(p1)
  let y1 = getYaxis(p1)
  let x2 = getXaxis(p2)
  let y2 = getYaxis(p2)
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

// f(n) = g(n) + h(n) 
// it works
async function aStar(delay = 0) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  let open = new PriorityQueue();
  let init = myMap.get(start)
  init.gScore = 0
  init.fScore = manhattanDistance(start.id, end.id)
  open.enqueue(start, init.fScore);

  //While there are nodes left to visit
  while (!open.isEmpty()) {
    // find the node with the currently lowest priority
    let currentNode = open.dequeue().element    
    if (currentNode.classList == 'box box-end') {
      aStarFindPath()
      return console.log('we found the end')
    }

    let curr = currentNode.id
    let location = {
      x: getXaxis(curr),
      y: getYaxis(curr),
    }

    currentNode.className = 'box box-visited'
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
      
    let neighbors = exploreLocation(location)
    for (neighbor of neighbors) {
      let temp_gScore = myMap.get(currentNode).gScore + manhattanDistance(currentNode.id, neighbor.node.id)
      let neighbor_gScore = myMap.get(neighbor.node).gScore
      if (temp_gScore < neighbor_gScore) {
        myMap.get(neighbor.node).aStarParent = currentNode
        myMap.get(neighbor.node).gScore = temp_gScore
        myMap.get(neighbor.node).fScore = myMap.get(neighbor.node).gScore + manhattanDistance(neighbor.node.id, end.id)
        if (!open.has(neighbor.node)) {
          open.enqueue(neighbor.node, myMap.get(neighbor.node).fScore)
        }
      }
    }
  }
  return false
}


