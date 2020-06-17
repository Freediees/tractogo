import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { LocationPickScreenSelfDriveTypes } from './actions'

export const clearDistance = (state) => ({
  ...state,
  distance: null,
  distanceIsLoading: false,
  distanceErrorMessage: null,
})

export const fetchDistanceLoading = (state) => ({
  ...state,
  distance: null,
  distanceIsLoading: true,
  distanceErrorMessage: null,
})

export const fetchDistanceSuccess = (state, { data }) => ({
  ...state,
  distance: data,
  distanceIsLoading: false,
  distanceErrorMessage: null,
})

export const fetchDistanceFailure = (state, { errorMessage }) => ({
  ...state,
  distance: null,
  distanceIsLoading: false,
  distanceErrorMessage: errorMessage,
})

export const clearPriceExpedition = (state) => ({
  ...state,
  priceExpedition: null,
  priceExpeditionIsLoading: false,
  priceExpeditionErrorMessage: null,
})

export const fetchPriceExpeditionLoading = (state) => ({
  ...state,
  priceExpedition: null,
  priceExpeditionIsLoading: true,
  priceExpeditionErrorMessage: null,
})

export const fetchPriceExpeditionSuccess = (state, { data }) => ({
  ...state,
  priceExpedition: data,
  priceExpeditionIsLoading: false,
  priceExpeditionErrorMessage: null,
})

export const fetchPriceExpeditionFailure = (state, { errorMessage }) => ({
  ...state,
  priceExpedition: null,
  priceExpeditionIsLoading: false,
  priceExpeditionErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [LocationPickScreenSelfDriveTypes.CLEAR_DISTANCE]: clearDistance,
  [LocationPickScreenSelfDriveTypes.FETCH_DISTANCE_LOADING]: fetchDistanceLoading,
  [LocationPickScreenSelfDriveTypes.FETCH_DISTANCE_SUCCESS]: fetchDistanceSuccess,
  [LocationPickScreenSelfDriveTypes.FETCH_DISTANCE_FAILURE]: fetchDistanceFailure,
  [LocationPickScreenSelfDriveTypes.CLEAR_PRICE_EXPEDITION]: clearPriceExpedition,
  [LocationPickScreenSelfDriveTypes.FETCH_PRICE_EXPEDITION_LOADING]: fetchPriceExpeditionLoading,
  [LocationPickScreenSelfDriveTypes.FETCH_PRICE_EXPEDITION_SUCCESS]: fetchPriceExpeditionSuccess,
  [LocationPickScreenSelfDriveTypes.FETCH_PRICE_EXPEDITION_FAILURE]: fetchPriceExpeditionFailure,
})
