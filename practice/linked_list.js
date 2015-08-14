function DoublyLinkedList () {
  this._head = null;
  this._tail = null;
  this._length = 0;
}

DoublyLinkedList.prototype = {
  constructor: DoublyLinkedList,

  makeNode: function (data) {
    return { data: data, prev: null, next: null };
  },

  delete_at: function (index) {
    if (index >= 0 && index < this._length) {
      var currNode = this._head;
      if (index === 0) {
        this._head = currNode.next;
        if (!this._head) { //head was only node in list
          this._tail = null;
        } else {
          this._head.prev = null;
        }
      } else {
        for (var i = 0; i < index; i++) {
          currNode = currNode.next;
        }
        if (currNode === this._tail) { //delete tail
          currNode.prev.next = currNode.next;
          this._tail = currNode.prev;
        } else {
          currNode.prev.next = currNode.next;
          currNode.next.prev = currNode.prev;
        }
      }
      this._length--;
      return currNode;
    } else {
      throw new Error("Index out of bounds!");
    }
  },

  insert: function (index, data) {
    var newNode = this.makeNode(data);
    if (index >= 0 && index < this._length) {
      var currNode = this._head;
      if (index === 0) { //insert new head
        newNode.next = currNode;
        currNode.prev = newNode;
        this._head = newNode;
      } else if (index === this._length - 1) { //insert new tail
        currNode = this._tail;
        newNode.prev = currNode;
        currNode.next = newNode;
        this._tail = newNode;
      } else {
        for (var i = 0; i < index; i++) {
          currNode = currNode.next;
        }
        newNode.next = currNode;
        newNode.prev = currNode.prev;
        currNode.prev.next = newNode;
        currNode.prev = newNode;
      }
      this._length++;
      return this;
    } else {
      throw new Error("Index out of bounds!");
    }
  },

  pop: function () {
    if (!this._tail) {
      throw new Error("Can't pop from empty list!");
    } else {
      var val = this._tail.data;
      this._tail = this._tail.prev;
      this._length--;
      return val;
    }
  },

  push: function (data) {
    var newNode = this.makeNode(data);

    if (this._length === 0) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail.next = newNode;
      newNode.prev = this._tail;
      this._tail = newNode;
    }

    this._length++;
  },

  shift: function () {
    if (this._length < 1) {
      throw new Error("Can't shift from empty list!");
    } else {
      if (this._length === 1) { //head is tail
        this._head = null;
        this._tail = null;
        this._length = 0;
      } else {
        this._head = this._head.next;
        this._head.prev = null;
      }
      this._length--;
    }
  },

  unshift: function (data) {
    var newNode = this.makeNode(data);
    if (this._length === 0) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      var currNode = this._head;
      newNode.next = currNode;
      currNode.prev = newNode;
      this._head = newNode;
    }
    this._length++;
  },

  size: function () {
    return this._length;
  }
};


var dll = new DoublyLinkedList();
for (var x = 0; x < 10; x++) {
  dll.push(x);
}
