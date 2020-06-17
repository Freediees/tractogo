import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, View, ScrollView, Text } from 'react-native'

import CardOrder from 'components/atom/cardOrder'
import DefaultHeader from 'components/molecules/defaultHeader'
import Separator from 'components/atom/separator'
import CustomBorderlessAccordion from 'components/atom/customBorderlessAccordion'
import DetailInfoSection from 'components/molecules/detailInfoSection'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import ModalOrderCancelConfirm from 'components/molecules/modalOrderCancelConfirm'
import PaymentDetailContent from 'components/molecules/paymentDetailContent'
import ContactCenterSection from 'components/molecules/contactCenterSection'

import { Colors, Flex, Row, Margin, Fonts, Background, Padding } from 'theme'

import { SvgXml } from 'react-native-svg'

import backIcon from 'icons/ic-back.svg'
import icCancel from 'icons/ic-cancel.svg'

export default function DetailItemMyOrder({
  onIconLeftPress,
  title,
  item,
  helpCenterLabel,
  termsModalTitle,
  termsModalItems,
  additionalItems,
  changeAdditionalItems,
  totalAmount,
  changeTotalAmount,
  noReservasiTitle,
  priceLabel,
  paymentDetailItems,
  actionLabel,
  onPressAction,
  styleMultiOrder,
  styleOrder,
}) {
  const [modalTerms, changeModalTerms] = useState(false)
  const [modalCancel, changeModalCancel] = useState(false)

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
            <CardOrder
              onPress={item.onPressDetail}
              cardTitle={item.cardTitle}
              style={item.details.length > 1 ? styleMultiOrder : styleOrder}
              city={item.placeLabel}
              startDate={item.startDate}
              endDate={item.endDate}
              rentHour={item.rentHour}
              rentHourSuffix={item.rentHourSuffix}
              totalAmount={item.totalAmount}
              carName={item.carName}
              noReservasiLabel={item.noReservasiLabel}
              orderCount={item.details.length}
              paymentStatusLabel={item.paymentStatusLabel}
              paymentStatusId={item.paymentStatusId}
              countDown={item.countDown}
              icCarRental={item.icCarRental}
              isMultiOrder={item.details.length > 1}
            />
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mv_4,
              ...Margin.mh_4,
              ...Padding.pv_12,
            }}
          >
            <View style={{ ...Flex.flex_row, ...Margin.mh_16 }}>
              <Text style={{ ...Fonts.f_12 }}>{item.paymentStatusLabel}</Text>
            </View>
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mh_4,
            }}
          >
            <View style={{ ...Flex.flex_row, ...Margin.mv_12, ...Margin.mh_16 }}>
              <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{noReservasiTitle}</Text>
            </View>
            <Separator style={{ ...Margin.mv_4 }} />
            <DetailInfoSection
              title={item.noReservasiLabel}
              notes={item.eReceipt !== null && 'Lihat e-reciept'}
              onPress={() => changeModalTerms(true)}
            />
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mt_4,
              ...Margin.mh_4,
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
              ...Padding.ph_20,
              ...Background.bg_white,
            }}
          >
            <PaymentDetailContent items={paymentDetailItems} totalAmount={totalAmount} />
          </View>
          <View style={{ flex: 1, ...Margin.mt_4 }}>
            <CustomBorderlessAccordion title={helpCenterLabel}>
              <ContactCenterSection
                noPesananLabel={item.noReservasiLabel}
                onPressFaq={() => changeModalTerms(true)}
                phoneNumber={0}
              />
            </CustomBorderlessAccordion>
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mv_8,
              ...Margin.mh_4,
              ...Padding.pv_12,
            }}
          >
            <TouchableHighlight
              underlayColor={Colors.light_grey}
              onPress={() => changeModalCancel(true)}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <View style={{ ...Flex.f_1, ...Margin.mh_16, ...Margin.mv_8 }}>
                  <SvgXml xml={icCancel} width={20} height={20} />
                </View>
                <Text style={{ ...Fonts.f_12, ...Fonts.text_red }}>{actionLabel}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <ModalTermsAndCondition
            title={termsModalTitle}
            modalVisible={modalTerms}
            changeModalVisible={changeModalTerms}
            items={termsModalItems}
          />
          <ModalOrderCancelConfirm
            modalVisible={modalCancel}
            changeModalVisible={changeModalCancel}
            onCancelPress={onPressAction}
          />
        </ScrollView>
      </View>
    </View>
  )
}

DetailItemMyOrder.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Order Detail',
  helpCenterLabel: 'Help Center',
  additionalLabel: 'Additional',
  actionLabel: 'Cancel Order',
  noReservasiTitle: 'Reservation Number',
  priceLabel: 'Price Detail',
  item: {
    cardTitle: 'Sewa Mobil - Dengan Sopir',
    city: 'Bandung',
    startDate: new Date(),
    endDate: new Date().getTime() + 86400000,
    rentHour: 12,
    rentHourSuffix: 'Jam',
    noReservasiLabel: '1234567',
    totalAmount: 500000,
    carName: 'TOYOTA ALPHARD',
    showMoreLabel: 'Show More 3 Orders',
    paymentStatusLabel: 'Payment Success',
    orderStatusLabel: 'Penjemputan Pada Tanggal 20',
    countDownLabel: '42:05',
    icOptions: require('icons/ic-options.png'),
    paymentStatusId: 1,
    isMultiOrder: false,
    style: {
      flex: 1,
      ...Row.row_2_2_5,
    },
  },
  onPressAction: () => {},
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

DetailItemMyOrder.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  helpCenterLabel: PropTypes.string,
  additionalLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  item: PropTypes.shape({}),
  noReservasiTitle: PropTypes.string,
  termsModalTitle: PropTypes.string,
  termsModalItems: PropTypes.arrayOf(PropTypes.shape({})),
  additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeAdditionalItems: PropTypes.func,
  paymentDetailItems: PropTypes.arrayOf(PropTypes.shape({})),
  onPressAction: PropTypes.func,
  totalAmount: PropTypes.number,
  changeTotalAmount: PropTypes.func,
  actionLabel: PropTypes.string,
  styleMultiOrder: PropTypes.shape({}),
  styleOrder: PropTypes.shape({}),
}
