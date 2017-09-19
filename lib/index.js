'use strict';

var FavoritesButton = require('./Buttons/FavoritesButton');
var FavoritesCollection = require('./Collections/FavoritesCollection');
var FavoritesActions = require('./Actions/Creators');
var FavoritesSaga = require('./Sagas/FavoritesSaga');
var FavoritesApi = require('./Services/FavoritesApi');
var FavoritesReducer = require('./Reducers/FavoritesReducer');
var FavoritesRoutes = require('./routes');

module.exports = {
  FavoritesButton: FavoritesButton.default,
  FavoritesCollection: FavoritesCollection.default,
  FavoritesActions: FavoritesActions.default,
  FavoritesSaga: FavoritesSaga.default,
  FavoritesApi: FavoritesApi.default,
  FavoritesReducer: FavoritesReducer.default,
  FavoritesRoutes: FavoritesRoutes.default
};