import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import TextButton from 'components/atom/textButton'
import { Fonts, Padding, Row, Colors, Margin } from 'theme'

import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function HeaderOptions({
  title,
  isEdit,
  onPressEdit,
  onPressFinish,
  mainOptions,
  secondOptions,
  border,
}) {
  const borderStyle = {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  }

  return (
    <View
      style={[
        {
          flex: 1,
          ...Padding.pv_4,
          justifyContent: 'center',
          alignItems: 'center',
          ...Row.row_1,
          flexDirection: 'row',
          paddingTop: getStatusBarHeight(true),
          width: '100%',
        },
        border ? borderStyle : {},
      ]}
    >
      <View style={{ flex: 1, ...Padding.ph_12, ...Margin.ml_8, justifyContent: 'center' }}>
        <Text style={{ ...Fonts.f_14, ...Fonts.bold }}>{title}</Text>
      </View>

      {isEdit ? (
        <View style={{ flex: 1, ...Padding.ph_12, ...Margin.mr_8, alignItems: 'flex-end' }}>
          <TextButton onPress={onPressEdit} text={secondOptions} fontSize={{ ...Fonts.f_12 }} />
        </View>
      ) : (
        <View style={{ flex: 1, ...Padding.ph_12, ...Margin.mr_8, alignItems: 'flex-end' }}>
          <TextButton onPress={onPressFinish} text={mainOptions} fontSize={{ ...Fonts.f_12 }} />
        </View>
      )}
    </View>
  )
}

HeaderOptions.defaultProps = {
  title: '',
  mainOptions: 'Edit',
  secondOptions: 'Selesai',
  isEdit: true,
  border: true,
  onPressEdit: () => {},
  onPressFinish: () => {},
}

HeaderOptions.propTypes = {
  title: PropTypes.string,
  mainOptions: PropTypes.string,
  secondOptions: PropTypes.string,
  isEdit: PropTypes.bool,
  border: PropTypes.bool,
  onPressEdit: PropTypes.func,
  onPressFinish: PropTypes.func,
}
