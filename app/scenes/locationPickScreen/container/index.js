import React, { useState, useEffect, useCallback } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import LocationPickScreenActions from 'scenes/locationPickScreen/store/actions'
import PickUpLocationScreen from 'components/organism/pickUpLocationScreen'
import AsyncStorage from '@react-native-community/async-storage'
import { saveFilterFunc, saveFilterObject, getFilterObject } from 'function'


export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const LocationPickScreen = ({
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
}) => {
  const { locations, city, saveLocations } = navigation.state.params
  const [initReady, changeInit] = useState(false)
  const [items, changeItems] = useState([])
  const [updated, changeUpdated] = useState(false)
  const [keyword, changeKeyword] = useState('')
  const forceUpdate = useForceUpdate()

  const refreshItems = (items) => {
    console.log(items)
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
    <PickUpLocationScreen
      keyword={keyword}
      changeKeyword={changeKeyword}
      items={items}
      changeItems={(items) => refreshItems(items)}
      onIconLeftPress={() => navigation.goBack()}
      onCloseIconPress={() => {
        clearPredictions()
      }}
      predictionItemClick={(v, i) => {
        console.log(v)
        const payload = {
          placeid: v.place_id,
          changeItems: refreshItems,
          items: items,
          index: i,
        }
        fetchPlaceDetail(payload)
      }}
      requestSearchPrediction={() => {
        fetchPredictions(`${city.cityName},${keyword}`)
      }}
      predictions={predictions}
      onSaveButtonPress={() => {
        for (const [i, v] of items.entries()) {
          if (i > 0) {
            if (v.toggle) {
              v.notes = items[0].notes
              v.hour = items[0].hour
              v.minute = items[0].minute
              v.location = items[0].location
            } else {
              if (v.location.name === null) {
                Alert.alert(`Location ${Moment(v.date).format('MMM, DD YYYY')} is not valid`)
                return
              }
            }
          } else {
            if (v.location.name === null) {
              Alert.alert(`Location ${Moment(v.date).format('MMM, DD YYYY')} is not valid`)
              return
            }
          }
        }
        saveLocations(items)
        navigation.goBack()
      }}
    />
  )
}

LocationPickScreen.defaultProps = {
  predictions: [],
  placeDetail: null,
}

LocationPickScreen.propTypes = {
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
}

const mapStateToProps = (state) => ({
  predictions: state.locationPickScreen.predictions,
  predictionsIsLoading: state.locationPickScreen.predictionsIsLoading,
  predictionsErrorMessage: state.locationPickScreen.predictionsErrorMessage,
  placeDetail: state.locationPickScreen.placeDetail,
  placeDetailIsLoading: state.locationPickScreen.placeDetailIsLoading,
  placeDetailErrorMessage: state.locationPickScreen.placeDetailErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPredictions: (payload) => dispatch(LocationPickScreenActions.fetchPredictions(payload)),
  fetchPlaceDetail: (payload) => dispatch(LocationPickScreenActions.fetchPlaceDetail(payload)),
  clearPredictions: () => dispatch(LocationPickScreenActions.clearPredictions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPickScreen)
