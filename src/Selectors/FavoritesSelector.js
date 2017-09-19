import { createSelector } from 'reselect'

/* Private */

const allFavorites = (state, props) => state.favorites

const item_type = (state, props) => props.item_type

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'favorites'

const item_id = (state, props) => props.item_id

/* Export */

export const getFavoritesCollection = createSelector(
  [ allFavorites, path ],
  ( favorites, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!favorites.collections[key]) return collection;
    collection.count = favorites.collections[key].count;
    collection.items = favorites.collections[key].result.map((id) => {
      return favorites.entities[id]
    })
    return collection;
  }
)

export const getVisibleFavorites = createSelector(
  [ allFavorites, item_type ],
  ( favorites, type ) => {
    if (!favorites.result[type]) return [];
    return favorites.result[type].map((id) => {
      return favorites.entities[id]
    })
  }
)

export const getFavorite = createSelector(
  [ allFavorites, item_type, item_id ],
  ( favorites, type, id ) => {
    if (!favorites.result[type]) return null;
    if (!favorites.result[type][id]) return null;    
    return favorites.result[type][id].map((id) => {
      return favorites.entities[id]
    })
  }
)
