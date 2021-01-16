let blockContainer = document.querySelector(".block-container");
let numBlocks = 35;
let min = 1;
let max = 150;
let blockPositions = [];

// This will generate blocks with a loop and their corresponding values
// The values of each block will determine the size of the block
function generateBlocks() {
  for (let i = 0; i < numBlocks; i = i + 1) {
    // Every loop this create a random number between min and max
    let blockValue = Math.floor(Math.random() * (max - min) + min)
    // This generates each block with its corresponding size

    let block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${blockValue * 3}px`;
    block.style.transform = `translateX(${i * 30}px)`;
    blockPositions.push(i * 30);
    // This assigns a label to each block

    let blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = blockValue;

    block.appendChild(blockLabel);
    blockContainer.appendChild(block);
  }
}

// this is my selection sort implementation

function swapNodes(element1, element2) {
    var clonedElement1 = element1.cloneNode(true);
    var clonedElement2 = element2.cloneNode(true);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);
}

function swapAnimation(i, min) {
  let a = blockContainer.children[i];
  let b = blockContainer.children[min];


  // Here we are updating our blockPositions array
 // let temp = blockPositions[i];
  //blockPositions[i] = blockPositions[min];
  //blockPositions[min] = temp;

  anime({
    targets: a,
    translateX: [blockPositions[i], blockPositions[min]],
    delay: 900
  });

  anime({
    targets: b,
    translateX: [blockPositions[min], blockPositions[i]],
    delay: 900
  });
}

function selectionSort(delay = 0) {
  for (i = 0; i < numBlocks; i++) {
    let min = i;
    for (j = i + 1; j < numBlocks; j++) {

      let elem1 = Number(blockContainer.children[j].innerText);
      let elem2 = Number(blockContainer.children[min].innerText);

      if (elem1 < elem2) {
        min = j; // We are increasing the index by one each time to cover all elements
      }
    }

    new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );

    swapAnimation(i, min); // this swap function handles the animation

  }
}

let blocks = document.querySelectorAll(".block");
console.log(blocks);

async function bubbleSort(delay = 600) {
  for (let i = 0; i < numBlocks; i++) {

    for (let j = 0; j < numBlocks; j++) {

      let elem1 = Number(blockContainer.children[j].innerText);
      let elem2 = Number(blockContainer.children[j + 1].innerText);

      if (elem1 > elem2) {
        swapNodes(blockContainer.children[j], blockContainer.children[j + 1]);
        
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        swapAnimation(j, j + 1);
      }
    }
  }
}

generateBlocks();