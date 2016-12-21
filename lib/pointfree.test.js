'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _pointfree = require('./pointfree');

var _pointfree2 = _interopRequireDefault(_pointfree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('pointfree identity', function (t) {
  t.is((0, _pointfree2.default)(10), 10);
});

(0, _ava2.default)('pointfree map', function (t) {
  var fn = _pointfree2.default.map(function (x) {
    return x + 1;
  });
  t.deepEqual(fn([1, 2, 3]), [2, 3, 4]);
});

(0, _ava2.default)('pointfree multiple ', function (t) {
  var fn = _pointfree2.default.map(function (x) {
    return x + 1;
  }).filter(function (x) {
    return x % 2 == 0;
  });
  t.deepEqual(fn([1, 2, 3]), [2, 4]);
});

(0, _ava2.default)('pointfree invalid type ', function (t) {
  var fn = _pointfree2.default.map(function (x) {
    return x + 1;
  }).blowup(function (x) {
    return x % 2;
  });
  t.throws(function () {
    return fn([]);
  });
});