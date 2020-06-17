import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Colors, Background, Padding, Border } from 'theme'
import CalendarPicker from 'react-native-calendar-picker'

export default function CustomCalendarPicker({
  myRef,
  onDateChange,
  minDate,
  maxDate,
  initialDate,
  selectedDate,
  weekdays,
  months,
}) {
  return (
    <View style={styles.container}>
      <CalendarPicker
        ref={myRef}
        onDateChange={onDateChange}
        textStyle={{ ...Fonts.f_12 }}
        previousTitle={'<'}
        nextTitle={'>'}
        initialDate={initialDate}
        weekdays={weekdays}
        months={months}
        minDate={minDate}
        maxDate={maxDate}
        todayTextStyle={{ ...Background.bg_transparent }}
        dayOfWeekStyles={{ ...Background.bg_blue, ...Fonts.text_white }}
        selectedDayTextColor={'#fff'}
        selectedDayStyle={{ ...Background.bg_amber }}
        previousTitleStyle={{ ...Fonts.f_12, ...Fonts.text_blue }}
        nextTitleStyle={{ ...Fonts.f_12, ...Fonts.text_blue }}
        dayOfWeekStyles={{
          0: {
            color: Colors.red,
            ...Fonts.f_12,
          },
          1: {
            color: Colors.blue,
            ...Fonts.f_12,
          },
          2: {
            color: Colors.blue,
            ...Fonts.f_12,
          },
          3: {
            color: Colors.blue,
            ...Fonts.f_12,
          },
          4: {
            color: Colors.blue,
            ...Fonts.f_12,
          },
          5: {
            color: Colors.blue,
            ...Fonts.f_12,
          },
          6: {
            color: Colors.blue,
            ...Fonts.f_12,
          },
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Padding.ph_16,
    ...Border.border_w_1,
    ...Border.border_rad_4,
    ...Border.border_light_grey,
  },
})

CustomCalendarPicker.defaultProps = {
  myRef:()=>{},
  onDateChange: () => { },
  initialDate: new Date(),
  minDate: new Date(),
  maxDate: new Date().getTime() + 864000000,
  selectedDate: null,
  weekdays: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
}

CustomCalendarPicker.propTypes = {
  myRef:PropTypes.func,
  onDateChange: PropTypes.func,
  initialDate: PropTypes.Date,
  minDate: PropTypes.Date,
  maxDate: PropTypes.Date,
  selectedDate: PropTypes.Date,
  weekdays: PropTypes.arrayOf(PropTypes.string),
  months: PropTypes.arrayOf(PropTypes.string),
}
