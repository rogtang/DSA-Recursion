//linear search
function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return i;
        }
    }
    return -1;
};

//binary search
function binarySearch(array, value, start, end) {
    //if no start argument provided, then start at beginning of array (i.e. 0)
    var start = start === undefined ? 0 : start;
    //if no end argument provided, then end at end of array (i.e. array.length)
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    //start by picking the index in the middle of the array
    const index = Math.floor((start + end) / 2);
    //item = the value at that index
    const item = array[index];

    console.log(start, end);
    //if item= value, then you have already found the index
    if (item == value) {
        return index;
    }
    //otherwise, you recursively search either the left half or right half of array (depending on > or <)
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};

//SEARCHING TREES

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    //depth-first search
    //in-order implementation (left child, parent, right child)
    dfs(values=[]) {
        if (this.left) {
            values = this.left.dfs(values);
        }
        values.push(this.value);

        if (this.right) {
            values = this.right.dfs(values);
        }
        return values;
    }
    //breadth-first search

    bfs(tree, values = []) {
        const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
        const node = tree.root;
        queue.enqueue(node);
        while (queue.length) {
            const node = queue.dequeue(); //remove from the queue
            values.push(node.value); // remove node value from queue and add that value from the queue to an array (i.e. values)

            if (node.left) {
                queue.enqueue(node.left); //add left child to the queue
            }

            if (node.right) {
                queue.enqueue(node.right); // add right child to the queue
            }
        }

        return values;
    }
}

