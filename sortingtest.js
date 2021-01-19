// // this is my selection sort implementation

// async function selectionSort(myArray) {
//   for (let i = 0; i < myArray.length; i++) {
//     let min = i;
//     for (let j = i + 1; j < myArray.length; j++) {
//       if (myArray[j] < myArray[min]) {
//         min = j; // We are increasing the index by one each time to cover all elements
//       }
//     }
//     swap(myArray, i, min)
//   }
//   return myArray;
// }

// async function selectionSort(delay = 0) {
//   for (i = 0; i < numBlocks; i++) {
//     let min = i;
//     for (j = i + 1; j < numBlocks; j++) {

//       let elem1 = Number(blockContainer.children[j].innerText);
//       let elem2 = Number(blockContainer.children[min].innerText);

//       if (elem1 < elem2) {
//         min = j; // We are increasing the index by one each time until we find our minimum value
//       }
//     }

//     let elem3 = Number(blockContainer.children[i].innerText);
//     let elem4 = Number(blockContainer.children[min].innerText);

//     if (elem3 > elem4) {
//       swapNodes(blockContainer.children[i], blockContainer.children[min]);

//       await new Promise(resolve =>
//         setTimeout(() => {
//           resolve();
//         }, delay)
//       );

//       swapAnimation(i, min);
//     }
//   }
// }




// // This is my mergesort implementation
// function merge(left, right) {
//   let resultArray = [];
//   let leftIndex = 0;
//   let rightIndex = 0;

//   // We will concatenate values into the resultArray in order
//   while (leftIndex < left.length && rightIndex < right.length) {
//     if (left[leftIndex] < right[rightIndex]) {
//       resultArray.push(left[leftIndex]);
//       leftIndex++; // move left array cursor
//     } else {
//       resultArray.push(right[rightIndex]);
//       rightIndex++; // move right array cursor
//     }
//   }

//   // We need to concat here because there will be one element remaining
//   // from either left OR the right
//   return resultArray
//     .concat(left.slice(leftIndex))
//     .concat(right.slice(rightIndex));
// }


// function mergeSort(unsortedArray) {
//   // No need to sort the array if the array only has one element or empty
//   if (unsortedArray.length <= 1) {
//     return unsortedArray;
//   }
//   // In order to divide the array in half, we need to figure out the middle
//   const middle = Math.floor(unsortedArray.length / 2);

//   // This is where we will be dividing the array into left and right
//   const left = unsortedArray.slice(0, middle);
//   const right = unsortedArray.slice(middle);

//   // Using recursion to combine the left and right
//   return merge(
//     mergeSort(left), mergeSort(right)
//   );
// }

// function mergeSort2() {
//   myArr = [];
//   for (i = 0; i < 35; i++) {
//     myArr.push(Number(blockContainer.children[i].innerText));
//   }

//   if (myArr.length <= 1) {
//     return myArr;
//   }

//   let middle = Math.floor(35 / 2);
//   let left = myArr.slice(0, middle);
//   let right = myArr.slice(middle);

//   return merge(mergesort2(left), (mergesort2(right)))
// }

async function selectionSort(delay = 0) {
    for (i = 0; i < numBlocks; i++) {
      let min = i;
      for (j = i + 1; j < numBlocks; j++) {
  
        let elem1 = Number(blockContainer.children[j].innerText);
        let elem2 = Number(blockContainer.children[min].innerText);
  
        if (elem1 < elem2) {
          min = j; // We are increasing the index by one each time until we find our minimum value
        }
      }
  
      //await new Promise(resolve =>
      //setTimeout(() => {
      //resolve();
      //}, delay)
      //);
  
      swapNodes(blockContainer.children[i], blockContainer.children[min]);
      swapAnimation(i, min);
  
      blockContainer.children[i] = "#58B7FF";
      blockContainer.children[min] = "#58B7FF";
    }
  }

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

  