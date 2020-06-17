import React, { useState, useEffect, useCallback } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import LocationPickScreenActions from 'scenes/locationPickScreen/store/actions'
import LocationPickScreenSelfDriveActions from 'scenes/locationPickScreenSelfDrive/store/actions'
import SelfDrivePickLocationScreen from 'components/organism/selfDrivePickLocationScreen'
import AsyncStorage from '@react-native-community/async-storage'
import { saveFilterFunc, saveFilterObject, getFilterObject } from 'function'
import { round } from 'function/math'


export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const LocationPickScreenSelfDrive = ({
  navigation,
  predictions,
  predictionsIsLoading,
  predictionsErrorMessage,
  fetchPredictions,
  placeDetail,
  placeDetailIsLoading,
  placeDetailErrorMessage,
  fetchPlaceDetail,
  clearPredictions,
  distance,
  clearDistance,
  distanceIsLoading,
  distanceErrorMessage,
  fetchDistance,
  priceExpedition,
  clearPriceExpedition,
  fetchPriceExpedition,
  priceExpeditionIsLoading,
  priceExpeditionErrorMessage,
}) => {
  const { locations, city, saveLocations } = navigation.state.params
  const [initReady, changeInit] = useState(false)
  const [items, changeItems] = useState([])
  const [updated, changeUpdated] = useState(false)
  const [keyword, changeKeyword] = useState('')
  const forceUpdate = useForceUpdate()

  const refreshItems = (items) => {
    changeItems(items)
    forceUpdate()
  }

  useEffect(() => {
    async function initialize() {
      changeInit(true)
      changeItems(locations)
      console.log(city)
    }
    initialize()
  }, [])

  return (
    <SelfDrivePickLocationScreen
      poolLocation={{
        name: `Pool ${city.cityName}`,
        address: `${city.item.BranchName}`,
        lat: parseFloat(city.item.Latitude) || 0,
        lon: parseFloat(city.item.Longitude) || 0,
      }}
      poolPrice={0}
      keyword={keyword}
      changeKeyword={changeKeyword}
      items={items}
      changeItems={(items) => refreshItems(items)}
      onIconLeftPress={() => navigation.goBack()}
      onCloseIconPress={() => {
        clearPredictions()
      }}
      predictionItemClick={async (v, i) => {
        console.log(predictions[i])
        const payload = {
          placeid: v.place_id,
          changeItems: refreshItems,
          items: items,
          index: i,
        }
        const originsString = `${city.item.Latitude},${city.item.Longitude}`
        console.log(originsString)
        fetchPlaceDetail(payload)
        const destinattionsString = `${placeDetail.geometry.location.lat},${placeDetail.geometry.location.lng}`
        const data = {
          data: {
            origins: originsString,
            destinations: destinattionsString,
          },
          items: items,
          refreshItems: refreshItems,
        }
        fetchDistance(data)
      }}
      requestSearchPrediction={() => {
        fetchPredictions(`${city.cityName},${keyword}`)
      }}
      predictions={predictions}
      onSaveButtonPress={() => {
        console.log(items)
        saveLocations(items)
        navigation.goBack()
      }}
    />
  )
}

LocationPickScreenSelfDrive.defaultProps = {
  predictions: [],
  placeDetail: null,
}

LocationPickScreenSelfDrive.propTypes = {
  predictions: PropTypes.arrayOf(PropTypes.shape({})),
  predictionsIsLoading: PropTypes.bool,
  predictionsErrorMessage: PropTypes.string,
  fetchPredictions: PropTypes.func,
  placeDetail: PropTypes.arrayOf(PropTypes.shape({})),
  placeDetailIsLoading: PropTypes.bool,
  placeDetailErrorMessage: PropTypes.string,
  fetchPlaceDetail: PropTypes.func,
  clearPredictions: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  distance: PropTypes.shape({}),
  clearDistance: PropTypes.func,
  distanceIsLoading: PropTypes.bool,
  distanceErrorMessage: PropTypes.string,
  fetchDistance: PropTypes.func,
  priceExpedition: PropTypes.arrayOf(PropTypes.shape({})),
  clearPriceExpedition: PropTypes.func,
  fetchPriceExpedition: PropTypes.func,
  priceExpeditionIsLoading: PropTypes.bool,
  priceExpeditionErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  predictions: state.locationPickScreen.predictions,
  predictionsIsLoading: state.locationPickScreen.predictionsIsLoading,
  predictionsErrorMessage: state.locationPickScreen.predictionsErrorMessage,
  placeDetail: state.locationPickScreen.placeDetail,
  placeDetailIsLoading: state.locationPickScreen.placeDetailIsLoading,
  placeDetailErrorMessage: state.locationPickScreen.placeDetailErrorMessage,
  distance: PropTypes.shape({}),
  distanceIsLoading: PropTypes.bool,
  distanceErrorMessage: PropTypes.string,
  priceExpedition: PropTypes.arrayOf(PropTypes.shape({})),
  priceExpeditionIsLoading: PropTypes.bool,
  priceExpeditionErrorMessage: PropTypes.string,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPredictions: (payload) => dispatch(LocationPickScreenActions.fetchPredictions(payload)),
  fetchPlaceDetail: (payload) => dispatch(LocationPickScreenActions.fetchPlaceDetail(payload)),
  clearPredictions: () => dispatch(LocationPickScreenActions.clearPredictions()),
  clearPriceExpedition: () => dispatch(LocationPickScreenSelfDriveActions.clearPriceExpedition()),
  fetchPriceExpedition: (payload) =>
    dispatch(LocationPickScreenSelfDriveActions.fetchPriceExpedition(payload)),
  clearDistance: () => dispatch(LocationPickScreenSelfDriveActions.clearDistance()),
  fetchDistance: (payload) => dispatch(LocationPickScreenSelfDriveActions.fetchDistance(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPickScreenSelfDrive)
