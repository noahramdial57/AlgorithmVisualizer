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
      box.id = 'node ' + k + '-' + i;
      row.appendChild(box);
    }

    container.appendChild(row);
  }

  gridContainer.appendChild(container);
}

grid();

// Gets the Id of a node given a set of coordinates
function getNodeId(x, y) {
  let node = "node " + x + '-' + y;
  return document.getElementById(node)
}

function addEventListeners() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      node.addEventListener("mouseover", function () {
        node.style.backgroundColor = "lime";
      });
      node.addEventListener("mouseout", function () {
        node.style.backgroundColor = "lime";
      });
      //node.addEventListener("mousedown", function () {
      //node.style.backgroundColor = "";
      //});
    }
  }
}

addEventListeners();

function wipeBoard() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      node.style.backgroundColor = '';
    }
  }
}

// Sets the color of start and end node based on user input
function setCoor() {
  start = getNodeId(startX, startY);
  end = getNodeId(endX, endY);
  start.style.backgroundColor = 'orange';
  end.style.backgroundColor = 'red';
}

setCoor()

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
  start.style.backgroundColor = 'orange';
  end.style.backgroundColor = 'red';
}

function scanForWalls() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 60; j++) {
      let node = getNodeId(j, i);
      if (node.style.backgroundColor == 'lime') {
        console.log('heloo')
        //node.className = 'wall';
      }
    }
  }
}

scanForWalls();