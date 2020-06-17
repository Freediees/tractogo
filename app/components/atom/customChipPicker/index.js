import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Background, Padding, Margin, Border } from 'theme'

const styles = StyleSheet.create({
  activeBorder: {
    ...Border.border_w_1,
    ...Border.border_rad_4,
    ...Border.border_blue,
    ...Background.bg_light_grey,
    ...Margin.mt_12,
    ...Margin.mr_8,
    ...Padding.pv_4,
    ...Padding.ph_8,
  },
  defaultBorder: {
    ...Border.border_rad_4,
    ...Background.bg_light_grey,
    ...Margin.mt_12,
    ...Margin.mr_8,
    ...Padding.pv_4,
    ...Padding.ph_8,
  },
  activeText: {
    ...Fonts.f_12,
    ...Fonts.text_blue,
  },
  defaultText: {
    ...Fonts.f_12,
    ...Fonts.text_black,
  },
})

export default function CustomChipPicker({ items, selectedItem, selectedIndex, onSelectItem }) {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={selectedIndex === index ? styles.activeBorder : styles.defaultBorder}
        onPress={() => {
          console.log(item)
          console.log(index)
          onSelectItem(item, index)
        }}
      >
        <Text style={selectedIndex === index ? styles.activeText : styles.defaultText}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      {items &&
        items.map((v, i) => {
          return renderItem(v, i)
        })}
    </View>
  )
}

CustomChipPicker.defaultProps = {
  items: [
    {
      value: 0,
      label: 'Semua',
    },
    {
      value: 1,
      label: '4 Penumpang',
    },
    {
      value: 2,
      label: '5-6 Penumpang',
    },
    {
      value: 3,
      label: '> 6 Penumpang',
    },
  ],
  selectedItem: {
    value: 0,
    label: 'Semua',
  },
  selectedIndex: 0,
  onSelectItem: () => {},
}

CustomChipPicker.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  selectedItem: PropTypes.shape({}),
  selectedIndex: PropTypes.number,
  onSelectItem: PropTypes.func,
}
