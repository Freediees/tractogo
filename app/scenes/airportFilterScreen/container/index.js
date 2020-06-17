import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import { Alert } from 'react-native'
import AirportFilterContainerAction from 'scenes/airportFilterScreen/store/actions'
import LocationPickScreenActions from 'scenes/locationPickScreen/store/actions'
import AsyncStorage from '@react-native-community/async-storage'
import { saveFilterFunc, saveFilterObject, getFilterObject, pad } from 'function'
import { RENTAL_KMBASE, AIRPORT_TRANSFER, AIRPORT_TRANSFER_BUID } from 'config'
import AirportFilterScreen from 'components/organism/airportFilterScreen'
import CarListScreenActions from 'scenes/carListScreen/store/actions'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const AirportFilterContainer = ({
  navigation,
  airports,
  airportsIsLoading,
  airportsErrorMessage,
  airportCoverages,
  airportCoveragesIsLoading,
  airportCoveragesErrorMessage,
  fetchAirports,
  fetchAirportCoverages,
  predictions,
  fetchPredictions,
  clearPredictions,
  fetchPlaceDetail,
  fetchAirportPlaceCoordinate,
  airportPlaceCoordinate,
  fetchDistanceBetweenOriginAndDestination,
  distanceBetweenOriginAndDestination,
  fetchZone,
  zone,
  airportPlaceDetail,
}) => {
  const [selectedDate, changeSelectedDate] = useState(new Date())
  const [selectedMinute, changeSelectedMinute] = useState('00')
  const [selectedHour, changeSelectedHour] = useState('10')
  const [selectedAirport, changeSelectedAirport] = useState({})
  const [selectedCity, changeSelectedCity] = useState({})
  const [selectedAddress, changeSelectedAddress] = useState({})
  const [initReady, changeInit] = useState(false)
  const [updated, changeUpdated] = useState(false)
  const [keyword, changeKeyword] = useState('')
  const [isFromAirport, changeIsFromAirport] = useState(true)
  const prevSelectedAirport = usePrevious({ selectedAirport })
  const forceUpdate = useForceUpdate()

  const onSubmit = () => {
    if (!selectedAirport.item) {
      Alert.alert('Please Select an Airport')
      return
    }

    if (airportCoverages.length === 0) {
      Alert.alert('Please Choose Other Airport or Other Address Information')
      return
    }

    if (!selectedAddress.description) {
      Alert.alert('Please Select Address Information')
      return
    }

    if (JSON.stringify(zone) === {} || zone === null) {
      Alert.alert('Please wait ...')
      return
    } else if (parseInt(zone.KM) > 50) {
      Alert.alert(
        isFromAirport
          ? 'Sorry, At This Time Our Service Not Reached Your Destination'
          : 'Sorry, At This Time Our Service Not Reached Your Location'
      )
      return
    }

    const formatedSelectedDate = new Date(selectedDate)
    formatedSelectedDate.setHours(selectedHour)
    formatedSelectedDate.setMinutes(selectedMinute)
    formatedSelectedDate.setSeconds(0)
    console.log('selectedCity', selectedCity)
    let reservationDetails = {
      city: {
        ...selectedAddress.location,
        CityID: selectedCity.item.CityId,
        CityName: selectedCity.item.CityName,
        BranchID: selectedCity.item.city.BranchId,
        BusinessUnitId: selectedCity.item.city.BusinessUnitId,
      },
      airport: {
        ...selectedAirport.item,
        ...airportPlaceCoordinate[0].geometry,
      },
      zone: { ...zone },
      date: { formatedSelectedDate },
    }

    var stockPayload = {
      payload: {
        BusinessUnitId: AIRPORT_TRANSFER_BUID,
        StartDate: Moment(reservationDetails.date.formatedSelectedDate, 'UTC')
          .utc()
          .format(),
        EndDate: Moment(reservationDetails.date.formatedSelectedDate, 'UTC')
          .utc()
          .format(),
        BranchId: isFromAirport
          ? reservationDetails.airport.BranchId
          : reservationDetails.city.BranchId,
        IsWithDriver: 1,
        Uom: 'km',
        RentalPackage: reservationDetails.zone.KM,
        RentalDuration: reservationDetails.zone.KM,
        ServiceTypeId: RENTAL_KMBASE,
        ValidateAttribute: '1',
        ValidateContract: '1',
      },
    }
    navigation.navigate('AirportCarListScreen', {
      airportStockPayload: stockPayload,
      isFromAirport: isFromAirport,
      reservationDetails: reservationDetails,
    })
  }

  const refreshAddress = (items) => {
    changeSelectedAddress(items)
    forceUpdate()
  }

  useEffect(() => {
    async function initialize() {
      zone = null
      if (airports && airports.length === 0) {
        fetchAirports()
        forceUpdate()
      }
    }
    initialize()
    // console.log(selectedAddress)
    // console.log(zone)
    // console.log('airportPlaceCoordinate', airportPlaceCoordinate)

    if (typeof prevSelectedAirport !== 'undefined' && typeof selectedAirport.item !== 'undefined') {
      if (Object.keys(prevSelectedAirport.selectedAirport).length === 0) {
        console.log('masuk ini 1')
        fetchAirportCoverages(selectedAirport.item.Code)
        fetchAirportPlaceCoordinate(selectedAirport.cityName)
      } else if (
        // airportCoverages.length === 0 &&
        prevSelectedAirport.selectedAirport.item.Code !== selectedAirport.item.Code
      ) {
        console.log('masuk sini 2')
        fetchAirportCoverages(selectedAirport.item.Code)
        fetchAirportPlaceCoordinate(selectedAirport.cityName)
      } else if (selectedAirport !== prevSelectedAirport.selectedAirport) {
        console.log('masuk sini 3')
        fetchAirportCoverages(selectedAirport.item.Code)
        fetchAirportPlaceCoordinate(selectedAirport.cityName)
      }
    }

    if (
      JSON.stringify(selectedAirport) !== '{}' &&
      JSON.stringify(selectedCity) !== '{}' &&
      JSON.stringify(selectedAddress) !== '{}' &&
      distanceBetweenOriginAndDestination &&
      distanceBetweenOriginAndDestination.rows &&
      distanceBetweenOriginAndDestination.rows.length
    ) {
      const zonePayload = {
        buID: AIRPORT_TRANSFER_BUID,
        prdID: AIRPORT_TRANSFER,
        distance: (
          distanceBetweenOriginAndDestination.rows[0].elements[0].distance.value / 1000
        ).toFixed(0),
      }

      fetchZone(zonePayload)
      console.log({ zone })
    }

    if (zone && parseInt(zone.KM) > 50) {
      zone = {}
    }
  }, [
    selectedAirport,
    airportPlaceCoordinate,
    selectedAddress,
    distanceBetweenOriginAndDestination,
    isFromAirport,
  ])

  if (!updated && initReady) {
    changeUpdated(true)
  }

  return (
    <AirportFilterScreen
      changeSelectedDate={changeSelectedDate}
      selectedDate={selectedDate}
      onIconLeftPress={() => navigation.goBack()}
      onSearchButtonPress={() => onSubmit()}
      selectedMinute={selectedMinute}
      changeSelectedMinute={changeSelectedMinute}
      selectedHour={selectedHour}
      changeSelectedHour={changeSelectedHour}
      placeHolderLocationFilter={'Choose Address'}
      placeHolderAirportFilter={'Choose Airport'}
      airportData={airports}
      changeSelectedAirport={async (v) => {
        changeSelectedAirport(v)
      }}
      selectedAirport={selectedAirport}
      citiesData={Object.keys(selectedAirport).length === 0 ? [] : airportCoverages}
      changeSelectedCity={changeSelectedCity}
      selectedCity={selectedCity}
      keyword={keyword}
      changeKeyword={changeKeyword}
      onCloseIconPress={() => {
        clearPredictions()
      }}
      isFromAirport={isFromAirport}
      changeIsFromAirport={() => {
        changeIsFromAirport(!isFromAirport)
      }}
      predictions={predictions}
      requestSearchPrediction={() => {
        fetchPredictions(`${selectedCity.cityName},${keyword}`)
      }}
      items={selectedAddress}
      changeItems={(items) => refreshAddress(items)}
      predictionItemClick={async (v, i) => {
        console.log({ airportPlaceCoordinate })
        const addressAndLocationPayload = {
          ...v,
          location: {
            name: v.description,
            address: v.description,
            lat: 0,
            lon: 0,
          },
        }
        const placeDetailPayload = {
          placeid: v.place_id,
          changeItems: refreshAddress,
          items: addressAndLocationPayload,
          index: i,
        }
        fetchPlaceDetail(placeDetailPayload)

        const fetchDistancePayload = {
          origin: selectedAirport.cityName,
          destination: v.description,
        }

        fetchDistanceBetweenOriginAndDestination(fetchDistancePayload)
      }}
      changeSelectedAddress={changeSelectedAddress}
    />
  )
}

AirportFilterContainer.defaultProps = {
  airport: [],
  airportCoverages: [],
  predictions: [],
  airportPlaceCoordinate: [],
  distanceBetweenOriginAndDestination: {},
  zone: {},
}

AirportFilterContainer.propTypes = {
  airports: PropTypes.arrayOf(PropTypes.shape({})),
  airportsIsLoading: PropTypes.bool,
  airportsErrorMessage: PropTypes.string,
  airportCoverages: PropTypes.arrayOf(PropTypes.shape({})),
  airportCoveragesIsLoading: PropTypes.bool,
  airportCoveragesErrorMessage: PropTypes.string,
  fetchAirports: PropTypes.func,
  fetchAirportCoverages: PropTypes.func,
  predictions: PropTypes.arrayOf(PropTypes.shape({})),
  predictionsIsLoading: PropTypes.bool,
  predictionsErrorMessage: PropTypes.string,
  fetchPlaceDetail: PropTypes.func,
  fetchAirportPlaceCoordinate: PropTypes.func,
  airportPlaceCoordinate: PropTypes.arrayOf(PropTypes.shape({})),
  distanceBetweenOriginAndDestination: PropTypes.shape({}),
  fetchDistanceBetweenOriginAndDestination: PropTypes.func,
  fetchZone: PropTypes.func,
  zone: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  airports: state.airportFilter.airports,
  airportsIsLoading: state.airportFilter.airportsIsLoading,
  airportsErrorMessage: state.airportFilter.airportsErrorMessage,
  airportCoverages: state.airportFilter.airportCoverages,
  airportCoveragesIsLoading: state.airportFilter.airportCoveragesIsLoading,
  airportCoveragesErrorMessage: state.airportFilter.airportCoveragesErrorMessage,
  predictions: state.locationPickScreen.predictions,
  predictionsIsLoading: state.locationPickScreen.predictionsIsLoading,
  predictionsErrorMessage: state.locationPickScreen.predictionsErrorMessage,
  airportPlaceCoordinate: state.airportFilter.airportPlaceCoordinate,
  airportPlaceCoordinateIsLoading: state.airportFilter.airportPlaceCoordinateIsLoading,
  airportPlaceCoordinateErrorMessage: state.airportFilter.airportPlaceCoordinateErrorMessage,
  distanceBetweenOriginAndDestination: state.airportFilter.distanceBetweenOriginAndDestination,
  zone: state.airportFilter.zone,
  airportPlaceDetail: state.airportFilter.airportPlaceDetail,
})

const mapDispatchToProps = (dispatch) => ({
  fetchAirports: () => dispatch(AirportFilterContainerAction.fetchAirports()),
  fetchAirportCoverages: (value) =>
    dispatch(AirportFilterContainerAction.fetchAirportCoverages(value)),
  fetchPredictions: (payload) => dispatch(LocationPickScreenActions.fetchPredictions(payload)),
  clearPredictions: () => dispatch(LocationPickScreenActions.clearPredictions()),
  fetchPlaceDetail: (payload) =>
    dispatch(AirportFilterContainerAction.fetchAirportPlaceDetail(payload)),
  fetchAirportPlaceCoordinate: (payload) =>
    dispatch(AirportFilterContainerAction.fetchAirportPlaceCoordinate(payload)),
  fetchDistanceBetweenOriginAndDestination: (payload) =>
    dispatch(AirportFilterContainerAction.fetchDistanceBetweenOriginAndDestination(payload)),
  fetchZone: (payload) => dispatch(AirportFilterContainerAction.fetchZone(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirportFilterContainer)
