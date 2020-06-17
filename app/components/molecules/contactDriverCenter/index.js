import React, { useState } from 'react'
import { View, Text, TouchableHighlight, Linking } from 'react-native'
import PropTypes from 'prop-types'
import PrimaryButton from 'components/atom/primaryButton'
import CheckBox from 'components/atom/checkBox'
import { Colors, Margin, Fonts, Flex, Padding } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'
import { SvgXml } from 'react-native-svg'
import iconCall from 'icons/ic-call.svg'
import iconFaq from 'icons/ic-faq.svg'
import iconDriver from 'icons/ic-driver.svg'

import Separator from 'components/atom/separator'

export default function ContactDriverCenter({
  phoneNumber,
  plateNumberLabel,
  plateNumberValue,
  driverNameLabel,
  driverNameValue,
  onPressCall,
  onPressChat,
  isCallEnable,
  isChatEnable,
}) {
  function callPhoneNumber() {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  return (
    <View
      style={[
        {
          width: '100%',
        },
      ]}
    >
      <View
        style={{
          ...Padding.ph_16,
          ...Margin.mt_12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
            ...Padding.pv_8,
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <SvgXml xml={iconCall} height={20} width={20} style={{ ...Margin.mr_16 }} />
          <View style={{ ...Flex.flex_column }}>
            <Text style={{ ...Fonts.text_dark_grey }}>{plateNumberLabel}</Text>
            <Text style={{ ...Fonts.f_10 }}>{plateNumberValue}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          ...Padding.ph_16,
          ...Margin.mt_12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
            ...Padding.pv_8,
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            ...Margin.mb_12,
          }}
        >
          <SvgXml xml={iconDriver} height={20} width={20} style={{ ...Margin.mr_16 }} />
          <View style={{ ...Flex.flex_column }}>
            <Text style={{ ...Fonts.text_dark_grey }}>{driverNameLabel}</Text>
            <Text style={{ ...Fonts.f_10 }}>{driverNameValue}</Text>
          </View>
        </View>
      </View>
      <Separator style={{ ...Margin.mv_8 }} />
      <View style={{ ...Flex.flex_row, alignItems: 'center', alignContent: 'center' }}>
        <TouchableHighlight
          style={{ flex: 1, ...Padding.pv_8, alignItems: 'center', justifyContent: 'center' }}
          underlayColor={Colors.light_grey}
          onPress={() => callPhoneNumber()}
        >
          <View
            style={{
              flex: 1,
              ...Padding.pv_8,
              flexDirection: 'row',
            }}
          >
            <SvgXml xml={iconCall} height={20} width={20} style={{ ...Margin.mr_12 }} />
          </View>
        </TouchableHighlight>
        <View
          style={[
            {
              height: '100%',
              width: 2,
              ...Padding.pv_8,
              backgroundColor: Colors.light_grey,
            },
          ]}
        />
        <TouchableHighlight
          style={{ flex: 1, ...Padding.pv_8, alignItems: 'center', justifyContent: 'center' }}
          underlayColor={Colors.light_grey}
          onPress={onPressChat}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgXml xml={iconFaq} height={20} width={20} style={{ ...Margin.mr_12 }} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

ContactDriverCenter.defaultProps = {
  plateNumberLabel: 'Vehicle Plate Number',
  plateNumberValue: 'B 1765 SUI',
  driverNameLabel: 'Driver Name',
  driverNameValue: '',
  phoneNumber: '0878147286',
  onPressCall: () => {},
  onPressChat: () => {},
}

ContactDriverCenter.proptypes = {
  plateNumberLabel: PropTypes.string,
  plateNumberValue: PropTypes.string,
  driverNameLabel: PropTypes.string,
  driverNameValue: PropTypes.string,
  phoneNumber: PropTypes.string,
  onPressCall: PropTypes.func,
  onPressChat: PropTypes.func,
  isCallEnable: PropTypes.bool,
  isChatEnable: PropTypes.bool,
}
