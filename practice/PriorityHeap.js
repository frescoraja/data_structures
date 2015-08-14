function PriorityHeap () {
  this.store = {};
  this.heap = [];
}

PriorityHeap.prototype = {
  constructor: PriorityHeap,

  get: function (key) {
    var idx = this.store[key];
    return !!idx ? this.heap[idx] : null;
  },

  hasKey: function (key) {
    if (typeof this.store[key] === 'undefined') {
      return false;
    } else {
      return true;
    }
  },

  peek: function () {
    return this.heap[0];
  },

  extract: function () {
    var root = this.heap[0];
    this.heap[0] = this.heap.pop();
    var key = root.key;
    delete this.store[key];
    var newRoot = this.heap[0];
    this.store[newRoot.key] = 0;
    this._heapifyDown(0);
    return [root.key, root.val];
  },

  set: function (key, val, priority) {
    if (this.hasKey(key)) {
      this._update(key, val, priority);
    } else {
      this._insert(key, val, priority);
    }
    return;
  },

  _insert: function (key, val, priority) {
    var newNode = { key: key, val: val, priority: priority };
    this.heap.push(newNode);
    this.store[key] = this.heap.length - 1;
    this._heapifyUp(this.store[key]);
    return;
  },

  _update: function (key, val, priority) {
    var idx = this.store[key];
    if (this.heap[idx].priority > priority) {
      this.heap[idx].val = val;
      this.heap[idx].priority = priority;
      this._heapifyUp(idx);
    }
    return;
  },

  _heapifyDown: function (idx) {
    if (idx >= this.heap.length || idx < 0) return null;
    var children = childrenIdx(idx),
        smChildIdx;
    if (this.heap[children[1]]) {
      if (this.heap[children[1]].priority <= this.heap[children[0]].priority) {
        smChildIdx = children[1];
      } else {
        smChildIdx = children[0];
      }
    } else {
      smChildIdx = children[0];
    }

    if ((this.heap[smChildIdx]) && (this.heap[idx].priority > this.heap[smChildIdx].priority)) {
      var temp = this.heap[idx];
      this.heap[idx] = this.heap[smChildIdx];
      this.store[this.heap[idx].key] = idx;
      this.heap[smChildIdx] = temp;
      this.store[this.heap[smChildIdx].key] = smChildIdx;
      this._heapifyDown(smChildIdx);
    }
    return;
  },

  _heapifyUp: function (idx) {
    var pIdx = parentIdx(idx);
    if (pIdx < 0 || pIdx >= this.heap.length) return null;
    if ((this.heap[pIdx]) && (this.heap[idx].priority < this.heap[pIdx].priority)) {
      var temp = this.heap[pIdx];
      this.heap[pIdx] = this.heap[idx];
      this.store[this.heap[pIdx].key] = pIdx;
      this.heap[idx] = temp;
      this.store[this.heap[idx].key] = idx;
      this._heapifyUp(pIdx);
    }
    return;
  }
};

function parentIdx (idx) {
  return Math.floor((idx  - 1) / 2);
}

function childrenIdx (idx) {
  return [(2 * idx) + 1, (2 * idx) + 2];
}
