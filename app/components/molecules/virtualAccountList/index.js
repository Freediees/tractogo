import React, { useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Column, Margin, Background, Border, Flex } from 'theme'
import PrimaryButton from 'components/atom/primaryButton'

export default function VirtualAccoutList({ saveLabel, datasource, onPress, changeSelectedPress }) {
  const [bankSelected, changeSelected] = useState('')
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...Margin.mv_20 }}>
        {datasource &&
          datasource.map((data, i) => {
            return (
              <View key={i} style={{ ...Column.col_3 }}>
                <TouchableOpacity
                  onPress={() => {
                    changeSelectedPress(data)
                    changeSelected(data.bankid)}
                  }
                  style={[
                    {
                      borderWidth: 1,
                      ...Border.border_rad_8,
                      ...Background.bg_ice_blue,
                      ...Margin.mv_4,
                      ...Margin.mh_4,
                    },
                    bankSelected === data.bankid
                      ? Border.border_light_blue
                      : Border.border_transparent,
                  ]}
                >
                  <View style={{ ...Flex.f_1, alignItems: 'center' }}>
                    <Image
                      source={data.imageUri ? { uri: data.imageUri } : data.image}
                      style={{
                        height: 40,
                        width: 65,
                        resizeMode: 'contain',
                        ...Flex.f_1,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
      </View>
      <PrimaryButton
        style={{ justifyContent: 'center', ...Margin.mb_12, height: 40 }}
        text={saveLabel}
        onPress={onPress}
      />
    </View>
  )
}

VirtualAccoutList.defaultProps = {
  saveLabel: 'Save',
  onPress: (a) => console.log(a),
  datasource: [
    {
      bankid: 'Permata',
      image: require('icons/ic_Permata.png'),
    },
    {
      bankid: 'Mandiri',
      image: require('icons/ic_Mandiri.png'),
    },
    {
      bankid: 'BCA',
      image: require('icons/ic_BCA.png'),
    },
    {
      bankid: 'BNI',
      image: require('icons/ic_BNI.png'),
    },
    {
      bankid: 'Bersama',
      image: require('icons/ic_bersama.png'),
    },
  ],
  bankSelected: '',
  changeSelected: () => {},
  changeSelectedPress: () => {},
}

VirtualAccoutList.propTypes = {
  saveLabel: PropTypes.string,
  onPress: PropTypes.func,
  datasource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  bankSelected: PropTypes.string,
  changeSelected: PropTypes.func,
  changeSelectedPress: PropTypes.func,
}
