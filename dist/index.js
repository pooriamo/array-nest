"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nest;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const defaultOptions = {
  idKey: 'id',
  parentKey: 'parent_id',
  childrenKey: 'children',
  rootParentsId: null
};
function nest(array, options) {
  var _options$idKey, _options$parentKey, _options$childrenKey, _options$rootParentsI;
  const ID_KEY = (_options$idKey = options === null || options === void 0 ? void 0 : options.idKey) !== null && _options$idKey !== void 0 ? _options$idKey : defaultOptions.idKey;
  const PARENT_KEY = (_options$parentKey = options === null || options === void 0 ? void 0 : options.parentKey) !== null && _options$parentKey !== void 0 ? _options$parentKey : defaultOptions.parentKey;
  const CHILDREN_KEY = (_options$childrenKey = options === null || options === void 0 ? void 0 : options.childrenKey) !== null && _options$childrenKey !== void 0 ? _options$childrenKey : defaultOptions.childrenKey;
  const ROOT_PARENTS_ID = (_options$rootParentsI = options === null || options === void 0 ? void 0 : options.rootParentsId) !== null && _options$rootParentsI !== void 0 ? _options$rootParentsI : defaultOptions.rootParentsId;
  if (ID_KEY === PARENT_KEY) {
    throw new TypeError("The values for '".concat(String(ID_KEY), "' and '").concat(String(PARENT_KEY), "' can not be the same"));
  }
  if (!Array.isArray(array)) {
    throw new TypeError('The input must be an array.');
  }
  array.forEach(item => {
    if (!Object.prototype.hasOwnProperty.call(item, ID_KEY)) {
      throw new TypeError("The item must have an '".concat(String(ID_KEY), "' key"));
    }
    if (!Object.prototype.hasOwnProperty.call(item, PARENT_KEY)) {
      throw new TypeError("The item must have an '".concat(String(PARENT_KEY), "' key"));
    }
    if (item[ID_KEY] === item[PARENT_KEY]) {
      throw new TypeError("The item cannot have the same '".concat(String(ID_KEY), "' and '").concat(String(PARENT_KEY), "' keys"));
    }
    if (!isKey(item[ID_KEY])) {
      throw new TypeError("The '".concat(String(ID_KEY), "' key must be a string or a number"));
    }
  });
  const buildTree = parentId => {
    const tree = array.filter(item => item[PARENT_KEY] === parentId);
    return tree.map(item => _objectSpread(_objectSpread({}, item), {}, {
      [CHILDREN_KEY]: buildTree(item[ID_KEY])
    }));
  };
  return buildTree(ROOT_PARENTS_ID);
}
;
function isKey(value) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol';
}