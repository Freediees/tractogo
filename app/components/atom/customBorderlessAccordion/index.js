import React, { Component, useState } from 'react'

import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts, Flex, Border, Padding, Margin, Background } from 'theme'
import IconButton from 'components/atom/iconButton'
import Separator from 'components/atom/separator'

import { SvgXml } from 'react-native-svg'
import iconCaretDown from 'icons/ic-CTADown.svg'
import iconCaretUp from 'icons/ic-CTAUp.svg'
import icHelp from 'icons/ic-help.svg'

export default function CustomBorderlessAccordion({ title, children }) {
  const [isCollapse, changeCollapse] = useState(true)

  return (
    <View
      style={{
        ...Background.bg_white,
        ...Padding.pv_12,
        ...Padding.ph_16,
      }}
    >
      <View style={{ width: '100%', flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <View
            style={{
              flex: 11,
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <View style={{ ...Flex.f_1, ...Margin.mr_16 }}>
              <SvgXml xml={icHelp} width={20} height={20} />
            </View>
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
        {isCollapse && <Separator style={{ ...Margin.mv_8, padding: 0 }} />}
        {isCollapse && <View>{children}</View>}
      </View>
    </View>
  )
}

CustomBorderlessAccordion.defaultProps = {
  title: 'Informasi Layanan',
  children: null,
}

CustomBorderlessAccordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}
