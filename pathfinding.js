let gridContainer = document.querySelector(".grid");

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
      box.id = 'g' + i + '-' + k
      row.appendChild(box);
    }

    container.appendChild(row);
  }

  gridContainer.appendChild(container);
}

start = document.getElementById('g9-18')
end = document.getElementById('g9-43')

function dragElement(elmnt) {

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

grid();



/*
function testAnimation() {
    for (let i = 0; i < 20; i++) {
        let a = document.getElementById('row ' + i);
        a.children[i].style.backgroundColor = 'red'

    }
}

testAnimation();

function startColor(element){
    element.style.color = 'blue';
}

a = document.getElementById("col 16")
console.log(a)
a.addEventListener("click", startColor(a)); */