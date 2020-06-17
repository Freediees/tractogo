/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { LocationPickScreenTypes } from './actions'

export const fetchPredictionsLoading = (state) => ({
  ...state,
  predictionsIsLoading: true,
  predictionsErrorMessage: null,
})

export const fetchPredictionsSuccess = (state, { predictions }) => ({
  ...state,
  predictions: predictions,
  predictionsIsLoading: false,
  predictionsErrorMessage: null,
})

export const fetchPredictionsFailure = (state, { errorMessage }) => ({
  ...state,
  predictions: [],
  predictionsIsLoading: false,
  predictionsErrorMessage: errorMessage,
})

export const fetchPlaceDetailLoading = (state) => ({
  ...state,
  placeDetailIsLoading: true,
  placeDetailErrorMessage: null,
})

export const fetchPlaceDetailSuccess = (state, { placeDetail }) => ({
  ...state,
  placeDetail: placeDetail,
  placeDetailIsLoading: false,
  placeDetailErrorMessage: null,
})

export const fetchPlaceDetailFailure = (state, { errorMessage }) => ({
  ...state,
  placeDetail: null,
  placeDetailIsLoading: false,
  placeDetailErrorMessage: errorMessage,
})

export const clearPredictions = (state) => ({
  ...state,
  predictions: [],
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [LocationPickScreenTypes.FETCH_PREDICTIONS_LOADING]: fetchPredictionsLoading,
  [LocationPickScreenTypes.FETCH_PREDICTIONS_SUCCESS]: fetchPredictionsSuccess,
  [LocationPickScreenTypes.FETCH_PREDICTIONS_FAILURE]: fetchPredictionsFailure,
  [LocationPickScreenTypes.CLEAR_PREDICTIONS]: clearPredictions,
  [LocationPickScreenTypes.FETCH_PLACE_DETAIL_LOADING]: fetchPlaceDetailLoading,
  [LocationPickScreenTypes.FETCH_PLACE_DETAIL_SUCCESS]: fetchPlaceDetailSuccess,
  [LocationPickScreenTypes.FETCH_PLACE_DETAIL_FAILURE]: fetchPlaceDetailFailure,
})
