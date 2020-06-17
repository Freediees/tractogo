import React from 'react'
import { View,  Text, Picker, StyleSheet } from 'react-native'
import { WheelPicker } from 'react-native-wheel-picker-android'
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
  const hourData = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ]

  const minuteData = ['00', '30']

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

  const addZero = (i) => {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  const checkItem = (item) => {
    return item
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', width: '100%', position: 'absolute' }}>
      <View style={{ flex: 1, flexDirection: 'row', zIndex: 1, height: 60 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...Fonts.f_16, ...Fonts.text_smoky_grey }}>{hourLabel}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...Fonts.f_16, ...Fonts.text_smoky_grey }}>{minuteLabel}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, ...Margin.mh_16 }}>
          <WheelPicker
            selectedItem={parseInt(selectedHour)}
            data={hourData}
            selectedItemTextColor={Colors.blue}
            itemTextColor={Colors.smoky_grey}
            itemTextFontFamily={'Montserrat-Regular'}
            selectedItemTextFontFamily={'Montserrat-Regular'}
            onItemSelected={(itemValue) => onValueChange(hourData[itemValue], selectedMinute)}
          />
        </View>
        <View style={{ flex: 1, ...Margin.mh_16 }}>
          <WheelPicker
            selectedItem={selectedMinute === '00' ? 0 : 1}
            data={minuteData}
            selectedItemTextColor={Colors.blue}
            itemTextColor={Colors.smoky_grey}
            itemTextFontFamily={'Montserrat-Regular'}
            selectedItemTextFontFamily={'Montserrat-Regular'}
            onItemSelected={(itemValue) => onValueChange(selectedHour, minuteData[itemValue])}
          />
        </View>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
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
  hourLabel: 'Jam',
  minuteLabel: 'Menit',
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
