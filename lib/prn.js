'use strict';

var immutable = require('immutable');
var Map = immutable.Map;
var List = immutable.List;
var Stack = immutable.Stack;

var _Symbol = require('./symbol');
var utils = require('./utils');
var extend = utils.extend;

module.exports = function prn(x) {
  if (x == null) {
    return "#nil";
  }

  if (typeof x == 'boolean') {
    return x ? "#t" : "f";
  }

  if (typeof x.prn == 'function') {
    return x.prn();
  } else {
    var name = Object.constructor && Object.constructor.name ? Object.constructor.name : "Object";
    return "#<" + name + ">";
  }
};

extend(_Symbol.prototype, {
  toString: function toString() {
    return this.name;
  },
  prn: function prn() {
    return this.name;
  }
});

extend(Number.prototype, {
  prn: function prn() {
    return '' + this.valueOf();
  }
});

extend(String.prototype, {
  prn: function prn() {
    return JSON.stringify(this);
  }
});

extend(Array.prototype, {
  prn: function (_prn) {
    function prn() {
      return _prn.apply(this, arguments);
    }

    prn.toString = function () {
      return _prn.toString();
    };

    return prn;
  }(function () {
    return "#[" + this.map(prn).join(" ") + "]";
  })
});

extend(Stack.prototype, {
  prn: function (_prn2) {
    function prn() {
      return _prn2.apply(this, arguments);
    }

    prn.toString = function () {
      return _prn2.toString();
    };

    return prn;
  }(function () {
    return "(" + this.map(prn).toJS().join(" ") + ")";
  })
});

extend(List.prototype, {
  prn: function (_prn3) {
    function prn() {
      return _prn3.apply(this, arguments);
    }

    prn.toString = function () {
      return _prn3.toString();
    };

    return prn;
  }(function () {
    return "[" + this.map(prn).toJS().join(" ") + "]";
  })
});

extend(Map.prototype), {
  prn: function prn() {
    return "{...}";
  }
};