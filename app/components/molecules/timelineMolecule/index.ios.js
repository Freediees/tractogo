import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Column, Border, Padding, Fonts, Colors, Margin } from 'theme'
import Timeline from 'components/atom/timeline'

export default function TimelineMolecule({
  direction,
  children,
  currentPosition,
  labels,
  stepCount,
  defaultColor,
  failed,
  labelAlign,
}) {
  // const [currentPosition, setCurrentPosition] = useState(0)

  return (
    <View style={{ ...Padding.ph_8, ...Padding.pv_8, width: '100%', justifyContent: 'center', flex: direction == 'vertical' ? 1 : 0 }}>
      <Timeline direction={direction} currentPosition={currentPosition} stepCount={stepCount} labels={labels} defaultColor={defaultColor} failed={failed} labelAlign={labelAlign}/>
      <View>{children}</View>
    </View>
  )
}

TimelineMolecule.defaultProps = {
  direction: 'horizontal',
  children: null,
  currentPosition: 1,
  stepCount: 3,
  labels: [],
  defaultColor: Colors.blue,
  failed: false,
  labelAlign: 'center',
}

TimelineMolecule.propTypes = {
  direction: PropTypes.string,
  children: PropTypes.node,
  currentPosition: PropTypes.number,
  labels: PropTypes.array,
  stepCount: PropTypes.number,
  defaultProps: PropTypes.string,
  failed: PropTypes.bool,
  labelAlign: PropTypes.string,
}
