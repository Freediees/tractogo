import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchAirports: null,
  fetchAirportsLoading: null,
  fetchAirportsSuccess: ['airports'],
  fetchAirportsFailure: ['errorMessage'],
  fetchAirportCoverages: ['payload'],
  fetchAirportCoveragesLoading: null,
  fetchAirportCoveragesSuccess: ['airportCoverages'],
  fetchAirportCoveragesFailure: ['errorMessage'],
  fetchAirportPlaceDetail: ['payload'],
  fetchAirportPlaceDetailLoading: null,
  fetchAirportPlaceDetailSuccess: ['airportPlaceDetail'],
  fetchAirportPlaceDetailFailure: ['errorMessage'],
  fetchAirportPlaceCoordinate: ['payload'],
  fetchAirportPlaceCoordinateLoading: null,
  fetchAirportPlaceCoordinateSuccess: ['airportPlaceCoordinate'],
  fetchAirportPlaceCoordinateFailure: ['errorMessage'],
  fetchDistanceBetweenOriginAndDestination: ['payload'],
  fetchDistanceBetweenOriginAndDestinationLoading: null,
  fetchDistanceBetweenOriginAndDestinationSuccess: ['distanceBetweenOriginAndDestination'],
  fetchDistanceBetweenOriginAndDestinationFailure: ['errorMessage'],
  fetchZone: ['payload'],
  fetchZoneLoading: null,
  fetchZoneSuccess: ['zone'],
  fetchZoneFailure: ['errorMessage'],
})

export const AirportFilterScreenTypes = Types
export default Creators
