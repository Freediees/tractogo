import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'

import testSvg from 'icons/ic-memberactive.svg'
import LinearGradient from 'react-native-linear-gradient'
import { Padding, Alignment, Fonts, Flex, Justify, ImageSize, Margin, Colors } from 'theme'

import styles from './styles'

export default function ButtonCard({
  imageSource,
  thumbnail,
  label,
  desc,
  arrow,
  background,
  labelColor,
  descColor,
  iconColor,
  style,
  thumbnailStyle,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.main, ...style, elevation: 2, shadowRadius: 5 }}>
      <LinearGradient colors={['#5f7bcf', '#23419b']} style={{ ...styles.content }}>

        <View style={{ ...Flex.flex_2 }}>
          <View
            style={{
              ...ImageSize.img_xs,
              ...Margin.mh_12,
              ...Justify.justify_center,
              ...Alignment.align_center,
              backgroundColor: Colors.white,
              borderRadius: ImageSize.img_xs.width,
            }}
          >
            <SvgXml xml={testSvg} width={ImageSize.img_40.width} height={ImageSize.img_40.height} />
          </View>
        </View>  
        <View
          style={{
            ...Flex.flex_5,
            ...Padding.pl_0,
            ...Padding.pv_4,
          }}
        >
          <Text
            style={{
              ...Fonts.f_12,
              ...Fonts.text_white,
              ...Fonts.bold,
              color: labelColor,
            }}
          >
            {label}
          </Text>
          {desc && <Text style={{ ...Fonts.text_white, color: descColor }}>{desc}</Text>}
        </View>

        <View >
          {arrow ? (
            <View
              style={{
                ...ImageSize.img_icon,
                ...Alignment.align_center,
                ...Justify.justify_center,
                ...Margin.mr_16,
                backgroundColor: Colors.white,
                borderRadius: ImageSize.img_icon.width,
              }}
            >
              <Image source={require('icons/ic_back_arrow.png')} />
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

ButtonCard.defaultProps = {
  imageSource: {},
  thumbnail: null,
  label: '',
  desc: '',
  arrow: false,
  background: ['#5f7bcf', '#23419b'],
  labelColor: Colors.white,
  descColor: Colors.white,
  iconColor: Colors.white,
  style: {},
  thumbnailStyle: {},
  onPress: () => {}
}

ButtonCard.propTypes = {
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  desc: PropTypes.string,
  arrow: PropTypes.bool,
  imageSource: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  thumbnail: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.object]),
  labelColor: PropTypes.string,
  descColor: PropTypes.string,
  iconColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.object]),
  thumbnailStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.object]),
  onPress: PropTypes.func,
}
