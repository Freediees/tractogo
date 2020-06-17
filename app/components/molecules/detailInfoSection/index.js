import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Fonts, Margin } from 'theme'

import TextButton from 'components/atom/textButton'

export default function DetailInfoSection({ title, notes, onPress }) {
  return (
    <View style={{ ...Margin.mv_12, ...Margin.mh_16, flexDirection: 'row' }}>
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Text style={{ ...Fonts.f_10 }}>{title}</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <TextButton text={notes} onPress={onPress} />
      </View>
    </View>
    // <View
    //   style={{
    //     ...Flex.flex_row,
    //     alignItems: 'center',
    //     ...style,
    //   }}
    // >
    //   <Text style={{ ...Fonts.f_10, ...Margin.mr_4, alignItems: 'flex-start' }}>{title}</Text>
    //   <TextButton style={{ alignItems: 'flex-end' }} text={notes} onPress={onPress} />
    // </View>
  )
}

DetailInfoSection.defaultProps = {
  title: 'Terms And Condition',
  notes: 'More Details',
}

DetailInfoSection.propTypes = {
  title: PropTypes.string,
  notes: PropTypes.string,
  onPress: PropTypes.func,
}
