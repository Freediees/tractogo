import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Column, Border, Padding, Fonts, Colors, Margin } from 'theme'
import StepIndicator from 'react-native-step-indicator'

export default function Timeline({
  currentPosition,
  labels,
  stepCount,
  direction,
  defaultColor,
  failed,
  labelAlign,
}) {
  // const [currentPosition, setCurrentPosition] = useState(0)

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: failed ? 'red' : defaultColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: defaultColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: defaultColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: defaultColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: failed ? 'red' : '#fff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: defaultColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: defaultColor,
    labelSize: 13,
    currentStepLabelColor: defaultColor,
    labelAlign: labelAlign,
  }

  return (
    <View style={{ flex: direction == 'vertical' ? 1 : 0, width: '100%', justifyContent: 'center' }}>
      <StepIndicator
        customStyles={customStyles}
        stepCount={stepCount}
        currentPosition={currentPosition}
        labels={labels}
        direction={direction}
      />
    </View>
  )
}

Timeline.defaultProps = {
  currentPosition: 1,
  stepCount: 4,
  labels: [],
  direction: 'horizontal',
  defaultColor: Colors.blue,
  failed: false,
  labelAlign: 'flex-start',
}

Timeline.propTypes = {
  currentPosition: PropTypes.number,
  labels: PropTypes.array,
  stepCount: PropTypes.number,
  direction: PropTypes.string,
  defaultProps: PropTypes.string,
  failed: PropTypes.bool,
  labelAlign: PropTypes.string,
}
