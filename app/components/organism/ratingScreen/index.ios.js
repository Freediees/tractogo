import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import RatingStar from 'components/molecules/ratingStar'
import Timeline from 'components/molecules/timelineMolecule'
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

export default function RatingScreen({
  title,
  carRentalLabel,
  rentalDriverLabel,
  carName,
  address,
  time,
  reviewText,
  reviewText2,
  labelInformation,
  onStar1,
  onStar2,
  onStar3,
  onStar4,
  onStar5,
  dataInfo,
  scrollRef,
}) {
  // console.log('help')
  // console.log(dataInfo.detailInfo.length)

  const [arrStyle, setArrStyle] = useState([])
  const [color, setColor] = useState(false)
  const [timeStatus, setTimeStatus] = useState(0)

  useEffect(() => {
    async function initialize() {
      let arr = []
      for (let i = 0; i < dataInfo.detailInfo.length; i++) {
        arr[i] = false
      }
      // console.log(arr)
      setArrStyle(await arr)
    }
    initialize()
  }, [])

  const changeColor = (value) => {
    // alert(value)
    let arrTemp = arrStyle

    if (arrTemp[value]) {
      arrTemp[value] = false
    } else {
      arrTemp[value] = true
    }

    // console.log(arrStyle[value])
    // console.log(arrStyle[value])
    // console.log(arrTemp)

    setColor(!color)
    setArrStyle(arrTemp)
  }

  const cek = (value) => {
    let val = ''

    console.log(arrStyle)

    if (arrStyle[value]) {
      val = 'blue'
    } else {
      val = 'white'
    }
    return val
  }

  const onNext = () => {
    scrollRef.scrollTo({x: responsiveWidth(100), y: 0, animated: true}) 
    setTimeStatus(timeStatus + 1)
  }

  return (
    <View style={{ width: '100%', flex: 1, ...Background.bg_white }}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <DefaultHeader border={false} title={title} />
        </View>
        
        <View style={{ flex: 1 }}>
          <Timeline 
              direction={'horizontal'}
              stepCount={3}
              labels={['Ulasan Kendaraan', 'Ulasan Sopir', 'Selesai']}
              currentPosition={timeStatus}
              >
              </Timeline>
        </View>
      </View>

      <View style={{ flex: 9, paddingTop: 0 }}>
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
          >
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

        <ScrollView
          ref = {(ref) => (scrollRef = ref)}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: responsiveWidth(100) }}>
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
              onStar1={onStar1}
              onStar2={onStar2}
              onStar3={onStar3}
              onStar4={onStar4}
              onStar5={onStar5}
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
                {dataInfo.generalInfo}
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
                {dataInfo.generalLabel}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...Padding.ph_8 }}>
                {dataInfo.detailInfo.map((a, i) => {
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
                })}
              </View>
            </View>
          </View>
          <View style={{ width: responsiveWidth(100) }}>
            <View style={{ ...Padding.pv_16 }}>
              <Text
                style={{
                  ...Fonts.f_12,
                  ...Fonts.semibold,
                  ...Fonts.text_dark_grey,
                  textAlign: 'center',
                }}
              >
                {reviewText2}
              </Text>
            </View>

            <RatingStar
              onStar1={onStar1}
              onStar2={onStar2}
              onStar3={onStar3}
              onStar4={onStar4}
              onStar5={onStar5}
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
                {dataInfo.generalInfo}
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
                {dataInfo.generalLabel}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...Padding.ph_8 }}>
                {dataInfo.detailInfo.map((a, i) => {
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
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <DefaultFooter buttonText={'Selanjutnya'} onButtonPress={() => { onNext() }} />
    </View>
  )
}

RatingScreen.defaultProps = {
  title: 'Ulasan',
  carRentalLabel: 'Sewa Mobil',
  rentalDriverLabel: 'Tanpa Sopir',
  carName: 'Toyota New Avanza',
  address: 'Bandung',
  time: '11 - 12 Des || 11:00 WIB',
  reviewText: 'Puas dengan Kendaran ini? \nberikan nilaimu disini',
  reviewText2: 'Puas dengan Sopir? \nberikan nilaimu disini',
  labelInformation: 'Kendaraan sangat baik',
  onStar1: () => {},
  onStar2: () => {},
  onStar3: () => {},
  onStar4: () => {},
  onStar5: () => {},
  dataInfo: [],
}

RatingScreen.propTypes = {
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
  dataInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
