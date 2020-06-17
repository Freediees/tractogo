import React, { Component, useState } from 'react'

import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Colors, Border, Padding, Margin, Background } from 'theme'
import IconButton from 'components/atom/iconButton'

import iconCaretDown from 'icons/ic-CTADown.svg'
import iconCaretUp from 'icons/ic-CTAUp.svg'

export default function CustomAccordionCard({ title, children }) {
  const [isCollapse, changeCollapse] = useState(false)

  return (
    <View
      style={{
        ...Border.border_w_1,
        ...Border.border_light_grey,
        ...Border.border_rad_8,
        ...Padding.ph_16,
        ...Padding.pv_12,
      }}
    >
      <View style={{ width: '100%', flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <View style={{ flex: 11, alignItems: 'flex-start', justifyContent: 'center' }}>
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{title}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <IconButton
              height={16}
              width={16}
              svg={isCollapse ? iconCaretUp : iconCaretDown}
              onPress={() => changeCollapse(!isCollapse)}
            />
          </View>
        </View>
        {isCollapse && <View>{children}</View>}
      </View>
    </View>
  )
}

CustomAccordionCard.defaultProps = {
  title: 'T & C',
  children: null,
}

CustomAccordionCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}
