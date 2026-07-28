class Stack {
    static MAX_SIZE = 100;

    constructor() {
        this.stack = new Array(Stack.MAX_SIZE);
        this.top = -1;
    }

    push(value) {
        if (this.top >= Stack.MAX_SIZE - 1) {
            throw new Error("Stack overflow: Cannot push onto a full stack.");
        }
        this.stack[++this.top] = value;
    }

    pop() {
        if (this.top < 0) {
            throw new Error("Stack underflow: Cannot pop from an empty stack.");
        }
        return this.stack[this.top--];
    }

    peek() {
        if (this.top < 0) {
            throw new Error("Stack underflow: Cannot peek on an empty stack.");
        }
        return this.stack[this.top];
    }

    isEmpty() {
        return this.top < 0;
    }
}
