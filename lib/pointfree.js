'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// the identity function
var identity = function identity(value) {
  return value;
};

// compose with arity 2
var compose = function compose(a, b) {
  return function (c) {
    return a(b(c));
  };
};

// call a method name on an object
var dispatch = function dispatch(name, args) {
  return function (obj) {
    if (typeof obj[name] === 'function') {
      return obj[name].apply(obj, _toConsumableArray(args));
    } else {
      throw new TypeError(obj + ' does not have a method ' + name);
    }
  };
};

// recursive helper function
var _pointfree = function _pointfree(fn) {
  // use an ES6 Proxy to capture when we get a property
  return new Proxy(fn, {
    // these properties are going to be methods so we should return a
    // function that gathers the rest of the arguments
    get: function get(target, name) {
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        // there are some issues with the console inspector, sending a Symbol
        // Symbol('util.inspect.custom'), so let's make sure we're asking for
        // a string property.
        if (typeof name !== 'string') {
          return Reflect.get(target, name);
        } else {
          // continue chaining
          return _pointfree(compose(dispatch(name, args), target));
        }
      };
    }
  });
};

// start it off with the identity function
var pointfree = _pointfree(identity);

exports.default = pointfree;