import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text } from 'react-native'
import Moment from 'moment/min/moment-with-locales'

import CardItem from 'components/atom/cardItem'
import IconButton from 'components/atom/iconButton'
import DefaultHeader from 'components/molecules/defaultHeader'
import RatingStarView from 'components/molecules/ratingStarView'
import Separator from 'components/atom/separator'
import CustomBorderlessAccordion from 'components/atom/customBorderlessAccordion'
import DetailInfoSection from 'components/molecules/detailInfoSection'
import PersonInfoView from 'components/molecules/personInfoView'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import ContactDriverCenter from 'components/molecules/contactDriverCenter'
import ContactCenterSection from 'components/molecules/contactCenterSection'
import CustomLocationInformationCard from 'components/atom/customLocationInformationCard'
import TimelineMolecule from 'components/molecules/timelineMolecule'
import DatePickupView from 'components/molecules/datePickupView'

import { Flex, Row, Margin, Fonts, Background, Padding, Colors } from 'theme'

import { SvgXml } from 'react-native-svg'

import backIcon from 'icons/ic-back.svg'
import ctaIcon from 'icons/ic-CTA.svg'
import icCancel from 'icons/ic-cancel.svg'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default function DetailItemOrderProgress({
  onIconLeftPress,
  onRatingPress,
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
  onPressPickUpCTA,
  pickupLocationLabel,
  pickUpLocations,
  personDataTitle,
  passengers,
  reservation,
  titleLabel,
  infoLabel,
  currentActivity,
}) {
  const [modalTerms, changeModalTerms] = useState(false)
  const [selectedIndex, changeSelectedIndex] = useState(0)

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
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 10 }}>
              <CardItem
                style={{ ...Margin.mt_4, ...Background.bg_light_grey }}
                cardTitle={item[selectedIndex].item.UnitTypeName}
                seatAmount={item[selectedIndex].seatAmount}
                seatLabel={item[selectedIndex].seatLabel}
                driverLabel={item[selectedIndex].driverLabel}
                suitcaseAmount={item[selectedIndex].suitcaseAmount}
                suitcaseLabel={item[selectedIndex].suitcaseLabel}
                basePriceLabel={item[selectedIndex].basePriceLabel}
                priceAmount={item[selectedIndex].priceAmount}
                priceUnit={item[selectedIndex].priceUnit}
                totalLabel={item[selectedIndex].totalLabel}
                itemImage={item[selectedIndex].itemImage}
                quality={item[selectedIndex].quality}
                isAssurance={item[selectedIndex].isAssurance}
                noBorderTop={true}
                isDriver={item[selectedIndex].IsWithDriver === '1'}
                uriImage={item[selectedIndex].uriImage}
                duration={item[selectedIndex].duration}
                discountedPrice={item[selectedIndex].discountedPrice}
                discountPercent={item[selectedIndex].discountPercent}
              />
            </View>
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mt_4,
              ...Margin.mh_4,
            }}
          >
            <TimelineMolecule stepCount={5} currentPosition={currentActivity}>
              <View style={{ width: '100%', alignItems: 'center', padding: 8 }}>
                <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>
                  {item[selectedIndex].activityName}
                </Text>
                <Text style={{ ...Fonts.f_10, ...Margin.mt_4 }}>
                  {item[selectedIndex].cardTitle}
                </Text>
                {item[selectedIndex].activityStatus === 5 ? (
                  <TouchableHighlight
                    underlayColor={Colors.light_grey}
                    style={{
                      ...Padding.pv_20,
                      ...Padding.ph_20,
                    }}
                    onPress={() => onRatingPress(selectedIndex)}
                  >
                    <RatingStarView disabled={true} />
                  </TouchableHighlight>
                ) : (
                  <View />
                )}
              </View>
            </TimelineMolecule>
          </View>
          {item[selectedIndex].licensePlate !== '' && (
            <View
              style={{
                ...Background.bg_white,
                ...Margin.mt_4,
                ...Margin.mh_4,
              }}
            >
              <ContactDriverCenter
                driverNameValue={item[selectedIndex].driver}
                plateNumberValue={item[selectedIndex].licensePlate}
              />
            </View>
          )}
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mt_4,
              ...Margin.mh_4,
              ...Padding.ph_8,
            }}
          >
            <DatePickupView
              title={'Tanggal Mulai dan selesai'}
              startDateValue={Moment(item[selectedIndex].startDate).format('DD MMMM YYYY')}
              endDateValue={Moment(item[selectedIndex].endDate).format('DD MMMM YYYY')}
              packageStartValue={item[selectedIndex].duration}
              packageEndValue={item[selectedIndex].duration}
            />
          </View>
          <View
            style={{
              ...Margin.mv_4,
              width: '100%',
              ...Background.bg_white,
            }}
          >
            <CustomLocationInformationCard
              title={pickupLocationLabel}
              style={{ ...Margin.mt_8 }}
              timeString={Moment(item[selectedIndex].pickupLocations.Time).format('HH:mm')}
              dateString={Moment(item[selectedIndex].pickupLocations.Time).format(
                'dddd, DD MMMM YYYY'
              )}
              locationName={item[selectedIndex].pickupLocations.Alamat}
            />
          </View>
          <View style={{ ...Margin.mb_4, ...Background.bg_white }}>
            <PersonInfoView
              style={{
                ...Padding.ph_16,
              }}
              title={personDataTitle}
              personName={item[selectedIndex].passenger.Name}
              personEmail={item[selectedIndex].passenger.Email}
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
            topRightComponent={() => renderRightText(1)}
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

DetailItemOrderProgress.defaultProps = {
  onIconLeftPress: () => {},
  onRatingPress: () => {},
  title: 'Order Detail',
  helpCenterLabel: 'Help Center',
  additionalLabel: 'Additional',
  actionLabel: 'Cancel Order',
  noReservasiTitle: 'Reservation Number',
  priceLabel: 'Price Detail',
  pickUpLocations: [
    {
      date: new Date(),
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: 'Jl. Dago no. 28',
        lat: -6.2,
        lon: 106.816666,
      },
    },
    {
      date: new Date().getTime() + 86400000,
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      },
    },
    {
      date: new Date().getTime() + 86400000 * 2,
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      },
    },
    {
      date: new Date().getTime() + 86400000 * 3,
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      },
    },
    {
      date: new Date().getTime() + 86400000 * 4,
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      },
    },
  ],
  item: {
    onPress: () => {},
    cardTitle: 'TOYOTA ALPHARD',
    seatAmount: 5,
    seatLabel: 'Seat',
    driverLabel: 'Driver',
    suitcaseAmount: 3,
    suitcaseLabel: 'Suitcase',
    basePriceLabel: 'Basic Price',
    priceAmount: 1000000,
    priceUnit: ' / Hari',
    totalLabel: ' Total',
    isAssurance: true,
    assuranceLabel: 'Vehicle Insurance',
    quality: 'vehicle age < 4 years',
    itemImage: require('images/alphard-11.png'),
  },
  reservation: {},
  passengers: {
    personName: 'Ferdi',
    personEmail: 'test@,gmail.com',
  },
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
  totalAmount: 500000,
  changeTotalAmount: () => {},
  onPressPickUpCTA: () => {},
  personDataTitle: 'Passanger Data',
  pickupLocationLabel: 'Pick-up location',
  pickUpLocationDescription: 'Masukkan detail lokasi penjemputan',
}

DetailItemOrderProgress.propTypes = {
  onIconLeftPress: PropTypes.func,
  onRatingPress: PropTypes.func,
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
