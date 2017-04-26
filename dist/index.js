"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styledMap = function styledMap(mapOfStyles) {
  return function (props) {
    var keys = Object.keys(mapOfStyles);
    var matchingKeys = keys.filter(function (key) {
      return props[key];
    });
    // If there's no match, default to the last key in the map.
    if (matchingKeys.length < 1) {
      var lastKey = keys[keys.length - 1];
      return mapOfStyles[lastKey];
    }
    // Or take the matching key (last if there are multiple)
    var lastMatchingKey = matchingKeys[matchingKeys.length - 1];
    return mapOfStyles[lastMatchingKey];
  };
};

var mapToTheme = exports.mapToTheme = function mapToTheme() {
  for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  // For each array item, create a corresponding
  // object like this: { key1: (props) => props.theme.key1 }
  var mapped = keys.map(function (key) {
    return _defineProperty({}, key, function (props) {
      return props.theme[key];
    });
  });
  // Merge objects into one, { key1: ..., key2: ..., } etc.
  var map = Object.assign.apply(Object, [{}].concat(_toConsumableArray(mapped)));
  return styledMap(map);
};

exports.default = styledMap;