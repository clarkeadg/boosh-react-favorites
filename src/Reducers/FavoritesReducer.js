import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

let collections = {};

const result = {
  'profile': {},
  'product': {},
  'comment': {},
  'video': {}
}

export const INITIAL_STATE = Immutable({
  entities: {},
  result: [],
  collections: collections,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {
  console.log('Favortes Reducer', action.payload)
  let { item_type, item_id } = action.payload.query;
  if (item_type && item_id) {
    if (!result[item_type]) result[item_type] = {};
    result[item_type][item_id] = action.payload.result;
  }
  
  let path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g,'');
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
  })
}

// remove
const remove = (state, action) => {
  console.log('REMOVE', action)
  let { item_type, item_id, id } = action.payload;
  if (!result[item_type]) return state;
  if (result[item_type][item_id]) delete result[item_type][item_id];
  return state.merge({
    attempting: false,
    errorCode: null,
    result: result
  })
}

// fail
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_FAVORITES_REQUEST]: attempt,
  [Types.GET_FAVORITES_SUCCESS]: success,
  [Types.REMOVE_FAVORITE_SUCCESS]: remove,
  [Types.GET_FAVORITES_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
