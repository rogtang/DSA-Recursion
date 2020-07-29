const memory = require('./memory')

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

Array.SIZE_RATIO = 3;