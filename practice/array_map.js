String.prototype.hash = function () {
  var hash = 0;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

function HashMap (size) {
  this._capacity = size || 8;
  this._store = new Array(this._capacity);
  for (var i = 0; i < size; i++) {
    this._store[i] = [];
  }
  this._count = 0;
}

HashMap.prototype = {
  constructor: HashMap,

  set: function (key, value) {
    if (this._count === this._capacity) {
      this.resize();
    }
    if (this.hasKey(key)) {
      this._store[key.hash() % this._capacity].forEach(function (bucket) {
        if (bucket[0] === key) {
          bucket[1] = value;
        }
      });
    } else {
      this._store[key.hash() % this._capacity].push([key, value]);
      this._count++;
    }
    return this.show();
  },

  get: function (key) {
    var bucket = this._store[key.hash() % this._capacity];
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  },

  hasValue: function (val) {
    for (var i = 0; i < this._capacity; i++) {
      for (var j = 0; j < this._store[i].length; j++) {
        if (this._store[i][j][1] === val) {
          return true;
        }
      }
    }
    return false;
  },

  hasKey: function (key) {
    for (var i = 0; i < this._capacity; i++) {
      for (var j = 0; j < this._store[i].length; j++) {
        if (this._store[i][j][0] === key) {
          return true;
        }
      }
    }
    return false;
  },

  delete: function (key) {
    var deleted = null;
    var bucket = this._store[key.hash() % this._capacity];
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        deleted = bucket[i];
        bucket.splice(i, 1);
      }
    }
    this._count--;
    return deleted;
  },

  resize: function () {
    var self = this;
    var newCap = this._store.length * 2;
    var newStore = new Array(newCap);
    for (var n = 0; n < newCap; n++) {
      newStore[n] = [];
    }
    for (var i = 0; i < this._store.length; i++) {
      for (var j = 0; j < this._store[i].length; j++) {
        var key = this._store[i][j][0];
        var value = this._store[i][j][1];
        newStore[key.hash() % newCap].push([key, value]);
      }
    }
    this._capacity = newCap;
    this._store = newStore;
  },

  show: function () {
    var stringedHash = '<"';
    for (var i = 0; i < this._capacity; i++) {
      for (var j = 0; j < this._store[i].length; j++) {
        stringedHash += this._store[i][j][0] + '" => ';
        stringedHash += this._store[i][j][1] + ', "';
      }
    }
    var strLength = stringedHash.length;
    stringedHash = stringedHash.slice(0, strLength - 3);
    stringedHash += ">";
    return stringedHash;
  }
};

var hm = new HashMap(10);
hm.set("david", 32);
hm.set("kevin", 26);
hm.set("ed", 73);
hm.set("jamie", 61);
hm.set("emily", 34);
