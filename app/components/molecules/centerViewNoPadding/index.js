import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

export default function CenterViewNoPadding({ children }) {
  return <View style={style.main}>{children}</View>
}

CenterViewNoPadding.defaultProps = {
  children: null,
}

CenterViewNoPadding.propTypes = {
  children: PropTypes.node,
}
