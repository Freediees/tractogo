import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Padding, Margin } from 'theme'
import OkCancelButton from 'components/molecules/okCancelButton'

const styles = StyleSheet.create({
  activeLeftText: {
    ...Fonts.f_16,
    ...Fonts.text_blue,
  },
  activeRightText: {
    ...Fonts.f_10,
    ...Fonts.text_blue,
  },
  defaultLeftText: {
    ...Fonts.f_16,
    ...Fonts.text_black,
  },
  defaultRightText: {
    ...Fonts.f_10,
    ...Fonts.text_black,
  },
})

export default function CustomItemPicker({
  items,
  selectedItem,
  selectedIndex,
  onSelectItem,
  okLabel,
  cancelLabel,
  onOkPress,
  onCancelPress,
}) {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={{ width: '100%', ...Margin.mt_8, ...Padding.ph_16, ...Padding.pv_12 }}
        onPress={() => onSelectItem(item, index)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={index === selectedIndex ? styles.activeLeftText : styles.defaultLeftText}>
              {item.leftLabel}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={index === selectedIndex ? styles.activeRightText : styles.defaultRightText}
            >
              {item.rightLabel}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        ...Padding.ph_20,
      }}
    >
      <ScrollView
        style={{
          height: 250,
          ...Padding.pv_20,
          ...Padding.ph_8,
        }}
      >
        {items &&
          items.map((v, i) => {
            return renderItem(v, i)
          })}
      </ScrollView>
      <OkCancelButton
        okLabel={okLabel}
        cancelLabel={cancelLabel}
        onOkPress={onOkPress}
        onCancelPress={onCancelPress}
      />
    </View>
  )
}

CustomItemPicker.defaultProps = {
  items: [
    {
      leftLabel: '1 Hari',
      rightLabel: 'Pengembalian Rabu, 27 January 2020',
    },
    {
      leftLabel: '2 Hari',
      rightLabel: 'Pengembalian Kamis, 28 January 2020',
    },
    {
      leftLabel: '3 Hari',
      rightLabel: 'Pengembalian Jumat, 29 January 2020',
    },
  ],
  selectedItem: null,
  selectedIndex: -1,
  onSelectItem: () => {},
  okLabel: 'Simpan',
  cancelLabel: 'Batal',
  onOkPress: () => {},
  onCancelPress: () => {},
}

CustomItemPicker.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  selectedItem: PropTypes.shape({}),
  selectedIndex: PropTypes.number,
  onSelectItem: PropTypes.func,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onOkPress: PropTypes.func,
  onCancelPress: PropTypes.func,
}
