import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import RatingStar from 'components/molecules/ratingStar'
import Timeline from 'components/molecules/timelineMolecule'
import CardHeaderCheckout from 'components/atom/cardHeaderCheckOut'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import RatingPage1 from './ratingPage1'
import RatingPage2 from './ratingPage2'
import RatingPage3 from './ratingPage3'

import backIcon from 'icons/ic-back.svg'

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
  ratingSopir,
  ratingKendaraan,
  reviewText,
  reviewText2,
  labelInformation,
  onSubmit,
  onStar,
  dataInfo,
  scrollRef,
  onIconLeftPress,
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

  const onNext = () => {
    if (timeStatus < 2) {
      scrollRef.scrollTo({ x: responsiveWidth(100) * (timeStatus + 1), y: 0, animated: true })
      setTimeStatus(timeStatus + 1)
    } else {
      onSubmit(1)
    }
  }

  return (
    <View style={{ width: '100%', flex: 1, ...Background.bg_white }}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <DefaultHeader title={title} iconLeft={backIcon} onIconLeftPress={onIconLeftPress} />
        </View>

        <View style={{ flex: 1 }}>
          <Timeline
            direction={'horizontal'}
            stepCount={3}
            labels={['Ulasan Kendaraan', 'Ulasan Sopir', 'Selesai']}
            currentPosition={timeStatus}
          />
        </View>
      </View>

      <View style={{ flex: 9, paddingTop: 0 }}>
        <ScrollView
          ref={(ref) => (scrollRef = ref)}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <RatingPage1 dataInfo={ratingSopir} onStar={onStar} />

          <RatingPage2 dataInfo={ratingKendaraan} onStar={onStar} />

          <RatingPage3 title={'Selamat anda mendapatkan voucher'} />
        </ScrollView>
      </View>

      <DefaultFooter
        buttonText={'Selanjutnya'}
        onButtonPress={() => {
          onNext()
        }}
      />
    </View>
  )
}

RatingScreen.defaultProps = {
  title: 'Ulasan',
  carRentalLabel: 'Car Rental',
  rentalDriverLabel: 'Self Drive',
  carName: 'Toyota New Avanza',
  address: 'Bandung',
  time: '11 - 12 Des || 11:00 WIB',
  reviewText: 'Puas dengan Kendaran ini? \nberikan nilaimu disini',
  reviewText2: 'Puas With Driver? \nberikan nilaimu disini',
  labelInformation: 'Kendaraan sangat baik',
  onStar1: () => {},
  onStar2: () => {},
  onStar3: () => {},
  onStar4: () => {},
  onStar5: () => {},
  onIconLeftPress: () => {},
  dataInfo: [],
  ratingSopir: [],
  ratingKendaraan: [],
}

RatingScreen.propTypes = {
  ratingKendaraan: PropTypes.array,
  ratingSopir: PropTypes.array,
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
