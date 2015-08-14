function BSTNode (key, val, left, right) {
  this.key = key;
  this.val = val;
  this.left = left || null;
  this.right = right || null;
  if (left) {
    this.lDepth = left.depth;
  } else {
    this.lDepth = 0;
  }
  if (right) {
    this.rDepth = right.depth;
  } else {
    this.rDepth = 0;
  }
  this.depth = Math.max(this.lDepth, this.rDepth) + 1;
  this.balance = this.rDepth - this.lDepth;
}

BSTNode.prototype = {
  constructor: BSTNode,

  set: function (key, val) {
    if (this.key === key) {
      this.val = val;
      return this;
    } else if (this.key > key) {
      if (this.left) {
        return this.left.set(key, val);
      } else {
        this.left = new BSTNode(key, val);
        return this.left;
      }
    } else {
      if (this.right) {
        return this.right.set(key, val);
      } else {
        this.right = new BSTNode(key, val);
        return this.right;
      }
    }
  },

  get: function (key) {
    if (this.key === key) {
      return this.val;
    } else if (this.key > key) {
      if (this.left) {
        return this.left.get(key);
      } else {
      return null;
      }
    } else {
      if (this.right) {
        return this.right.get(key);
      } else {
        return null;
      }
    }
  },

  hasKey: function (key) {
    if (this.key === key) {
      return true;
    } else if ((this.key > key) && (this.left)) {
      return this.left.hasKey(key);
    } else if ((this.key < key) && (this.right)) {
      return this.right.hasKey(key);
    } else {
      return false;
    }
  },

  newSet: function (key, val) {
    var newNode, newRight, newLeft;
    if (this.key === key) {
      newNode = new BSTNode(key, val, this.left, this.right);
      return newNode;
    } else if (this.key < key) {
      if (this.right) {
        newRight = this.right.newSet(key, val);
        newNode = new BSTNode(this.key, this.val, this.left, newRight);
        if (newNode.balance > 1) {
          if (newNode.lDepth >= 0) {
            newNode = newNode.leftRotate();
          } else {
            newNode = newNode.rightRotate().leftRotate();
          }
        }
        return newNode;
      } else {
        newRight = new BSTNode(key, val);
        newNode = new BSTNode(this.key, this.val, this.left, newRight);
        return newNode;
      }
    } else {
      if (this.left) {
        newLeft = this.left.newSet(key, val);
        newNode = new BSTNode(this.key, this.val, newLeft, this.right);
        if (this.balance < -1) {
          if (this.rDepth <= 0) {
            newNode = this.rightRotate();
          } else {
            newNode = this.leftRotate();
            newNode = newNode.rightRotate();
          }
        }
        return newNode;
      } else {
        newLeft = new BSTNode(key, val);
        newNode = new BSTNode(this.key, this.val, newLeft, this.right);
        return newNode;
      }
    }
  },

  rightRotate: function () {
    if (!this.left) {
      throw new Error ('No left children to rotate about');
    }
    var newX = new BSTNode(this.key, this.val, this.left.right, this.right);
    var newY = new BSTNode(this.left.key, this.left.val, this.left.left, newX);
    return newY;
  },

  leftRotate: function () {
    if (!this.right) {
      throw new Error ('No right child to rotate about');
    }
    var newX = new BSTNode(this.key, this.val, this.left, this.right.left);
    var newY = new BSTNode(this.right.key, this.right.val, newX, this.right.right);
    return newY;
  }
};
