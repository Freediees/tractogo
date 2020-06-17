import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Alignment, Colors } from 'theme'

export default function IconButton({ onPress, disabled, icon, svg, fill, height, width, children }) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
      style={{
        borderRadius: height,
        ...Background.bg_transparent,
        ...Alignment.align_center,
        padding: 8,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {svg && <SvgXml xml={svg} width={width} height={height} fill={fill} />}
        {icon && <Image source={icon} width={24} height={24} />}
      </View>
    </TouchableHighlight>
  )
}

IconButton.defaultProps = {
  children: null,
  onPress: () => {},
  svg: null,
  icon: null,
  fill: '#fff',
  height: 24,
  width: 24,
  disabled: false,
}

IconButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  svg: PropTypes.string,
  icon: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
}
