import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import { Margin, Fonts, Padding, Colors, Row, Column, Border } from 'theme'

import CustomBottomSheet from 'components/molecules/customBottomSheet'
import Separator from 'components/atom/separator'

import locationIcon from 'icons/ic-filter1.svg'
import startTimeIcon from 'icons/ic-filter2.svg'
import dateIcon from 'icons/ic-filter3.svg'
import durationIcon from 'icons/ic-filter4.svg'
import packageIcon from 'icons/ic-filter5.svg'
import CustomCalendarPicker from 'components/atom/customCalendarPicker'
import PrimaryButton from 'components/atom/primaryButton'
import CustomTimePicker from 'components/atom/customTimePicker'
import CustomCityPicker from 'components/atom/customCityPicker'
import CustomItemPicker from 'components/atom/customItemPicker'
import IconButton from 'components/atom/iconButton'
import iconClose from 'icons/ic-close.svg'
import iconCTANext from 'icons/ic-right-arrow.svg'



export default function FilterArea({
  locationFilterLabel,
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
  selectedCity,
  changeSelectedCity,
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
}) {
  let bsDate = null
  let bsDuration = null
  let bsTimePicker = null
  let bsPackage = null

  const [modalVisible, changeModalVisible] = useState(false)

  const onCityClick = (city) => {
    changeSelectedCity(city)
    changeModalVisible(false)
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
              {Moment(selectedDate)
                .format('dddd, DD MMM')}
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

  const footerStyle = {
    ...Row.row_1_25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    <View style={{ ...Row.row_4, width: '100%' }}>
      <View style={getBorderStyle()}>
        <View style={{ width: '100%' }}>
          <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey }}>{locationFilterLabel}</Text>
          <TouchableOpacity onPress={() => changeModalVisible(true)} style={{ ...Margin.mt_12 }}>
            <View style={{ flexDirection: 'row' }}>
              <SvgXml xml={locationIcon} width={20} height={20} />
              <TextInput
                placeholder={placeHolderLocationFilter}
                editable={false}
                onPress={() => {}}
                value={selectedCity ? selectedCity.cityName : ''}
                placeholderTextColor={Colors.grey}
                style={{ ...Fonts.f_12, ...Margin.ml_8 }}
              />
            </View>
            <Separator style={{ ...Margin.mt_8 }} />
          </TouchableOpacity>
        </View>
        <View style={{ ...Margin.mt_20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, ...Margin.mr_20 }}>
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
                  placeholder={placeHolderStartDate}
                  editable={false}
                  onPress={() => {}}
                  placeholderTextColor={Colors.grey}
                  value={selectedDate ? Moment(selectedDate).format('DD MMM YYYY') : ''}
                  style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                />
              </View>
              <Separator style={{ ...Margin.mt_8 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, ...Fonts.semibold }}>
              {durationLabel}
            </Text>
            <TouchableOpacity
              style={{ ...Margin.mt_12 }}
              onPress={() => {
                bsDuration.open()
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <SvgXml xml={durationIcon} width={20} height={20} />
                <TextInput
                  placeholder={placeHolderDuration}
                  editable={false}
                  onPress={() => {}}
                  value={selectedDuration.leftLabel}
                  placeholderTextColor={Colors.grey}
                  style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                />
              </View>
              <Separator style={{ ...Margin.mt_8 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...Margin.mt_20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, ...Margin.mr_20 }}>
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
                      style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                    />
                  </View>
                  <Separator style={{ ...Margin.mt_8 }} />
                </TouchableOpacity>
              </Fragment>
            )}
          </View>
          <View style={{ flex: 1 }}>
            {isPackage && (
              <Fragment>
                <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, ...Fonts.semibold }}>
                  {packageLabel}
                </Text>
                <TouchableOpacity
                  style={{ ...Margin.mt_12 }}
                  onPress={() => {
                    bsPackage.open()
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <SvgXml xml={packageIcon} width={20} height={20} />
                    <TextInput
                      placeholder={placeHolderPackage}
                      editable={false}
                      value={selectedPackage.leftLabel}
                      onPress={() => {}}
                      placeholderTextColor={Colors.grey}
                      style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                    />
                  </View>
                  <Separator style={{ ...Margin.mt_8 }} />
                </TouchableOpacity>
              </Fragment>
            )}
          </View>
        </View>
      </View>
      {footer && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <LinearGradient colors={[Colors.light_blue, Colors.blue]} style={footerStyle}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...Fonts.f_8, ...Fonts.text_white, ...Margin.mr_20 }}>
                {startRentLabel}
              </Text>
              {selectedDate && (
                <View style={{ ...Margin.mt_4, alignItems: 'center', ...Margin.mr_20 }}>
                  <Text style={{ ...Fonts.f_16, ...Fonts.text_white }}>
                    {Moment(selectedDate).format('DD')}
                  </Text>
                  <Text style={{ ...Fonts.f_8, ...Fonts.text_white }}>
                    {Moment(selectedDate).format('dddd | MMMM')}
                  </Text>
                  <Text style={{ ...Fonts.f_8, ...Fonts.text_white }}>
                    {selectedPackage.rightLabel}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...Fonts.f_8, ...Fonts.text_white, ...Margin.ml_20 }}>
                {endRentLabel}
              </Text>
              {endDate && (
                <View style={{ ...Margin.mt_4, alignItems: 'center', ...Margin.ml_20 }}>
                  <Text style={{ ...Fonts.f_16, ...Fonts.text_white }}>
                    {Moment(endDate).format('DD')}
                  </Text>
                  <Text style={{ ...Fonts.f_8, ...Fonts.text_white }}>
                    {Moment(endDate).format('dddd | MMMM')}
                  </Text>
                  <Text style={{ ...Fonts.f_8, ...Fonts.text_white }}>
                    {selectedPackage.rightLabel}
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
          <View
            style={{
              width: '100%',
              ...Row.row_1_25,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              position: 'absolute',
            }}
          >
            <View
              style={{
                borderRadius: 8,
                height: '100%',
                borderColor: 'white',
                borderWidth: 1,
                borderStyle: 'dashed',
                width: 2,
                height: '100%',
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              ...Row.row_1_25,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              position: 'absolute',
            }}
          >
            <View
              style={{
                height: 28,
                width: 28,
                backgroundColor: Colors.white,
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SvgXml xml={iconCTANext} width={28} height={28} />
            </View>
          </View>
        </View>
      )}
      {searchButtonEnabled && (
        <View style={{ flex: 1, ...Padding.ph_20, ...Padding.pv_12 }}>
          <PrimaryButton text={searchButtonLabel} onPress={onSearchButtonPress} />
        </View>
      )}
      <CustomCityPicker
        placeholder={placeHolderLocationFilter}
        modalVisible={modalVisible}
        cities={citiesData}
        onCityClick={onCityClick}
        changeModalVisible={() => {
          changeModalVisible(false)
          changeSelectedCity({ cityName: null })
        }}
      />
      <CustomBottomSheet
        title={placeHolderStartDate}
        botSheetRef={(ref) => (bsDate = ref)}
        rightText={() => renderRightText(1)}
      >
        <CustomCalendarPicker
          onDateChange={(date) => {
            changeSelectedDate(date)
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

FilterArea.defaultProps = {
  locationFilterLabel: 'Kota Sewa',
  placeHolderLocationFilter: 'Pilih Kota Sewa',
  startDateLabel: 'Tanggal Mulai',
  placeHolderStartDate: 'Pilih Tanggal Mulai',
  durationLabel: 'Durasi',
  placeHolderDuration: 'Pilih Durasi',
  startTimeLabel: 'Waktu Mulai',
  placeHolderStartTime: 'Pilih Waktu Mulai',
  packageLabel: 'Paket Sewa',
  placeHolderPackage: 'Pilih Paket Sewa',
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
  selectedDate: new Date(),
  changeSelectedDate: () => {},
  endDate: new Date(),
  minDate: new Date(),
  maxDate: new Date().getTime() + 864000000,
  timeSufix: 'WIB',
  footer: true,
  startRentLabel: 'Mulai Sewa',
  endRentLabel: 'Akhir Sewa',
  searchButtonEnabled: false,
  searchButtonLabel: 'Cari Mobil',
  onSearchButtonPress: () => {},
  isStartTime: true,
  isPackage: true,
  onSaveTime: () => {},
  onSaveDate: () => {},
}

FilterArea.propTypes = {
  locationFilterLabel: PropTypes.string,
  placeHolderLocationFilter: PropTypes.string,
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
}
