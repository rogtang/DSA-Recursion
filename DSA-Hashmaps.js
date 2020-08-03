const HashMap = require('/hashmaps')

function main(){
    
    let hTable = new HashMap();
    let names = [{Hobbit:"Bilbo"}, {Hobbit:"Frodo"}, {Wizard:"Gandolf"}, {Human:"Aragon"},
    {Elf: "Legolas"}, {Maiar:"The Necromancer"}, {Maiar: "Sauron"}, {RingBearer: "Gollum"},
    {LadyOfLight: "Galadriel"}, {HalfElven: "Arwen"}, {ShepherdOfTheTrees: "Treebeard"}];
    
    for (let i = 0; i < names.length; ++i) {
      for (let keys in names[i]){
        hTable.set(keys,names[i][keys]);
      }
    }
    console.log(hTable);
}

main();

/*
length: 9
No, it only hashed one Hobbit key ('Frodo) and one Maiar key ('Sauron')

Capacity is 24
*/

/**********************************************/
//DO NOT run the following code before solving the problem.
//What is the output of the following code? explain your answer.
const HashMap = require('./Hashmaps')

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1)); //20 (overwrites the 10)
    console.log(map2.get(str3)); //10 (overwrites the 20)
} 

WhatDoesThisDo();

//The keys are the same - Therefore, it will hash the first key str1 (and its value 10) and since the
//2nd key is the same it will override the value to 20.

/*************************************/
/*
3. Demonstrate understanding of Hash maps
*You don't need to write code for the following two drills. 
use any drawing app or simple pen and paper *
************
1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 
into a hash map of length m = 11 using open addressing and a hash function k mod m , where k is the key and m is the length.
************

function hashFunction(k, length){
    return k % length
}

console.log(hashFunction(31,11))

| 22 | 88  |   |   | 4  | 15  | 28 | 17  | 59 | 31 |  10
-----------------------------------------------------------
  0    1     2   3   4    5     6    7     8    9     10
15 has a collision so it will go to slot 5
17 has a collision and will go to slot 7
88 has a collision and will go to slot 1
59 has a collision and will go to slot 8


2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash 
map with collisions resolved by separate chaining. Let the hash table have a length m = 9, 
and let the hash function be k mod m.

function hashFunction(k, length){
    return k % length
}

console.log(hashFunction(10,9))
*/

//4) Remove duplicates
/* Implement a function to delete all duplicated characters in a string and keep only
the first occurrence of each character.  For example, if your input is string "google",
the result after deletion is "gole". 
Test your program with a sentence as well such as "google all that you can think of" */

function removeDuplicate(str) {
  let stringTable = new HashMap();

  let newString = ""

  for (let i = 0; i < str.length; i++) {
    stringTable.set(str[i], str[i]);
    if(!newString.includes(stringTable.get(str[i])) ) {
      newString += stringTable.get(str[i])
    }
  } return newString
}

console.log(removeDuplicate('google all that you think can think of'))

//gole athyuinkcf
//can you explain why you don't have it as "gole a th yu ink c f"?
//   ----- because space is counted as a valud key and its duplicates are removed

 //5) Any permutation a palindrome.
 /* Write an algorithm to check whether any anagram of some string is a palindrome.
 Given some string, "acecarr" the aglorithm should return true, because it can be rearranged to racecar.
 In contrast, "north" should return fase, since there is no anagram  for north that would be a
 palindrome.
 There are many ways to solve this problem.
YOu can create a containKey method, OR
You can use try/catch */

function permutationPalindrome(string) {
  // remove non letter characters
  const filtered = string.replace(/[^a-zA-Z]+/g, '').toLowerCase()
  // empty string
  if (!filtered) { return 'no string provided'}
  const hash = new HashMap
  let count = 0
  // loop to find dup key in hashtable
  for (i in filtered) {
      // We skip .get() method b/c it throws error
      // undefined = no value set yet
      if (!hash._hashTable[hash._findSlot(filtered[i])]) {
          // if no value yet then set to 1
          hash.set(filtered[i], 1)
      }
      //if key IS in the hashtable then...
      else {
          // index has value. now we just + 1 to value
          // b/c has value, no more error from .set(). we can use .set() method
          hash.set(filtered[i], hash.get(filtered[i]) + 1)
      }
  }
  // loop through each index in hashTable that has key
  for (i in hash._hashTable) {
      //console.log(count = hash._hashTable[i].value % 2)
      // if % 2 has remainder add to count
      hash._hashTable[i].value % 2 !== 0 && count ++
      i ++
  }
  // if less than or equal to 1 then it is palindrome!
  return count <= 1
}

console.log(permutationPalindrome('madam'));
console.log(permutationPalindrome('acecarr'));
console.log(permutationPalindrome('hole'));

//6) Anagram grouping
/* Write an algorithm to grop a list of words into anagrams. For example, 
if input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'],
output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']] */

function group_into_anagrams(words) {
  let anagrams = new Map();
  for (let word of words) {
    const sorted = word.split('').sort().join('')
      //if exists, then push word into that array
      if (anagrams.has(sorted)){
          anagrams.get(sorted).push(word);
      }
      //doesn't exist, then create the array
      else {
        //[word] = value at index of sorted
        anagrams.set(sorted, [word]);
      }
  }
  return anagrams;
}
console.log(group_into_anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

//7)Separate Chaining - write another hashmap implementation as above, but use separate
//chaining as the collision resolution mechanism.
//Test with same values from lotr hashmap.
//Solution listed in ChainedMap.js

