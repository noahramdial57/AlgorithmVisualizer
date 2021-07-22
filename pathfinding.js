
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

/*
function clearPath() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.style.backgroundColor == 'purple') {
        node.style.backgroundColor = '';
      }
    }
  }
}
*/

async function generateRandomObstacles(delay = 0) {
  clearGrid()
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 33; j++) {
      let randX = Math.floor(Math.random() * 60);
      let randY = Math.floor(Math.random() * 20);
      node = getNodeId(randX, randY)
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

function safeNeighbor(x, y) {
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
  if (safeNeighbor(x, y - 1)) allNeighbors.push({
    x: x,
    y: y - 1
  });
  //bottom
  if (safeNeighbor(x, y + 1)) allNeighbors.push({
    x: x,
    y: y + 1
  });
  //left
  if (safeNeighbor(x - 1, y)) allNeighbors.push({
    x: x - 1,
    y: y
  });
  //right
  if (safeNeighbor(x + 1, y)) allNeighbors.push({
    x: x + 1,
    y: y
  });
  return allNeighbors;
}

// does not work || its running time is too slow
async function BFS(delay = 0) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  let startId = start.id // string
  let endId = end.id // string
  let endCoor = [getXaxis(endId), getYaxis(endId)]

  let location = {
    x: getXaxis(startId),
    y: getYaxis(startId),
  }

  let queue = [];
  queue.push(location);
  while (queue.length) {
    let currentLocation = queue.shift();
    if (currentLocation.x == endCoor[0] && currentLocation.y == endCoor[1])
      return currentLocation;
    // else mark the node as visited
    let node = getNodeId(currentLocation.x, currentLocation.y)
    node.className = 'box box-visited';
    //node.className = 'box box-visited';
    // for (i = 0; i < queue.length; i++){
    //   let temp = queue.shift()
    //   tempNode = getNodeId(temp.x, temp.y)
    //   tempNode.className = 'box box-visited';
    // }
    console.log(queue.length)
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
    let neighbors = exploreLocation(currentLocation);
    for (neighbor of neighbors) {
      if (node.classList != ".box-visited" || node.classList != ".box-wall") {
        queue.push(neighbor);
        currentLocation = getNodeId(neighbor.x, neighbor.y)
      }
    }
  }
  return false;
}

// It works
async function DFS(delay = 25) {
  let start = document.querySelector('.box-start')
  let end = document.querySelector('.box-end')
  let startId = start.id // string
  let endId = end.id // string
  let endCoor = [getXaxis(endId), getYaxis(endId)]
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
      let neighbors = exploreLocation(node);
      for (neighbor of neighbors) {
        if (node.classList != ".box-visited" || node.classList != ".box-wall") {
          stack.push(neighbor);
        }
      }
    }
  }
}

