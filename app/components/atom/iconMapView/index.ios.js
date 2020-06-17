import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import PropTypes from 'prop-types'
import Geocoder from 'react-native-geocoding'

import { GOOGLE_MAP_API } from 'config'

Geocoder.init(GOOGLE_MAP_API)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 60,
    width: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default function IconMapView({ location, changeLocation }) {
  const ASPECT_RATIO = 1
  const LATITUDE_DELTA = 0.01
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location ? location.lat : 0,
          longitude: location ? location.lon : 0,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={{
            latitude: location ? location.lat : 0,
            longitude: location ? location.lon : 0,
          }}
          onDragEnd={(e) => {
            Geocoder.from(e.nativeEvent.coordinate)
              .then((json) => {
                const addressComponent = json.results[0].address_components[0]
                changeLocation({
                  name: addressComponent.long_name,
                  lat: e.nativeEvent.coordinate.latitude,
                  lon: e.nativeEvent.coordinate.longitude,
                })
              })
              .catch((error) => console.warn(error))
          }}
        >
          <Image
            source={require('icons/pin-location.png')}
            style={{ height: 16, width: 12 }}
          />
        </Marker>
      </MapView>
    </View>
  )
}

IconMapView.defaultProps = {
  location: {
    name: null,
    lat: -6.2,
    lon: 106.816666,
  },
  changeLocation: () => {},
}

IconMapView.propTypes = {
  location: PropTypes.shape({}),
  changeLocation: PropTypes.func,
}
