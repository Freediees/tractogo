import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import {
  Column,
  Margin,
  Fonts,
  Colors,
  Padding,
  Row,
  Alignment,
  ImageSize,
  Flex,
  CustomStyle,
  onPress,
} from 'theme'
import editIcon from 'icons/ic-edit.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function TextAndPhoto({ label, imageUrl, onPress }) {
  return (
    <View
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        ...CustomStyle.light_shadow,
        ...Margin.mv_4,
        backgroundColor: 'white',
      }}
    >
      <View style={{ flex: 2, justifyContent: 'center', ...Padding.pl_16 }}>
        <Text style={{ ...Fonts.f_12, ...Fonts.bold, ...Fonts.text_dark_grey }}>{label}</Text>
      </View>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', ...Padding.pr_16 }}
        onPress={onPress.bind(this)}
      >
        <Image style={{ height: 60, width: 60 }} resizeMode={'contain'} source={imageUrl} />
      </TouchableOpacity>
    </View>
  )
}

TextAndPhoto.defaultProps = {
  label: 'Title',
  imageUrl: {
    uri: 'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg',
  },
  onPress: () => {},
}

TextAndPhoto.PropTypes = {
  label: PropTypes.string,
  imageUrl: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  onPress: PropTypes.func,
}
