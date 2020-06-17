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
  const percent = `${100 / (items.length > 2 ? items.length : 3)}%`

  const renderItem = (item) => {
    return (
      <View
        style={{
          width: percent,
          height: 48,
          flexDirection: 'column',
          alignItems: 'center',
          ...Margin.mr_8,
        }}
      >
        <SvgXml xml={item.image} height={24} width={24} />
        <Text style={{ ...Fonts.f_8, ...Margin.mt_8, textAlign: 'center' }}>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={{ width: '100%', flexDirection: 'column', ...Padding.ph_20, ...Padding.pv_8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...Fonts.f_10, ...Fonts.semibold }}>{title}</Text>
        {moreButtonLabel && <TextButton text={moreButtonLabel} onPress={moreButtonPress} />}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          ...Margin.mt_4,
          ...Padding.ph_8,
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
      name: 'Layanan Darurat 24 Jam',
      image: iconCallCenter,
    },
    {
      name: 'Kendaraan Pengganti',
      image: iconReplacement,
    },
    {
      name: 'Asuransi Jiwa',
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
