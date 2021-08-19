let blockContainer = document.querySelector(".block-container");
let blocks = document.querySelectorAll(".block")
let numBlocks = 145;
let min = 5;
let max = 80;

// This will generate blocks with a loop and their corresponding values
// The values of each block will just be its height
let generateBlocks = () => {
  for (let i = 0; i < numBlocks; i++) {
    // Every loop this create a random number between min and max
    let blockValue = Math.floor(Math.random() * (max - min) + min)
    // This generates each block with its corresponding size
    let block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${blockValue}vh`;
    //block.style.transform = `translateX(${i}vw)`;

    blockContainer.appendChild(block);
  }
}

generateBlocks();

// This function manually swaps two nodes
function swapNodes(element1, element2) {
  var clonedElement1 = element1.cloneNode(true);
  var clonedElement2 = element2.cloneNode(true);

  element2.parentNode.replaceChild(clonedElement1, element2);
  element1.parentNode.replaceChild(clonedElement2, element1);
}

// The animation will be performed by swapping the transform styles of two blocks
// Then we'll manipulate the dom using insertBefore to swap two nodes
async function swapAnimation(element1, element2) {
  return new Promise(resolve => {
    el1Styles = window.getComputedStyle(element1);
    el2Styles = window.getComputedStyle(element2);

    el1Ani = el1Styles.getPropertyValue("transform");
    el2Ani = el2Styles.getPropertyValue("transform");

    element1.style.transform = el2Ani;
    element2.style.transform = el1Ani;

    swapNodes(element1, element2);

    // The purpose of this is to pause the animation when a user switches tabs
    window.requestAnimationFrame(function () {
      setTimeout(() => {
        blockContainer.insertBefore(el2, el1);
        resolve();
      }, 0);
    });
  });
}

async function bubbleSort(delay = 0) {
  for (let i = 0; i < numBlocks - 1; i++) {
    for (let j = 0; j < numBlocks - i - 1; j += 1) {

      blockContainer.children[j].style.backgroundColor = "#9932CC";
      blockContainer.children[j + 1].style.backgroundColor = "#9932CC";

      let elem1 = blockContainer.children[j].offsetHeight;
      let elem2 = blockContainer.children[j + 1].offsetHeight;

      if (elem1 > elem2) {

        // This will set a delay in between animations
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        swapAnimation(blockContainer.children[j], blockContainer.children[j + 1]);
        blockContainer.children[j].style.backgroundColor = "#58B7FF"; // This will turn the blocks back to blue
        blockContainer.children[j + 1].style.backgroundColor = "#58B7FF";

      } else {
        blockContainer.children[j].style.backgroundColor = "#58B7FF"; // This will turn the blocks back to blue
        blockContainer.children[j + 1].style.backgroundColor = "#58B7FF";
      }
    }
  }

  // turns all block green to indicate completion
  blocks.style.backgroundColor = "#13CE66";
}

async function insertionSort(delay = 0) {
  for (let i = 0; i < numBlocks; i++) {
    let el = blockContainer.children[i].offsetHeight;

    for (j = i - 1; j >= 0 && blockContainer.children[j].offsetHeight > el; j--) {
      blockContainer.children[j].style.backgroundColor = "#9932CC";
      blockContainer.children[j + 1].style.backgroundColor = "#9932CC";

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      swapAnimation(blockContainer.children[j + 1], blockContainer.children[j]);
    }
    el = blockContainer.children[j + 1].offsetHeight;
  }

  // turns all block green to indicate completion
  blocks.style.backgroundColor = "#13CE66";
}

async function selectionSort(delay = 100) {
  for (i = 0; i < numBlocks; i++) {
    let min = i;
    for (j = i + 1; j < numBlocks; j++) {

      let elem1 = blockContainer.children[j].offsetHeight;
      let elem2 = blockContainer.children[min].offsetHeight;

      if (elem1 < elem2) {
        min = j; // We are increasing the index by one each time until we find our minimum value
        blockContainer.children[j].style.backgroundColor = "#9932CC";
        blockContainer.children[min].style.backgroundColor = "#9932CC";

      }
    }

    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );

    swapAnimation(blockContainer.children[i], blockContainer.children[min]);

    blockContainer.children[i] = "#58B7FF";
    blockContainer.children[min] = "#58B7FF";
  }
  // turns all block green to indicate completion
  blocks.style.backgroundColor = "#13CE66";
}

async function cocktailSort(delay = 0) {
  let swapped = true;
  let start = 0;
  let end = numBlocks;

  while (swapped == true) {
    swapped = false;

    // forwards
    for (let i = start; i < end - 1; i++) {

      blockContainer.children[i].style.backgroundColor = "#9932CC";
      blockContainer.children[i + 1].style.backgroundColor = "#9932CC";

      let elem1 = blockContainer.children[i].offsetHeight;
      let elem2 = blockContainer.children[i + 1].offsetHeight;

      if (elem1 > elem2) {

        // This will set a delay in between animations
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        swapAnimation(blockContainer.children[i], blockContainer.children[i + 1]);
        blockContainer.children[i].style.backgroundColor = "#58B7FF"; // This will turn the blocks back to blue
        blockContainer.children[i + 1].style.backgroundColor = "#58B7FF";
        swapped = true;

      } else {
        blockContainer.children[i].style.backgroundColor = "#58B7FF"; // This will turn the blocks back to blue
        blockContainer.children[i + 1].style.backgroundColor = "#58B7FF";
      }
    }

    // if nothing moved, then array is sorted.
    if (swapped == false) {
      // turns all block green to indicate completion
      for (let k = 0; k < numBlocks; k++) {
        blockContainer.children[k].style.backgroundColor = "#13CE66";
      }
      return;
    }

    // reset the swapped value for the next iteration
    swapped = false;

    // move the end point back by one
    end = end - 1;

    // backwards
    for (let j = end - 1; j >= start; j--) {
      blockContainer.children[j].style.backgroundColor = "#9932CC";
      blockContainer.children[j + 1].style.backgroundColor = "#9932CC";

      let elem1 = blockContainer.children[j].offsetHeight;
      let elem2 = blockContainer.children[j + 1].offsetHeight;

      if (elem1 > elem2) {

        // This will set a delay in between animations
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        swapAnimation(blockContainer.children[j], blockContainer.children[j + 1]);
        blockContainer.children[j].style.backgroundColor = "#58B7FF"; // This will turn the blocks back to blue
        blockContainer.children[j + 1].style.backgroundColor = "#58B7FF";
        swapped = true;


      } else {
        blockContainer.children[j].style.backgroundColor = "#58B7FF"; // This will turn the blocks back to blue
        blockContainer.children[j + 1].style.backgroundColor = "#58B7FF";
      }
    }
    // increase the starting point
    start = start + 1;
  }
  // turns all block green to indicate completion
  blocks.style.backgroundColor = "#13CE66";
}