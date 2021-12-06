class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
class LinkedList {
    constructor(head) {
        this.head = head;
        this.size = head ? 1 : 0;
        this.end = null;
    }

    loop(func) {
        let i = 0;
        let current = this.head;
        while ( current ) {
            func(current, i)
            i++;
            current = current.next;
        }
    }

    add(data) {
        let current = this.head;
        let newNode = new Node(data);
        if ( !current ) {
            this.head = newNode;
            this.end = this.head;
            this.size++;
            return;
        }
        this.end.next = newNode;
        this.end =  this.end.next;
        this.size++;
    }

    get length() {
        return this.size;
    }
}