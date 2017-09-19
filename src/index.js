
const FavoritesButton     = require('./Buttons/FavoritesButton');
const FavoritesCollection = require('./Collections/FavoritesCollection');
const FavoritesActions    = require('./Actions/Creators');
const FavoritesSaga       = require('./Sagas/FavoritesSaga');
const FavoritesApi        = require('./Services/FavoritesApi');
const FavoritesReducer    = require('./Reducers/FavoritesReducer');
const FavoritesRoutes     = require('./routes');

module.exports = {
  FavoritesButton:        FavoritesButton.default,
  FavoritesCollection:    FavoritesCollection.default,
  FavoritesActions:       FavoritesActions.default,
  FavoritesSaga:          FavoritesSaga.default,
  FavoritesApi:           FavoritesApi.default,
  FavoritesReducer:       FavoritesReducer.default,
  FavoritesRoutes:        FavoritesRoutes.default
}
