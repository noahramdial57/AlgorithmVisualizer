let gridContainer = document.querySelector(".grid");
let startX = document.getElementById('startX').value
let startY = document.getElementById('startY').value
let endX = document.getElementById('endX').value
let endY = document.getElementById('endY').value

// Creating the grid 
function grid() {
  var container = document.createElement("div");
  container.id = "main";
  container.className = "container";

  for (i = 0; i < 20; i++) {
    var row = document.createElement("div");
    row.className = "row";
    row.id = "row " + i;

    for (k = 0; k < 60; k++) {
      var box = document.createElement("div");
      box.className = "box";
      box.id = k + '-' + i;
      row.appendChild(box);
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

// Sets the color of start and end node based on user input
function setCoor() {
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

// TODO: Use document.querySelector without nested for-loop to wipe background colors on all nodes
// of class .box-wall, as well as wiping .box-start and .box-end
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
      }
    }
  }
}

// BREADTH FIRST SEARCH
let row = 20
let col = 60

// Pass in node id as a string
function getRowNumber(node) {
  a = node.split('-')
  return a[0]
}

function getColNumber(node) {
  a = node.split('-')
  return a[1]
}

function safeNeighbor(r, c) {
  let node = getNodeId(r, c);
  let x = parseInt(getRowNumber(node.id), 10)
  let y = parseInt(getColNumber(node.id), 10)
  if (x < 0 || x > row) {
    return false
  }
  if (y < 0 || y > col) {
    return false;
  }
  if (node.classList == '.box-wall') {
    return false;
  }
  return true;
}

// explore all neighbors
function exploreLocation(location) {
  let r = parseInt(location.r, 10);
  let c = parseInt(location.c, 10);
  let allNeighbors = [];

  //top
  if (safeNeighbor(r - 1, c)) allNeighbors.push({
    r: r - 1,
    c: c
  });
  //bottom
  if (safeNeighbor(r + 1, c)) allNeighbors.push({
    r: r + 1,
    c: c
  });
  //left
  if (safeNeighbor(r, c - 1)) allNeighbors.push({
    r: r,
    c: c - 1
  });
  //right
  if (safeNeighbor(r, c + 1)) allNeighbors.push({
    r: r,
    c: c + 1
  });
  return allNeighbors;
}


async function BFS(delay = 0) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  let startId = start.id // string
  let endId = end.id // string
  let endCoor = [getRowNumber(endId), getColNumber(endId)]

  var location = {
    r: getRowNumber(startId),
    c: getColNumber(startId),
  }

  var queue = [];
  queue.push(location);
  while (queue.length) {
    var currentLocation = queue.shift(); // shift removes first element of array and returns it
    // check to see if we've found the end node
    if (currentLocation.r == endCoor[0] && currentLocation.c == endCoor[1])
      return currentLocation;
    // else mark the node as visited
    let node = getNodeId(currentLocation.r, currentLocation.c)
    node.className = 'box box-visited';
    var neighbors = exploreLocation(currentLocation); // neighbors is a list of all valid neighbors || this is where is breaks
    for (neighbor of neighbors) {
      if (node.classList != ".box-visited") {
        queue.push(neighbor);
        currentLocation = getNodeId(neighbor.r, neighbor.c) // fix this
      }
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
    }
  }
  return false;
}

var ROW = 20;
var COL = 60;

// Direction vectors
var dRow = [-1, 0, 1, 0];
var dCol = [0, 1, 0, -1];

// Function to check if a cell is be visited or not
function isValid(row, col) {
  // If cell lies out of bounds
  if (row < 0 || col < 0 || row >= ROW || col >= COL)
    return false;

  // If cell is already visited
  node = getNodeId(row, col)
  if (node.classList = 'box-visited')
    return false;

  // Otherwise
  return true;
}

function BFS2(row, col) {
  var q = [];

  // Mark the starting cell as visited and push it into the queue
  q.push([row, col]);
  let node = getNodeId(row, col)
  console.log(node)
  node.className = 'box box-visited';

  // Iterate while the queue is not empty
  while (q.length != 0) {
    var cell = q[0];
    var x = cell[0];
    var y = cell[1];

    q.shift();

    // Go to the adjacent cells
    for (var i = 0; i < 4; i++) {
      var adjx = x + dRow[i];
      var adjy = y + dCol[i];

      if (isValid(adjx, adjy)) {
        q.push([adjx, adjy]);
        let node = getNodeId(adjx, adjy)
        node.className = 'box box-visited';
      }
    }
  }
}

let startpoint = document.querySelector('.box-start')
let startId = startpoint.id // string
starting = getNodeId(startId)
let x = parseInt(getRowNumber(starting.id), 10)
let y = parseInt(getColNumber(starting.id), 10)
BFS2(x, y)