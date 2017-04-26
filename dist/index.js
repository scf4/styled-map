"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = styledMap;