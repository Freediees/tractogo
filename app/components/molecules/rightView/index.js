import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

export default function RightView({ children }) {
  return <View style={style.main}>{children}</View>
}

RightView.defaultProps = {
  children: null,
}

RightView.propTypes = {
  children: PropTypes.node,
}
