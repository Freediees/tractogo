import React from 'react'
import { View, TextInput, Text } from 'react-native'
import { Padding, Fonts, Colors, Flex, Margin, Background } from 'theme'
import PropTypes from 'prop-types'
import PrimaryButton from 'components/atom/primaryButton'
import TextInputFloat from 'components/atom/textInputFloat'

export default function CreditCardList({
  placeholderLabel,
  placeholderCardNo,
  name,
  cardNo,
  changeCardNo,
  cardName,
  changeCardName,
  month,
  changeMonth,
  year,
  changeYear,
  cvv,
  changeCvv,
  saveLabel,
  onPress,
}) {
  let yearTextInput = null
  return (
    <View style={{ width: '100%', flexDirection: 'column', ...Background.bg_white }}>
      <TextInputFloat
        placeholder={placeholderLabel}
        onChange={changeCardName}
        value={cardName}
        maxLength={12}
        numberOfLines={1}
        placeholderTextColor={Colors.grey}
      />
      <TextInputFloat
        keyboardType="numeric"
        placeholder={'Card Number'}
        placeholderTextColor="#000"
        onChange={changeCardNo}
        value={cardNo}
        maxLength={12}
        numberOfLines={1}
      />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', ...Margin.mv_20 }}>
        <View style={{ ...Flex.f_1, flexDirection: 'column' }}>
          <Text style={{ ...Fonts.text_grey, ...Margin.mb_8 }}>Masa Berlaku</Text>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TextInput
              style={{
                ...Fonts.f_12,
                borderBottomColor: Colors.grey,
                borderBottomWidth: 1,
                ...Padding.pv_8,
                ...Flex.flex_1,
                textAlign: 'center',
              }}
              keyboardType="numeric"
              placeholder={'mm'}
              maxLength={2}
              value={month}
              onChangeText={(e) => {
                console.log(e)
                if (e > 12) {
                  changeMonth(12)
                } else {
                  changeMonth(e)
                }
                if (e >= 10) {
                  yearTextInput.focus()
                }
              }}
              placeholderTextColor={Colors.grey}
            />
            <Text style={{ alignSelf: 'center', ...Fonts.text_grey }}> / </Text>
            <TextInput
              style={{
                ...Fonts.f_12,
                borderBottomColor: Colors.grey,
                borderBottomWidth: 1,
                ...Padding.pv_8,
                ...Flex.flex_1,
                textAlign: 'center',
              }}
              ref={(input) => {
                yearTextInput = input
              }}
              keyboardType="numeric"
              placeholder={'yy'}
              maxLength={2}
              value={year}
              onChangeText={changeYear}
              placeholderTextColor={Colors.grey}
            />
          </View>
        </View>
        <View style={{ ...Flex.f_2, flexDirection: 'column' }}>
          <Text style={{ ...Fonts.text_grey, ...Margin.mb_8 }}>CVV</Text>
          <TextInput
            style={{
              ...Fonts.f_12,
              borderBottomColor: Colors.grey,
              borderBottomWidth: 1,
              ...Padding.pv_8,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            placeholder={'CVV'}
            value={cvv}
            onChangeText={changeCvv}
            placeholderTextColor={Colors.grey}
            maxLength={3}
            numberOfLines={1}
          />
        </View>
      </View>
      <PrimaryButton
        style={{ justifyContent: 'center', ...Margin.mb_12, ...Margin.mt_8, height: 48, ...Padding.pv_12, ...Padding.ph_12 }}
        text={saveLabel}
        onPress={onPress}
      />
    </View>
  )
}

CreditCardList.defaultProps = {
  placeholderLabel: 'Card Holder Name', // (a, b, c) => console.log(a, b, c)
  name: '',
  placeholderCardNo: 'Card Number',
  saveLabel: 'Save',
  onPress: () => {},
  cardNo: null,
  changeCardNo: () => {},
  cardName: null,
  changeCardName: () => {},
  month: null,
  changeMonth: () => {},
  year: null,
  changeYear: () => {},
  cvv: null,
  changeCvv: () => {},
}

CreditCardList.propTypes = {
  placeholderLabel: PropTypes.string,
  name: PropTypes.string,
  placeholderCardNo: PropTypes.string,
  saveLabel: PropTypes.string,
  onPress: PropTypes.func,
  cardNo: PropTypes.string,
  changeCardNo: PropTypes.func,
  cardName: PropTypes.string,
  changeCardName: PropTypes.func,
  month: PropTypes.string,
  changeMonth: PropTypes.func,
  year: PropTypes.string,
  changeYear: PropTypes.func,
  cvv: PropTypes.string,
  changeCvv: PropTypes.func,
}
