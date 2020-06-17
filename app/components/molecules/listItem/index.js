import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { Fonts, Margin, Padding, Justify, Alignment, Flex } from 'theme'
import { Colors } from 'react-native/Libraries/NewAppScreen'

/********************************************************************************************************
 * @desc : ListItem in Profile Screen
 ********************************************************************************************************/
export default function ListItem({
  imageSource,
  leftLabel,
  title,
  body,
  onPress,
  children,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress.bind(this)}
      style={{
        ...Padding.ph_20,
        ...Padding.pv_16,
        ...Margin.mt_8,
        ...Justify.justify_space_around,
        backgroundColor: Colors.white,
        width: '100%',
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            ...Justify.justify_center,
            ...Alignment.align_center,
            ...Margin.mh_8,
          }}
        >
          {!leftLabel ? (
            <Image source={imageSource} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
          ) : null}
          {leftLabel ? (
            <Text style={{ ...Fonts.bold, width: '100%', ...Fonts.f_14 }}>{leftLabel}</Text>
          ) : null}
        </View>
      </View>
      <View style={{ ...Flex.flex_7, ...Padding.ph_16 }}>
        <View style={{ justifyContent: 'center' }}>
          {title ? (
            <Text
              style={[
                !leftLabel ? Fonts.semi_bold : {},
                {
                  width: '100%',
                  textAlign: !leftLabel ? 'left' : 'right',
                  ...Fonts.f_14,
                },
              ]}
            >
              {title}
            </Text>
          ) : null}
          {children}
          {body ? <Text style={{ ...Fonts.text_dark_grey, ...Fonts.f_12 }}>{body}</Text> : null}
        </View>
      </View>

      <View
        style={{
          ...Flex.flex_1,
          ...Padding.ph_8,
          ...Justify.justify_center,
          ...Alignment.align_end,
        }}
      >
        <Image source={require('icons/ic_back_arrow.png')} />
      </View>
    </TouchableOpacity>
  )
}

ListItem.defaultProps = {
  leftLabel: '',
  title: '',
  body: ' Text',
  children: null,
  onPress: () => {},
  style: null,
  imageSource: null,
}

ListItem.propTypes = {
  imageSource: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  leftLabel: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.shape({}),
}
