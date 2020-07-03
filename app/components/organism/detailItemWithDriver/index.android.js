import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { LabelNumberFormat } from 'function/numberFormat'
import Moment from 'moment'

import CardItem from 'components/atom/cardItem'
import IconButton from 'components/atom/iconButton'
import DefaultHeader from 'components/molecules/defaultHeader'
import CustomBorderlessAccordionCard from 'components/atom/customBorderlessAccordionCard'
import CustomCheckAccordion from 'components/atom/customCheckAccordion'
import CustomItemContainer from 'components/atom/customItemContainer'
import Separator from 'components/atom/separator'
import CartItem from 'components/atom/cartItem'
import DefaultCTA from 'components/atom/defaultCTA'
import CustomLocationInformationCard from 'components/atom/customLocationInformationCard'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import NumberIncrement from 'components/atom/numberIncrement'
import FacilityFlexIcons from 'components/molecules/facilityFlexIcons'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import PersonInfoPanel from 'components/molecules/personInfoPanel'
import DefaultOkCancelFooter from 'components/molecules/defaultOkCancelFooter'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import PaymentDetailContent from 'components/molecules/paymentDetailContent'
import PrimaryButton from 'components/atom/primaryButton'
import ItemDropDownPicker from 'components/atom/itemDropDownPicker'
import CustomCheckAccordion2 from 'components/atom/customCheckAccordion2'

import { Margin, Fonts, Background, Padding, Row } from 'theme'

import backIcon from 'icons/ic-back.svg'
import iconCTAUp from 'icons/ic-CTAUp.svg'
import iconClose from 'icons/ic-close.svg'

import iconCallCenter from 'icons/ic-callcenter.svg'
import iconReplacement from 'icons/ic-replacement.svg'
import iconAsuransi from 'icons/ic-asuransi.svg'
import iconKetentuan from 'icons/ic-ketentuan.svg'
import iconIDCard from 'icons/ic-idcard.svg'



export default function DetailItemWithDriver({
  onIconLeftPress,
  title,
  city,
  startDate,
  endDate,
  rentHour,
  rentHourSuffix,
  item,
  facilities,
  terms,
  termsModalTitle,
  termsModalItems,
  serviceInfoLabel,
  termsLabel,
  facilitiesLabel,
  additionalLabel,
  moreButtonLabel,
  additionalItems,
  changeAdditionalItems,
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
  editLabel,
  onEditPress,
  isValid,
  nominalList,
}) {
  const [modalTerms, changeModalTerms] = useState(false)
  let bsPaymentDetail = null
  let bsAddToCart = null

  const calculateTotal = () => {
    let val = parseInt(item.priceAmount) * parseInt(item.duration)
    additionalItems.forEach((v, index) => {
      val = parseInt(val) + parseInt(v.total)
    })
    changeTotalAmount(val)
  }

  const changeCount = (number, index) => {
    let newArr = [...additionalItems]
    if (newArr[index].type.toLowerCase() === 'counter') {
      newArr[index].count = number
      newArr[index].total = number * newArr[index].value * item.duration
      changeAdditionalItems(newArr)
      calculateTotal()
    } else if (newArr[index].type.toLowerCase() === 'boolean') {
      if (newArr[index].count === 1) newArr[index].count = 0
      else newArr[index].count = 1
      newArr[index].total = newArr[index].count * newArr[index].value * item.duration
      changeAdditionalItems(newArr)
      calculateTotal()
    } else if (newArr[index].type.toLowerCase() === 'nominal') {
      if (newArr[index].count === 1) newArr[index].count = 0
      else {
        newArr[index].count = 1
        newArr[index].value = nominalList[0].value
      }
      newArr[index].total = newArr[index].count * newArr[index].value
      changeAdditionalItems(newArr)
      calculateTotal()
    }
  }

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
                max={item.stockType === '1' ? parseInt(item.availability) : 999}
                changeNumber={(number) => {
                  console.log(item)
                  changeCount(number, index)
                }}
              />
            )
          }}
        />
      )
    } else if (item.type && item.type.toLowerCase() === 'boolean') {
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
    } else if (item.type && item.type.toLowerCase() === 'nominal') {
      return (
        <CustomCheckAccordion2
          renderHeader={() => {
            return <Text style={{ ...Fonts.f_12 }}>{item.name}</Text>
          }}
          notes={notes}
          notesTitleLabel={notesTitleLabel}
          onChecklistPress={() => {
            changeCount(0, index)
          }}
        >
          <ItemDropDownPicker
            onSelect={(value) => {
              let newArr = [...additionalItems]
              newArr[index].value = value.value
              newArr[index].total = newArr[index].count * value.value
              changeAdditionalItems(newArr)
              calculateTotal()
            }}
            selectList={nominalList}
          />
        </CustomCheckAccordion2>
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
        title={`${title}${city}`}
        subtitle={`${Moment(startDate)
          .format('ddd, DD MMM')} - ${Moment(endDate)
          .format('ddd, DD MMM YYYY')} | ${rentHour} ${rentHourSuffix}`}
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
          <View style={{ flex: 1, ...Margin.mt_8 }}>
            <CustomBorderlessAccordionCard title={serviceInfoLabel}>
              <FacilityFlexIcons title={facilitiesLabel} items={facilities} />
              <Separator style={{ ...Margin.mv_4 }} />
              <FacilityFlexIcons
                items={terms}
                title={termsLabel}
                moreButtonLabel={moreButtonLabel}
                moreButtonPress={() => changeModalTerms(true)}
              />
            </CustomBorderlessAccordionCard>
          </View>
          {pickUpLocations && pickUpLocations[0] && pickUpLocations[0].location.name ? (
            <CustomLocationInformationCard
              title={pickupLocationLabel}
              editLabel={editLabel}
              onEditPress={onEditPress}
              style={{ ...Margin.mt_8 }}
              timeString={`${pickUpLocations[0].hour}.${pickUpLocations[0].minute}`}
              dateString={Moment(pickUpLocations[0].date).format('dddd, DD MMMM YYYY')}
              locationName={pickUpLocations[0].location.name}
            />
          ) : (
            <DefaultCTA
              style={{
                ...Background.bg_white,
                ...Margin.mt_8,
                ...Padding.ph_12,
              }}
              onPress={onPressPickUpCTA}
              title={pickupLocationLabel}
              description={pickUpLocationDescription}
              superscript={'*'}
            />
          )}

          <View style={{ flex: 1, ...Margin.mt_8 }}>
            <CustomBorderlessAccordionCard title={additionalLabel}>
              {additionalItems &&
                additionalItems.map((v, i) => {
                  return renderItem(v, i)
                })}
            </CustomBorderlessAccordionCard>
          </View>
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
          <DefaultOkCancelFooter
            isOrange={true}
            okLabel={okFooterLabel}
            cancelLabel={cancelFooterLabel}
            onOkPress={() => {
              onOkFooterPress()
            }}
            onCancelPress={async () => {
              onCancelFooterPress()
            }}
            style={{ ...Margin.mt_8, ...Padding.ph_16, ...Background.bg_white }}
          >
            <TouchableOpacity
              onPress={() => bsPaymentDetail.open()}
              style={{ width: '100%', flexDirection: 'row' }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <SvgXml xml={iconCTAUp} height={16} width={16} />
              </View>
              <View style={{ flex: 3 }}>
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
                      total: parseInt(item.priceAmount) * parseInt(item.duration)
                    },
                  ],
                  ...additionalItems,
                ]}
                totalAmount={totalAmount}
              />
            </View>
          </CustomBottomSheet>
        </ScrollView>
      </View>
    </View>
  )
}

DetailItemWithDriver.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Cars in ',
  city: 'Bandung',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Hour',
  subtitle: 'Senin, 26 Jan - 27 Jan 2020 | 12 Hour',
  serviceInfoLabel: 'Service Information',
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
      name: 'Layanan Darurat 24 Hour',
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
  additionalItems: [
    {
      name: 'Penggunaan Luar Kota',
      value: 200000,
      unit: 'Hari',
      count: 0,
      total: 0,
      type: 'boolean',
      stockType: '0',
      availability: 0,
    },
    {
      name: 'Overnight Driver',
      value: 200000,
      unit: 'Hari',
      count: 0,
      total: 0,
      type: 'boolean',
      stockType: '0',
      availability: 0,
    },
    {
      name: 'Baby Seat',
      value: 50000,
      unit: 'Seat',
      count: 0,
      total: 0,
      type: 'counter',
      stockType: '1',
      availability: 2,
    },
  ],
  nominalList: [
    {
      title: 'Rp 20.000',
      value: 20000,
    },
    {
      title: 'Rp 50.000',
      value: 50000,
    },
    {
      title: 'Rp 100.000',
      value: 100000,
    },
    {
      title: 'Rp 200.000',
      value: 200000,
    },
  ],
  changeAdditionalItems: () => {},
  notesTitleLabel: 'Keterangan',
  notes: 'Penambahan Biaya diperuntukan akomodasi dan penginapan sopir',
  personInfoPanelTitle: 'Data Pemesan',
  personName: 'Yoga Perdana',
  personEmail: 'yogaperdana@gmail.com',
  checklistAdditionPersonLabel: 'Pesan untuk orang lain',
  additionPersonName: null,
  additionPersonPhone: null,
  onCheckedAdditionPerson: () => {},
  placeholderAdditionPersonName: 'Nama Pemesan',
  placeholderAdditionPersonPhone: 'Nomor Handphone',
  onChangeAdditionPersonName: () => {},
  onChangeAdditionPersonPhone: () => {},
  paymentItems: [],
  totalLabel: 'Total Price',
  okFooterLabel: 'Checkout',
  cancelFooterLabel: 'Add To Cart',
  onOkFooterPress: () => {},
  onCancelFooterPress: () => {},
  totalAmount: 500000,
  changeTotalAmount: () => {},
  paymentDetailLabel: 'Detail Order',
  onAddToCartPress: () => {},
  addToCartLabel: 'Paket berhasil ditambahkan',
  cartTitle: 'Car Rental - With Driver',
  addToCartButtonLabel: 'Lihat Keranjang',
  pickupLocationLabel: 'Pick-up location',
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
  editLabel: 'Ubah',
  onEditPress: () => {},
  isValid: false,
}

DetailItemWithDriver.propTypes = {
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
  additionalItems: PropTypes.arrayOf(PropTypes.shape({})),
  changeAdditionalItems: PropTypes.func,
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
  editLabel: PropTypes.string,
  onEditPress: PropTypes.func,
  isValid: PropTypes.bool,
  nominalList: PropTypes.arrayOf(PropTypes.shape({})),
}
