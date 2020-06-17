import React, { useState } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import backIcon from 'icons/ic-back.svg'

import Separator from 'components/atom/separator'
import CustomCheckPayment from 'components/atom/customCheckPayment'
import DefaultHeader from 'components/molecules/defaultHeader'
import VirtualAccountList from 'components/molecules/virtualAccountList'
import Spinner from 'react-native-loading-spinner-overlay'

import { responsiveWidth as wp } from 'react-native-responsive-dimensions'
import { Background, Fonts, Padding } from 'theme'
import CreditCardList from 'components/molecules/creditCardList'

export default function PaymentScreen({
  titleHeader,
  title,
  submitLabel,
  datasource,
  onIconLeftPress,
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
  selectedBank,
  changeSelectedBank,
  selectedVA,
  changeSelectedVA,
  bankData,
  vaData,
  onSaveCreditCard,
  onSaveBank,
  onSaveVA,
  isLoading,
}) {
  const [selectedIndex, changeSelectedIndex] = useState(-1)
  const [selectedItem, changeChecked] = useState(false)

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          ...Background.bg_white,
          width: wp(100),
          ...Padding.ph_16,
          ...Padding.pv_16,
        }}
      >
        <CustomCheckPayment
          key={index}
          paymentLabel={item.payment}
          renderContent={() => {
            if (item.payment === 'Credit Card') {
              return (
                <CreditCardList
                  cardNo={cardNo}
                  changeCardNo={changeCardNo}
                  cardName={cardName}
                  changeCardName={changeCardName}
                  month={month}
                  changeMonth={changeMonth}
                  year={year}
                  changeYear={changeYear}
                  cvv={cvv}
                  changeCvv={changeCvv}
                  onPress={onSaveCreditCard}
                />
              )
            } else if (item.payment === 'Virtual Account') {
              return (
                <VirtualAccountList
                  bankSelected={selectedBank}
                  changeSelectedPress={changeSelectedBank}
                  datasource={bankData}
                  onPress={onSaveBank}
                />
              )
            } else if (item.payment === 'Wallet') {
              return (
                <VirtualAccountList
                  bankSelected={selectedVA}
                  changeSelectedPress={changeSelectedVA}
                  datasource={vaData}
                  onPress={onSaveVA}
                />
              )
            }
            return item.content
          }}
          onChecklistPress={() => {
            changeSelectedIndex(index)
            changeChecked(!selectedItem)
          }}
          checked={selectedIndex === index}
        />
      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Spinner visible={isLoading} textContent={'Loading...'} />
      <DefaultHeader
        isBlack
        border={true}
        title={titleHeader}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View
        style={{
          alignItems: 'center',
          flex: 9,
          ...Padding.pb_8,
          ...Background.bg_light_grey,
        }}
      >
        <View
          style={{
            ...Background.bg_white,
            width: wp(100),
            ...Padding.ph_16,
            ...Padding.pv_16,
          }}
        >
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{title}</Text>
        </View>
        <Separator />
        {datasource.map((item, i) => {
          return renderItem(item, i)
        })}
      </View>
    </View>
  )
}

PaymentScreen.defaultProps = {
  titleHeader: 'Payment',
  title: 'Choose Payment Method',
  submitLabel: 'SIMPAN',
  datasource: [
    {
      payment: 'Credit Card',
    },
    {
      payment: 'Virtual Account',
    },
    {
      payment: 'Wallet',
      selected: false,
    },
  ],
  vaData: [
    {
      bankid: 'Link Aja',
      image: require('icons/ic-linkaja.png'),
    },
    {
      bankid: 'OVO',
      image: require('icons/ic-ovo.png'),
    },
    {
      bankid: 'DANA',
      image: require('icons/ic-dana.png'),
    },
  ],
  bankData: [
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
  selectedBank: '',
  changeSelectedBank: () => {},
  selectedVA: '',
  changeSelectedVA: () => {},
  onSaveCreditCard: () => {},
  onSaveBank: () => {},
  onSaveVA: () => {},
  isLoading: true,
}

PaymentScreen.propTypes = {
  onIconLeftPress: () => {},
  titleHeader: PropTypes.string,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  datasource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
  selectedBank: PropTypes.string,
  changeSelectedBank: PropTypes.func,
  selectedVA: PropTypes.string,
  changeSelectedVA: PropTypes.string,
  bankData: PropTypes.arrayOf(PropTypes.shape({})),
  vaData: PropTypes.arrayOf(PropTypes.shape({})),
  onSaveCreditCard: PropTypes.func,
  onSaveBank: PropTypes.func,
  onSaveVA: PropTypes.func,
  isLoading: PropTypes.bool,
}
