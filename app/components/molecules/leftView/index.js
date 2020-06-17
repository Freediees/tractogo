import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

export default function LeftView({ children }) {
  return <View style={style.main}>{children}</View>
}

LeftView.defaultProps = {
  children: null,
}

LeftView.propTypes = {
  children: PropTypes.node,
}
