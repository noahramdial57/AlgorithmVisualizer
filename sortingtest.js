// this is my selection sort implementation
// What this does is finds the smallest element in an array and puts it
// in the front

function swap(array, firstIndex, secondIndex) {
  blocks = document.querySelectorAll(".block");
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

function swap2(element1, element2){  
  return new Promise(resolve => {
    // Retrieve all the styles for html element
    let style1 = window.getComputedStyle(element1);
    let style2 = window.getComputedStyle(element2);

    // Grab the transform property for html elemnt
    let transform1 = style1.getPropertyValue("transform");
    let transform2 = style2.getPropertyValue("transform");

    // Switch the two transform styles
    element1.style.transform = transform2;
    element2.style.transform = transform1;

    // This indicates we want to perform an animation
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        blockContainer.insertBefore(element2, element1);
        resolve();
      }, 250);
    });
  });
}


// smallest = Math.min.apply(null, myArray);

async function selectionSort(myArray) {
  for (let i = 0; i < myArray.length; i++) {
    let min = i;
    for (let j = i + 1; j < myArray.length; j++) {
      if (myArray[j] < myArray[min]) {
        min = j; // We are increasing the index by one each time to cover all elements
      }
    }
    swap(myArray, i, min)
  }
  return myArray;
}

function selectionSort() {
  blocks = document.querySelectorAll(".block");

  for (let i = 0; i < blocks.length; i++) {
    let min = i;
    for (let j = i + 1; j < blocks.length; j++) {

      if (Number(blockContainer.children[j].innerText) < Number(blockContainer.children[min].innerHTML)) {
        min = j; // We are increasing the index by one each time to cover all elements
      }
    }
    swap(blockContainer.children[i], blockContainer.children[min], i, min);
  }
}



// This is my mergesort implementation
function merge(left, right) {
    let resultArray = [];
    let leftIndex = 0; 
    let rightIndex = 0;
  
    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++; // move left array cursor
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++; // move right array cursor
      }
    }
  
    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
  }

  function mergeSort (unsortedArray) {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);
  
    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
    // Using recursion to combine the left and right
    return merge(
      mergeSort(left), mergeSort(right)
    );
  }
  c = blockContainer.querySelectorAll(".block");

  //a = blockContainer.children[5];
  
  //b = blockContainer.children[34];
  
  //anime({
  //targets: a,
  //translateX: [blockPositions[5], blockPositions[34]],
  //direction: 'alternate',
  //delay: 1000,
  //loop: true
  //});
  
  //anime({
  //targets: b,
  //translateX: [blockPositions[34], blockPositions[5]],
  //direction: 'alternate',
  //delay: 1000,
  //loop: true

  await new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
