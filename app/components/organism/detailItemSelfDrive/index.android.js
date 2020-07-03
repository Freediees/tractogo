import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { LabelNumberFormat } from 'function/numberFormat'
import Moment from 'moment'

import CardItem from 'components/atom/cardItem'
import ItemDropDownPicker from 'components/atom/itemDropDownPicker'
import IconButton from 'components/atom/iconButton'
import DefaultHeader from 'components/molecules/defaultHeader'
import CustomBorderlessAccordionCard from 'components/atom/customBorderlessAccordionCard'
import CustomCheckAccordion from 'components/atom/customCheckAccordion'
import CustomCheckAccordion2 from 'components/atom/customCheckAccordion2'
import CustomItemContainer from 'components/atom/customItemContainer'
import Separator from 'components/atom/separator'
import CartItem from 'components/atom/cartItem'
import CustomLocationInformationCardSelfDrive from 'components/atom/customLocationInformationCardSelfDrive'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import NumberIncrement from 'components/atom/numberIncrement'
import FacilityFlexIcons from 'components/molecules/facilityFlexIcons'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import PersonInfoPanel from 'components/molecules/personInfoPanel'
import DefaultFooter from 'components/molecules/defaultFooter'
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
  returnToggle,
  changeReturnToggle,
  toggleReturnLabel,
  onPressPickUpCTA,
  returnLocationLabel,
  returnLocationDescription,
  onPressReturnCTA,
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
      newArr[index].total = number * newArr[index].value * parseInt(item.duration)
      changeAdditionalItems(newArr)
      calculateTotal()
    } else if (newArr[index].type.toLowerCase() === 'boolean') {
      if (newArr[index].count === 1) newArr[index].count = 0
      else newArr[index].count = 1
      newArr[index].total = newArr[index].count * newArr[index].value * parseInt(item.duration)
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
            isDriver={false}
            uriImage={item.uriImage}
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
          <View
            style={{
              ...Margin.mv_8,
              width: '100%',
              ...Background.bg_white,
            }}
          >
            <CustomLocationInformationCardSelfDrive
              onPress={onPressPickUpCTA}
              icon={require('icons/icon_pick.png')}
              title={pickupLocationLabel}
              description={pickUpLocationDescription}
              isToggle={false}
            />
          </View>
          <View
            style={{
              ...Margin.mv_8,
              width: '100%',
              ...Background.bg_white,
            }}
          >
            <CustomLocationInformationCardSelfDrive
              onPress={onPressReturnCTA}
              icon={require('icons/icon_pick_return.png')}
              title={returnLocationLabel}
              description={returnLocationDescription}
              isToggle
              toggle={returnToggle}
              changeToggle={changeReturnToggle}
              toggleLabel={toggleReturnLabel}
            />
          </View>
          
          <View style={{ flex: 1, ...Margin.mt_8 }}>
            <CustomBorderlessAccordionCard title={additionalLabel}>
              {additionalItems &&
                additionalItems.map((v, i) => {
                  return renderItem(v, i)
                })}
            </CustomBorderlessAccordionCard>
          </View>
          <DefaultFooter
            buttonText={okFooterLabel}
            onButtonPress={() => {
              onOkFooterPress()
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
          </DefaultFooter>
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
          <CustomBottomSheet
            title={addToCartLabel}
            botSheetRef={(ref) => (bsAddToCart = ref)}
          >
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
                  style={{ ...Margin.mt_20, ...Padding.pv_12, flex: 1 }}
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
  title: 'Cars in ',
  city: 'Bandung',
  startDate: new Date(),
  endDate: new Date().getTime() + 86400000,
  rentHour: 12,
  rentHourSuffix: 'Hour',
  subtitle: 'Senin, 26 Jan - 27 Jan 2020 | 12 Hour',
  serviceInfoLabel: 'Service Information',
  termsLabel: 'Terms and Conditions',
  facilitiesLabel: 'Fasilitas',
  additionalLabel: 'Additional',
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
  facilities: [
    {
      name: '24-Hour Emergency Service',
      image: iconCallCenter,
    },
    {
      name: 'Breakdown replacement car',
      image: iconReplacement,
    },
    {
      name: 'Life Insurance',
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
  moreButtonLabel: 'Read more',
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
    {
      name: 'Jumlah Bensin yang akan diisi',
      value: 50000,
      unit: 'IDR',
      count: 0,
      total: 0,
      type: 'nominal',
      stockType: '0',
      availability: 0,
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
  onPressPickUpCTA: () => {},
  returnLocationLabel: 'Return location',
  returnLocationDescription: 'Masukkan Detail Return location',
  onPressReturnCTA: () => {},
  isValid: false,
  returnToggle: false,
  changeReturnToggle: () => {},
  toggleReturnLabel: 'Sama Dengan Penjemputan Mobil',
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
  editPickUpLabel: PropTypes.string,
  onEditPickUpPress: PropTypes.func,
  returnLocations: PropTypes.arrayOf(PropTypes.shape({})),
  returnLocationLabel: PropTypes.string,
  returnLocationDescription: PropTypes.string,
  onPressReturnCTA: PropTypes.func,
  editReturnLabel: PropTypes.string,
  onEditReturnPress: PropTypes.func,
  isValid: PropTypes.bool,
  returnToggle: PropTypes.bool,
  changeReturnToggle: PropTypes.func,
  toggleReturnLabel: PropTypes.string,
  nominalList: PropTypes.arrayOf(PropTypes.shape({})),
}
