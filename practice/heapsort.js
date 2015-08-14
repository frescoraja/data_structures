function heapSort (arr) {
  var heapSize = 0;
  while (++heapSize < arr.length) {
    heapifyUp(arr, heapSize);
  }

  while (--heapSize >= 0) {
    var root = arr[0];
    arr[0] = arr[heapSize];
    arr[heapSize] = root;
    heapifyDown(arr, 0, heapSize);
  }

  for (var n = 0; n < arr.length/2; n++) {
    var tmp = arr[n];
    arr[n] = arr[arr.length - 1 - n];
    arr[arr.length - 1 - n] = tmp;
  }
  return arr;
}

function heapifyUp (arr, idx) {
    var pIdx = _pIdx(idx);
    if (idx === 0) {
      return;
    }
    if (arr[pIdx] > arr[idx]) {
      var temp = arr[idx];
      arr[idx] = arr[pIdx];
      arr[pIdx] = temp;
    } else {
      return;
    }
    heapifyUp(arr, pIdx);
  }

function heapifyDown (arr, pIdx, heapSize) {
  var cIdx = _cIdx(pIdx);
  var smChildIdx;
  if (cIdx[0] >= heapSize) return;
  if ((cIdx[1] >=  heapSize) || (arr[cIdx[0]] < arr[cIdx[1]])) {
    smChildIdx = cIdx[0];
  } else {
    smChildIdx = cIdx[1];
  }
  if (arr[pIdx] > arr[smChildIdx]) {
    var temp = arr[pIdx];
    arr[pIdx] = arr[smChildIdx];
    arr[smChildIdx] = temp;
  } else {
    return;
  }
  heapifyDown(arr, smChildIdx, heapSize);
}

var _pIdx = function (cIdx) {
  return Math.floor((cIdx - 1) / 2);
};

var _cIdx = function (pIdx) {
  return [((pIdx * 2) + 1), ((pIdx * 2) + 2)];
};

heapSort([6,4,7,1,0]);
