import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  light_shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  h_100: {
    height: '100%',
  },
  w_100: {
    width: '100%',
  },
  opacity_1: {
    opacity: 1,
  },
  opacity_03: {
    opacity: 0.3,
  },
  position_absolute: {
    position: 'absolute',
  },
  resize_stretch: {
    resizeMode: 'stretch',
  },
  resize_cover: {
    resizeMode: 'cover',
  },
  resize_contain: {
    resizeMode: 'contain',
  },
})
