import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import Moment from 'moment/min/moment-with-locales'

import PrimaryButton from 'components/atom/primaryButton'
import TextInputFloat from 'components/atom/textInputFloat'
import TextButton from 'components/atom/textButton'
import DefaultHeader from 'components/molecules/defaultHeader'
import CustomLeftCheckAccordion from 'components/atom/customLeftCheckAccordion'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import CustomPickerButton from 'components/molecules/customPickerButton'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'

import { Flex, Colors, Row, Margin, Fonts, Background, Padding } from 'theme'

import { SvgXml } from 'react-native-svg'

import backIcon from 'icons/ic-back.svg'
import caret from 'icons/ic-CTADown.svg'

export default function MyOrderCancelScreen({
  onIconLeftPress,
  title,
  termsModalTitle,
  termsModalItems,
  reason1Label,
  reason2Label,
  reason3Label,
  bsBank,
  bankLabel,
  actionLabel,
  onPressTitle,
  topRightBottomSheetTitle,
}) {
  const [modalTerms, changeModalTerms] = useState(false)
  const [bankName, setBankName] = useState('BCA')

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <DefaultHeader
        isBlack
        border={true}
        title={`${title}`}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Background.bg_light_grey }}>
          <View
            style={{
              ...Background.bg_white,
              ...Padding.pv_16,
              ...Padding.ph_16,
            }}
          >
            <CustomLeftCheckAccordion
              renderHeader={() => {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...Fonts.f_12 }}>{reason1Label}</Text>
                    </View>
                  </View>
                )
              }}
            />
            <CustomLeftCheckAccordion
              renderHeader={() => {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...Fonts.f_12 }}>{reason2Label}</Text>
                    </View>
                  </View>
                )
              }}
            />
            <CustomLeftCheckAccordion
              renderHeader={() => {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...Fonts.f_12 }}>{reason3Label}</Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Padding.pv_16,
              ...Padding.ph_16,
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.mh_16, ...Margin.mb_8 }}>
              {bankLabel}
            </Text>
            <View
              style={{
                ...Style.pickerWrapper,
                ...Margin.mh_16,
                paddingTop: 10,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => bsBank.open()}
                style={{ flexDirection: 'row', height: 30 }}
              >
                <View style={{ width: '95%' }}>
                  <Text>{bankName}</Text>
                </View>

                <View>
                  <SvgXml xml={caret} width={16} height={16} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...Margin.mt_8,
                ...Padding.ph_16,
                flexDirection: 'column',
                ...Background.bg_white,
              }}
            >
              <TextInputFloat
                placeholder={'Account Number'}
                value={''}
                maxLength={12}
                numberOfLines={1}
                placeholderTextColor={Colors.grey}
              />
            </View>
            <View
              style={{
                ...Margin.mt_8,
                ...Padding.ph_16,
                flexDirection: 'column',
                ...Background.bg_white,
              }}
            >
              <TextInputFloat
                placeholder={'Account Name'}
                value={''}
                maxLength={12}
                numberOfLines={1}
                placeholderTextColor={Colors.grey}
              />
            </View>
          </View>
          <ModalTermsAndCondition
            title={termsModalTitle}
            modalVisible={modalTerms}
            changeModalVisible={changeModalTerms}
            items={termsModalItems}
          />
          <CustomBottomSheet
            title={bsBank}
            botSheetRef={(ref) => (bsBank = ref)}
            // rightText={() => renderRightText(1)}
            bsHeight="25%"
            topRightComponent={() => (
              <TextButton
                style={{ ...Fonts.f_10 }}
                text={topRightBottomSheetTitle}
                onPress={() => bsBank.close()}
              />
            )}
          >
            <CustomPickerButton
              initalItem={bankName}
              onPress={(i, item) => {
                setBankName(item)
                onPressTitle(i, item)
                bsBank.close()
              }}
              datasource={['BCA', 'Mandiri']}
            />
          </CustomBottomSheet>
          {/* <CustomBottomSheet
            rightText={() => renderRightText(1)}
            title={paymentDetailLabel}
            botSheetRef={(ref) => (bsPaymentDetail = ref)}
          >
            <View style={{ justifyContent: 'center', ...Padding.ph_20 }}>
              <PaymentDetailContent
                items={[
                  ...[
                    {
                      name: item.cardTitle,
                      total: item.discountedPrice || item.priceAmount,
                    },
                  ],
                  ...additionalItems,
                ]}
                totalAmount={totalAmount}
              />
            </View>
          </CustomBottomSheet> */}
        </ScrollView>
        <View style={{ ...Padding.ph_16 }}>
          <PrimaryButton style={{ ...Margin.mv_16 }} text={actionLabel} />
        </View>
      </View>
    </View>
  )
}

MyOrderCancelScreen.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Order Detail',
  reason1Label: 'I found better price',
  reason2Label: 'My trip is cancelled',
  reason3Label: 'Another reason',
  bsBank: 'Bank Tujuan',
  bankName: 'Bank Tujuan',
  bankLabel: 'Input bank refund account',
  topRightBottomSheetTitle: 'Done',
  onPressTitle: () => {},
  actionLabel: 'Send',
  noReservasiTitle: 'Reservation Number',
  priceLabel: 'Price Detail',
  termsModalTitle: 'Syarat dan Ketentuan Sewa',
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
  paymentDetailItems: [
    ...[
      {
        name: 'TOYOTA ALPHARD',
        total: 1000000,
      },
    ],
  ],
  styleMultiOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_3_2_5,
  },
  styleOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_2_7_5,
  },
  totalAmount: 500000,
  changeTotalAmount: () => {},
}

MyOrderCancelScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  helpCenterLabel: PropTypes.string,
  additionalLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  reason1Label: PropTypes.string,
  reason2Label: PropTypes.string,
  reason3Label: PropTypes.string,
  bsBank: PropTypes.string,
  bankName: PropTypes.string,
  bankLabel: PropTypes.string,
  onPressTitle: PropTypes.func,
  topRightBottomSheetTitle: PropTypes.string,
  item: PropTypes.shape({}),
  noReservasiTitle: PropTypes.string,
  termsModalTitle: PropTypes.string,
  termsModalItems: PropTypes.arrayOf(PropTypes.shape({})),
  additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeAdditionalItems: PropTypes.func,
  paymentDetailItems: PropTypes.arrayOf(PropTypes.shape({})),
  onPressItem: PropTypes.func,
  totalAmount: PropTypes.number,
  changeTotalAmount: PropTypes.func,
  actionLabel: PropTypes.string,
  styleMultiOrder: PropTypes.shape({}),
  styleOrder: PropTypes.shape({}),
}

const Style = {
  pickerWrapper: {
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerIcon: {
    color: '#e74c3c',
    position: 'absolute',
    bottom: 15,
    right: 10,
    fontSize: 20,
  },

  pickerContent: {
    color: '#a0a4a8',
    backgroundColor: 'transparent',
    width: '100%',
  },
}
