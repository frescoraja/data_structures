function sum () {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }

  return total;
}

Function.prototype.myBind = function (context) {
  var fn = this;

  // arguments will be reset, so we need to save it. We also lop off
  // the initial context argument.
  var bindTimeArgs = Array.prototype.slice.call(arguments, 1);

  return function () {
    var callTimeArgs = Array.prototype.slice.call(arguments);
    return fn.apply(context, bindTimeArgs.concat(callTimeArgs));
  };
};

function curriedSum (numArgs) {
  var numbers = [];

  function _curriedSum (num) {
    numbers.push(num);

    if (numbers.length == numArgs) {
      var total = 0;

      numbers.forEach(function (num) { total += num });
      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

Function.prototype.curry = function (numArgs) {
  var fn = this;
  var args = [];

  function _curriedFn (arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return fn.apply(null, args);
    } else {
      return _curriedFn;
    }
  }

  return _curriedFn;
};

String.prototype.subWordCounts = function (dictionary) {
  var subs = {};
  var that = this;
  dictionary.forEach(function (word) {

    for (var i = 0; i < that.length; i++) {
      if (that.substr(i, word.length) === word) {
        if (subs[word]) {
          subs[word] += 1;
        } else {
          subs[word] = 1;
        }
      }
    }
  });
  return subs;
}

Array.prototype.my_any = function(callback) {
  var temp = false;
  this.forEach(function (element) {

    if (callback(element) === true) {
      temp = true;

    }
  });
  return temp;
}


console.log("atcats".subWordCounts(["at","cat"]));
console.log([1,2,3,4].my_any(function(x) { return x === 6;}));
