function Heap () {
  this._store = [];
}

Heap.prototype = {
  constructor: Heap,

  childrenIndices: function (pIdx) {
    return [(pIdx * 2 + 1), (pIdx * 2 + 2)];
  },

  parentIndex: function (cIdx) {
    return Math.floor((cIdx - 1) / 2);
  },

  insert: function (val, priority) {
    this._store.push([val, priority]);
    this.heapifyUp(this.count - 1);
  },

  extract: function () {
    var root = this._store.shift();
    this._store.unshift(this._store.pop());
    this.heapifyDown(0);
    return { 'val': root[0], 'priority': root[1] };
  },

  heapifyUp: function (idx) {
    var pIdx = parentIndex(idx);
    if (this._store[pIdx] && this._store[pIdx][1] > this._store[idx][1]) {
      var tmp = this._store[pIdx];
      this._store[pIdx] = this._store[idx];
      this._store[idx] = tmp;
    } else {
      return;
    }
    this.heapifyUp(pIdx);
  },

  heapifyDown: function (idx) {
    var children = this.childrenIndices(idx);
    var currNode = this._store(idx);
    if (currNode[1] <= this._store[children[0]][1] && currNode[1] <= this._store[children[1]][1]) {
      return;
    } else if (currNode[1] > )
  },

  count: this._store.length
};
