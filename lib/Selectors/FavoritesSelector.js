'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavorite = exports.getVisibleFavorites = exports.getFavoritesCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allFavorites = function allFavorites(state, props) {
  return state.favorites;
};

var item_type = function item_type(state, props) {
  return props.item_type;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'favorites';
};

var item_id = function item_id(state, props) {
  return props.item_id;
};

/* Export */

var getFavoritesCollection = exports.getFavoritesCollection = (0, _reselect.createSelector)([allFavorites, path], function (favorites, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!favorites.collections[key]) return collection;
  collection.count = favorites.collections[key].count;
  collection.items = favorites.collections[key].result.map(function (id) {
    return favorites.entities[id];
  });
  return collection;
});

var getVisibleFavorites = exports.getVisibleFavorites = (0, _reselect.createSelector)([allFavorites, item_type], function (favorites, type) {
  if (!favorites.result[type]) return [];
  return favorites.result[type].map(function (id) {
    return favorites.entities[id];
  });
});

var getFavorite = exports.getFavorite = (0, _reselect.createSelector)([allFavorites, item_type, item_id], function (favorites, type, id) {
  if (!favorites.result[type]) return null;
  if (!favorites.result[type][id]) return null;
  return favorites.result[type][id].map(function (id) {
    return favorites.entities[id];
  });
});