'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* FAVORITES */
var getFavoritesAttempt = function getFavoritesAttempt(meta) {
  return { type: _Types2.default.GET_FAVORITES_REQUEST, meta: meta };
};
var getFavoritesSuccess = function getFavoritesSuccess(payload) {
  return { type: _Types2.default.GET_FAVORITES_SUCCESS, payload: payload };
};
var getFavoritesFailure = function getFavoritesFailure(errorCode) {
  return { type: _Types2.default.GET_FAVORITES_FAILURE, errorCode: errorCode };
};

var addFavoriteAttempt = function addFavoriteAttempt(meta) {
  return { type: _Types2.default.ADD_FAVORITE_REQUEST, meta: meta };
};
var addFavoriteFailure = function addFavoriteFailure(errorCode) {
  return { type: _Types2.default.ADD_FAVORITE_FAILURE, errorCode: errorCode };
};

var removeFavoriteAttempt = function removeFavoriteAttempt(meta) {
  return { type: _Types2.default.REMOVE_FAVORITE_REQUEST, meta: meta };
};
var removeFavoriteSuccess = function removeFavoriteSuccess(payload) {
  return { type: _Types2.default.REMOVE_FAVORITE_SUCCESS, payload: payload };
};
var removeFavoriteFailure = function removeFavoriteFailure(errorCode) {
  return { type: _Types2.default.REMOVE_FAVORITE_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getFavoritesAttempt: getFavoritesAttempt,
  getFavoritesSuccess: getFavoritesSuccess,
  getFavoritesFailure: getFavoritesFailure,

  addFavoriteAttempt: addFavoriteAttempt,
  addFavoriteFailure: addFavoriteFailure,

  removeFavoriteAttempt: removeFavoriteAttempt,
  removeFavoriteSuccess: removeFavoriteSuccess,
  removeFavoriteFailure: removeFavoriteFailure

};