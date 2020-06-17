/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { OrderDetailAirportTypes } from './actions'

export const fetchExtrasAirportLoading = (state) => ({
  ...state,
  extrasAirportIsLoading: true,
  extrasAirportErrorMessage: null,
})

export const fetchExtrasAirportSuccess = (state, { extras }) => ({
  ...state,
  extrasAirport: extras,
  extrasAirportIsLoading: false,
  extrasAirportErrorMessage: null,
})

export const fetchExtrasAirportFailure = (state, { errorMessage }) => ({
  ...state,
  extrasAirport: [],
  extrasAirportIsLoading: false,
  extrasAirportErrorMessage: errorMessage,
})

export const changeAdditionalItems = (state, { payload }) => ({
  ...state,
  additionalItems: payload,
})

export const reducer = createReducer(INITIAL_STATE, {
  [OrderDetailAirportTypes.FETCH_EXTRAS_AIRPORT_LOADING]: fetchExtrasAirportLoading,
  [OrderDetailAirportTypes.FETCH_EXTRAS_AIRPORT_SUCCESS]: fetchExtrasAirportSuccess,
  [OrderDetailAirportTypes.FETCH_EXTRAS_AIRPORT_FAILURE]: fetchExtrasAirportFailure,
  [OrderDetailAirportTypes.CHANGE_ADDITIONAL_ITEMS]: changeAdditionalItems,
})
