import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Image, View, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Background, Border, Padding, Alignment, Fonts, Colors, Margin } from 'theme'

export default function ButtonImageCircle({
  onPress,
  icon,
  text,
  svg,
  widthSize,
  children,
  style,
}) {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-end',
        ...Border.border_rad_4,
        ...style
        // ...Border.border_rad_4,
        // ...Padding.pt_12,
        // // shadowOffset: { width: 0, height: 5 },
        // // shadowColor: 'rgba(0,0,0, 0.1)',
        // // shadowRadius: 5,
        // // elevation: 5,
        // alignItems: 'flex-end',
        // ...{ width: `${widthSize}`, ...style },
      }}
      onPress={onPress}
    >
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      > */}
        <View
          style={{
            padding: 5,
            height: 40,
            width: 40, // The Width must be the same as the height
            borderRadius: 400, // Then Make the Border Radius twice the size of width or Height
            ...Background.bg_blue,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon && <Image style={{ resizeMode: 'contain' }} source={icon} width={24} height={24} />}
        </View>
      {/* </View> */}
    </TouchableOpacity>
    // <TouchableOpacity
    //   style={{
    //     alignItems: 'flex-end',
    //     backgroundColor: '#fff',
    //     ...Border.border_rad_4,
    //     ...{ width: `${widthSize}`, ...style },
    //   }}
    //   onPress={onPress}
    // >
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <View
    //       style={{
    //         padding: 5,
    //         height: 40,
    //         width: 40, // The Width must be the same as the height
    //         borderRadius: 400, // Then Make the Border Radius twice the size of width or Height
    //         ...Background.bg_blue,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       {icon && <Image style={{ resizeMode: 'contain' }} source={icon} width={24} height={24} />}
    //     </View>
    //   </View>
    // </TouchableOpacity>
  )
}

ButtonImageCircle.defaultProps = {
  children: null,
  onPress: () => {},
  text: '',
  svg: null,
  icon: require('icons/ic-swap.png'),
  widthSize: '100%',
  style: {},
}

ButtonImageCircle.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  text: PropTypes.string,
  svg: PropTypes.string,
  icon: PropTypes.string,
  widthSize: PropTypes.string,
  style: PropTypes.shape({}),
}
