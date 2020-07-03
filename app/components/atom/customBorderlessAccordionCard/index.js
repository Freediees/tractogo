import React, { Component, useState } from 'react'

import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Colors, Border, Padding, Margin, Background } from 'theme'
import IconButton from 'components/atom/iconButton'
import Separator from 'components/atom/separator'

import iconCaretDown from 'icons/ic-CTADown.svg'
import iconCaretUp from 'icons/ic-CTAUp.svg'

export default function CustomBorderlessAccordionCard({ title, children }) {
  const [isCollapse, changeCollapse] = useState(true)

  return (
    <View
      style={{
        ...Background.bg_white,
        ...Padding.pv_12,
      }}
    >
      <View style={{ width: '100%', flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            ...Padding.ph_20,
            ...Padding.ph_16,
          }}
        >
          <View
            style={{
              flex: 11,
              ...Padding.ph_16,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{title}</Text>
          </View>
          <View
            style={{ flex: 1, ...Padding.ph_16, alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <IconButton
              height={16}
              width={16}
              svg={isCollapse ? iconCaretUp : iconCaretDown}
              onPress={() => changeCollapse(!isCollapse)}
            />
          </View>
        </View>
        {isCollapse && <Separator style={{ ...Margin.mv_8, padding: 0 }} />}
        {isCollapse && (
          <View
            style={{
              ...Padding.ph_16,
            }}
          >
            {children}
          </View>
        )}
      </View>
    </View>
  )
}

CustomBorderlessAccordionCard.defaultProps = {
  title: 'Service Information',
  children: null,
}

CustomBorderlessAccordionCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}
