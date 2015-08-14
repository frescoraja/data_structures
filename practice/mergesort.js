Array.prototype.mergeSort = function () {
  if (this.length <= 1) {
    return this;
  }

  var mid = Math.floor(this.length / 2);
  var left = this.slice(0, mid);
  var right = this.slice(mid);

  return left.mergeSort().merge(right.mergeSort());
};

Array.prototype.merge = function (right) {
  var merged = [];
  while (this.length > 0 && right.length > 0) {
    if (this[0] < right[0]) {
      merged.push(this.shift());
    } else {
      merged.push(right.shift());
    }
  }
  return merged.concat(this, right);
};

function merge (left, right) {
  var merged = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  return merged.concat(left, right);
}

function mergesort (array) {
  if (array.length <= 1) {
    return array;
  }

  var mid = Math.floor(array.length / 2);
  var left = array.slice(0, mid);
  var right = array.slice(mid);

  return merge(mergesort(left), mergesort(right));
}
