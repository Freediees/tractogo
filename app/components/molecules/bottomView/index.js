import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

export default function BottomView({ children }) {
  return <View style={style.main}>{children}</View>;
}

BottomView.defaultProps = {
  children: null,
};

BottomView.propTypes = {
  children: PropTypes.node,
};
