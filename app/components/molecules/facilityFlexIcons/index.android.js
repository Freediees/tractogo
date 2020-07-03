import React from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'
import TextButton from 'components/atom/textButton'

import { Padding, Margin, Fonts, Colors, Background } from 'theme'

import iconCallCenter from 'icons/ic-callcenter.svg'
import iconReplacement from 'icons/ic-replacement.svg'
import iconAsuransi from 'icons/ic-asuransi.svg'

export default function FacilityFlexIcons({
  items,
  title,
  moreButtonLabel,
  moreButtonPress,
  style,
}) {
  const percent = `${100 / items.length}%`

  const renderItem = (item) => {
    return (
      <View
        style={{
          width: percent,
          height: 48,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SvgXml xml={item.image} height={24} width={24} />
        <Text style={{ ...Fonts.f_8, ...Margin.mt_8, ...Padding.ph_12, textAlign: 'center' }}>
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <View style={{ width: '100%', flexDirection: 'column', ...Padding.ph_20, ...Padding.pv_12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...Fonts.f_10, ...Fonts.semibold }}>{title}</Text>
        {moreButtonLabel && <TextButton text={moreButtonLabel} onPress={moreButtonPress} />}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...Margin.mt_4,
          ...Padding.ph_20,
          ...Padding.pv_20,
        }}
      >
        {items &&
          items.map((v, i) => {
            return renderItem(v)
          })}
      </View>
    </View>
  )
}

FacilityFlexIcons.defaultProps = {
  items: [
    {
      name: '24-Hour Emergency Service',
      image: iconCallCenter,
    },
    {
      name: 'Breakdown replacement car',
      image: iconReplacement,
    },
    {
      name: 'Life Insurance',
      image: iconAsuransi,
    },
  ],
  title: 'Fasilitas',
  moreButtonLabel: null,
  moreButtonPress: () => {},
}

FacilityFlexIcons.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  moreButtonLabel: PropTypes.string,
  moreButtonPress: PropTypes.func,
}
