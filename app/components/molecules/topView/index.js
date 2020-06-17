import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

export default function TopView({ children }) {
  return <View style={style.main}>{children}</View>
}

TopView.defaultProps = {
  children: null,
}

TopView.propTypes = {
  children: PropTypes.node,
}
