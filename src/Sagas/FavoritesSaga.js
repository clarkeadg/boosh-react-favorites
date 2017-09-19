import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

/* SCHEMAS */
import FavoriteSchema from '../Schemas/FavoriteSchema'

export default (api) => {

  function * attemptGetFavorites (meta) {

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/favorites/";  

    // make the call to the api
    const response = yield call(api.getFavorites, query)

    console.log('GOT FAVORITES',response.data, meta)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(FavoriteSchema));
      if (!payload.result.length) {
        payload.entities.favorites = {};
      }

      payload.query = query;
      payload.path = path;
      payload.count = count;
      
      //console.log('NORMALIZED DATA', payload)

      yield put(Actions.getFavoritesSuccess(payload))
     
    } else {
      yield put(Actions.getFavoritesFailure(response.data))
    }
  }

  function * attemptAddFavorite (meta) {

    // make the call to the api
    const response = yield call(api.addFavorite, meta)

    //console.log('ADD FAVORITE RESPONSE', response)

    // success?
    if (response && response.ok) {
      yield put(Actions.getFavoritesAttempt({
        query: {
          item_type: meta.item_type,
          item_id: meta.item_id 
        }
      }));
    } else {
      yield put(Actions.addFavoriteFailure(response.data))
    }
  }

  function * attemptRemoveFavorite (meta) {

    // make the call to the api
    const response = yield call(api.removeFavorite, meta.id)

    //console.log('REMOVE FAVORITE RESPONSE', response)

    // success?
    if (response && response.ok) {
      yield put(Actions.removeFavoriteSuccess(meta));
    } else {
      yield put(Actions.removeFavoriteFailure(response.data))
    }
  }

  function * watchGetFavoritesAttempt () {
    //yield takeEvery(Types.GET_FAVORITE_REQUEST, attemptGetFavorites)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_FAVORITES_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetFavorites, meta)
    }
  }

  function * watchAddFavoriteAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.ADD_FAVORITE_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptAddFavorite, meta)
    }
  }

  function * watchRemoveFavoriteAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.REMOVE_FAVORITE_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptRemoveFavorite, meta)
    }
  }

  return {
    watchGetFavoritesAttempt,
    watchAddFavoriteAttempt,
    watchRemoveFavoriteAttempt,
    attemptGetFavorites,
    attemptAddFavorite,
    attemptRemoveFavorite
  }
}
