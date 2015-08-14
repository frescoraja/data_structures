function PriorityHashMap () {
  this.store = {};
}

PriorityHashMap.prototype = {
  constructor: PriorityHashMap,

  delete: function (key) {
    if (this.hasKey(key)) {
      delete this.store[key];
    }
    return this;
  },

  hasKey: function (key) {
    return !!this.store[key];
  },

  get: function (key) {
    return [key, this.store[key][0], this.store[key][1]] || null;
  },

  extract: function () {
    var bestPriority = Infinity,
        bestKey;
    for (var key in this.store) {
      if (this.store[key][1] < bestPriority) {
        bestKey = key;
        bestPriority = this.store[key][1];
      }
    }
    var tmp = [bestKey, this.store[bestKey][0], this.store[bestKey][1]];
    delete this.store[bestKey];
    return tmp;
  },

  set: function (key, val, priority) {
    if (this.hasKey(key)) {
      this._update(key, val, priority);
    } else {
      this._insert(key, val, priority);
    }
    return this;
  },

  _insert: function (key, val, priority) {
    this.store[key] = [val, priority];
    return this.store[key];
  },

  _update: function (key, val, priority) {
    if (this.store[key][1] > priority) {
      this.store[key] = [val, priority];
    }
    return this.store[key];
  }
};

var phm = new PriorityHashMap();
phm.set("abc", 123, 10);
phm.set("def", 456, 5);
phm.set(0, 0, 0);
phm.set(2,4,4);
phm.set(1,2,1);
phm.set(3,6, 9);
phm.set(4,8, 16);
phm.set(5, 10, 25);
phm.hasKey(5);
phm.hasKey("abc");
phm.hasKey("zz");
phm.set(4,8,-10);

phm.extract();  // [4, 8, -10]
phm.extract();  // [0, 0, 0]
