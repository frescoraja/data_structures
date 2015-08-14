Array.prototype.quicksort = function (start, len) {
  if (len <= 1) return this;

  var length = len || this.length;
  var startIdx = start || 0;
  var pivotIdx = this.partition(startIdx, len);

  this.quicksort(startIdx, pivotIdx - startIdx);
  this.quicksort(pivotIdx + 1, len - (pivotIdx + 1));

  return this;
};

Array.prototype.partition = function (start, len) {
  var endIdx = len + startIdx - 1;
  if (endIdx >= this.length) throw new Error("Index out of bounds");
  var pivotIdx = startIdx;
  while (++startIdx <= endIdx) {
    if (this[startIdx] < this[pivotIdx]) {
      var tmp = this[pivotIdx + 1];
      this[pivotIdx + 1] = this[startIdx];
      this[startIdx] = tmp;
      var pivot = this[pivotIdx];
      this[pivotIdx] = this[pivotIdx + 1];
      this[pivotIdx + 1] = pivot;
      pivotIdx++;
    }
  }
  return pivotIdx;
};
