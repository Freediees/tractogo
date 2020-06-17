import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, TouchableOpacity, View, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Border, Padding, Alignment, Fonts, Colors } from 'theme'

export default function PrimaryButton({
  onPress,
  icon,
  text,
  widthSize,
  svg,
  children,
  style,
  disable,
}) {
  return (
    <TouchableHighlight
      disabled={disable}
      underlayColor={Colors.underlayAmber}
      style={{
        ...Background.bg_amber,
        ...Border.border_rad_4,
        ...Padding.pv_8,
        ...Padding.ph_8,
        ...Alignment.align_center,
        ...{ width: `${widthSize}` },
        ...style,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {svg && <SvgXml xml={svg} width={25} height={25} />}
        {icon && <Image source={icon} width={25} height={25} style={{ ...Margin.mr_8 }} />}
        <Text style={{ ...Fonts.f_12, ...Fonts.text_white }}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
}

PrimaryButton.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  svg: null,
  icon: null,
  widthSize: '100%',
  style: {},
  disable: false,
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  widthSize: PropTypes.string,
  svg: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape({}),
  disable: PropTypes.bool,
}
