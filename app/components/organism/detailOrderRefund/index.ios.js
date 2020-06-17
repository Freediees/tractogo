import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text } from 'react-native'
import Moment from 'moment/min/moment-with-locales'

import CardSimpleOrder from 'components/atom/cardSimpleOrder'
import DefaultHeader from 'components/molecules/defaultHeader'
import Separator from 'components/atom/separator'
import CustomBorderlessAccordion from 'components/atom/customBorderlessAccordion'
import DetailInfoSection from 'components/molecules/detailInfoSection'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import ContactCenterSection from 'components/molecules/contactCenterSection'
import TimelineMolecule from 'components/molecules/timelineMolecule'

import { Flex, Row, Margin, Fonts, Background, Padding } from 'theme'

import { SvgXml } from 'react-native-svg'

import backIcon from 'icons/ic-back.svg'
import icCancel from 'icons/ic-cancel.svg'

export default function DetailOrderRefund({
  onIconLeftPress,
  title,
  item,
  helpCenterLabel,
  termsModalTitle,
  termsModalItems,
  noReservasiTitle,
  noReservasiValue,
  reservation,
  styleOrder,
  styleMultiOrder,
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
              ...Padding.ph_16,
              ...Padding.pv_8,
            }}
          >
            <CardSimpleOrder
              onPress={item.onPressDetail}
              cardTitle={item.cardTitle}
              style={styleOrder}
              city={item.placeLabel}
              startDate={item.startDate}
              endDate={item.endDate}
              rentHour={item.rentHour}
              rentHourSuffix={item.rentHourSuffix}
              totalAmount={item.totalAmount}
              carName={item.carName}
              noReservasiLabel={item.noReservasiLabel}
              orderCount={3}
              paymentStatusLabel={item.paymentStatusLabel}
              paymentStatusId={item.paymentStatusId}
              countDown={item.countDown}
              icCarRental={item.icCarRental}
              isMultiOrder={false}
            />
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mt_4,
              ...Margin.mh_4,
            }}
          >
            <View style={{ ...Flex.flex_row, ...Margin.mv_12, ...Margin.mh_16 }}>
              <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{noReservasiTitle}</Text>
            </View>
            <Separator style={{ ...Margin.mv_4 }} />
            <TimelineMolecule direction='vertical' />
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mh_4,
              ...Margin.mv_4,
            }}
          >
            <View style={{ ...Flex.flex_row, ...Margin.mv_12, ...Margin.mh_16 }}>
              <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{noReservasiTitle}</Text>
            </View>
            <Separator style={{ ...Margin.mv_4 }} />
            <View style={{ ...Flex.flex_row, ...Margin.mh_16, ...Padding.pv_8 }}>
              <Text style={{ ...Fonts.f_12 }}>{noReservasiValue}</Text>
            </View>
            <Separator style={{ ...Margin.mv_4 }} />
            <DetailInfoSection
              title={item.noReservasiLabel}
              notes={item.eReceipt !== null && 'Lihat e-reciept'}
              onPress={() => changeModalTerms(true)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomBorderlessAccordion title={helpCenterLabel}>
              <ContactCenterSection noPesananLabel={reservation.noReservasiLabel} />
            </CustomBorderlessAccordion>
          </View>
          <ModalTermsAndCondition
            title={termsModalTitle}
            modalVisible={modalTerms}
            changeModalVisible={changeModalTerms}
            items={termsModalItems}
          />
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
      </View>
    </View>
  )
}

DetailOrderRefund.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Order Detail',
  helpCenterLabel: 'Help Center',
  additionalLabel: 'Additional',
  actionLabel: 'Cancel Order',
  noReservasiTitle: 'Reservation Number',
  noReservasiValue: 'Rsv /xxhg/83738420',
  priceLabel: 'Price Detail',
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
  reservation: {},
  styleMultiOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_2,
  },
  styleOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_2,
  },
}

DetailOrderRefund.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  helpCenterLabel: PropTypes.string,
  additionalLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  personDataTitle: PropTypes.string,
  pickUpLocations: PropTypes.arrayOf(PropTypes.shape({})),
  item: PropTypes.shape({}),
  reservation: PropTypes.shape({}),
  passengers: PropTypes.shape({}),
  noReservasiTitle: PropTypes.string,
  noReservasiValue: PropTypes.string,
  termsModalTitle: PropTypes.string,
  termsModalItems: PropTypes.arrayOf(PropTypes.shape({})),
  additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeAdditionalItems: PropTypes.func,
  paymentDetailItems: PropTypes.arrayOf(PropTypes.shape({})),
  totalAmount: PropTypes.number,
  changeTotalAmount: PropTypes.func,
  actionLabel: PropTypes.string,
  onPressPickUpCTA: PropTypes.func,
  pickupLocationLabel: PropTypes.string,
  pickUpLocationDescription: PropTypes.string,
}
