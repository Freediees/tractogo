/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, Clipboard, Image } from 'react-native'
import OTPInput from 'components/atom/oTPInput'
import TextButton from 'components/atom/textButton'
import SecondaryButton from 'components/atom/secondaryButton'
import CustomAccordionCard from 'components/atom/customAccordionCard'
import Separator from 'components/atom/separator'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import Moment from 'moment'
import { LabelNumberFormat } from 'function/numberFormat'

import CountDown from 'react-native-countdown-component'

import { Column, Margin, Fonts, Background, Padding } from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function PaymentSuccessScreen({
  onIconLeftPress,
  onButtonPress,
  onCopyPress,
  accountImage,
  accountImageUri,
  accountNumberLabel,
  accountNumber,
  accountNameLabel,
  accountName,
  totalAmountLabel,
  totalAmount,
  orderNumberLabel,
  orderNumber,
  howToLabel,
  howToItems,
  notes,
  buttonLabel,
  timer,
  timerLabel,
  timerDate,
  title,
  copyLabel,
  isTimerRunning,
}) {
  const [timerID, setTimerID] = useState('1')

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <DefaultHeader
        border={true}
        title={title}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          ...Margin.mt_8,
          ...Background.bg_ice_blue,
        }}
      >
        {isTimerRunning ? (
          <View style={{ flexDirection: 'column', ...Padding.pv_8 }}>
            <CountDown
              id={timerID}
              until={timer}
              onFinish={() => {
                setIsTimerRunning(false)
              }}
              size={16}
              digitStyle={{ ...Background.bg_ice_blue }}
              separatorStyle={{ color: '#000000' }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ h: null, m: null, s: null }}
              showSeparator
              running={isTimerRunning}
            />
            <Text>{`${timerLabel}${Moment(timerDate).format('MMMM DD, YYYY')}`}</Text>
          </View>
        ) : (
          <Text style={{ ...Fonts.f_12, ...Fonts.bold }}>{'Payment Time is over'}</Text>
        )}
      </View>
      <View style={{ flex: 9, ...Background.bg_light_grey }}>
        <ScrollView>
          {accountNumber && accountNumber !== '' ? (
            <View
              style={{
                ...Background.bg_white,
                flexDirection: 'row',
                ...Padding.ph_20,
                ...Padding.pv_20,
                ...Margin.mt_8,
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flex: 8,
                }}
              >
                {accountImageUri && (
                  <Image
                    source={accountImageUri ? { uri: accountImageUri } : accountImage}
                    style={{
                      height: 40,
                      width: 65,
                      resizeMode: 'contain',
                      flex: 1,
                    }}
                  />
                )}
                <Text style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey, ...Margin.mt_8 }}>
                  {accountNumberLabel}
                </Text>
                <Text
                  style={{ ...Fonts.f_16, ...Fonts.text_black, ...Fonts.semibold, ...Margin.mt_4 }}
                >
                  {accountNumber}
                </Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <SecondaryButton
                  isOrange={true}
                  text={copyLabel}
                  onPress={() => Clipboard.setString(accountNumber)}
                />
              </View>
            </View>
          ) : null}
          {accountName && accountName !== '' && (
            <View
              style={{
                flexDirection: 'column',
                ...Padding.ph_20,
                ...Padding.pv_20,
                ...Margin.mt_8,
                ...Background.bg_white,
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  ...Padding.pv_8,
                }}
              >
                <Text style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey, ...Margin.mt_8 }}>
                  {accountNameLabel}
                </Text>
                <Text
                  style={{ ...Fonts.f_12, ...Fonts.text_black, ...Fonts.semibold, ...Margin.mt_4 }}
                >
                  {accountName}
                </Text>
              </View>
              <Separator styler={{ width: '100%' }} />
              <View
                style={{
                  flexDirection: 'column',
                  ...Padding.pv_8,
                }}
              >
                <Text style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey, ...Margin.mt_8 }}>
                  {totalAmountLabel}
                </Text>
                <LabelNumberFormat
                  number={totalAmount}
                  style={{ ...Fonts.f_12, ...Fonts.text_black, ...Fonts.semibold, ...Margin.mt_4 }}
                />
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: 'column',
              ...Background.bg_white,
              ...Padding.ph_20,
              ...Padding.pv_20,
              ...Margin.mt_8,
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey, ...Margin.mt_8 }}>
              {orderNumberLabel}
            </Text>
            <Text style={{ ...Fonts.f_12, ...Fonts.text_black, ...Fonts.semibold, ...Margin.mt_4 }}>
              {orderNumber}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              ...Background.bg_white,
              ...Padding.pv_20,
              ...Padding.ph_20,
              ...Margin.mt_8,
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey, ...Margin.mb_20 }}>
              {howToLabel}
            </Text>
            {howToItems &&
              howToItems.map((v, i) => {
                return (
                  <View key={`accordion-${i}`} style={{ ...Margin.mv_8 }}>
                    <CustomAccordionCard title={v.title}>
                      <View style={{ marginTop: 16 }}>
                        <Text style={{ ...Fonts.f_10 }}>{v.description}</Text>
                      </View>
                    </CustomAccordionCard>
                  </View>
                )
              })}
            <View
              style={{
                ...Padding.ph_20,
                ...Margin.mt_20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, textAlign: 'center' }}>
                {notes}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={buttonLabel} onButtonPress={onButtonPress} />
      </View>
    </View>
  )
}

PaymentSuccessScreen.defaultProps = {
  onIconLeftPress: () => {},
  onButtonPress: () => {},
  onCopyPress: () => {},
  accountImage: null,
  accountImageUri: null,
  accountNumberLabel: 'Bank Account Number',
  accountNumber: '12345678912345678',
  accountNameLabel: 'Bank Account Name',
  accountName: 'Trac Astra',
  totalAmountLabel: 'Total',
  totalAmount: 720000,
  orderNumberLabel: 'Nomor Order',
  orderNumber: '123637484936392729373902',
  howToLabel: 'How To Do Payment',
  howToItems: [
    {
      title: 'ATM Machine',
      description:
        'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
        'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
        'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
    },
    {
      title: 'Mobile Banking',
      description:
        'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
        'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
        'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
    },
  ],
  notes:
    'Setelah pembayaran Anda tertonfirmasi, kami akan mengirimkan bukti transaksi ke alamat email anda (yogapradana@gmail.com)',
  buttonLabel: 'Check Status',
  timer: 3600,
  title: 'Payment',
  timerLabel: 'Mohon dibayar sebelum ',
  timerDate: new Date(),
  copyLabel: 'Copy',
  isTimerRunning: false,
}

PaymentSuccessScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  onCopyPress: PropTypes.func,
  accountImage: PropTypes.string,
  accountImageUri: PropTypes.string,
  accountNumberLabel: PropTypes.string,
  accountNumber: PropTypes.string,
  accountNameLabel: PropTypes.string,
  accountName: PropTypes.string,
  totalAmountLabel: PropTypes.string,
  totalAmount: PropTypes.number,
  orderNumberLabel: PropTypes.string,
  orderNumber: PropTypes.string,
  howToLabel: PropTypes.string,
  howToItems: PropTypes.arrayOf(PropTypes.shape({})),
  notes: PropTypes.string,
  buttonLabel: PropTypes.string,
  timer: PropTypes.number,
  title: PropTypes.string,
  timerLabel: PropTypes.string,
  timerDate: PropTypes.date,
  copyLabel: PropTypes.string,
  isTimerRunning: PropTypes.bool,
}
