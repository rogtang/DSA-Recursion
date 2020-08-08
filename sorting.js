//BUBBLE SORT

function swap(array, i, j) {
    //save the value of array[i] so we can access it later
    const tmp = array[i];
    //swap array[i] for array[j]
    array[i] = array[j];
    //swap array[j] for the value of array[i] we saved earlier
    array[j] = tmp;
};

function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }
//if swaps > 0, that means more sorting is needed...
    if (swaps > 0) {
        return bubbleSort(array);
    }
//if swaps = 0, that means all is sorted so you can return the now sorted array
    return array;
};

//MERGE SORT

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    console.log(left, right)
    return merge(left, right);
};

/*EASIER IMPLEMENTATION BELOW
function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    //while there is a left array AND a right array
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            //this is basically saying push the left value into the array
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            //else, push right value into the array
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};
*/

//ALT IMPLEMENTATION
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



//QUICKSORT
function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

//Lomuto's algorithm
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

(function test() {
    const testArray1 = [4, 5, 2, 1, 3, 8]
    const testArray2 = [5, 5, 6, 100, 3, 5, 2, 1, 5, 7, 8888, 4]
    const testArray3 = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]
    const testArray4 = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]

    //console.log(quickSort(testArray1))
    //console.log(quickSort(testArray2))
    console.log(mergeSort(testArray3))
})()