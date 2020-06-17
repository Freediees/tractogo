/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { AirportFilterScreenTypes } from './actions'

export const fetchAirportsLoading = (state) => ({
  ...state,
  airports: [],
  airportCoverages: [],
  distanceBetweenOriginAndDestination: null,
  airportsIsLoading: true,
  airportsErrorMessage: null,
})

export const fetchAirportsSuccess = (state, { airports }) => ({
  ...state,
  airports: airports,
  airportsIsLoading: false,
  airportsErrorMessage: null,
})

export const fetchAirportsFailure = (state, { errorMessage }) => ({
  ...state,
  airports: [],
  airportsIsLoading: false,
  airportsErrorMessage: errorMessage,
})

export const fetchAirportCoveragesLoading = (state) => ({
  ...state,
  airportCoverages: [],
  airportCoveragesIsLoading: true,
  airportCoveragesErrorMessage: null,
})

export const fetchAirportCoveragesSuccess = (state, { airportCoverages }) => ({
  ...state,
  airportCoverages: airportCoverages,
  airportCoveragesIsLoading: false,
  airportCoveragesErrorMessage: null,
})

export const fetchAirportCoveragesFailure = (state, { errorMessage }) => ({
  ...state,
  airportCoverages: [],
  airportCoveragesIsLoading: false,
  airportCoveragesErrorMessage: errorMessage,
})

export const fetchAirportPlaceDetailLoading = (state) => ({
  ...state,
  placeDetailIsLoading: true,
  placeDetailErrorMessage: null,
})

export const fetchAirportPlaceDetailSuccess = (state, { placeDetail }) => ({
  ...state,
  placeDetail: placeDetail,
  placeDetailIsLoading: false,
  placeDetailErrorMessage: null,
})

export const fetchAirportPlaceDetailFailure = (state, { errorMessage }) => ({
  ...state,
  placeDetail: null,
  placeDetailIsLoading: false,
  placeDetailErrorMessage: errorMessage,
})

export const fetchAirportPlaceCoordinateLoading = (state) => ({
  ...state,
  airportPlaceCoordinateIsLoading: true,
  airportPlaceCoordinateErrorMessage: null,
})

export const fetchAirportPlaceCoordinateSuccess = (state, { airportPlaceCoordinate }) => ({
  ...state,
  airportPlaceCoordinate: airportPlaceCoordinate,
  airportPlaceCoordinateIsLoading: false,
  airportPlaceCoordinateErrorMessage: null,
})

export const fetchAirportPlaceCoordinateFailure = (state, { errorMessage }) => ({
  ...state,
  airportPlaceCoordinate: null,
  airportPlaceCoordinateIsLoading: false,
  airportPlaceCoordinateErrorMessage: errorMessage,
})

export const fetchDistanceBetweenOriginAndDestinationLoading = (state) => ({
  ...state,
  distanceBetweenOriginAndDestination: null,
  distanceBetweenOriginAndDestinationIsLoading: true,
  distanceBetweenOriginAndDestinationErrorMessage: null,
})

export const fetchDistanceBetweenOriginAndDestinationSuccess = (
  state,
  { distanceBetweenOriginAndDestination }
) => ({
  ...state,
  distanceBetweenOriginAndDestination: distanceBetweenOriginAndDestination,
  distanceBetweenOriginAndDestinationIsLoading: false,
  distanceBetweenOriginAndDestinationErrorMessage: null,
})

export const fetchDistanceBetweenOriginAndDestinationFailure = (state, { errorMessage }) => ({
  ...state,
  distanceBetweenOriginAndDestination: null,
  distanceBetweenOriginAndDestinationIsLoading: false,
  distanceBetweenOriginAndDestinationErrorMessage: errorMessage,
})

export const fetchZoneLoading = (state) => ({
  ...state,
  zone: null,
  zoneIsLoading: true,
  zoneErrorMessage: null,
})

export const fetchZoneSuccess = (state, { zone }) => ({
  ...state,
  zone: zone,
  zoneIsLoading: false,
  zoneErrorMessage: null,
})

export const fetchZoneFailure = (state, { errorMessage }) => ({
  ...state,
  zone: null,
  zoneIsLoading: false,
  zoneErrorMessage: errorMessage,
})
/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AirportFilterScreenTypes.FETCH_AIRPORTS_LOADING]: fetchAirportsLoading,
  [AirportFilterScreenTypes.FETCH_AIRPORTS_SUCCESS]: fetchAirportsSuccess,
  [AirportFilterScreenTypes.FETCH_AIRPORTS_FAILURE]: fetchAirportsFailure,
  [AirportFilterScreenTypes.FETCH_AIRPORT_COVERAGES_LOADING]: fetchAirportCoveragesLoading,
  [AirportFilterScreenTypes.FETCH_AIRPORT_COVERAGES_SUCCESS]: fetchAirportCoveragesSuccess,
  [AirportFilterScreenTypes.FETCH_AIRPORT_COVERAGES_FAILURE]: fetchAirportCoveragesFailure,
  [AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_DETAIL_LOADING]: fetchAirportPlaceDetailLoading,
  [AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_DETAIL_SUCCESS]: fetchAirportPlaceDetailSuccess,
  [AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_DETAIL_FAILURE]: fetchAirportPlaceDetailFailure,
  [AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_COORDINATE_LOADING]: fetchAirportPlaceCoordinateLoading,
  [AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_COORDINATE_SUCCESS]: fetchAirportPlaceCoordinateSuccess,
  [AirportFilterScreenTypes.FETCH_AIRPORT_PLACE_COORDINATE_FAILURE]: fetchAirportPlaceCoordinateFailure,
  [AirportFilterScreenTypes.FETCH_DISTANCE_BETWEEN_ORIGIN_AND_DESTINATION_LOADING]: fetchDistanceBetweenOriginAndDestinationLoading,
  [AirportFilterScreenTypes.FETCH_DISTANCE_BETWEEN_ORIGIN_AND_DESTINATION_SUCCESS]: fetchDistanceBetweenOriginAndDestinationSuccess,
  [AirportFilterScreenTypes.FETCH_DISTANCE_BETWEEN_ORIGIN_AND_DESTINATION_FAILURE]: fetchDistanceBetweenOriginAndDestinationFailure,
  [AirportFilterScreenTypes.FETCH_ZONE_LOADING]: fetchZoneLoading,
  [AirportFilterScreenTypes.FETCH_ZONE_SUCCESS]: fetchZoneSuccess,
  [AirportFilterScreenTypes.FETCH_ZONE_FAILURE]: fetchZoneFailure,
})
