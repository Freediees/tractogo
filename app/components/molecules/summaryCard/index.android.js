import React from 'react'
import { View, Text } from 'react-native'
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
} from 'theme'
import { TextInput } from 'react-native-gesture-handler'

const SummaryCard = ({
  title,
  firstLabel,
  secondLabel,
  firstInformation,
  secondInformation,
  onChangeFirst,
  onChangeSecond,
  firstValue,
  secondValue,
}) => {
  return (
    <View style={{ ...Margin.mh_16, ...Margin.mb_8 }}>
      <Text style={{ ...Fonts.f_12, ...Margin.mv_8, ...Fonts.semibold }}>{title}</Text>
      <View
        style={{
          borderRadius: 8,
          shadowOpacity: 1,
          backgroundColor: 'white',
          elevation: 5,
          ...CustomStyle.light_shadow,
        }}
      >
        <View style={{ ...Margin.mh_16, ...Margin.mv_8, padding: 16 }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{firstLabel}</Text>
          <TextInput
            onChangeText={(text) => onChangeFirst(text)}
            value={firstValue}
            style={{ ...Margin.mv_8, borderBottomWidth: 0.5, ...Padding.pv_8 }}
          />
          <Text style={{ ...Fonts.f_10, ...Fonts.text_orange }}>{firstInformation}</Text>

          <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{secondLabel}</Text>
          <TextInput
            onChangeText={(text) => onChangeSecond(text)}
            value={secondValue}
            style={{ ...Margin.mv_8, borderBottomWidth: 0.5, ...Padding.pv_8 }}
          />
          <Text style={{ ...Fonts.f_10, ...Fonts.text_orange }}>{secondInformation}</Text>
        </View>
      </View>
    </View>
  )
}

SummaryCard.defaultProps = {
  title: 'eKTP/Paspor',
  firstLabel: 'No eKTP / Paspor',
  secondLabel: 'Nama Sesuai KTP',
  firstInformation: 'first information',
  secondInformation: 'second information',
  onChangeFirst: () => {},
  onChangeSecond: () => {},
  firstValue: '',
  secondValue: '',
}

SummaryCard.propTypes = {
  title: PropTypes.string,
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  firstInformation: PropTypes.string,
  secondInformation: PropTypes.string,
  onChangeFirst: PropTypes.func,
  onChangeSecond: PropTypes.func,
  firstValue: PropTypes.string,
  secondValue: PropTypes.string,
}
export default SummaryCard
