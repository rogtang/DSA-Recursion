class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if(this.key === null) {
            this.key = key
            this.value = value
        }

        else if(key < this.key) {
            if(this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            } else {
                this.left.insert(key, value)
            }
        }

        else {
            if(this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            } else {
                this.right.insert(key, value)
            }
        }
    } 
    find(key) {
        if (this.key = key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error('key error');
        }
    } 
    remove(key) {
        if (this.key = key) {
            //has both left and right child
            if(this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            //only has left child
            else if (this.left) {
                this._replaceWith(this.left);
            }
            //only has right child
            else if (this.right) {
                this._replaceWith(this.right);
            }
            //has no children
            else {
                this._replaceWith(null)
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('key error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                //this.parent.left is being removed and now is node (the child)
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                //this.parent.right is being removed and now is node (the child)
                this.parent.right = node;
            }

            if (node) {
                //replacement node's new parent is the parent of the replaced node
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        //when no more left branches, then return "this" which is the min value
        if (!this.left) {
            return this;
        }
        //using recursion
        return this.left._findMin();
    }
}

//3.1) Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into your tree. 
//Compare your result with the result from the 1st exercise.

function main() {
    const BST = new BinarySearchTree();
    const num = [3,1,4,6,9,2,5,7]
    num.forEach((num) => BST.insert(num));
    return BST
}
//console.log(main());


//3.2) Create a binary search tree called BST and insert E A S Y Q U E S T I O N into your tree. 
//Compare your result with the result from the 1st exercise.
function main2() {
  const BST = new BinarySearchTree();
  const letters = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N'];
  letters.forEach((letter) => BST.insert(letter));
  return BST
}
//console.log(main2())

//4) What does this program do?
// Without running this code in your code editor, explain what the following program does. 
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

//adds all the values in the tree

  const bst1 = new BinarySearchTree();
    bst1.insert(1, 1);
    bst1.insert(3, 3);
    bst1.insert(6, 6);
    bst1.insert(5, 5);

//console.log(tree(bst1))
//What is the runtime of this algorithm? Answer: O(log(n)) ?

/* Height of a BST
Write an algorithm to find the height of a binary search tree. 
What is the run time of your algorithm? O(n), its covering all nodes to find the height
*/
function height(t) {
    if (t.key == null) {
        return 0;
    }
    else {
        if (t.left && t.right) {
            if (height(t.right) > height(t.left)) {
                return 1 + height(t.right);
            }
            return 1 + height(t.left);  
        }
        else if (t.left) {
            return 1 + height(t.left);
        }
        else if (t.right) {
            return 1 + height(t.right);
        }
    }
    return 1
} 

//console.log(height(main()));

//another solution:
function bst_height2(tree) {
    if (tree.left && tree.right)
        return Math.max(bst_height2(tree.left),
            bst_height2(tree.right)) + 1;
    if (tree.left) 
		return bst_height2(tree.left) + 1;
    if (tree.right) 
		return bst_height2(tree.right) + 1;
    return 1;
}

//6) Is it a BST?
//Write an algo to check whether an arbitary binary tree is a binary search tree, assuming no duplicates.
function isItBSTree(tree) {
    if (!tree) return false;
  
    if (tree.right) {
      if (tree.right.key > tree.key) {
        isItBSTree(tree.right);
      } else {
        return false;
      }
    }
  
    if (tree.left) {
      if (tree.left.key < tree.key) {
        isItBSTree(tree.left);
      } else {
        return false;
      }
    }
  
    return true;
  }
  //console.log(isItBSTree(main()));

  //Write an algorithm to find the third largest value in a binary search tree
function nth_largest(tree, state) { 
	//Finding the largest node means traversing the right first.
	if (tree.right) {
		nth_largest(tree.right, state);
		if (state.result) return;
	}
	if (!--state.n) { 
		//Found it.
		state.result = tree.key; 
		return;
	}
	if (tree.left) nth_largest(tree.left, state);
}

function third_largest(tree) {
	//Special case: empty tree.
	if (tree.key == null) 
		return null;
	let state = {n: 3, result: null};
	nth_largest(tree, state);
	return state.result;
}

//8) Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 leaves differ in distance from the root by more than 1).
function balanced(node) {
    let rheight = 0
    let lheight = 0
    if (node == null) {
      return true
    } else {
      if (node.right) {
        rheight = height(node.right)
      }
      if (node.left) {
        lheight = height(node.left)
      }
      if (Math.abs(rheight - lheight) <= 2) {
        return true
      } else return false
    }
  }
  //console.log(balanced(main()));

  /*You are given two arrays which represent two sequences of keys 
  that are used to create two binary search trees. Write a program that 
  will tell whether the two BSTs will be identical or not without actually 
  constructing the tree. You may use another data structure such as an array 
  or a linked list but don't construct the BST. What is the time complexity 
  of your algorithm? E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are 
  two sequences of arrays but will create the exact same BSTs and your program should return true*/


  function checkSame(arr1, arr2){
    if(arr1[0] !== arr2[0]){
      return false
      }
    if(arr1.length !== arr2.length){
      return false
    }
    let compareArr = []
    function checkRecur(array, num){
      if(array.length === 0){
        return
      }
      if(array.length === 1){
        compareArr.push(array[0])
        return}
  
      let rightArr = array.filter(arrNum => arrNum > num)
      let rightNum = rightArr.shift()
      compareArr.push(rightNum)
      checkRecur(rightArr, rightNum)
  
      let leftArr = array.filter(arrNum => arrNum < num)
      let leftNum = leftArr.shift()
      compareArr.push(leftNum)
      checkRecur(leftArr, leftNum)
    }
    let inputNum = arr1.shift()
  
    checkRecur(arr1, inputNum)
    checkRecur(arr2, inputNum)
  
    let contrastArr = compareArr.splice(0, (compareArr.length/2))
    
    for(i = 0; i < compareArr.length; i ++){
      if(compareArr[i] !== contrastArr[i]){
        return false
      }
    } return true
  }
  
  //console.log(checkSame([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]))