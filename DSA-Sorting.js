/*
1. Understanding merge sort
Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

What is the resulting list that will be sorted after 3 recursive calls to mergesort?
 1, 21 ] [ 26, 45 ]
What is the resulting list that will be sorted after 16 recursive calls to mergesort?
[
   1,  2,  9, 16, 21, 26,
  27, 28, 29, 34, 39, 40,
  43, 45, 46, 49
]
What are the first 2 lists to be merged?
[
   1,  2,  9, 21,
  26, 28, 29, 45
] [
  16, 27, 34, 39,
  40, 43, 46, 49
]
Which two lists would be merged on the 7th merge?
[ 1, 21, 26, 45 ] [ 2, 9, 28, 29 ]
*/
function swap(array, i, j) {
    //save the value of array[i] so we can access it later
    const tmp = array[i];
    //swap array[i] for array[j]
    array[i] = array[j];
    //swap array[j] for the value of array[i] we saved earlier
    array[j] = tmp;
};

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
};

//Lomutos algorithm
function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return merge(left, right);
};

function merge(left, right) {
    const array = [];

    while (left.length && right.length) {
        //if left value is less, then remove (shift) it from the left array and push to array
        if(left[0]< right[0]) {
            array.push(left.shift());
        } 
        //else remove (shift) the right value from the right array and push to array
        else {
            array.push(right.shift());
        }
    }

    return array.concat(left.slice()).concat(right.slice());
}

/*
5. Sorting a linked list using merge sort
Given a Linked List, sort the linked list using merge sort. You will need your 
linked list class from previous lesson to create the list and use all of its 
supplemental functions to solve this problem.
*/


function mergeSortLinkedList(linkedList){
    let array = []
    let currentNode = linkedList.head
    while(currentNode !== null){
      array.push(currentNode.value)
      currentNode = currentNode.next
    }
  
    let sortedArray = mSort(array)
    let currentNodeCopy = linkedList.head
    let i = 0 
    while(currentNodeCopy !== null){
      currentNodeCopy.value = sortedArray[i]
      i++
      currentNodeCopy = currentNodeCopy.next
    }
    return linkedList
  }

//Write an O(n) algorithm to sort an array of integers, where you know in
//advance what the lowest and highest values are.
//this is what a bucket sort would look like

//[15, 3, 2, 1, 9]
function sortWithMaxAndMin(arr, min, max) { 
	let buckets = Array(max - min + 1); 
	for (let i = 0; i < arr.length; ++i)
		//shift OR - forces to integer - undefined is treated as 0
		// The buckets array will look like = [1, 1, 1, u, u, u, u, u, 1, u, u, u, u, u, 1]
		buckets[arr[i] - min] = (buckets[arr[i] - min]|0) + 1; 
	let ret = [];
	for (let i = min; i <= max; ++i)
		for (let j = 0; j < buckets[i - min]; ++j)
			ret.push(i);
	return ret;
}

//Write an algorithm to shuffle an array into a random order
//in-place (i.e. without creating a new array).
function shuffle(arr) {
	//Swap every element with a randomly-chosen one. On average, each
	//element will be moved twice; every element will be moved at least
	//once, but some will be moved three times or more.
	for (let i = 0; i < arr.length; ++i) {
        // j is a randomly created number
        let j = Math.floor(Math.random() * (arr.length - i) + i);
        // swap arr[i] with the j random element and then arr[j] takes arr[i]'s initial value
		let tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
    return arr;
}

 //Imagine that I gave you twenty books to sort in alphabetical order. How
//would you go about it? Can you express this as an algorithm?

//using insertion sort
//[15, 3, 2, 1, 9]
function sortingBook(arr) {
	//1) Set aside a shelf or bit of table space to do the sorting.
	var ret = [];
	//2) Grab a book and put it onto the shelf.
	//3) Grab the next book, and place it either left or right of the
	//   first book, according to position.
	//4) Grab the third, and put it left, between, or right.
	//5) Continue until you have no more books.
	for (let i = 0; i < arr.length; ++i) {
		//Insert arr[i] into ret at the appropriate position.
		let j;
		//(Note the use of <= here rather than <, to give stability.)
		for (j = 0; j < ret.length && ret[j] <= arr[i]; ++j); //binary search 
		//We let Array.splice() do the actual insertion work. But be
		//aware that this can be an expensive operation.
		ret.splice(j, 0, arr[i]); //ret = [3,15]
	}
	return ret;
}
var arr = []; for (var i=0; i<20; ++i) arr.push(Math.floor(Math.random()*10)); //or create your own

(function test() {
    const testArray1 = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24,
    53, 55, 78, 50, 13, 40, 48, 32, 26, 2,
    14, 33, 45, 72, 56, 44, 21, 88, 27, 68,
    15, 62, 93, 98, 73, 28, 16, 46, 87, 28,
    65, 38, 67, 16, 85, 63, 23, 69, 64, 91,
    9,  70, 81, 27, 97, 82, 6,  88, 3,  7,
    46, 13, 11, 64, 76, 31, 26, 38, 28, 13,
    17, 69, 90, 1,  6,  7,  64, 43, 9,  73,
    80, 98, 46, 27, 22, 87, 49, 83, 6,  39,
    42, 51, 54, 84, 34, 53, 78, 40, 14, 5];


    //console.log(qSort(testArray1))
    //console.log(mSort(testArray1))
    console.log(mergeSortLinkedList(testArray1))
})()