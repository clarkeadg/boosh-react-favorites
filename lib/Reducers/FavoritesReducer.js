'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ACTION_HANDLERS;

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collections = {};

var result = {
  'profile': {},
  'product': {},
  'comment': {},
  'video': {}
};

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)({
  entities: {},
  result: [],
  collections: collections,
  errorCode: null,
  attempting: false
});

// request
var attempt = function attempt(state, action) {
  return state.merge({ attempting: true });
};

// recieve
var success = function success(state, action) {
  console.log('Favortes Reducer', action.payload);
  var _action$payload$query = action.payload.query,
      item_type = _action$payload$query.item_type,
      item_id = _action$payload$query.item_id;

  if (item_type && item_id) {
    if (!result[item_type]) result[item_type] = {};
    result[item_type][item_id] = action.payload.result;
  }

  var path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g, '');
    if (!collections[path]) collections[path] = {};
    collections[path].result = action.payload.result;
    collections[path].count = action.payload.count || 0;
    collections[path].attempting = false;
  }

  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.favorites),
    result: result,
    collections: collections
  });
};

// remove
var remove = function remove(state, action) {
  console.log('REMOVE', action);
  var _action$payload = action.payload,
      item_type = _action$payload.item_type,
      item_id = _action$payload.item_id,
      id = _action$payload.id;

  if (!result[item_type]) return state;
  if (result[item_type][item_id]) delete result[item_type][item_id];
  return state.merge({
    attempting: false,
    errorCode: null,
    result: result
  });
};

// fail
var failure = function failure(state, action) {
  return state.merge({ attempting: false, errorCode: action.errorCode });
};

// map our types to our handlers
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_FAVORITES_REQUEST, attempt), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_FAVORITES_SUCCESS, success), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.REMOVE_FAVORITE_SUCCESS, remove), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_FAVORITES_FAILURE, failure), _ACTION_HANDLERS);

exports.default = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);