import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Moment from 'moment'
import { Margin, Fonts, Padding, Colors, Row, Column, Border } from 'theme'

import CustomBottomSheet from 'components/molecules/customBottomSheet'
import Separator from 'components/atom/separator'

import locationIcon from 'icons/ic-filter1.svg'
import startTimeIcon from 'icons/ic-filter2.svg'
import dateIcon from 'icons/ic-filter3.svg'
import CustomCalendarPicker from 'components/atom/customCalendarPicker'
import ButtonImageCircle from 'components/atom/buttonImageCircle'
import CustomTimePicker from 'components/atom/customTimePicker'
import CustomCityPicker from 'components/atom/customCityPicker'
import CustomItemPicker from 'components/atom/customItemPicker'
import CustomLocationPicker from 'components/atom/customLocationPicker'
import IconButton from 'components/atom/iconButton'
import iconAirport from 'icons/ic-airporttransport.svg'
import iconClose from 'icons/ic-close.svg'

export default function FilterAirport({
  locationFilterLabel,
  airportFilterLabel,
  placeHolderAirportFilter,
  placeHolderLocationFilter,
  startDateLabel,
  placeHolderStartDate,
  durationLabel,
  placeHolderDuration,
  startTimeLabel,
  placeHolderStartTime,
  packageLabel,
  placeHolderPackage,
  citiesData,
  airportData,
  rentPackageData,
  durationData,
  border,
  okLabel,
  cancelLabel,
  weekdaysLabel,
  monthsLabel,
  selectedHour,
  changeSelectedHour,
  selectedMinute,
  changeSelectedMinute,
  selectedDuration,
  changeSelectedDuration,
  selectedDurationIndex,
  changeSelectedDurationIndex,
  selectedPackage,
  changeSelectedPackage,
  selectedPackageIndex,
  changeSelectedPackageIndex,
  selectedAirport,
  changeSelectedAirport,
  selectedCity,
  changeSelectedCity,
  selectedAddress,
  changeSelectedAddress,
  selectedDate,
  changeSelectedDate,
  timeSufix,
  minDate,
  maxDate,
  endDate,
  footer,
  startRentLabel,
  endRentLabel,
  searchButtonEnabled,
  searchButtonLabel,
  onSearchButtonPress,
  isStartTime,
  isPackage,
  onSaveTime,
  onSaveDate,
  keyword,
  changeKeyword,
  predictionItemClick,
  requestSearchPrediction,
  keywordPlaceholder,
  locationPlaceHolder,
  predictions,
  items,
  changeItems,
  locationPlaceholder,
  onCloseIconPress,
  isFromAirport,
  changeIsFromAirport,
}) {
  let bsDate = null
  let bsDuration = null
  let bsTimePicker = null
  let bsPackage = null

  const [modalVisible, changeModalVisible] = useState(false)
  const [airportModalVisible, changeAirportModalVisible] = useState(false)
  const [airportCoverageModalVisible, changeAirportCoverageModalVisible] = useState(false)
  const [addressModalVisible, changeAddressModalVisible] = useState(false)
  const [selectedIndex, changeSelectedIndex] = useState(0)

  const onAirportClick = (airport) => {
    changeSelectedAirport(airport)
    changeAirportModalVisible(false)
  }

  const onCityClick = (city) => {
    changeSelectedCity(city)
    changeAirportCoverageModalVisible(false)
    changeAddressModalVisible(true)
  }

  const onAddressClick = (address) => {
    changeSelectedAddress(address)
    changeAddressModalVisible(false)
  }

  const onValueChange = (hour, minute) => {
    changeSelectedHour(hour)
    changeSelectedMinute(minute)
  }

  const onSelectDuration = (item, index) => {
    changeSelectedDuration(item)
    changeSelectedDurationIndex(index)
  }

  const onSelectPackage = (item, index) => {
    changeSelectedPackage(item)
    changeSelectedPackageIndex(index)
  }

  const changePlaceDetail = (val, index) => {
    predictionItemClick(val, index)
    onAddressClick(val)
    console.log('val', val)
  }

  const renderRightText = (activeBs) => {
    if (activeBs === 1) {
      return (
        <IconButton
          onPress={() => {
            bsDate.close()
            onSaveDate()
          }}
          height={16}
          width={16}
          svg={iconClose}
          fill={'black'}
        />
      )
    } else if (activeBs === 2) {
      return null
    } else if (activeBs === 3) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...Fonts.f_8, ...Fonts.text_smoky_grey }}>{startDateLabel}</Text>
          {selectedDate && (
            <Text style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey }}>
              {Moment(selectedDate).format('dddd, DD MMM')}
            </Text>
          )}
        </View>
      )
    } else if (activeBs === 4) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...Fonts.f_8, ...Fonts.text_smoky_grey }}>{startTimeLabel}</Text>
          <Text
            style={{ ...Fonts.f_12, ...Fonts.text_smoky_grey }}
          >{`${selectedHour}.${selectedMinute} ${timeSufix}`}</Text>
        </View>
      )
    }
  }

  const borderStyleWithFooter = {
    width: '100%',
    flex: 4,
    ...Border.border_light_grey,
    ...Border.border_w_1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'column',
    paddingHorizontal: 24,
    ...Padding.pt_16,
    ...Padding.pb_20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  }
  const borderStyle = {
    width: '100%',
    flex: 4,
    ...Border.border_light_grey,
    ...Border.border_w_1,
    ...Border.border_rad_8,
    flexDirection: 'column',
    paddingHorizontal: 24,
    ...Padding.pv_16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  }
  const borderlessStyle = {
    flex: 4,
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 24,
    ...Padding.pv_20,
    backgroundColor: '#fff',
  }

  const getBorderStyle = () => {
    if (border) {
      if (footer) {
        return borderStyleWithFooter
      } else {
        return borderStyle
      }
    } else {
      return borderlessStyle
    }
  }

  return (
    <View style={{ ...Row.row_4_5, width: '100%' }}>
      <View style={getBorderStyle()}>
        <View>
          <View style={{ ...Column.col_8 }}>
            <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey }}>
              {isFromAirport ? 'From ' + airportFilterLabel : 'To ' + airportFilterLabel}
            </Text>
            <TouchableOpacity
              onPress={() => {
                changeAirportModalVisible(true)
                console.log('changeAirportModalVisible(true)')
              }}
              style={{ ...Margin.mt_12 }}
            >
              <View style={{ flexDirection: 'row' }}>
                <SvgXml xml={iconAirport} width={20} height={20} />
                <TextInput
                  placeholder={placeHolderAirportFilter}
                  editable={false}
                  onPress={() => {}}
                  value={selectedAirport ? selectedAirport.cityName : ''}
                  placeholderTextColor={Colors.grey}
                  style={{ ...Fonts.f_12, ...Margin.ml_8, ...Fonts.text_smoky_grey }}
                />
              </View>
              <Separator style={{ ...Margin.mt_8 }} />
            </TouchableOpacity>
          </View>
          {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}> */}
            <ButtonImageCircle onPress={changeIsFromAirport} />
          {/* </View> */}
          <View style={{ ...Column.col_9 }}>
            <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey }}>
              {isFromAirport ? 'To ' + locationFilterLabel : 'From ' + locationFilterLabel}
            </Text>
            <TouchableOpacity
              onPress={() => {
                changeAirportCoverageModalVisible(true)
                console.log('changeAirportCoverageModalVisible(true)')
              }}
              style={{ ...Margin.mt_12 }}
            >
              <View style={{ flexDirection: 'row' }}>
                <SvgXml xml={locationIcon} width={20} height={20} />
                <TextInput
                  placeholder={placeHolderLocationFilter}
                  editable={false}
                  onPress={() => {}}
                  value={items ? items.description : ''}
                  placeholderTextColor={Colors.grey}
                  style={{ ...Fonts.f_12, ...Margin.ml_8, ...Fonts.text_smoky_grey }}
                />
              </View>
              <Separator style={{ ...Margin.mt_8 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            ...Column.col_9,
            ...Margin.mt_20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, ...Fonts.semibold }}>
              {startDateLabel}
            </Text>
            <TouchableOpacity
              style={{
                ...Margin.mt_12,
              }}
              onPress={() => {
                bsDate.open()
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SvgXml xml={dateIcon} width={20} height={20} />
                <TextInput
                  placeholder={'placeHolderStartDate'}
                  editable={false}
                  placeholderTextColor={Colors.grey}
                  value={selectedDate ? Moment(selectedDate).format('DD MMM YYYY') : ''}
                  style={{ ...Fonts.f_12, ...Margin.ml_8, ...Fonts.text_smoky_grey }}
                />
              </View>
              <Separator style={{ ...Margin.mt_8 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            ...Margin.mt_20,
            ...Column.col_9,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            {isStartTime && (
              <Fragment>
                <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, ...Fonts.semibold }}>
                  {startTimeLabel}
                </Text>
                <TouchableOpacity
                  style={{ ...Margin.mt_12 }}
                  onPress={() => {
                    bsTimePicker.open()
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <SvgXml xml={startTimeIcon} width={20} height={20} />
                    <TextInput
                      placeholder={placeHolderStartTime}
                      editable={false}
                      onPress={() => {}}
                      value={`${selectedHour}.${selectedMinute} ${timeSufix}`}
                      placeholderTextColor={Colors.grey}
                      style={{ ...Fonts.f_12, ...Margin.ml_8, ...Fonts.text_smoky_grey }}
                    />
                  </View>
                  <Separator style={{ ...Margin.mt_8 }} />
                </TouchableOpacity>
              </Fragment>
            )}
          </View>
        </View>
      </View>
      <CustomCityPicker
        placeholder={placeHolderLocationFilter}
        modalVisible={airportModalVisible}
        cities={airportData}
        onCityClick={onAirportClick}
        changeModalVisible={() => {
          console.log({ airportData })
          changeAirportModalVisible(false)
          // changeSelectedAirport({ cityName: null })
        }}
      />
      <CustomCityPicker
        placeholder={placeHolderLocationFilter}
        modalVisible={airportCoverageModalVisible}
        cities={citiesData}
        onCityClick={onCityClick}
        changeModalVisible={() => {
          changeAirportCoverageModalVisible(false)
          // changeSelectedCity({ cityName: null })
        }}
      />
      <CustomLocationPicker
        modalVisible={addressModalVisible}
        changeModalVisible={() => {
          changeAddressModalVisible(false)
        }}
        keyword={keyword}
        changeKeyword={changeKeyword}
        requestSearchPrediction={requestSearchPrediction}
        keywordPlaceholder={keywordPlaceholder}
        predictions={keyword === '' ? [] : predictions}
        predictionItemClick={(v) => {
          changePlaceDetail(v, selectedIndex)
        }}
        locationPlaceHolder={locationPlaceholder}
        location={items && items[selectedIndex] ? items[selectedIndex].location : null}
        changeLocation={changeSelectedAddress}
        latitude={
          items && items[selectedIndex] && items[selectedIndex].location
            ? items[selectedIndex].location.lat
            : 0
        }
        longitude={
          items && items[selectedIndex] && items[selectedIndex].location
            ? items[selectedIndex].location.lon
            : 0
        }
        onCloseIconPress={onCloseIconPress}
      />
      <CustomBottomSheet
        title={placeHolderStartDate}
        botSheetRef={(ref) => (bsDate = ref)}
        rightText={() => renderRightText(1)}
      >
        <CustomCalendarPicker
          onDateChange={(date) => {
            changeSelectedDate(date)
            bsDate.close()
          }}
          minDate={minDate}
          maxDate={maxDate}
          selectedDate={selectedDate}
          weekdays={weekdaysLabel}
          months={monthsLabel}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        title={placeHolderStartTime}
        botSheetRef={(ref) => (bsTimePicker = ref)}
        rightText={() => renderRightText(2)}
      >
        <CustomTimePicker
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onValueChange={onValueChange}
          onOkPress={() => {
            if (bsTimePicker) {
              bsTimePicker.close()
              onSaveTime()
            }
          }}
          onCancelPress={() => {
            if (bsTimePicker) {
              changeSelectedHour('00')
              changeSelectedMinute('00')
              bsTimePicker.close()
              onSaveTime()
            }
          }}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        title={placeHolderDuration}
        botSheetRef={(ref) => (bsDuration = ref)}
        rightText={() => renderRightText(3)}
      >
        <CustomItemPicker
          items={durationData}
          selectedItem={selectedDuration}
          selectedIndex={selectedDurationIndex}
          onSelectItem={onSelectDuration}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          onOkPress={() => {
            if (bsDuration) {
              bsDuration.close()
            }
          }}
          onCancelPress={() => {
            if (bsDuration) {
              changeSelectedDurationIndex(-1)
              changeSelectedDuration({})
              bsDuration.close()
            }
          }}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        title={'Pilih Paket Sewa'}
        botSheetRef={(ref) => (bsPackage = ref)}
        rightText={() => renderRightText(4)}
      >
        <CustomItemPicker
          items={rentPackageData}
          selectedItem={selectedPackage}
          selectedIndex={selectedPackageIndex}
          onSelectItem={onSelectPackage}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          onOkPress={() => {
            if (bsPackage) {
              bsPackage.close()
            }
          }}
          onCancelPress={() => {
            if (bsPackage) {
              changeSelectedPackageIndex(-1)
              changeSelectedPackage({})
              bsPackage.close()
            }
          }}
        />
      </CustomBottomSheet>
    </View>
  )
}

FilterAirport.defaultProps = {
  locationFilterLabel: 'Area / Address',
  airportFilterLabel: 'Airport',
  placeHolderLocationFilter: 'Pilih Kota Sewa',
  placeHolderAirportFilter: 'Pilih Bandara',
  startDateLabel: 'Tanggal Mulai',
  placeHolderStartDate: 'Pilih Tanggal Mulai',
  durationLabel: 'Durasi',
  placeHolderDuration: 'Pilih Durasi',
  startTimeLabel: 'Waktu Mulai',
  placeHolderStartTime: 'Pilih Waktu Mulai',
  packageLabel: 'Paket Sewa',
  placeHolderPackage: 'Pilih Paket Sewa',
  airportData: [],
  citiesData: [],
  border: true,
  okLabel: 'Simpan',
  cancelLabel: 'Batal',
  weekdaysLabel: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  monthsLabel: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  durationData: [
    {
      leftLabel: '1 Hari',
      rightLabel: 'Pengembalian Rabu, 27 January 2020',
    },
    {
      leftLabel: '2 Hari',
      rightLabel: 'Pengembalian Kamis, 28 January 2020',
    },
    {
      leftLabel: '3 Hari',
      rightLabel: 'Pengembalian Jumat, 29 January 2020',
    },
  ],
  rentPackageData: [
    {
      leftLabel: '4 Jam',
      rightLabel: '09.00 - 13.00 WIB',
    },
    {
      leftLabel: '8 Jam',
      rightLabel: '09.00 - 17.00 WIB',
    },
    {
      leftLabel: '10 Jam',
      rightLabel: '09.00 - 19.00 WIB',
    },
  ],
  selectedHour: '10',
  changeSelectedHour: () => {},
  selectedMinute: '00',
  changeSelectedMinute: () => {},
  selectedDuration: {
    leftLabel: '1 Hari',
    rightLabel: 'Pengembalian Rabu, 27 January 2020',
  },
  changeSelectedDuration: () => {},
  selectedDurationIndex: 0,
  changeSelectedDurationIndex: () => {},
  selectedPackage: {
    leftLabel: '4 Jam',
    rightLabel: '09.00 - 13.00 WIB',
  },
  changeSelectedPackage: () => {},
  selectedPackageIndex: 0,
  changeSelectedPackageIndex: () => {},
  selectedCity: null,
  changeSelectedCity: () => {},
  selectedAddress: null,
  changeSelectedAddress: () => {},
  selectedAirport: null,
  changeSelectedAirport: () => {},
  selectedDate: new Date(),
  changeSelectedDate: () => {},
  endDate: new Date(),
  minDate: new Date(),
  maxDate: new Date().getTime() + 864000000,
  timeSufix: 'WIB',
  footer: false,
  startRentLabel: 'Mulai Sewa',
  endRentLabel: 'Akhir Sewa',
  searchButtonEnabled: false,
  searchButtonLabel: 'Cari Mobil',
  onSearchButtonPress: () => {},
  isStartTime: true,
  isPackage: true,
  onSaveTime: () => {},
  onSaveDate: () => {},
  keyword: null,
  changeKeyword: () => {},
  predictionItemClick: () => {},
  requestSearchPrediction: () => {},
  keywordPlaceholder: 'Cari Lokasi',
  locationPlaceHolder: '-',
  predictions: [
    {
      description:
        'Satelit Town Square, Jalan Raya Sukomanunggal Jaya, Sukomanunggal, Surabaya, Jawa Timur, Indonesia',
      terms: [
        {
          offset: 0,
          value: 'Satelit Town Square',
        },
        {
          offset: 1,
          value: 'Jalan Raya Sukomanunggal Raya',
        },
      ],
      place_id: 'ChIJg1vHPBz81y0RnqoxVuGVA4A',
    },
    {
      description: 'Satelit Makmur, Tanjungsari, Surabaya, Jawa Timur, Indonesia',
      terms: [
        {
          offset: 0,
          value: 'Satelit Makmur',
        },
        {
          offset: 1,
          value: 'Tanjungsari',
        },
      ],
      place_id: 'ChIJyaqq6p_-1y0RsAAIPAKBOkc',
    },
    {
      description:
        'Satelit Cell, Jalan Putat Jaya Lebar C, Putat Jaya, Surabaya, Jawa Timur, Indonesia',
      terms: [
        {
          offset: 0,
          value: 'Satelit Cell',
        },
        {
          offset: 14,
          value: 'Jalan Putat Jaya Lebar C',
        },
      ],
      place_id: 'ChIJQwx6G_f71y0RgAvi8rajdOA',
    },
  ],
  locationPlaceholder: 'Pilih Lokasi',
  onCloseIconPress: () => {},
  isFromAirport: true,
  changeIsFromAirport: () => {},
}

FilterAirport.propTypes = {
  locationFilterLabel: PropTypes.string,
  airportFilterLabel: PropTypes.string,
  placeHolderLocationFilter: PropTypes.string,
  placeHolderAirportFilter: PropTypes.string,
  location: PropTypes.string,
  startDateLabel: PropTypes.string,
  placeHolderStartDate: PropTypes.string,
  startDate: PropTypes.Date,
  durationLabel: PropTypes.string,
  placeHolderDuration: PropTypes.string,
  duration: PropTypes.number,
  startTimeLabel: PropTypes.string,
  placeHolderStartTime: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.Date,
  packageLabel: PropTypes.string,
  placeHolderPackage: PropTypes.string,
  rentPackage: PropTypes.shape({}),
  citiesData: PropTypes.arrayOf(PropTypes.shape({})),
  airportData: PropTypes.arrayOf(PropTypes.shape({})),
  border: PropTypes.bool,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  weekdaysLabel: PropTypes.arrayOf(PropTypes.string),
  monthsLabel: PropTypes.arrayOf(PropTypes.string),
  rentPackageData: PropTypes.arrayOf(PropTypes.shape({})),
  durationData: PropTypes.arrayOf(PropTypes.shape({})),
  selectedHour: PropTypes.string,
  changeSelectedHour: PropTypes.func,
  selectedMinute: PropTypes.string,
  changeSelectedMinute: PropTypes.func,
  selectedDuration: PropTypes.shape({}),
  changeSelectedDuration: PropTypes.func,
  selectedDurationIndex: PropTypes.number,
  changeSelectedDurationIndex: PropTypes.func,
  selectedPackage: PropTypes.shape({}),
  changeSelectedPackage: PropTypes.func,
  selectedPackageIndex: PropTypes.number,
  changeSelectedPackageIndex: PropTypes.func,
  selectedCity: PropTypes.shape({}),
  changeSelectedCity: PropTypes.func,
  selectedAddress: PropTypes.shape({}),
  changeSelectedAddress: PropTypes.func,
  selectedAirport: PropTypes.shape({}),
  changeSelectedAirport: PropTypes.func,
  selectedDate: PropTypes.Date,
  changeSelectedDate: PropTypes.func,
  timeSufix: PropTypes.string,
  footer: PropTypes.bool,
  startRentLabel: PropTypes.string,
  endRentLabel: PropTypes.string,
  searchButtonEnabled: PropTypes.bool,
  searchButtonLabel: PropTypes.string,
  onSearchButtonPress: PropTypes.func,
  isStartTime: PropTypes.bool,
  isPackage: PropTypes.bool,
  onSaveTime: PropTypes.func,
  onSaveDate: PropTypes.func,
  items: PropTypes.shape({}),
  isFromAirport: PropTypes.bool,
  changeIsFromAirport: PropTypes.func,
}
