const Memory = require('./memory')
const memory = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        //only resize (to SIZE_RATIO) if length is greater than capacity, otherwise you can just set the memory directly
        if (this.length >= this._capacity) {
            //resize array to add space for the new value
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        //then set memory at this.ptr + length to equal the new value
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
    
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        //add index offset to the memory address to retrieve the value
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        //copy the values starting at this.ptr + index and move it one spot to the right
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        //then set the inserted value in the newly vacated this.ptr + index
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        //after reducing the length of the size of the array, copy the values backwards to fill the space previously held by the removed value
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}


/*Exploring the push() method.
Array { length: 6, _capacity: 12, ptr: 3 }

Exploring the pop() method. What is the length, capacity, and address of your array? 
Array { length: 3, _capacity: 12, ptr: 3 }

Empty the array and add just one item arr.push("tauhida"); //use pop() is fine
Print this one item that you just added. What is the result? Can you explain your result?
 - Result in 'NaN'. The array type is a float meaning it will only take numbers and not string
What is the purpose of the _resize() function in your Array class?
    Resize is an internal function and it is used to do a sensible resizing everything 
    the array runs out of capacity

 1. URLify a string
A common mistake users make when they type in an URL is to put spaces between words or letters. One solution that developers can use to solve this problem is to replace any spaces with a '%20'. Write a method that takes in a string and replaces all its empty spaces with a '%20'. Your algorithm can only make 1 pass through the string.
Examples of input and output for this problem can be 
Input: tauhida parveen
Output: tauhida%20parveen
input: www.thinkful.com /tauh ida parv een
output: www.thinkful.com%20/tauh%20ida%20parv%20een
*/
function urlifyString(str){
    let spaceCount = 0;
    let index = 0;
    let newString = '';
    for(let i=0; i<str.length; i++){
        if(str[i]===' '){
            newString+='%20'
 
        }else{
            newString += str[i];
        }
        
    }
    return newString;
}

urlifyString('roger tang');




/*
### 2. Filtering an array
Imagine you have an array of numbers. Write an algorithm to remove all numbers 
less than five from the array. 
Don't use array's built-in `.filter` method here; write the algorithm from scratch.
Input: [10,4,5,8,2,9];
Output: [10,5,8,9]
*/
function remove_lt_5(arr) {
	let ret = [];
	for (var i = 0; i < arr.length; ++i) {
		if (!(arr[i] < 5)) 
			ret.push(arr[i]);
	}
	return ret;
}

remove_lt_5([10,4,5,8,2,9])

/*
### 3: Max sum in the array
You are given an array containing positive and negative integers. 
Write an algorithm which will find the largest sum in a continuous sequence.
Input: [4,6,-3,5,-2,1]
Output: 12
*/
function largestSum(arr){
    let currentSum = 0;
    let oldSum = 0;
    let highest
    for (let i=0;i<arr.length; i++){
      currentSum+= arr[i]
      if (currentSum > oldSum) {
        highest = currentSum
        oldSum = currentSum;
      }
    }
    return highest
  }
  
  let input = [4, 6, -3, 5, -2, 1];
  console.log(largestSum(input))

/*
### 4. Merge Arrays
Imagine you have two arrays which have already been sorted. 
Write an algorithm to merge the two arrays into a single array, 
which should also be sorted. 
Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]
*/
const mergeArr = function(arr1,arr2){
    const mergeArr = [...arr1, ...arr2];
    const sortedAnswer = mergeArr.sort( (a,b) => a-b );
    return sortedAnswer
  }
  
  testArr1 = [1, 3, 6, 8, 11] 
  testArr2 = [2, 3, 5, 8, 9, 10]
  mergeArr(testArr1, testArr2)

  /*
### 5: Remove Characters
Write an algorithm that deletes given characters from a string. For example, given a 
string of "Battle of the Vowels: Hawaii vs. Grozny" and characters to be removed are 
"aeiou", the algorithm should transform the original string to "Bttl f th Vwls: Hw vs. Grzny". 
ot use Javascript's filter, split, or join methods.
Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
Output: 'Bttl f th Vwls: Hw vs. Grzny'
*/
const removeChar = function(str,char){
    let answer = "";
  
    for(let i = 0 ; i < str.length ; i++){
      let pushOrNot = true
      for(let j = 0 ; j < char.length ; j++){
        if (str[i].toLowerCase() == char[j].toLowerCase()){
          pushOrNot = false
        }
      }
      if(pushOrNot) answer+=(str[i])
    }
  
    return answer
  }
  
  const testStr = 'Battle of the Vowels: Hawaii vs. Grozny';
  const testChar = 'aeiou';
  
  removeChar(testStr,testChar);

/*
### 6: Products
Given an array of numbers, write an algorithm to find out the products of every number, 
except the one at that index.
Input:[1, 3, 9, 4]
Output:[108, 36, 12, 27]
*/

  function products(arr) {
	let ret = [];
	for (let idx1 = 0; idx1 < arr.length; ++idx1) {
		let prod = 1;
		for (let idx2 = 0; idx2 < arr.length; ++idx2) {
			if (idx1 != idx2) {
                prod *= arr[idx2];
            }
		}
		ret.push(prod);
	}
	return ret;
}

products([1, 3, 9, 4])

/*
### 7: 2D array
Write an algorithm which searches through a 2D array, and whenever it finds a zero should 
set the entire row and column to zero.
Input:
[[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]];
Output:
[[0,0,0,0,0],
[0,0,0,0,0],
[0,0,1,1,0],
[0,0,0,0,0],
[0,0,1,1,0]];
*/
function zeroRowsColumns(mat){
    const zeroRows = [];
    const zeroCols = [];

    for (let i=0; i<mat.length; i++) {
        let row = mat[i];
        for (let j=0; j<row.length; j++) {
            const item = row[j];
            if (item === 0) {
                zeroRows[i] = true;
                zeroCols[j] = true;
            }
        }
    }

    for (let i=0; i<mat.length; i++) {
        let row = mat[i];
        for (let j=0; j<row.length; j++) {
            if (zeroRows[i] || zeroCols[j]) {
                row[j] = 0;
            }
        }
    }
    return mat;
}

zeroRowsColumns([[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]])

/*
### 8: String rotation
Given two strings, str1 and str2, write a program that checks if str2 is a rotation of str1.
Input: amazon, azonma
Output: False
Input: amazon, azonam
Output: true
*/

function strRotation(string1, string2){
    return (string2 + string2).indexOf(string1) != -1;

}

strRotation('amazon', 'azonma');
strRotation('amazon', 'azonam');