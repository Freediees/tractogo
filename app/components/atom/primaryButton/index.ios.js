import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Border, Padding, Alignment, Fonts, Colors, Margin } from 'theme'

export default function PrimaryButton({ onPress, icon, text, svg, widthSize, children, style }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayAmber}
      style={{
        ...Background.bg_amber,
        ...Border.border_rad_4,
        ...Padding.pv_12,
        ...Padding.ph_12,
        ...Alignment.align_center,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        ...{ width: `${widthSize}`, ...style },
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
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  svg: PropTypes.string,
  icon: PropTypes.string,
  widthSize: PropTypes.string,
  style: PropTypes.shape({}),
}
