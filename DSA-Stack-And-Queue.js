class _Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this.top = null;
    }
    push(data) {
        if (this.top === null) {
            this.top = new _Node(data);
            return;
        }
        const node = new _Node(data, this.top);
        this.top = node;
    }
    pop() {
        const node = this.top;
        this.top = node.next;
        return node.data
    }
}

//Create a stack called starTrek and add Kirk, Spock, 
//McCoy, and Scotty to the stack.
function main() {
    const starTrek = new Stack()
    starTrek.push('Kirk');
    starTrek.push('Spock');
    starTrek.push('McCoy');
    starTrek.push('Scotty');
}

/*
2. Useful methods for a stack
Using the Stack class above, implement the following helper functions outside of the class:
peek(): allows you to look at the top of the stack without removing it
isEmpty(): allows you to check if the stack is empty or not
display(): to display the stack - what is the 1st item in your stack?
Remove McCoy from your stack and display the stack
*/

function peek(stack){
    if (stack.top === null) {
        return null;
    }

    return stack.top.data;
}

function isEmpty(stack){
    if (stack.top == null){
      return true
    } else return false
  }

function display(newStack) {
    // displays the entire contents of the stack
    let node = newStack.top;
    while (node) {
        console.log(node.data);
        node = node.next;
    }
}

/*
A palindrome is a word, phrase, or number that is spelled the same forward and backward. 
For example,dad is a palindrome; A man, a plan, a canal: Panama� is a palindrome if 
you take out the spaces and ignore the punctuation; and 1,001 is a numeric palindrome. 
We can use a stack to determine whether or not a given string is a palindrome.
Write a function that takes a string of letters and returns true or false to determine 
whether it is palindromic. For example:
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
// true, true, true
*/

function is_palindrome(str){
    const stack = new Stack()
    str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    for (let i = 0 ; i < str.length ; i++){
      stack.push(str[i]) // ['d','a','d']
    }
  
    let backwardStr = ''
    for (let i = 0 ; i < str.length ; i++){
    //iterate and "pop" the top letter and add to the end
      backwardStr = backwardStr + stack.pop()
    }
  
    if (backwardStr === str){
      return true
    } else return false
  }

// True, true, true, false
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));


/*
4. Matching parentheses in an expression
A stack can be used to ensure that an arithmetic expression has balanced parentheses. 
Write a function that takes an arithmetic expression as an argument and returns true 
or false based on matching parenthesis. As a bonus provide a meaningful error message 
to the user as to what's missing. For example, you are missing a ( or missing a ")".
For version 1, the parentheses you need to consider are ( and ). Finding a close 
parenthesis without an open parenthesis is an error (report the location of the close); 
reaching the end of the string while still "holding" an open parenthesis is also an 
error (report the location of the open).
*/

function parenthesesMatch1(s) {
    const stack = new Stack();

    for (let i=0; i<s.length; i++) {
        const char = s.charAt(i);
    //if '(' , put it in the stack
        if (char === '(') {
            stack.push(char);
        }
        else if (char === ')') {
            const candidate = peek(stack);
            if (!candidate) {
                return false;
            }
            stack.pop();
        }
    }

    if (peek(stack)) {
        return false;
    }
    return true;
}



// Multiple
function parenthesesMatch2(s) {
    const stack = new Stack(); 

    const brackets = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    const openBrackets = Object.keys(brackets);
    const closeBrackets = Object.values(brackets);

    for (let i=0; i<s.length; i++) {
        const char = s.charAt(i);
        if (openBrackets.includes(char)) {
            stack.push(char);
        }
        else if (closeBrackets.includes(char)) {
            const candidate = peek(stack);
            if (brackets[candidate] !== char) {
                return false;
            }
            stack.pop();
        }
    }

    if (peek(stack)) {
        return false;
    }
    return true;
}

// With strings
function parenthesesMatch3(s) {
    const stack = new Stack();

    const brackets = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    const openBrackets = Object.keys(brackets);
    const closeBrackets = Object.values(brackets);

    const quotes = ['"', "'"];

    let inQuotes = false;

    for (let i=0; i<s.length; i++) {
        const char = s.charAt(i);

        if (quotes.includes(char)) {
            if (inQuotes) {
                const candidate = peek(stack);
                if (candidate === char) {
                    stack.pop();
                    inQuotes = false;
                }
            }
            else {
                stack.push(char);
                inQuotes = true;
            }
        }
        else if (openBrackets.includes(char) && !inQuotes) {
            stack.push(char);
        }
        else if (closeBrackets.includes(char) && !inQuotes) {
            const candidate = peek(stack);
            if (brackets[candidate] !== char) {
                return false;
            }
            stack.pop();
        }
    }

    if (peek(stack)) {
        return false;
    }
    return true;
}

console.log(parenthesesMatch1("(1 + 2) + 3"));
console.log(parenthesesMatch1("(1 + 2) + 3)"));
console.log(parenthesesMatch2(")1 + 2) + 3"));
console.log(parenthesesMatch2("(1 + 2 + (3)"));
console.log(parenthesesMatch3("([({})])"));
console.log(parenthesesMatch3("([({)}])"));
console.log(parenthesesMatch3("'{(\"'"));
console.log(parenthesesMatch3("[{'('}('')]"));
console.log(parenthesesMatch3("[{'(\"}('')]"));

/*
5. Sort stack
Write a program to sort a stack such that the smallest items are on the 
top (in ascending order). You can use an additional stack, but you may 
not use any other data structure (such as an array, or linked list).
*/

function createStack(){
    const unsorted = new Stack
    unsorted.push(11)
    unsorted.push(3)
    unsorted.push(45)
    unsorted.push(17)
    unsorted.push(32)
    unsorted.push(6)
    
    return unsorted
}

function sortStack(input){
    // create a temporary stack
    const tempStack = new Stack
    // while input is not empty
    while (input.top){
        // pop element from input
        let temp = input.pop()
        //while temp stack not empy and top of temp stack is less than temp
        while (tempStack.top && tempStack.top.data<temp){
            // pop from temp stack and push to input stack
            input.push(tempStack.pop())
        }
        //push temp to temp stack
        tempStack.push(temp)
    }
    console.log(display(tempStack))
}
let sort = createStack()
console.log(sortStack(sort))


//Walk through the Queue class and understand it well.
//Create a Queue class from scratch with its core functions (enqueue, dequeue)

class _Node {
    constructor(value) {
        this.value=value,
        this.next=null,
        this.prev=null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        //create a node with the data that you want to add to the queue
        const node = new _Node(data);

        //if the queue is empty, 
        //make the node the first node on the queue
        if (this.first === null) {
            this.first = node;
        }
        //if there is something on the queue already
        //then take the node that is currently at the end of the queue
        //and link it to the new node
        if (this.last) {
            node.prev = this.last;
            this.last.next = node;
        }
        //make the new node the last item on the queue
        this.last = node;
    }
    dequeue() {
         //if the queue is empty, there is nothing to return
        if (this.first === null) {
            return;
        }
        //make the first item on the queue to be the 
        //the item that is next on the line 
        // the item after the current first item
        const node = this.first;
        this.first = node.next;
         //if this is the last item in the queue
        if (node === this.last) {
            this.last = null;
        }
        return node.value;
    }
}

//1) Create a queue using singly linked list called starTrekQ and add Kirk, Spock, Uhura, Sulu, and Checkov to queue
const starTrekQ = new Queue();

starTrekQ.enqueue('Kirk');
starTrekQ.enqueue('Spock');
starTrekQ.enqueue('Uhura');
starTrekQ.enqueue('Sulu');
starTrekQ.enqueue('Checkov');
//console.log(starTrekQ);

//2 Implement a peek() function outside of Queue class that 
//lets you take a peek at what first item in queue is
function peek(queue) {
    if (!queue.first) {
      return 'Queue is empty.';
    }
  
    return queue.first.value;
  }
//console.log(peek(starTrekQ))


//3 Implement an isEmpty function outside of Queue class that allows you to 
//check if the queue is empty or not
function isEmpty(queue) {
    if (queue.first === null) {
        return 'Empty queue.'
    }
    return queue;
}
const emptyQ = new Queue();
//console.log(isEmpty(emptyQ));


//4) Implement a display() function outside of queue class that lets you display 
//what is in the queue.
function display(queue) {
    let node = queue.first;
    while (node) {
        console.log(node);
        node = node.next;
    }
}
//console.log(display(starTrekQ));


//5) Remove Spock from queue and display resulting queue.
starTrekQ.dequeue();
starTrekQ.dequeue();
//console.log(display(starTrekQ))

//Create a queue class using Doubly linked List
//Use the items listed in #6 and enqueue them to your queue.

class _Node {
    constructor(value,prev){
        this.value = value;
        this.prev = prev
        this.next = null;
    }
}

class Queue {
  constructor(){
    this.first = null;
    this.last = null;
  }

  enqueue(item){
    //if empty queue
    if (this.first == null){
      let firstNode = new _Node(item,this.first)
      this.first = firstNode
      this.last = firstNode
    }

    if (this.last){
      let newNode = new _Node(item,this.last)
      this.last.next = newNode
      this.last = newNode
    }
  }

  dequeue(){
    //if empty queue
    if (this.first == null){
      return null
    }

    //if something already in queue
    let node = this.first
    this.first = node.next
    this.first.prev = null

    if (node == this.last){
      this.last == null
    }
    return node.value
  }
}


//1) Create a queue using singly linked list called starTrekQ and add Kirk, Spock, Uhura, Sulu, and Checkov to queue
const starTrekQ = new Queue();

starTrekQ.enqueue('Kirk');
starTrekQ.enqueue('Spock');
starTrekQ.enqueue('Uhura');
starTrekQ.enqueue('Sulu');
starTrekQ.enqueue('Checkov');
//console.log(starTrekQ);

//2 Implement a peek() function outside of Queue class that 
//lets you take a peek at what first item in queue is
function peek(queue) {
    if (!queue.first) {
      return 'Queue is empty.';
    }
  
    return queue.first.value;
  }
  let myQ = new Queue();
  myQ.enqueue('first')
console.log(peek(myQ))

/*
Queue Implementation using Stack
A common way to implement a queue is to use a doubly linked list. 
Using the concept of queue in mind, implement a queue using 2 stacks and no other data structure. 
(You are not allowed to use a doubly linked list or array. Use the stack implementation 
with Linked list from your today’s reading material)
*/

class Queue {
    constructor() {
        //this.top = null;
        this.oldStack = new Stack();
        this.newStack = new Stack();
    }
    eneque(item) {
        this.oldStack.push(item);
    }
   
    dequeue() {
        this._reverseElement();
        return this.newStack.pop();
    }
    peek() {
        this._reverseElement();
        return this.newStack.peek();
    };

    //remove item from oldStack and push to newStack
    _reverseElement(){
        if(isEmpty(this.newStack)){
            //while oldStack contains items
            while(!isEmpty(this.oldStack)){
                this.newStack.push(this.oldStack.pop());
            }
        }
    }
}

//9) As people come to the dance floor, they should be paired off as quickly as possible.
//opposite enders all the way down the line
//if several men arrive in a row, they should be paired in the order they came.
//Maintain a queue of "spares" and pair them as appropriate.

function squareDance(){
    let dancers = []
    const SquareDanceQueue = new Queue()
    const WaitingQueue = new Queue()
    SquareDanceQueue.enqueue('F Jane')
    SquareDanceQueue.enqueue('M Frank')
    SquareDanceQueue.enqueue('M John')
    SquareDanceQueue.enqueue('M Sherlock')
    SquareDanceQueue.enqueue('F Madonna')
    SquareDanceQueue.enqueue('M David')
    SquareDanceQueue.enqueue('M Christopher')
    SquareDanceQueue.enqueue('F Beyonce')
  
    while (SquareDanceQueue.first){
      if (WaitingQueue.first !== null &&
        (SquareDanceQueue.first.value[0]
          !== WaitingQueue.first.value[0])){
                let first = SquareDanceQueue.dequeue()
                let second = WaitingQueue.dequeue()
                dancers.push([first, second])
      } else {
           let first = SquareDanceQueue.dequeue()
           WaitingQueue.enqueue(first)
    } } console.log(dancers)
    }
  
  squareDance()

  //At Ophidian Bank, a single teller serves a long queue of people. New customers
//join at the end of the queue, and teller will serve customer only if
//they have all the appropriate paperwork.
//Write a representation of this queue
//25% of the time (random), a customer's paperwork isn't quite right, and it's back to
//to the end of the queue.
//Show what a few minutes of the bank's lobby would look like.

function ophidianBank() {
    const queue = new Queue();
    // Assumption: New people join the queue at the same rate they are seen

    for (var i=0; i<100; i++) {
        console.log('Person joined line');
        queue.enqueue({
            angriness: 0 // How fed up the person is with doing their paperwork
        });

        const person = queue.dequeue();
        if (Math.random() < 0.25) {
            console.log(`Person with angriness ${person.angriness} sent to the back`);
            person.angriness++;
            queue.enqueue(person);
        }
        else {
            console.log(`Person with angriness ${person.angriness} processed`);
        }
    }
}

ophidianBank();