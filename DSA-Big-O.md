/*1. What is the Big O for this?
1) Determine the Big O for the following algorithm: You are sitting in a room with 15 people. You want to find a playmate for your dog, preferably of the same breed. So you want to know if anyone out of the 15 people have the same breed as your dog. You stand up and yell out, who here has a golden retriever and would like to be a playdate for my golden. Someone yells - "I do, be happy to bring him over"

O(1) - the number of dogs (input) does not matter, you are just accessing one random dog (input) in the array


2) Determine the Big O for the following algorithm: You are sitting in a room with 15 people. You want to find a playmate for your dog who is of the same breed. So you want to know if anyone out of the 15 people have the same breed as your dog. You start with the first person and ask him if he has a golden retriever. He says no, then you ask the next person, and the next, and the next until you find someone who has a golden or there is no one else to ask.

0(n) or linear time - since you are going down the line, the number of operations increases in a linear way depending on the number of dogs in the array (and is directly proportional to the number of inputs)


/*2. Even or odd
What is the Big O of the following algorithm? Explain your answer

function isEven(value) {
    if (value % 2 === 0) {
        return true;
    }
    else
        return false;
    }
}

O(1) or constant time - the input is only 1 value and requires a one-time operation


3. Are you here?
What is the Big O of the following algorithm? Explain your answer

function areYouHere(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        const el1 = arr1[i];
        for (let j = 0; j < arr2.length; j++) {
            const el2 = arr2[j];
            if (el1 === el2) return true;
        }
    }
    return false;
}

O(n^k) or Polynomial time - requires nested loops and operating time depends on the number of loops required to go through. In this case there are two arrays and 2 loops

4. Doubler
What is the Big O of the following algorithm? Explain your answer

function doubleArrayValues(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] *= 2;
    }
    return array;
}

0(n) or linear time - alogrithm loops through each item in the array so the operating time increases in direct proportion to the size of the array

5. Naive search
What is the Big O of the following algorithm? Explain your answer

function naiveSearch(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return i;
        }
    }
}

0(n) or linear time - alogrithm loops through each item in the array to compare items so the operating time increases in direct proportion to the size of the array

6. Creating pairs:
What is the Big O of the following algorithm? Explain your answer

function createPairs(arr) {
    for (let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            console.log(arr[i] + ", " +  arr[j] );
        }
    }
}

O(n^k) or Polynomial time - requires nested loops and operating time depends on the number of loops required to go through, in this case twice. 

7. Compute the sequence
What does the following algorithm do? What is its runtime complexity? Explain your answer

function compute(num) {
    let result = [];
    for (let i = 1; i <= num; i++) {

        if (i === 1) {
            result.push(0);
        }
        else if (i === 2) {
            result.push(1);
        }
        else {
            result.push(result[i - 2] + result[i - 3]);
        }
    }
    return result;
}

0(n) or linear time - function creates an array that depends on the number of elements passed as an argument. Operating time will increase in a linear way.

8. An efficient search
In this example, we return to the problem of searching using a more sophisticated approach than in naive search, above. Assume that the input array is always sorted. What is the Big O of the following algorithm? Explain your answer

function efficientSearch(array, item) {
    let minIndex = 0;
    let maxIndex = array.length - 1;
    let currentIndex;
    let currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = Math.floor((minIndex + maxIndex) / 2);
        currentElement = array[currentIndex];

        if (currentElement < item) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > item) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return -1;
}

 O(log(n)) or logarithmic time - this function cuts the problem size in half each loop through (a characteristic of 0(log(n))). 

9. Random element
What is the Big O of the following algorithm? Explain your answer

function findRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

0(1) or constant time - requires a one-time operation no matter the size of the input

10. What Am I?
What does the following algorithm do? What is the Big O of the following algorithm? Explain your answer

function isWhat(n) {
    if (n < 2 || n % 1 !== 0) {
        return false;
    }
    for (let i = 2; i < n; ++i) {
        if (n % i === 0) return false;
    }
    return true;
}

0(n) or linear time - function checks if a number is a prime number. It needs to loop through all numbers less than the input which causes the operating time to increase in direct proportion to the size of the input.

11. Tower of Hanoi
The Tower of Hanoi is a very famous mathematical puzzle (some call it game!). This is how it goes:

There are three rods and a number of disks of different sizes which can slide onto any rod. The puzzle starts with the disks neatly stacked in ascending order of size on one rod, the smallest disk at the top (making a conical shape). The other two rods are empty to begin with.
The goal of the puzzle is to move the entire stack of rods to another rod (can't be the original rod where it was stacked before) where it will be stacked in the ascending order as well. This should be done obeying the following rules: i) Only one disk may be moved at a time ii) Each move consists of taking the upper disk from one of the rods and sliding it onto another rod, on top of the other disks that may already be present on that rod. iii) A larger disk may not placed on top of a smaller disk
Input:

Rod A	Rod B	Rod C
----		
---------		
-------------		
Output:

Rod A	Rod B	Rod C
----
---------
-------------
Derive an algorithm to solve the Tower of Hanoi puzzle.
Implement your algorithm using recursion. Your program should display each movement of the disk from one rod to another.
If you are given 5 disks, how do the rods look like after 7 recursive calls?
1 Move from A to C
2 Move from A to B
3 Move from C to B
4 Move from A to C
5 Move from B to A
6 Move from B to C
7 Move from A to C
How many moves are needed to complete the puzzle with 3 disks? with 4 disks? with 5 disks?
What is the runtime of your algorithm?
7
15
31
2^3 = 8
2^4 = 16
2^5 = 32
O(2^n) -> exponential


const towerOfHanoi = function(n, source, dest, temp){
    if(n===1){
        printMove(source, dest);
    }
    else{
        towerOfHanoi(n-1, source, temp, dest);
        towerOfHanoi(1, source, dest, temp);
        towerOfHanoi(n-1, temp, dest, source);
    }
};
let count = 1;
const printMove = function(source, dest){
    console.log(`${count} Move from ${source} to ${dest}`);
    count++;
};

function main(){
    towerOfHanoi(4, 'A', 'C', 'B');
}
main();

12. Iterative version
Solve the drills 1 - 7 from your previous checkpoint (Recursion) iteratively.
/*

/* 1. Counting Sheep 
* Big O: O(n) linear complexity
As the input size grows, so does the runtime. If the sheepcount is 1,
You call the recursive function 1 time, if the sheepcount is 100, call the recursive 
function 100 times. 
If the input is n, you call the recursive funciton n times, which makes this a linear runtime.
*/
function countSheepLoop(num){
    let counter = 0;
    for(let i=num; i>0; i--){
        console.log(`counting sheeps ${i}`);
        counter++;
    }
    console.log(`countSheepLoop counter: ${counter}`);
}

//2. Write a function called `powerCalculator()`
//**** O(n)****
const powerCalculator = function(base, exponent){
    // make sure exponent is > = 0
    if(exponent < 0){
        return 'exponent should be >= 0';
    }
    let result = 1;
    for(let i=0; i<exponent; i++){
        result *= base;
    }
    return result
}

//Exercise 3 - Reverse String
//The run time depends on how long the string it. Each character in the string 
//is visited once
//**** O(n)****

function reverse_tail(str) {
    let accumulator = "";
    let counter = 0;
    while (str !== "") {
    	accumulator = str[0] + accumulator;
    	str = str.slice(1);
        counter++;
    }
    console.log(`reverse_tail counter: ${counter}`);
    return accumulator;
}

//Exercise 4 - Triangular Number
/*
For this you have to consider all the input up to the nth number.
The larger the input is, the more numbers you have to add. Therefore,
the runtime is proportional to the input size.
*/
//**** O(n)****

function triangle(n) {
    let tot = 0;
    let counter = 0;
    for (var i = 1; i <= n; ++i) {
	    tot += i;
        counter++;
    }
    console.log(`triangle counter: ${counter}`);
    return tot;
}

//Exercise 5 - String Splitter
/*
You have to go though every character in the string to identify how to split
increasing the input size will increase the run time
*/
//**** O(n)****
function split(str, sep) {
    let ret = [];
    let counter = 0;
    while (true) {
        let idx = str.indexOf(sep);
        if (idx == -1) 
            break;
	    ret.push(str.slice(0, idx))
	    str = str.slice(idx + sep.length);
        counter++;
    }
    ret.push(str);
    console.log(`split counter: ${counter}`);
    return ret;
}
//Exercise 6 - Factorial
/*
You have to consider every number up to the number whose factorial you are
trying to find. If that number is a large number your number of operation increases
*/
//**** O(n)****

function factorialIterative(number){
    let counter = 0;
    let fact = 1;
    for (let i = 1; i <= number; i++){
        fact *= i;
        counter++;
    }
    console.log(`factorialIterative counter: ${counter}`);
    return fact;
}

//Exercise 7 - Fibonacci
/*
You have to consider every number up to the number whose Fibonacci sequence you are
trying to find. If that number is a large number your number of operation increases
*/
//**** O(n)****
function fibonacciIterative(number){
    let num1 = 1;
    let num2 = 0;
    let fib = null;
    let counter = 0;
    while(number > 0){
        fib = num1;
        num1 = num1+num2;
        num2 = fib;
        number--;
        counter++;
    }
    console.log(`fibonacciIterative counter: ${counter}`);
    return num2;

}

function main(){

    countSheepLoop(10);
    console.log(powerCalculator(10,2));
    console.log(reverse_tail('tauhida'));
    console.log(reverse_tail('tauhidaparveen'));
    console.log(triangle(3));
    console.log(triangle(6));
    console.log(split('1/27/2017', '/'));
    console.log(factorialIterative(5));
    console.log(fibonacciIterative(3));

}
main();

13. Recursive Big O
Take your solutions from the recursive exercises that you completed in the previous checkpoint and identify the time complexities (big O) of each of them.

14. Iterative Big O
Take your solutions from the iterative exercises today and identify the time complexities (big O) of each of them.
O(n)

*/
