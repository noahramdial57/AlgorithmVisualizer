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
  has(element) {
    for (let i = 0; i < this.items.length; i++) {
      if (element == this.items[i]) {
        return true
      } else {
        return false
      }
    }
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
        bfsParent: null,
        dfsParent: null,
        dijkstraParent: null,
        aStarParent: null,
        dijkstraDistance: Number.MAX_VALUE,
        fScore: Number.MAX_VALUE,
        gScore: Number.MAX_VALUE
      }
      myMap.set(box, loc)
    }
    container.appendChild(row);
  }
  gridContainer.appendChild(container);
}

grid()

function getNodeId(x, y) {
  let node = x + '-' + y;
  return document.getElementById(node)
}

function setCoor() {
  let startX = 19
  let startY = 9
  let endX = 39
  let endY = 9
  start = getNodeId(startX, startY);
  end = getNodeId(endX, endY);
  start.className = 'box box-start'
  end.className = 'box box-end'
  start.setAttribute('draggable', true)
  end.setAttribute('draggable', true)
}
setCoor()

function removeStart() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-start') {
        node.classList.remove('box-start')
        node.setAttribute('draggable', false)
      }
    }
  }
}

function removeEnd() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-end') {
        node.classList.remove('box-end')
      }
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

function handleDragStart(e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData("text/html", e.target.classList)
  console.log('start')
}

function handleDragOver(e) {
  if (e.preventDefault()) {
    e.preventDefault()
  }
  return false
}

function handleDragEnter(e) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  if (e.preventDefault()) {
    e.preventDefault
  }

  let data = e.dataTransfer.getData("text/html")
  if (this.classList == 'box box-wall' || this.classList == 'box box-start' || this.classList == 'box box-end' || this.classList == 'box box-visited' || this.classList == 'box box-path') {
    return
  } else {
    this.className = 'box box-over'
  }
}

function handleDragLeave(e) {
  this.classList.remove('box-over')
}

function handleDragEnd(e) {
  this.classList.remove('box-over')
}

// Make sure to set setAttribute() of node to true on drop
function handleDragDrop(e) {
  if (e.preventDefault()) {
    e.preventDefault()
  }

  let data = e.dataTransfer.getData("text/html")

  if (data == 'box box-start') {
    removeStart()
    e.target.className = data
  } else if (data == 'box box-end') {
    removeEnd()
    e.target.className = data
  }
  e.target.setAttribute('draggable', true)
}

function addEventListeners() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      node.addEventListener('dragstart', handleDragStart);
      node.addEventListener('mousedown', handleDragStart);
      node.addEventListener('dragover', handleDragOver);
      node.addEventListener('dragenter', handleDragEnter);
      node.addEventListener('dragleave', handleDragLeave);
      node.addEventListener('dragend', handleDragEnd);
      node.addEventListener('drop', handleDragDrop);
    }
  }
}

addEventListeners()

function addWallEventListeners() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-start' || node.classList == 'box box-end') {
        continue
      } else {
        node.addEventListener("mouseenter", function (e) {
          e.preventDefault()
          node.className = 'box box-wall'
        });
      }
    }
  }
}

function removeWallEventListeners() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-start' || node.classList == 'box box-end') {
        continue
      } else {
        node.classList.removeEventListener('mouseenter')
      }
    }
  }
}

function clearGrid() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-wall') {
        node.className = 'box';
      } else if (node.classList == 'box box-start' || node.classList == 'box box-end') {
        continue
      } else {
        node.className = 'box'
      }
    }
  }
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
        window.requestAnimationFrame(function () {
          node.className = 'box box-wall'
        });
      }

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
    }
  }
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

async function findPath(bfs, dfs, dijkstra, aStar) {
  let delay = 55
  let end = document.querySelector('.box-end')
  let a = myMap.get(end)
  let path = []

  if (bfs == 1) {
    for (let i = 0; i < 1000; i++) {
      let bfsParent = a.bfsParent
      if (bfsParent == null) {
        break
      } else {
        path.push(bfsParent)
      }
      a = myMap.get(bfsParent)
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      if (path[i].classList == 'box box-start') {
        break
      } else {
        window.requestAnimationFrame(function () {
          path[i].className = 'box box-path'
        });
      }
    }
  }
  if (aStar == 1) {
    for (let i = 0; i < 1000; i++) {
      let aStarParent = a.aStarParent
      if (aStarParent == null) {
        break
      } else {
        path.push(aStarParent)
      }
      a = myMap.get(aStarParent)
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      if (path[i].classList == 'box box-start') {
        break
      } else {
        window.requestAnimationFrame(function () {
          path[i].className = 'box box-path'
        });
      }
    }
  }
  if (dijkstra == 1) {
    for (let i = 0; i < 1000; i++) {
      let dijkstraParent = a.dijkstraParent
      if (dijkstraParent == null) {
        break
      } else {
        path.push(dijkstraParent)
      }
      a = myMap.get(dijkstraParent)
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      if (path[i].classList == 'box box-start') {
        break
      } else {
        window.requestAnimationFrame(function () {
          path[i].className = 'box box-path'
        });
      }
    }
  }
  // DFS find path
  // I had to use this approach since backtracing was giving me problems
  if (typeof (dfs) == 'object') {
    dfs.reverse()
    for (let i = 0; i < 1200; i++) {
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      if (dfs[i].classList == 'box box-start') {
        break
      } else {
        window.requestAnimationFrame(function () {
          dfs[i].className = 'box box-path'
        });
      }
    }
  }
}


// The heuristic function that returns the distance between two points
function manhattanDistance(p1, p2) {
  let x1 = getXaxis(p1)
  let y1 = getYaxis(p1)
  let x2 = getXaxis(p2)
  let y2 = getYaxis(p2)
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

// this resets all g and f score values in the map
function reInitializeMap() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i)
      let element = myMap.get(node)
      element.gScore = Number.MAX_VALUE
      element.fScore = Number.MAX_VALUE
      element.dijkstraDistance = Number.MAX_VALUE
    }
  }
}

function getStart() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.classList == 'box box-start') {
        return node
      }
    }
  }
}

async function BFS(delay = 0) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  let location = {
    x: getXaxis(start.id),
    y: getYaxis(start.id),
  }
  let queue = [];
  queue.push(location);
  let counter = 0
  let startPoint = getStart()

  while (queue.length) {
    startPoint.className = 'box box-start'
    let currentLocation = queue[counter];
    counter = counter + 1
    let neighbors = exploreLocation(currentLocation);

    for (neighbor of neighbors) {
      if (neighbor.node == end) {
        location = getNodeId(neighbor.x, neighbor.y)
        let a = myMap.get(location)
        let node = getNodeId(currentLocation.x, currentLocation.y)
        a.bfsParent = node;
        queue = []
        return findPath(1, null, null, null) // bfs, dfs, dijkstra, aStar

      } else if (neighbor.node.classList != "box box-visited") {
        queue.push(neighbor);
        location = getNodeId(neighbor.x, neighbor.y)
        let a = myMap.get(location)
        let node = getNodeId(currentLocation.x, currentLocation.y)
        a.bfsParent = node;

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        // window.requestAnimationFrame(function () {
        location.className = 'box box-visited';
        //});
      }
    }
  }
  return false;
}

async function DFS(delay = 20) {
  let start = document.querySelector('.box-start')
  let startPoint = getStart()
  let end = document.querySelector('.box-end')
  let endCoor = [getXaxis(end.id), getYaxis(end.id)]
  let path = []
  let stack = []

  let location = {
    x: getXaxis(start.id),
    y: getYaxis(start.id),
  }

  stack.push(location);
  while (stack.length) {
    let node = stack.pop();
    let coor = getNodeId(node.x, node.y)

    if (coor.classList != 'box box-visited') {
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      window.requestAnimationFrame(function () {
        coor.className = 'box box-visited';
      });

      path.push(coor)
      startPoint.className = 'box box-start'
      let neighbors = exploreLocation(node);
      for (neighbor of neighbors) {
        if (neighbor.x == endCoor[0] && neighbor.y == endCoor[1]) {
          path.push(coor)
          return findPath(null, path, null, null) // bfs, dfs, dijkstra, aStar
        }
        if (node.classList != ".box-visited") {
          myMap.get(neighbor.node).dfsParent = coor
          stack.push(neighbor);
        }
      }
    }
  }
}

async function Dijkstra(delay = 0) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  let location = {
    x: getXaxis(start.id),
    y: getYaxis(start.id)
  }

  let pq = new PriorityQueue();
  pq.enqueue(start, 0);
  myMap.get(start).dijkstraDistance = 0

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue();
    let currNode = minNode.element;
    location = {
      x: getXaxis(currNode.id),
      y: getYaxis(currNode.id)
    }

    // explore neighbors
    let neighbors = exploreLocation(location) // the problem
    for (neighbor of neighbors) {
      if (neighbor.node == end) {
        location = getNodeId(neighbor.x, neighbor.y)
        let a = myMap.get(location)
        let node = document.getElementById(currNode.id)
        a.dijkstraParent = node
        reInitializeMap()
        return findPath(null, null, 1, null) // bfs, dfs, dijkstra, aStar
      }

      let currNodeDist = myMap.get(currNode).dijkstraDistance
      let h = manhattanDistance(currNode.id, neighbor.node.id)
      let alt = currNodeDist + h
      if (alt < myMap.get(neighbor.node).dijkstraDistance) {
        myMap.get(neighbor.node).dijkstraDistance = alt
        pq.enqueue(neighbor.node, myMap.get(neighbor.node).dijkstraDistance)
        myMap.get(neighbor.node).dijkstraParent = currNode

        neighbor.node.className = 'box box-visited'

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );
      }
    }
  }
  return false
}

async function aStar(delay = 10) {
  reInitializeMap()
  let start = document.querySelector('.box-start')
  let startPoint = getStart()
  let end = document.querySelector('.box-end')
  let open = new PriorityQueue();
  let init = myMap.get(start)
  init.gScore = 0;
  init.fScore = manhattanDistance(start.id, end.id)
  open.enqueue(start, init.fScore);

  //While there are nodes left to visit
  while (!open.isEmpty()) {
    // find the node with the currently lowest priority
    startPoint.className = 'box box-start'
    let currentNode = open.dequeue().element
    if (currentNode.classList == 'box box-end') {
      return findPath(null, null, null, 1) // bfs, dfs, dijkstra, aStar
    }
    let curr = currentNode.id
    let location = {
      x: getXaxis(curr),
      y: getYaxis(curr),
    }

    window.requestAnimationFrame(function () {
      currentNode.className = 'box box-visited'
    });

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