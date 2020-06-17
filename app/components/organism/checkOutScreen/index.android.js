import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text } from 'react-native'
import { Background, Padding, Margin, Fonts, Border } from 'theme'

import backIcon from 'icons/ic-back.svg'
import Separator from 'components/atom/separator'
import CartItem from 'components/atom/cartItem'
import CheckBox from 'components/atom/checkBox'
import PrimaryButton from 'components/atom/primaryButton'

import DefaultHeader from 'components/molecules/defaultHeader'
import PaymentSelect from 'components/molecules/paymentSelect'
import VoucherFooter from 'components/molecules/voucherFooter'
import TermsAndCondition from 'components/molecules/termsAndCondition'
import PaymentDetailContent from 'components/molecules/paymentDetailContent'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import Spinner from 'react-native-loading-spinner-overlay'

// create a component
export default function CheckOutScreen({
  checkOutLabel,
  infoLabel,
  priceLabel,
  payLabel,
  cartTitle,
  city,
  startDate,
  endDate,
  rentHour,
  rentHourSuffix,
  totalAmount,
  termsModalTitle,
  termsModalItems,
  item,
  onIconLeftPress,
  onPaymentSelectPress,
  items,
  voucherValue,
  onVoucherChange,
  paymentType,
  uriImagePaymentType,
  checkVoucherPress,
  paymentPress,
  paymentDetailItems,
  voucherError,
  isLoading,
  termsChecked,
  changeChecked,
}) {
  const [modalTerms, changeModalTerms] = useState(false)

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
        title={checkOutLabel}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Background.bg_light_grey, flexGrow: 1 }}>
          <View
            style={{
              ...Padding.ph_16,
              ...Padding.pv_20,
              ...Margin.mb_8,
              ...Background.bg_white,
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.mb_16 }}>{infoLabel}</Text>
            {items.map((v, i) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <CartItem
                    key={`Cart-${i}`}
                    style={{ ...Margin.mb_8 }}
                    cardTitle={v.cartTitle}
                    city={v.city}
                    startDate={v.startDate}
                    endDate={v.endDate}
                    rentHour={v.rentHour}
                    rentHourSuffix={v.rentHourSuffix}
                    totalAmount={v.totalAmount}
                    carName={v.cardTitle}
                  />
                  {v.errors && v.errors.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'column',
                        ...Border.border_w_1,
                        ...Border.border_red,
                        ...Border.border_rad_8,
                        ...Background.bg_light_grey,
                        ...Margin.mt_8,
                        ...Padding.ph_8,
                        ...Padding.pv_8,
                      }}
                    >
                      {v.errors.map((w) => {
                        return (
                          <Text
                            key={`${v}-${w}`}
                            style={{ ...Fonts.f_10, ...Fonts.text_red, ...Margin.mt_4 }}
                          >
                            {w}
                          </Text>
                        )
                      })}
                    </View>
                  )}
                </View>
              )
            })}
          </View>
          <View
            style={{
              ...Padding.pv_20,
              ...Margin.mb_8,
              ...Background.bg_white,
            }}
          >
            <PaymentSelect
              paymentType={paymentType}
              uriImagePaymentType={uriImagePaymentType}
              onPress={onPaymentSelectPress}
            />
          </View>
          <View
            style={{
              ...Padding.pv_20,
              ...Padding.ph_16,
              ...Margin.mb_8,
              ...Background.bg_white,
            }}
          >
            <VoucherFooter
              voucherError={voucherError}
              checkVoucherPress={checkVoucherPress}
              voucherValue={voucherValue}
              onVoucherChange={onVoucherChange}
            />
          </View>
          <View
            style={{
              ...Background.bg_white,
            }}
          >
            <Text style={{ ...Padding.ph_16, ...Fonts.f_12, ...Fonts.semibold, ...Margin.mv_16 }}>
              {priceLabel}
            </Text>
            <Separator />
          </View>
          <View
            style={{
              ...Padding.pb_16,
              ...Padding.ph_16,
              ...Margin.mb_8,
              ...Background.bg_white,
            }}
          >
            <PaymentDetailContent items={paymentDetailItems} totalAmount={totalAmount} />
          </View>
          <View
            style={{
              flex: 1,
              ...Margin.mb_8,
              ...Background.bg_white,
            }}
          >
            <CheckBox
              checked={termsChecked}
              onCheck={(isCheck) => {
                changeChecked(isCheck)
              }}
              renderHeader={() => {
                return <TermsAndCondition onPress={() => changeModalTerms(true)} />
              }}
            />
          </View>
        </ScrollView>

        <ModalTermsAndCondition
          title={termsModalTitle}
          modalVisible={modalTerms}
          changeModalVisible={changeModalTerms}
          items={termsModalItems}
        />
      </View>
      <View
        style={{
          flex: 1,
          ...Margin.mv_20,
          ...Padding.ph_16,
        }}
      >
        <PrimaryButton text={payLabel} onPress={paymentPress} />
      </View>
    </View>
  )
}

CheckOutScreen.defaultProps = {
  onIconLeftPress: () => {},
  checkOutLabel: 'Check Out',
  infoLabel: 'Order Information',
  priceLabel: 'Price Detail',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Hours',
  totalAmount: 1000000,
  item: {
    onPress: () => {},
    cardTitle: 'TOYOTA ALPHARD',
    seatAmount: 5,
    seatLabel: 'Seat',
    driverLabel: 'Driver',
    suitcaseAmount: 3,
    suitcaseLabel: 'Suitcase',
    basePriceLabel: 'Harga Dasar',
    priceAmount: 1000000,
    priceUnit: ' / Hari',
    totalLabel: ' Total',
    isAssurance: true,
    assuranceLabel: 'Asuransi Kendaraan',
    quality: '< 4 tahun pemakaian',
    itemImage: require('images/alphard-11.png'),
  },
  termsCheck: false,
  termsModalTitle: 'Syarat dan Ketentuan Sewa',
  onPaymentSelectPress: () => {},
  termsModalItems: [
    {
      title: 'T & C',
      description:
        'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
        'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
        'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
    },
    {
      title: 'Asuransi',
      description:
        'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
        'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
        'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
    },
  ],
  payLabel: 'Payment',
  items: [],
  voucherValue: '',
  onVoucherChange: () => {},
  paymentType: 'Bank Transfer',
  uriImagePaymentType: '',
  checkVoucherPress: () => {},
  paymentPress: () => {},
  paymentDetailItems: [
    ...[
      {
        name: 'TOYOTA ALPHARD',
        total: 1000000,
      },
    ],
  ],
  voucherError: 'error disini',
  isLoading: false,
  termsChecked: false,
  changeChecked: () => {},
}

CheckOutScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  checkOutLabel: PropTypes.string,
  infoLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  cartTitle: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.Date,
  endDate: PropTypes.Date,
  rentHour: PropTypes.number,
  rentHourSuffix: PropTypes.string,
  termsModalTitle: PropTypes.string,
  termsModalItems: PropTypes.arrayOf(PropTypes.shape({})),
  totalAmount: PropTypes.number,
  item: PropTypes.shape({}),
  termsCheck: PropTypes.bool,
  payLabel: PropTypes.string,
  onPaymentSelectPress: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  voucherValue: PropTypes.string,
  onVoucherChange: PropTypes.func,
  paymentType: PropTypes.string,
  uriImagePaymentType: PropTypes.string,
  checkVoucherPress: PropTypes.func,
  paymentPress: PropTypes.func,
  paymentDetailItems: PropTypes.arrayOf(PropTypes.shape({})),
  voucherError: PropTypes.string,
  isLoading: PropTypes.bool,
  termsChecked: PropTypes.bool,
  changeChecked: PropTypes.func,
}
