import React, { useState, useEffect } from 'react'
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

const RatingPage1 = ({
  title,
  carRentalLabel,
  rentalDriverLabel,
  carName,
  address,
  time,
  reviewText,
  reviewText2,
  labelInformation,
  onStar,
  dataInfo,
  scrollRef,
  onIconLeftPress,
}) => {
  const [arrStyle, setArrStyle] = useState([])
  const [color, setColor] = useState(false)

  const changeColor = (value) => {
    // alert(value)
    let arrTemp = arrStyle

    if (arrTemp[value]) {
      arrTemp[value] = false
    } else {
      arrTemp[value] = true
    }

    setColor(!color)
    setArrStyle(arrTemp)
  }
  return (
    <View style={{ width: responsiveWidth(100) }}>
      <Text
        style={{
          ...Fonts.f_10,
          ...Margin.mv_8,
          ...Padding.ph_16,
          color: Colors.dark_grey,
        }}
      >
        Service Terkait
      </Text>
      <View
        style={{
          // width: '100%',
          backgroundColor: 'white',
          ...Padding.pv_16,
          ...Padding.ph_16,
          ...CustomStyle.light_shadow,
          ...Border.border_rad_8,
          ...Margin.mh_16,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Image
            source={require('icons/icon-layanan-02.png')}
            style={{ width: 40, height: 40, marginRight: 8 }}
            resizeMode={'contain'}
          />
          <CardHeaderCheckout
            carRentalLabel={carRentalLabel}
            rentalDriverLabel={rentalDriverLabel}
          />
        </View>

        <Text style={{ ...Fonts.f_10, color: Colors.black, ...Padding.pv_4 }}>{carName}</Text>
        <Text style={{ ...Fonts.f_10, color: Colors.dark_grey, ...Padding.pv_4 }}>{address}</Text>
        <Text style={{ ...Fonts.f_10, color: Colors.dark_grey, ...Padding.pv_4 }}>{time}</Text>
      </View>
      <View style={{ ...Padding.pv_16 }}>
        <Text
          style={{
            ...Fonts.f_12,
            ...Fonts.semibold,
            ...Fonts.text_dark_grey,
            textAlign: 'center',
          }}
        >
          {reviewText}
        </Text>
      </View>

      <RatingStar
        onStar1={() => {
          onStar(1, 0)
        }}
        onStar2={() => {
          onStar(2, 0)
        }}
        onStar3={() => {
          onStar(3, 0)
        }}
        onStar4={() => {
          onStar(4, 0)
        }}
        onStar5={() => {
          onStar(5, 0)
        }}
      />

      <View style={{ ...Padding.pv_16, ...Background.bg_ice_blue }}>
        <Text
          style={{
            ...Fonts.f_12,
            ...Fonts.semibold,
            ...Fonts.text_light_blue,
            textAlign: 'center',
          }}
        >
          {dataInfo ? dataInfo.generalInfo : ''}
        </Text>
      </View>

      <View style={{ width: '100%' }}>
        <Text
          style={{
            ...Fonts.f_10,
            ...Margin.mv_16,
            ...Padding.ph_16,
            color: Colors.dark_grey,
          }}
        >
          {dataInfo ? dataInfo.generalLabel : ''}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...Padding.ph_8 }}>
          {dataInfo.length != 0 ? (
            dataInfo.detailInfo.map((a, i) => {
              return (
                <TouchableWithoutFeedback
                  onPress={changeColor.bind(this, i)}
                  style={{
                    borderColor: Colors.light_blue,
                    backgroundColor: arrStyle[i] ? Colors.ice_blue : 'white',
                    borderRadius: 30,
                    margin: 5,
                    borderWidth: 1,
                    ...Padding.ph_8,
                    ...Padding.pv_4,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.f10,
                      ...Fonts.text_dark_grey,
                    }}
                  >
                    {a.title}
                  </Text>
                </TouchableWithoutFeedback>
              )
            })
          ) : (
            <View />
          )}
        </View>
      </View>
    </View>
  )
}
RatingPage1.defaultProps = {
  title: 'Ulasan',
  carRentalLabel: 'Car Rental',
  rentalDriverLabel: 'Self Drive',
  carName: 'Toyota New Avanza',
  address: 'Bandung',
  time: '11 - 12 Des || 11:00 WIB',
  reviewText: 'Puas dengan Sopir? \nberikan nilaimu disini',
  labelInformation: 'Kendaraan sangat baik',
  onStar1: () => {},
  onStar2: () => {},
  onStar3: () => {},
  onStar4: () => {},
  onStar5: () => {},
  onIconLeftPress: () => {},
  dataInfo: [],
}

RatingPage1.propTypes = {
  title: PropTypes.string,
  carRentalLabel: PropTypes.string,
  rentalDriverLabel: PropTypes.string,
  carName: PropTypes.string,
  address: PropTypes.string,
  time: PropTypes.string,
  reviewText: PropTypes.string,
  reviewText2: PropTypes.string,
  labelInformation: PropTypes.string,
  onStar1: PropTypes.func,
  onStar2: PropTypes.func,
  onStar3: PropTypes.func,
  onStar4: PropTypes.func,
  onStar5: PropTypes.func,
  onIconLeftPress: PropTypes.func,
  dataInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default RatingPage1
