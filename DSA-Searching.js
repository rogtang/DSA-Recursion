/*
1. How many searches?
Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and 
using the recursive binary search algorithm, identify 
the sequence of numbers that each recursive call will search to try and find 8.
*/
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

console.log('search:', binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 8))
/*0 10
0 4
3 4
search: 3
*/
console.log('search:', binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 16))
/*
0 10
6 10
6 7
7 7
search: -1 ==> value not found
*/

/*
Exercise 1
For this exercise 1 and 2, you will be using a searching algorithm to search for an item in a dataset. 
You will be testing the efficiency of the two searching algorithm, Linear search and Binary search. 
You will also have UI (a simple textbox will do) through which you will be sending your input that you want to seach. 
There is no server side to this program. All of this is done using React (or if you prefer, JQuery, whichever you are comfortable with). 
Given the following dataset, find out how many tries did it take to search for a particular item in the dataset. 
If the item is not in the dataset, proide a message and indicate how many searches did it take to do so.
89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 
21 88 27 68 15 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 
27 97 82 6 88 3 7 46 13 11 64 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 
46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5 76 62
Exercise 2
Use the dataset from the previous exercise and the same front end for this exercise. 
Use array.sort to sort the dataset. Then implement Binary search to find a particular value in the dataset.
*/

//using React
//search.js component


import React from 'react';
import Output from './Output';

export default class Search extends React.Component {
    constructor(){
        super();
        this.arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 
                    53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 
                    33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 
                    93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 
                    16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 
                    97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 
                    26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 
                    9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 
                    42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
        this.count = 0;
        this.state = {
            output:null
        };
    }
  
    linearSearch(){
        this.count=0;
        const value = parseInt(this.textInput.value.trim(),10);
        //console.log(value);
        this.textInput.value = '';
        for(let i = 0; i< this.arr.length; i++){
            this.count++;
            if(this.arr[i] === value){
                //console.log("found it");
                const output = `${value} found in position ${i} with ${this.count} tries`;
                this.setState({output:output});
                this.count=0;
                return i;
            } 
        }
        const output = `${value} is not found`;
        this.setState({output:output});
        return false;
    }

    binarySearch(arr, value, start=0, end=arr.length){
        this.count++;
        if (start > end) {
            return -1;
        }
        const index = Math.floor((start + end) / 2);
        //console.log(`index is ${index}`);
        const item = arr[index];
        //console.log(start, end);
        if (item === value) {
            const output = `${value} found with ${this.count} tries`;
            this.setState({output:output});
            this.count=0;
            return index;
        }
        else if (item < value) {
            return this.binarySearch(arr, value, index + 1, end);
        }
        else if (item > value) {
            return this.binarySearch(arr, value, start, index - 1);
        }
        this.count = 0;
    }
  
    doBinarySearch() {
        const value = parseInt(this.textInput.value.trim(),10);
        console.log(`Looking for ${value}`);
        this.textInput.value = '';
        let newArr = this.arr.sort(function(a, b){return a-b});
        this.binarySearch(newArr, value);
    }
  
    render(){
    
        return (
            <div className='userInput'>
                <input type="text"  ref={(input) => {this.textInput = input}}/>
                <button type='button' className='linear' onClick={()=> this.linearSearch()}>Linear Search</button>
                <button type='button' className='binary' onClick={()=> this.doBinarySearch()}>Binary Search</button>
                <Output info={this.state.output}/>
            </div>
        );

    }
        
  }

  //Output.js component
  
  import React from 'react';

export default class Output extends React.Component {
    render(){
        const info = this.props.info;
        return(
            <p>{info}</p>
        );
    }
}

// 3. Find a book
/*Imagine you are looking for a book in a library with a Dewey 
Decimal index. How would you go about it? Can you express this 
process as a search algorithm? Implement your algorithm to find a book whose Dewey and book title is provided.
*/

const library = [
    { dewey: "001", title: "Book 1" },
    { dewey: "002", title: "Book 2" },
    { dewey: "003", title: "Book 3" },
    { dewey: "004", title: "Book 4" },
    { dewey: "005", title: "Book 5" }
  ];
  
  function deweySearch(dewey, title, books) {
    books.forEach(book => {
      if (book.dewey === dewey && book.title === title) {
        console.log("Book", book);
        return book;
      }
    });
  }
  
  // deweySearch("002", "Book 2", library);

//ALT SOLUTION

  const library = [
    { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
    { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
    { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
    { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
    { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
    { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
    { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
    { author:'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
    { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' },
    { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }
  ];
      
      function find_book(library, dewey, title) {
      var start = 0, end = library.length;
      while (start < end) {
          var middle = Math.floor((start + end) / 2);
          if (library[middle].dewey == dewey) {
              //Found the right code. Great! Did we find the book?
              if (library[middle].title == title) 
                  return library[middle];
              //Nope. Linearly search around for the book we want.
              for (var idx = middle + 1; library[idx].dewey == dewey; ++idx)
                  if (library[idx].title == title) 
                      return library[idx];
              for (var idx = middle - 1; library[idx].dewey == dewey; --idx)
                  if (library[idx].title == title) 
                      return library[idx];
              //Well, we found the right section, but the book isn't
              //here. Guess someone else has borrowed it. Sorry!
              return null;
          }
          if (library[middle].dewey < dewey)
              start = middle + 1;
          else
              end = middle - 1;
      }
      //We don't have anything of that Dewey code, so that book isn't
      //available. Sorry! Try another library.
      return null;
  }
  
  console.log(find_book(library, '005.133', 'The REXX Language'  ))

  /*4. Searching in a BST
** No coding is needed for these drills**. Once you have answered it, you can then 
code the tree and implement the traversal to see if your answer is correct.

1) Given a binary search tree whose in-order and pre-order traversals are 
respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. 
What would be its postorder traversal?
35 is the parent node
14 15 19 25 27 79 89 90 91 35

2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?
8 5 7 6 9 11 10
*/

//********************************************
//Tree Traversal

class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
        
        get(key) {
        if (this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.get(key);
        }
        else if (key > this.key && this.right) {
            return this.right.get(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
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
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

	//Exercise 5
    dsfInOrder(){
        if (this.left) {
	    this.left.dsfInOrder();
        }
        // In-order
        console.log(this.key);
        if (this.right) {
            this.right.dsfInOrder();
        }
    }
//Exercise 5
    dsfPreOrder(){
        // Pre-order
        console.log(this.key);

        if (this.left) {
            this.left.dsfPreOrder();
        }

        if (this.right) {
            this.right.dsfPreOrder();
        }
    }
	//Exercise 5
    dsfPostOrder() {
        if (this.left) {
            this.left.dsfPostOrder();
        }

        if (this.right) {
	        this.right.dsfPostOrder();
        }
        // Post-order
        console.log(this.key);

    }
    
}

let bst = new BinarySearchTree();
bst.insert('E');
bst.insert('A');
bst.insert('S');
bst.insert('Y');
bst.insert('Q');
bst.insert('U');
bst.insert('E');
bst.insert('S');
bst.insert('T');
bst.insert('I');
bst.insert('O');
bst.insert('N');
//console.log(bst);

let bst2 = new BinarySearchTree();
bst2.insert(5);
bst2.insert(3);
bst2.insert(8);
bst2.insert(1);
bst2.insert(4);
bst2.insert(7);
bst2.insert(9);

/* //Exercise 5
let bst3 = new BinarySearchTree();
bst3.insert(25);
bst3.insert(15);
bst3.insert(50);
bst3.insert(10);
bst3.insert(4);
bst3.insert(6);
bst3.insert(7);
*/
////Exercise 5
//25 15 50 10 24 35 70 4 12 18 31 44 66 90 22
console.log(bst2);
console.log(`Preorder`);
bst2.dsfPreOrder();
console.log(`Inorder`);
bst2.dsfInOrder();
console.log(`PostOrder`);
bst2.dsfPostOrder();

// 6. Find the next commanding officer

function bfs(values) {
    values = values || [];
    const queue = [this];
  
    while (queue.length) {
      var node = queue.shift();
      values.push(node.value);
  
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return values;
  }

  /* Exercise 7
The share price for a company over a week's trading is as follows: 
[128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the 
company on one day, and sell the shares on one of the following days, 
write an algorithm to work out what the maximum profit you could make would be.
*/

function best_profit(prices) {
	if (!prices.length) return 0;
	//Algorithm: Step through potential selling days. If the price
	//is lower than our current buying day, switch to a new buying
	//day. If the price diff between buying and selling days is
	//greater than our current best, it's our new best.
	var buy = prices[0], sell = prices[0], profit = 0;
	for (var i = 1; i < prices.length; ++i) {
		sell = prices[i];
		if (sell < buy) buy = sell;
		if (sell - buy > profit) profit = sell - buy;
	}
	return profit;
}

//Tests for best_profit
//1) The sample array
console.log(best_profit([128, 97, 121, 123, 98, 97, 105]));

function generate_prices(start, step, spread, length) {
	var ret = [];
	while (length--) {
		ret.push(start + Math.floor(Math.random()*spread - spread/2));
		start += step;
	}
	return ret;
}
for (var i = 0; i < 10; ++i) {
	var prices = generate_prices(100, 2, 10, 10);
	console.log("Profit", best_profit(prices), "from", prices);
}
for (var i = 0; i < 10; ++i) {
	var prices = generate_prices(100, -2, 10, 10);
	console.log("Profit", best_profit(prices), "from", prices);
}

// ALT SOLUTION

function maxProfit(tree) {
    let min = tree[0];
    let max = tree[tree.length - 1];
  
    for (let i = 0; i < tree.length; i++) {
      if (min > tree[i]) {
        min = tree[i];
      }
      if (max < tree[i]) {
        max = tree[i];
      }
    }
    let profit = max - min;
    return profit;
  }
  
  const test = [128, 97, 121, 123, 98, 97, 105];
  
  console.log(maxProfit(test));