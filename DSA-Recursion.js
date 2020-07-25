//https://repl.it/@rogertang/DSA-Recursion-Drills

/*1. Counting Sheep
Write a recursive function that counts how many sheep jump over the fence. Your program should take a number
 as input. That number should be the number of sheep you have. The function should display the 
 number along with the message "Another sheep jumps over the fence" until no more sheep are left.

Input: 3
Output:
3: Another sheep jumps over the fence
2: Another sheep jumps over the fence
1: Another sheep jumps over the fence
All sheep jumped over the fence
*/

function countSheep(num) {
  //stopping condition of base case
  if (num === 0) {
    console.log(`All sheep jumped over the fence`);
  }
  //this is the recursive case
  //this will be executed until it reaches base case
  else {
    console.log(`${num}: Another sheep jump over the fence`);
    countSheep(num - 1);
  }
}

/*2. Power Calculator
Write a function called powerCalculator() that takes two parameters, an integer as a base, 
and another integer as an exponent. The function returns the value of the base raised to the power of
 the exponent. Use only exponents greater than or equal to 0 (positive numbers)

powerCalculator(10,2) should return 100
powerCalculator(10,-2) should return exponent should be >= 0
*/

function powerCalculator(base, exponent) {
  if (exponent < 0) {
    return "exponent should be greater than or equal to 0";
  } else {
    //base case
    if (exponent === 0) {
      return 1;
    }
    return base * powerCalculator(base, exponent - 1);
  }
}

/*3. Reverse String
Write a function that reverses a string. Take a string as input, reverse the string, and return the new string.
*/

function reverseString(string) {
  if (string.length < 2) {
    return string;
  } else {
    return reverseString(string.slice(1)) + string[0];
  }
}

reverseString("hello");

/*Exercise 4 - Triangular Number
Calculates the nth triangular number.
A triangular number counts the objects that can form an equilateral triangle. 
The nth triangular number is the number of dots composing a triangle with n dots on a side, 
and is equal to the sum of the n natural numbers from 1 to n. 
This is the Triangular Number Sequence: 1, 3, 6, 10, 15, 21, 28, 36, 45
                          *
            *           *    *
*     |   *   *  |   *    *    *  |
 1st     2nd             3rd             nth?  
1st trianular number = 1
2nd = (1+2) = 3
3rd = (1+2+3) = 6 
5th = (1+2+3+4+5) = 15
Input: 5
Output: 15
*/
//Should always return n*(n+1)/2
function triangle(n) {
  if (n < 2) return n;
  return n + triangle(n - 1);
}

/*Exercise 5 - String Splitter
Split a string based upon a separator (similar to String.prototype.split).
Input: '1/21/2018'
Output: 1212018 OR ["1", "21", "2018"]
*/

function split(str, sep) {
  var idx = str.indexOf(sep);
  if (idx == -1) return [str];
  //you don't have to return an array, you can return a string as an array of
  //character
  //return str;
  return [str.slice(0, idx)].concat(split(str.slice(idx + sep.length), sep));

  //****** all these are valid syntax as well
  //return (str.slice(0,idx) + (split(str.slice(idx + sep.length), sep)))
  //return str.slice(0,idx).concat(split(str.slice(idx + sep.length), sep))
}

/*Exercise 6 - Fibonacci
  
  Write a recursive program that prints the fibonacci sequence of a given number. 
  The fibonnaci sequence a series of numbers in which each number is the sum of the 
  two preceding numbers. 
  For example the 7th fibonacci number in a fibonaci sequence is  13. 
  The sequence looks as follows: 1 1 2 3 5 8 13.
  
  Input: 7
  Output: 13
  */

function fibonacci(n) {
  if (n <= 0) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

fibonacci(7);

/* Exercise 7 - Factorial
Write a recursive program that finds the factorial of a given number. 
The factorial of a number can be found by multiplying that number by each number 
between itself and one. The factorial of 5 is equal to 5 * 4 * 3 * 2 * 1 = 120
Input: 5
Output: 120
*/

function factorial(n) {
  //base case
  if (n == 0 || n == 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

factorial(5);

/*8. Find a way out of the maze
You have entered a Maze and need to find your way out of it. There are more than one possible exit 
from the Maze. Write a recursive function that will help you find a possible exit though the maze
You can use the following as your maze.
let maze = [
    [' ', ' ', ' ', '*', ' ', ' ', ' '],
    ['*', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '*', '*', '*', '*', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];
The Maze is represented as a NM matrix (in the above case, a 5X7 array). The starting point is
the top left corner and the exit is indicated by e. For simplicity purpose, use the bottom right 
corner of the maze as the exit. You can't go outside the boundaries of the maze. The maze has 
passages that are blocked and you can't go through them. These blocked passages are indicated by ``.
 Passing through a blocked cell as well as passing though a cell that you have already passed before are forbidden.
For the above maze, a possible exit can be RRDDLLDDRRRRRR
*/
const maze = function(labyrinth, position=0, row, col, direction='S',path){
    if(col<0 || row < 0){
        return;
    }
    if(col>=labyrinth[0].length || row>=labyrinth.length){
        return;
    }
   
    path[position] = direction;
    position++;

    if (labyrinth[row][col] === 'e'){
        PrintPath(path, 1, position - 1);
        return;
    }
    if (labyrinth[row][col] === ' ') {
        // The current cell is free. Mark it as visited
        labyrinth[row][col] = 's';
        // Invoke recursion to explore all possible directions
        maze(labyrinth,position,row, col - 1, 'L',path); // left
        maze(labyrinth,position,row - 1, col, 'U',path); // up
        maze(labyrinth,position,row, col + 1, 'R',path); // right
        maze(labyrinth,position,row + 1, col, 'D',path); // down
        // Mark back the current cell as free
        //lab[row][col] = ' ';
    }
    // Remove the last direction from the path
    position--;

}
const PrintPath = function (path, startPos, endPos){
    console.log('Found path to the exit: ');
    console.log(path);
}

/*9. Find ALL the ways out of the maze
Use the above maze and modify your solution so it finds All the possible exits 
through the Maze. To find all possible exit through the maze, think about how 
many places you can move at each turn. Possibly up, down, left or right?
Notice that this maze has 3 exits. Your recursive function should print all three 
of the paths with the proper directions. For example, given the maze above, 
the program should output the following:
Path to the exit: RRDDLLDDRRRRRR
Path to the exit: RRDDRRUURRDDDD
Path to the exit: RRDDRRRRDD
*/

const mazeAll = function(labyrinth, position=0, row, col, direction='S',path){
    if(col<0 || row < 0){
        return;
    }
    if(col>=labyrinth[0].length || row>=labyrinth.length){
        return;
    }
   
    path[position] = direction;
    position++;

    if (labyrinth[row][col] === 'e'){
        PrintPath(path, 1, position - 1);
        return;
    }
    if (labyrinth[row][col] === ' ') {
        // The current cell is free. Mark it as visited
        labyrinth[row][col] = 's';
        // Invoke recursion to explore all possible directions
        mazeAll(labyrinth,position,row, col - 1, 'L',path); // left
        mazeAll(labyrinth,position,row - 1, col, 'U',path); // up
        mazeAll(labyrinth,position,row, col + 1, 'R',path); // right
        mazeAll(labyrinth,position,row + 1, col, 'D',path); // down
        // Mark back the current cell as free
        labyrinth[row][col] = ' ';
    }
    // Remove the last direction from the path
    position--;

}

/*Exercise 10 - Anagrams
An anagram is any word or phrase that exactly reproduces the letters in another order. 
Write a program that creates an anagram (listing all the rearrangements of a word) of a given word. 
For example, if the user types east, the program should list all 24 permutations, including eats, etas, teas, 
and non-words like tsae.
Hint: For your algorithm, you might want to think about a prefix and use that to create the new words. 
For example, given east, use e as a prefix and you would place e in front of all six permutations of ast 
— ast, ats, sat, sta, tas, and tsa. This will give you the words east, eats, esat, esta, etas, and etsa. 
Continue this way until you find all the anagrams for east. There should be 24 of them.
Input: 
Output: 
*/

function anagrams(prefix, str){
    if(str.length <= 1){
        console.log(`The anagram is ${prefix}${str}`);
    } else {
        for(let i=0; i<str.length; i++){
            let currentLetter = str.substring(i, i+1); 
            let previousLetters = str.substring(0,i);
            let afterLetters = str.substring(i+1);
            anagrams(prefix+currentLetter, previousLetters+afterLetters);
        }
    }
}
function printAnagram(word){
    //console.log(`The word for which we will find an anagram is ${word}`);
    anagrams(' ', word);

}

printAnagram('east')

/*
Exercise 11: Organization Chart
Write a recursive function that prints the following organization chart. 
Your output should be as shown below with proper indentation to show the hierarchy.
let organization = {
	"Zuckerberg": {		
		"Schroepfer": {
			"Bosworth": {
				"Steve":{},
				"Kyle":{},
				"Andra":{}
			},
			"Zhao": {
				"Richie":{},
				"Sofia":{},
				"Jen":{}
			},
			"Badros": {
				"John":{},
				"Mike":{},
				"Pat":{}
			},
			"Parikh": {
				"Zach":{},
				"Ryan":{},
				"Tes":{}
			}
		},
		"Schrage": {
			"VanDyck": {
				"Sabrina":{},
				"Michelle":{},
				"Josh":{}
			},
			"Swain": {
				"Blanch":{},
				"Tom":{},
				"Joe":{}
			},
			"Frankovsky": {
				"Jasee":{},
				"Brian":{},
				"Margaret":{}
			}
		},
		"Sandberg": {
			"Goler": {
				"Eddie":{},
				"Julie":{},
				"Annie":{}
			},
			"Hernandez": {
				"Rowi":{},
				"Inga":{},
				"Morgan":{}
			},
			"Moissinac": {
				"Amy":{},
				"Chuck":{},
				"Vinni":{}
			},
			"Kelley": {
				"Eric":{},
				"Ana":{},
				"Wes":{}
			}
}}};
*/
function traverseA(data, depth = 0) {
	let indent = " ".repeat(depth * 4);
	Object.keys(data).forEach(key => {
		console.log(indent + key);
		traverseA(data[key], depth + 1)
	});
}
//another version of the solution
function traverseB(node, indent=0) {
	for (var key in node) {
		console.log(" ".repeat(indent), key);
		traverseB(node[key], indent + 4);
	}
}

//Exercise 12: Write a recursive function that prints out the binary representation of a given number.
// input: 5
//output: 101

function binaryRep(input){
    if(input<=0){
        return '';
    } 
    let binary = Math.floor(input%2);
    return binaryRep(Math.floor(input/2)) + binary

}

function main(){
    let base = 10;
    let exponent = 2;
    let exponentNeg = -2;
    let str = 'tauhida'
    let triNum = 5;
    let myString = '03/14/2019';
    let seperator = '/';

    let myMaze = [
        [' ', ' ', ' ', '*', ' ', ' ', ' '],
        ['*', '*', ' ', '*', ' ', '*', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', '*', '*', '*', '*', '*', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', 'e']
    ];
    let mySmallMaze = [
        [' ', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', 'e']
    ];
    let path = [];
    let word = 'east'
    
    let organization = {
		"Zuckerberg": {		
			"Schroepfer": {
				"Bosworth": {
					"Steve":{},
					"Kyle":{},
					"Andra":{}
				},
				"Zhao": {
					"Richie":{},
					"Sofia":{},
					"Jen":{}
				},
				"Badros": {
					"John":{},
					"Mike":{},
					"Pat":{}
				},
				"Parikh": {
					"Zach":{},
					"Ryan":{},
					"Tes":{}
				}
			},
			"Schrage": {
				"VanDyck": {
					"Sabrina":{},
					"Michelle":{},
					"Josh":{}
				},
				"Swain": {
					"Blanch":{},
					"Tom":{},
					"Joe":{}
				},
				"Frankovsky": {
					"Jasee":{},
					"Brian":{},
					"Margaret":{}
				}
			},
			"Sandberg": {
				"Goler": {
					"Eddie":{},
					"Julie":{},
					"Annie":{}
				},
				"Hernandez": {
					"Rowi":{},
					"Inga":{},
					"Morgan":{}
				},
				"Moissinac": {
					"Amy":{},
					"Chuck":{},
					"Vinni":{}
				},
				"Kelley": {
					"Eric":{},
					"Ana":{},
					"Wes":{}
				}
	}}};
    let num = 25;

    let fibSeq = 7;
    let arr = [];

    let factNum = 4;
   
    countSheep(3);
    console.log(powerCalculatorRec(base, exponent));
    console.log(powerCalculatorRec(base, exponentNeg));
    console.log(reverseString(str));
    console.log(triangle(triNum))

    console.log(split(myString, seperator))

    for (let i=1; i<=fibSeq; i++){
        arr.push(fibonacci(i))
      }
    console.log(arr);

    
    console.log(factorial(factNum))

    maze(myMaze,0,0, 0, 'S', path);
    mazeAll(myMaze,0,0, 0, 'S', path);
    
    printAnagram(word);

    traverseA(organization);
    
    console.log(binaryRep(num))

}

main();
