import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

export default function ScrollViewHorizontalContainer({ children }) {
  return <View style={style.main}>{children}</View>
}

ScrollViewHorizontalContainer.defaultProps = {
  children: null,
}

ScrollViewHorizontalContainer.propTypes = {
  children: PropTypes.node,
}
