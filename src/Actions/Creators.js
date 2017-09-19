import Types from './Types'

/* FAVORITES */
const getFavoritesAttempt = (meta) => ({ type: Types.GET_FAVORITES_REQUEST, meta })
const getFavoritesSuccess = (payload) => ({ type: Types.GET_FAVORITES_SUCCESS, payload })
const getFavoritesFailure = (errorCode) => ({ type: Types.GET_FAVORITES_FAILURE, errorCode })

const addFavoriteAttempt = (meta) => ({ type: Types.ADD_FAVORITE_REQUEST, meta })
const addFavoriteFailure = (errorCode) => ({ type: Types.ADD_FAVORITE_FAILURE, errorCode })

const removeFavoriteAttempt = (meta) => ({ type: Types.REMOVE_FAVORITE_REQUEST, meta })
const removeFavoriteSuccess = (payload) => ({ type: Types.REMOVE_FAVORITE_SUCCESS, payload })
const removeFavoriteFailure = (errorCode) => ({ type: Types.REMOVE_FAVORITE_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getFavoritesAttempt,
  getFavoritesSuccess,
  getFavoritesFailure,

  addFavoriteAttempt,
  addFavoriteFailure,

  removeFavoriteAttempt,
  removeFavoriteSuccess,
  removeFavoriteFailure

}
