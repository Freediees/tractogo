import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import Svg, { Ellipse, SvgXml } from 'react-native-svg'
import icedit from 'icons/ic-edit.svg'
import DefaultHeader from 'components/molecules/defaultHeader'
import ButtonCard from 'components/molecules/buttonCard'
import DefaultCardViewStatic from 'components/molecules/borderlessDefaultCardViewStatic'
import MemberCTA from 'components/molecules/memberCTA'
import TextWithPicker from 'components/atom/textWithPicker'
import DefaultFooter from 'components/molecules/defaultFooter'


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
} from 'theme'

import backIcon from 'icons/ic-back.svg'
import editIcon from 'icons/ic-edit.svg'
import { ScrollView, BorderlessButton } from 'react-native-gesture-handler'

export default function MemberScreen({
  title,
  onBack,
  memberLabel,
  memberDesc,
  imgMember,
  onCardPress,
  dataList,
  labelBody,
}) {
  return (
    <View style={{ width: '100%', flex: 1 }}>
      
      <DefaultHeader border={true} title={title} iconLeft={backIcon} onIconLeftPress={onBack} />
     
      <View style={{ flex: 9 }}>
        {/* <View style={{ ...Background.bg_white, ...Padding.pv_20, ...Margin.mt_4 }}>
          <ButtonCard
            onPress={onCardPress}
            label={memberLabel}
            desc={memberDesc}
            arrow={true}
            imageSource={imgMember}
          />
        </View> */}

        <View style={{ marginTop: 4, padding: 10, ...Background.bg_white }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.mv_8 }}>{labelBody}</Text>
          {dataList.map((a, i) => {
            return (
              <View
                style={{
                  ...Padding.pv_20,
                  ...Padding.ph_16,
                  ...Margin.mt_8,
                  flexDirection: 'row',
                  ...Border.border_rad_8,
                  borderWidth: 1,
                  borderColor: Colors.smoky_grey,
                }}
              >
                <DefaultCardViewStatic
                  icon={a.icon}
                  title={a.title}
                  description={a.description}
                  arrow={true}
                />
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

MemberScreen.defaultProps = {
  labelBody: 'Benefit Member',
  title: 'Member',
  dataList: [
    {
      icon: require('images/banefit-member-09.png'),
      title: 'Car Rental Self Drive',
      description: 'Anda dapat mengakses layanan self drive',
    },
    {
      icon: require('images/banefit-member-09.png'),
      title: 'Discount Member',
      description: 'Nikmati diskon khusus untuk kamu yang sudah terdaftar member',
    },
  ],
  memberLabel: 'DATA MEMBER',
  memberDesc: 'Anda mempunyai 2 Banefit',
  imgMember: {
    uri:
      'https://cdn.zeplin.io/5e29ad5448bfce96eef74049/assets/dea2c681-bc35-4968-bf1d-76140ee72245.png',
  },
  onCardPress: () => {},
}

MemberScreen.propTypes = {
  labelBody: PropTypes.string,
  title: PropTypes.string,
  dataList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  memberLabel: PropTypes.string,
  memberLabel: PropTypes.string,
  imgMember: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  onCardPress: PropTypes.func,
}
