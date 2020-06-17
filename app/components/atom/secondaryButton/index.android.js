import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Border, Padding, Alignment, Fonts, Margin, Colors, ImageSize } from 'theme'

export default function SecondaryButton({
  onPress,
  icon,
  isOrange,
  text,
  svg,
  widthSize,
  children,
  style,
}) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
      style={{
        ...Background.bg_white,
        ...Border.border_w_1,
        ...Border.border_amber,
        ...Border.border_rad_4,
        ...Padding.pv_12,
        ...Padding.ph_12,
        ...Alignment.align_center,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        ...style,
        ...{ width: `${widthSize}` },
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {svg && <SvgXml xml={svg} width={25} height={25} />}
        {icon && <Image source={icon} width={25} height={25} style={{ ...Margin.mr_12 }} />}
        <Text
          style={[{ ...Fonts.f_12 }, isOrange ? { ...Fonts.text_amber } : { ...Fonts.text_black }]}
        >
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

SecondaryButton.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  svg: null,
  icon: null,
  widthSize: '100%',
  style: {},
  isOrange: false,
}

SecondaryButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  svg: PropTypes.string,
  icon: PropTypes.string,
  widthSize: PropTypes.string,
  style: PropTypes.shape({}),
  isOrange: PropTypes.bool,
}
