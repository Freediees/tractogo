import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { LabelNumberFormat } from 'function/numberFormat'
import Moment from 'moment'

import CardItem from 'components/atom/cardItem'
import IconButton from 'components/atom/iconButton'
import DefaultHeader from 'components/molecules/defaultHeader'
import CustomLocationArrived from 'components/atom/customLocationArrived'
import CustomCheckAccordion from 'components/atom/customCheckAccordion'
import CustomItemContainer from 'components/atom/customItemContainer'
import Separator from 'components/atom/separator'
import CartItem from 'components/atom/cartItem'
import DefaultCTA from 'components/atom/defaultCTA'
import CustomLocationInformationCard from 'components/atom/customLocationInformationCard'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import NumberIncrement from 'components/atom/numberIncrement'
import CustomBorderlessAccordionCard from 'components/atom/customBorderlessAccordionCard'
import DetailInfoSection from 'components/molecules/detailInfoSection'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import PersonInfoPanel from 'components/molecules/personInfoPanel'
import DefaultOkCancelFooter from 'components/molecules/defaultOkCancelFooter'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import PaymentDetailContent from 'components/molecules/paymentDetailContent'
import PrimaryButton from 'components/atom/primaryButton'

import { Margin, Fonts, Background, Padding } from 'theme'

import backIcon from 'icons/ic-back.svg'
import iconCTAUp from 'icons/ic-CTAUp.svg'
import iconClose from 'icons/ic-close.svg'

import iconCallCenter from 'icons/ic-callcenter.svg'
import iconReplacement from 'icons/ic-replacement.svg'
import iconAsuransi from 'icons/ic-asuransi.svg'
import iconKetentuan from 'icons/ic-ketentuan.svg'
import iconIDCard from 'icons/ic-idcard.svg'

export default function DetailItemAirport({
  onIconLeftPress,
  title,
  city,
  subtitle,
  startDate,
  endDate,
  rentHour,
  rentHourSuffix,
  item,
  serviceInfoLabel,
  facilities,
  terms,
  termsModalTitle,
  termsModalItems,
  termsLabel,
  facilitiesLabel,
  additionalLabel,
  moreButtonLabel,
  notes,
  notesTitleLabel,
  personInfoPanelTitle,
  personName,
  personEmail,
  checklistAdditionPersonLabel,
  additionPersonName,
  additionPersonPhone,
  onCheckedAdditionPerson,
  placeholderAdditionPersonName,
  placeholderAdditionPersonPhone,
  onChangeAdditionPersonName,
  onChangeAdditionPersonPhone,
  totalLabel,
  totalAmount,
  changeTotalAmount,
  okFooterLabel,
  cancelFooterLabel,
  onOkFooterPress,
  onCancelFooterPress,
  paymentDetailLabel,
  onAddToCartPress,
  addToCartLabel,
  addToCartButtonLabel,
  cartTitle,
  pickupLocationLabel,
  pickUpLocationDescription,
  pickUpLocations,
  onPressPickUpCTA,
  dropOffLocationLabel,
  isValid,
  isFromAirport,
  gateNumber,
  flightNumber,
  onChangeGateNumber,
  onChangeFlightNumber,
  airportName,
  onChangePickupNotes,
  pickupNotes,
}) {
  const [modalTerms, changeModalTerms] = useState(false)
  let bsPaymentDetail = null
  let bsAddToCart = null

  // const calculateTotal = () => {
  // let val = parseInt(item.discountedPrice) || parseInt(item.priceAmount)
  // additionalItems.forEach((v, index) => {
  //   val = parseInt(val) + parseInt(v.total)
  // })
  // changeTotalAmount(val)
  // }

  // const changeCount = (number, index) => {
  //   let newArr = [...additionalItems]
  //   if (newArr[index].type.toLowerCase() === 'counter') {
  //     newArr[index].count = number
  //     newArr[index].total = number * newArr[index].value
  //     changeAdditionalItems(newArr)
  //     calculateTotal()
  //   } else {
  //     if (newArr[index].count === 1) newArr[index].count = 0
  //     else newArr[index].count = 1
  //     newArr[index].total = newArr[index].count * newArr[index].value
  //     changeAdditionalItems(newArr)
  //     calculateTotal()
  //   }
  // }

  const renderRightText = (bsActive) => {
    if (bsActive === 1) {
      return (
        <IconButton
          onPress={() => {
            bsPaymentDetail.close()
          }}
          height={16}
          width={16}
          svg={iconClose}
          fill={'black'}
        />
      )
    } else {
      return (
        <IconButton
          onPress={() => {
            bsAddToCart.close()
          }}
          height={16}
          width={16}
          svg={iconClose}
          fill={'black'}
        />
      )
    }
  }

  const renderItem = (item, index) => {
    if (item.type && item.type.toLowerCase() === 'counter') {
      return (
        <CustomItemContainer
          renderHeader={() => {
            return <CardHeaderPrice title={item.name} value={item.value} unit={item.unit} />
          }}
          renderRightItem={() => {
            return (
              <NumberIncrement
                number={item.count}
                changeNumber={(number) => {
                  changeCount(number, index)
                }}
              />
            )
          }}
        />
      )
    } else {
      return (
        <CustomCheckAccordion
          renderHeader={() => {
            return <CardHeaderPrice title={item.name} value={item.value} unit={item.unit} />
          }}
          notes={notes}
          notesTitleLabel={notesTitleLabel}
          onChecklistPress={() => {
            changeCount(0, index)
          }}
        />
      )
    }
  }

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
        subtitle={subtitle}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Background.bg_light_grey }}>
          <CardItem
            style={{ ...Margin.mt_4, ...Background.bg_light_grey }}
            uriImage={item.uriImage}
            cardTitle={item.cardTitle}
            seatAmount={item.seatAmount}
            seatLabel={item.seatLabel}
            driverLabel={item.driverLabel}
            suitcaseAmount={item.suitcaseAmount}
            suitcaseLabel={item.suitcaseLabel}
            basePriceLabel={item.basePriceLabel}
            priceAmount={item.priceAmount}
            priceUnit={item.priceUnit}
            totalLabel={item.totalLabel}
            itemImage={item.itemImage}
            quality={item.quality}
            isAssurance={item.isAssurance}
            noBorderTop={true}
            duration={item.duration}
            discountedPrice={item.discountedPrice}
            discountPercent={item.discountPercent}
          />

          {isFromAirport ? (
            <View>
              <View style={{ ...Margin.mt_8, ...Background.bg_white }}>
                <CustomLocationArrived
                  title={'Arrived Details'}
                  isEdit={isFromAirport}
                  airportName={airportName}
                  gateNumber={gateNumber}
                  flightNumber={flightNumber}
                  onChangeGateNumber={onChangeGateNumber}
                  onChangeFlightNumber={onChangeFlightNumber}
                />
              </View>

              <CustomLocationInformationCard
                title={dropOffLocationLabel}
                editLabel={''}
                isAirport={true}
                isFromAirport={isFromAirport}
                onEditPress={() => {}}
                style={{ ...Margin.mt_8 }}
                timeString={`${pickUpLocations[0].hour}.${pickUpLocations[0].minute}`}
                dateString={Moment(pickUpLocations[0].date).format('dddd, DD MMMM YYYY')}
                locationName={pickUpLocations[0].location.name}
              />
            </View>
          ) : (
            <View>
              <CustomLocationInformationCard
                title={pickupLocationLabel}
                editLabel={''}
                isAirport={true}
                isFromAirport={isFromAirport}
                pickupNotes={pickupNotes}
                onChangePickupNotes={onChangePickupNotes}
                onEditPress={() => {}}
                style={{ ...Margin.mt_8 }}
                timeString={`${pickUpLocations[0].hour}.${pickUpLocations[0].minute}`}
                dateString={Moment(pickUpLocations[0].date).format('dddd, DD MMMM YYYY')}
                locationName={pickUpLocations[0].location.name}
              />
              <View style={{ ...Margin.mt_8, ...Background.bg_white }}>
                <CustomLocationArrived
                  title={dropOffLocationLabel}
                  isEdit={isFromAirport}
                  airportName={airportName}
                  gateNumber={gateNumber}
                  flightNumber={flightNumber}
                  onChangeGateNumber={onChangeGateNumber}
                  onChangeFlightNumber={onChangeFlightNumber}
                />
              </View>
            </View>
          )}

          <View style={{ ...Margin.mt_8, ...Background.bg_white }}>
            <PersonInfoPanel
              style={{
                ...Padding.ph_16,
              }}
              title={personInfoPanelTitle}
              checklistLabel={checklistAdditionPersonLabel}
              personName={personName}
              personEmail={personEmail}
              onCheckedAddition={onCheckedAdditionPerson}
              additionPersonName={additionPersonName}
              placeholderAdditionPersonName={placeholderAdditionPersonName}
              additionPersonPhone={additionPersonPhone}
              placeholderAdditionPersonPhone={placeholderAdditionPersonPhone}
              onChangeAdditionPersonName={onChangeAdditionPersonName}
              onChangeAdditionPersonPhone={onChangeAdditionPersonPhone}
            />
          </View>
          <View style={{ flex: 1, ...Margin.mt_8 }}>
            <CustomBorderlessAccordionCard title={serviceInfoLabel}>
              {/* <FacilityFlexIcons title={facilitiesLabel} items={facilities} />
              <Separator style={{ ...Margin.mv_4 }} />
              <FacilityFlexIcons
                items={terms}
                title={termsLabel}
                moreButtonLabel={moreButtonLabel}
                moreButtonPress={() => changeModalTerms(true)}
              /> */}
              <DetailInfoSection
                title={'Terms And Condition'}
                onPress={() => changeModalTerms(true)}
              />
              <Separator style={{ ...Margin.mv_4 }} />
              <DetailInfoSection title={'Pickup Method'} onPress={() => changeModalTerms(true)} />
            </CustomBorderlessAccordionCard>
          </View>
          <DefaultOkCancelFooter
            isOrange={true}
            okLabel={okFooterLabel}
            cancelLabel={cancelFooterLabel}
            onOkPress={() => {
              onOkFooterPress()
            }}
            onCancelPress={async () => {
              onCancelFooterPress()
              if (isValid) {
                bsAddToCart.open()
              }
            }}
            style={{ ...Margin.mt_8, ...Padding.ph_16, ...Background.bg_white }}
          >
            <TouchableOpacity
              // onPress={() => bsPaymentDetail.open()}
              style={{ width: '100%', flexDirection: 'row' }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <SvgXml xml={iconCTAUp} fillOpacity={1} height={8} width={2} /> */}
              </View>
              <View style={{ flex: 16 }}>
                <Text style={{ ...Fonts.f_12 }}>{totalLabel}</Text>
              </View>
              <View style={{ flex: 6, alignItems: 'flex-end' }}>
                <LabelNumberFormat
                  number={totalAmount}
                  style={{ ...Fonts.f_12, ...Fonts.semibold, ...Fonts.text_amber }}
                />
              </View>
            </TouchableOpacity>
            <Separator style={{ ...Margin.mt_12 }} />
          </DefaultOkCancelFooter>
          <ModalTermsAndCondition
            title={termsModalTitle}
            modalVisible={modalTerms}
            changeModalVisible={changeModalTerms}
            items={termsModalItems}
          />
          <CustomBottomSheet
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
                  // ...additionalItems,
                ]}
                totalAmount={totalAmount}
              />
            </View>
          </CustomBottomSheet>
          <CustomBottomSheet title={addToCartLabel} botSheetRef={(ref) => (bsAddToCart = ref)}>
            <View style={{ justifyContent: 'center', ...Padding.ph_20, ...Padding.pv_20 }}>
              <CartItem
                cardTitle={cartTitle}
                city={city}
                startDate={startDate}
                endDate={endDate}
                rentHour={rentHour}
                rentHourSuffix={rentHourSuffix}
                totalAmount={totalAmount}
                carName={item.cardTitle}
              />
              <View style={{ ...Margin.mt_20 }}>
                <PrimaryButton
                  style={{ ...Margin.mt_20 }}
                  text={addToCartButtonLabel}
                  onPress={() => {
                    bsAddToCart.close()
                    onAddToCartPress()
                  }}
                />
              </View>
            </View>
          </CustomBottomSheet>
        </ScrollView>
      </View>
    </View>
  )
}

DetailItemAirport.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Sewa Mobil di ',
  city: 'Bandung',
  serviceInfoLabel: 'Service Info',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Jam',
  subtitle: 'Senin, 26 Jan - 27 Jan 2020 | 12 Jam',
  termsLabel: 'Syarat & Ketentuan',
  facilitiesLabel: 'Fasilitas',
  additionalLabel: 'Additional',
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
  facilities: [
    {
      name: 'Layanan Darurat 24 Jam',
      image: iconCallCenter,
    },
    {
      name: 'Kendaraan Pengganti',
      image: iconReplacement,
    },
    {
      name: 'Asuransi Jiwa',
      image: iconAsuransi,
    },
  ],
  terms: [
    {
      name: 'Mempunyai KTP/Passport',
      image: iconIDCard,
    },
    {
      name: 'Belum Termasuk BBM, Tol, dan Parkir',
      image: iconKetentuan,
    },
  ],
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
  moreButtonLabel: 'selengkapnya',
  // changeAdditionalItems: () => {},
  notesTitleLabel: 'Keterangan',
  notes: 'Penambahan Biaya diperuntukan akomodasi dan penginapan sopir',
  personInfoPanelTitle: 'Order Data',
  personName: 'Yoga Perdana',
  personEmail: 'yogaperdana@gmail.com',
  checklistAdditionPersonLabel: 'Order for others person',
  additionPersonName: null,
  additionPersonPhone: null,
  onCheckedAdditionPerson: () => {},
  placeholderAdditionPersonName: 'Order Name',
  placeholderAdditionPersonPhone: 'Phone Number',
  onChangeAdditionPersonName: () => {},
  onChangeAdditionPersonPhone: () => {},
  paymentItems: [],
  totalLabel: 'Total Price',
  okFooterLabel: 'Checkout',
  cancelFooterLabel: 'Masukkan Keranjang',
  onOkFooterPress: () => {},
  onCancelFooterPress: () => {},
  totalAmount: 500000,
  changeTotalAmount: () => {},
  paymentDetailLabel: 'Detail Order',
  onAddToCartPress: () => {},
  addToCartLabel: 'Paket berhasil ditambahkan',
  cartTitle: 'Sewa Mobil - Dengan Sopir',
  addToCartButtonLabel: 'Lihat Keranjang',
  pickupLocationLabel: 'Pickup Details',
  pickUpLocationDescription: 'Masukkan detail lokasi penjemputan',
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
  onPressPickUpCTA: () => {},
  isValid: false,
  dropOffLocationLabel: 'Drop Off Details',
  isFromAirport: true,
  gateNumber: 'G-19',
  flightNumber: 'BA192',
  onChangeGateNumber: () => {},
  onChangeFlightNumber: () => {},
  airportName: 'Bandar Soekarno Hatta',
  pickupNotes: '',
  onChangePickupNotes: () => {},
}

DetailItemAirport.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.Date,
  endDate: PropTypes.Date,
  rentHour: PropTypes.number,
  rentHourSuffix: PropTypes.string,
  serviceInfoLabel: PropTypes.string,
  termsLabel: PropTypes.string,
  facilitiesLabel: PropTypes.string,
  additionalLabel: PropTypes.string,
  item: PropTypes.shape({}),
  facilities: PropTypes.arrayOf(PropTypes.shape({})),
  terms: PropTypes.arrayOf(PropTypes.shape({})),
  termsModalTitle: PropTypes.string,
  termsModalItems: PropTypes.arrayOf(PropTypes.shape({})),
  moreButtonLabel: PropTypes.string,
  // changeAdditionalItems: PropTypes.func,
  notesTitleLabel: PropTypes.string,
  notes: PropTypes.string,
  personInfoPanelTitle: PropTypes.string,
  personName: PropTypes.string,
  personEmail: PropTypes.string,
  checklistAdditionPersonLabel: PropTypes.string,
  additionPersonName: PropTypes.string,
  additionPersonPhone: PropTypes.string,
  onCheckedAdditionPerson: PropTypes.func,
  placeholderAdditionPersonName: PropTypes.string,
  placeholderAdditionPersonPhone: PropTypes.string,
  onChangeAdditionPersonName: PropTypes.func,
  onChangeAdditionPersonPhone: PropTypes.func,
  paymentItems: PropTypes.arrayOf(PropTypes.shape({})),
  totalLabel: PropTypes.string,
  okFooterLabel: PropTypes.string,
  cancelFooterLabel: PropTypes.string,
  onOkFooterPress: PropTypes.func,
  onCancelFooterPress: PropTypes.func,
  totalAmount: PropTypes.number,
  changeTotalAmount: PropTypes.func,
  paymentDetailLabel: PropTypes.string,
  onAddToCartPress: PropTypes.func,
  addToCartLabel: PropTypes.string,
  cartTitle: PropTypes.string,
  addToCartButtonLabel: PropTypes.string,
  pickUpLocations: PropTypes.arrayOf(PropTypes.shape({})),
  pickupLocationLabel: PropTypes.string,
  pickUpLocationDescription: PropTypes.string,
  onPressPickUpCTA: PropTypes.func,
  isValid: PropTypes.bool,
  dropOffLocationLabel: PropTypes.string,
  isFromAirport: PropTypes.bool,
  gateNumber: PropTypes.string,
  flightNumber: PropTypes.string,
  onChangeGateNumber: PropTypes.func,
  onChangeFlightNumber: PropTypes.func,
  airportName: PropTypes.string,
  pickupNotes: PropTypes.string,
  onChangePickupNotes: PropTypes.func,
}
