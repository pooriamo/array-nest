'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  idKey: 'id',
  parentKey: 'parent_id',
  childrenKey: 'children',
  rootParentsId: null
};

var unflatten = function unflatten(array) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _defaultOptions$optio = _extends({}, defaultOptions, options),
      ID_KEY = _defaultOptions$optio.idKey,
      PARENT_KEY = _defaultOptions$optio.parentKey,
      CHILDREN_KEY = _defaultOptions$optio.childrenKey,
      ROOT_PARENTS_ID = _defaultOptions$optio.rootParentsId;

  if (!Array.isArray(array)) {
    throw new TypeError('The input must be an array.');
  }

  [ID_KEY, PARENT_KEY].forEach(function (key) {
    if (array.some(function (el) {
      return !Object.prototype.hasOwnProperty.call(el, key);
    })) {
      throw new TypeError('Found an element with no \'' + key + '\' key');
    }
  });

  var buildTree = function buildTree(parentId) {
    var tree = array.filter(function (item) {
      return item[PARENT_KEY] === parentId;
    });

    if (tree.length > 0) {
      tree = tree.map(function (item) {
        return _extends({}, item, _defineProperty({}, CHILDREN_KEY, buildTree(item[ID_KEY])));
      });
    }

    return tree;
  };

  return buildTree(ROOT_PARENTS_ID);
};

exports.default = unflatten;