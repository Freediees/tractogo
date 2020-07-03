import React from 'react'
import { View, Text, Picker, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Colors, Padding, Margin } from 'theme'

import OkCancelButton from 'components/molecules/okCancelButton'

export default function CustomTimePicker({
  itemStyle,
  selectedHour,
  selectedMinute,
  onValueChange,
  maxHour,
  hourInterval,
  hourUnit,
  maxMinute,
  minuteInterval,
  minuteUnit,
  hourLabel,
  minuteLabel,
  okLabel,
  cancelLabel,
  onOkPress,
  onCancelPress,
}) {
  const getHourItems = () => {
    const items = []
    const interval = maxHour / hourInterval
    for (let i = 0; i <= interval; i++) {
      const value = `${i * hourInterval}`
      const item = <Picker.Item key={value} value={value} label={value + hourUnit} />
      items.push(item)
    }
    return items
  }

  const getMinuteItems = () => {
    const items = []
    const interval = maxMinute / minuteInterval
    for (let i = 0; i <= interval; i++) {
      const value = i * minuteInterval
      const new_value = value < 10 ? `0${value}` : `${value}`
      const item = <Picker.Item key={value} value={new_value} label={new_value + minuteUnit} />
      items.push(item)
    }
    return items
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', width: '100%', position: 'absolute' }}>
      <View style={{ flex: 1, flexDirection: 'row', zIndex: 1, height: 60 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...Fonts.f_16, ...Fonts.text_smoky_grey }}>{hourLabel}</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...Fonts.f_16, ...Fonts.text_smoky_grey }}>{minuteLabel}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          itemStyle={itemStyle}
          onValueChange={(itemValue) => onValueChange(itemValue, selectedMinute)}
        >
          {getHourItems()}
        </Picker>
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          itemStyle={itemStyle}
          onValueChange={(itemValue) => onValueChange(selectedHour, itemValue)}
        >
          {getMinuteItems()}
        </Picker>
      </View>
      <View style={{ flex: 1, width: '100%', ...Margin.mt_20, ...Padding.ph_20 }}>
        <OkCancelButton
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          onOkPress={onOkPress}
          onCancelPress={onCancelPress}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    marginTop: '-12.5%',
    ...Padding.ph_20,
    ...Margin.ml_20,
    ...Margin.mr_20,
    ...Fonts.text_blue,
  },
})

CustomTimePicker.defaultProps = {
  maxHour: 23,
  maxMinute: 30,
  hourInterval: 1,
  minuteInterval: 30,
  hourUnit: '',
  minuteUnit: '',
  selectedHour: '10',
  selectedMinute: '00',
  itemStyle: {
    ...Fonts.f_16,
    ...Fonts.text_blue,
  },
  hourLabel: 'Hour',
  minuteLabel: 'Minutes',
  onValueChange: () => {},
  okLabel: 'Simpan',
  cancelLabel: 'Batal',
  onOkPress: () => {},
  onCancelPress: () => {},
}

CustomTimePicker.propTypes = {
  maxHour: PropTypes.number,
  maxMinute: PropTypes.number,
  hourLabel: PropTypes.string,
  minuteLabel: PropTypes.string,
  hourInterval: PropTypes.number,
  minuteInterval: PropTypes.number,
  hourUnit: PropTypes.string,
  minuteUnit: PropTypes.string,
  selectedHour: PropTypes.string,
  selectedMinute: PropTypes.string,
  onValueChange: PropTypes.func,
  itemStyle: PropTypes.object,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onOkPress: PropTypes.func,
  onCancelPress: PropTypes.func,
}
