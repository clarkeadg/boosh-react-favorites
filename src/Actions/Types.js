// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`

  GET_FAVORITES_REQUEST
  GET_FAVORITES_SUCCESS
  GET_FAVORITES_FAILURE

  ADD_FAVORITE_REQUEST
  ADD_FAVORITE_SUCCESS
  ADD_FAVORITE_FAILURE

  REMOVE_FAVORITE_REQUEST
  REMOVE_FAVORITE_SUCCESS
  REMOVE_FAVORITE_FAILURE

`)