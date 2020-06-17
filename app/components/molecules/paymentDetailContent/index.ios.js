import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Background, Padding, Margin, Border } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'

export default function PaymentDetailContent({ items, totalAmount }) {
  const renderItem = (item, index) => {
    return (
      <View style={{ ...Margin.mt_20, flexDirection: 'row' }}>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Text style={{ ...Fonts.f_10 }}>{item.name}</Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <LabelNumberFormat number={item.total} style={{ ...Fonts.f_10 }} />
        </View>
      </View>
    )
  }

  return (
    <View style={{ width: '100%' }}>
      {items &&
        items.map((v, i) => {
          return renderItem(v, i)
        })}
      <View style={{ ...Margin.mt_20, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Text style={{ ...Fonts.f_10, ...Fonts.bold }}>{'Total'}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <LabelNumberFormat
            number={totalAmount}
            style={{ ...Fonts.f_10, ...Fonts.bold, ...Fonts.text_amber }}
          />
        </View>
      </View>
    </View>
  )
}

PaymentDetailContent.defaultProps = {
  items: [
    {
      name: 'Toyota New Innova - with driver',
      total: 500000,
    },
    {
      name: 'Penggunaan luar kota (additional)',
      total: 0,
    },
    {
      name: 'Overnight Driver (additional)',
      total: 0,
    },
    {
      name: 'Baby seat car (additional)',
      total: 0,
    },
  ],
  totalAmount: 0,
}

PaymentDetailContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  totalAmount: PropTypes.number,
}
