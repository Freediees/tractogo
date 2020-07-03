import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import RatingStar from 'components/molecules/ratingStar'
import CardHeaderCheckout from 'components/atom/cardHeaderCheckOut'
import { responsiveWidth } from 'react-native-responsive-dimensions'

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
  Background,
  Border,
  CustomStyle,
} from 'theme'
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'

const RatingPage3 = ({ title }) => {
  return (
    <View style={{ width: responsiveWidth(100) }}>
      <Text
        style={{
          ...Fonts.f_12,
          ...Margin.mv_8,
          ...Padding.ph_16,
          color: Colors.dark_grey,
          ...Fonts.bold,
        }}
      >
        {title}
      </Text>
    </View>
  )
}
RatingPage3.defaultProps = {
  title: '',
}

RatingPage3.propTypes = {
  title: PropTypes.string,
}

export default RatingPage3
