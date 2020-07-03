import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { Column, Border, Padding, Fonts, Colors, Margin } from 'theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function RatingStarView({ onStar1, onStar2, onStar3, onStar4, onStar5, disabled }) {
  const [star1, setStar1] = useState(false)
  const [star2, setStar2] = useState(false)
  const [star3, setStar3] = useState(false)
  const [star4, setStar4] = useState(false)
  const [star5, setStar5] = useState(false)

  const onPressStar1 = () => {
    setStar1(true)
    setStar2(false)
    setStar3(false)
    setStar4(false)
    setStar5(false)

    onStar1()
  }

  const onPressStar2 = () => {
    setStar1(true)
    setStar2(true)
    setStar3(false)
    setStar4(false)
    setStar5(false)

    onStar2()
  }

  const onPressStar3 = () => {
    setStar1(true)
    setStar2(true)
    setStar3(true)
    setStar4(false)
    setStar5(false)

    onStar3()
  }

  const onPressStar4 = () => {
    setStar1(true)
    setStar2(true)
    setStar3(true)
    setStar4(true)
    setStar5(false)

    onStar4()
  }

  const onPressStar5 = () => {
    setStar1(true)
    setStar2(true)
    setStar3(true)
    setStar4(true)
    setStar5(true)

    onStar5()
  }

  return (
    <View
      style={{ ...Padding.pv_8, ...Padding.ph_8, flexDirection: 'row', justifyContent: 'center' }}
    >
      <TouchableWithoutFeedback
        style={{ height: 50, width: 50, margin: 5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('icons/ic_star.png')}
          style={{ flex: 1, tintColor: star1 ? 'orange' : 'gray' }}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={{ height: 50, width: 50, margin: 5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('icons/ic_star.png')}
          style={{ flex: 1, tintColor: star2 ? 'orange' : 'gray' }}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={{ height: 50, width: 50, margin: 5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('icons/ic_star.png')}
          style={{ flex: 1, tintColor: star3 ? 'orange' : 'gray' }}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={{ height: 50, width: 50, margin: 5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('icons/ic_star.png')}
          style={{ flex: 1, tintColor: star4 ? 'orange' : 'gray' }}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={{ height: 50, width: 50, margin: 5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('icons/ic_star.png')}
          style={{ flex: 1, tintColor: star5 ? 'orange' : 'gray' }}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

RatingStarView.defaultProps = {
  onStar1: () => {},
  onStar2: () => {},
  onStar3: () => {},
  onStar4: () => {},
  onStar5: () => {},
  disabled: false,
}

RatingStarView.propTypes = {
  onStar1: PropTypes.func,
  onStar2: PropTypes.func,
  onStar3: PropTypes.func,
  onStar4: PropTypes.func,
  onStar5: PropTypes.func,
  disabled: PropTypes.bool,
}
