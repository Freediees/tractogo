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

import Separator from 'components/atom/separator'

export default function ContactCenterSection({
  pesananLabel,
  noPesananLabel,
  notesOrderLabel,
  callCenterLabel,
  faqLabel,
  phoneNumber,
  onPressFaq,
}) {
  function callPhoneNumber() {
    const url = `telprompt:${phoneNumber}`
	Linking.canOpenURL(url)
		.then((supported) => {
			if (supported) {
				return Linking.openURL(url)
					.catch(() => null);
			}
		});
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
        <Text>{pesananLabel}</Text>
        <Text style={{ ...Fonts.bold }}>{noPesananLabel}</Text>
      </View>
      <View style={{ ...Padding.ph_16, ...Margin.mv_16, justifyContent: 'center' }}>
        <Text>{notesOrderLabel}</Text>
      </View>
      <Separator style={{ ...Margin.mv_8 }} />
      <View style={{ ...Flex.flex_row }}>
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
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgXml xml={iconCall} height={16} width={16} style={{ ...Margin.mr_12 }} />
            <Text style={{ ...Fonts.f_12, ...Fonts.text_blue }}>{callCenterLabel}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ flex: 1, ...Padding.pv_8, alignItems: 'center', justifyContent: 'center' }}
          underlayColor={Colors.light_grey}
          onPress={onPressFaq}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgXml xml={iconFaq} height={16} width={16} style={{ ...Margin.mr_12 }} />
            <Text style={{ ...Fonts.f_12, ...Fonts.text_blue }}>{faqLabel}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

ContactCenterSection.defaultProps = {
  pesananLabel: 'No Pesanan',
  noPesananLabel: '1231234234',
  notesOrderLabel: 'Customer service akan menanyakan No Pesanan Anda',
  callCenterLabel: 'Call Center',
  faqLabel: 'FAQ',
  phoneNumber: '0878147286',
  onPressCall: () => {},
  onPressFaq: () => {},
}

ContactCenterSection.proptypes = {
  pesananLabel: PropTypes.string,
  noPesananLabel: PropTypes.string,
  notesOrderLabel: PropTypes.string,
  callCenterLabel: PropTypes.string,
  faqLabel: PropTypes.string,
  phoneNumber: PropTypes.string,
  onPressCall: PropTypes.func,
  onPressFaq: PropTypes.func,
}
