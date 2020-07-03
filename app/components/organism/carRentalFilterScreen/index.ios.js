import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import OTPInput from 'components/atom/oTPInput'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import FilterArea from 'components/molecules/filterArea'
import PrimaryButton from 'components/atom/primaryButton'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import { Column, Margin, Fonts, Colors, Padding } from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function CarRentalFilterScreen({
  onIconLeftPress,
  onSearchButtonPress,
  title,
  tab1Label,
  tab2Label,
  searchButtonLabel,
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
  okLabel,
  cancelLabel,
  weekdaysLabel,
  monthsLabel,
  durationData,
  rentPackageData,
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
  endDate,
  minDate,
  maxDate,
  timeSufix,
  startRentLabel,
  endRentLabel,
  onChangeTab,
  onSaveTime,
  onSaveDate,
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <DefaultHeader title={title} iconLeft={backIcon} onIconLeftPress={onIconLeftPress} />
      <View style={{ flex: 9 }}>
        <ScrollableTabView onChangeTab={onChangeTab} tabBarActiveTextColor={Colors.black} tabBarTextStyle={Fonts.f_14}>
          <View style={{ flex: 1, ...Padding.pv_20, ...Padding.ph_20 }} tabLabel={tab1Label}>
            <FilterArea
              onSaveDate={onSaveDate}
              onSaveTime={onSaveTime}
              locationFilterLabel={locationFilterLabel}
              placeHolderLocationFilter={placeHolderLocationFilter}
              startDateLabel={startDateLabel}
              placeHolderStartDate={placeHolderStartDate}
              durationLabel={durationLabel}
              placeHolderDuration={placeHolderDuration}
              startTimeLabel={startTimeLabel}
              placeHolderStartTime={placeHolderStartTime}
              packageLabel={packageLabel}
              placeHolderPackage={placeHolderPackage}
              citiesData={citiesData}
              okLabel={okLabel}
              cancelLabel={cancelLabel}
              weekdaysLabel={weekdaysLabel}
              monthsLabel={monthsLabel}
              durationData={durationData}
              rentPackageData={rentPackageData}
              selectedHour={selectedHour}
              changeSelectedHour={changeSelectedHour}
              selectedMinute={selectedMinute}
              changeSelectedMinute={changeSelectedMinute}
              selectedDuration={selectedDuration}
              changeSelectedDuration={changeSelectedDuration}
              selectedDurationIndex={selectedDurationIndex}
              changeSelectedDurationIndex={changeSelectedDurationIndex}
              selectedPackage={selectedPackage}
              changeSelectedPackage={changeSelectedPackage}
              selectedPackageIndex={selectedPackageIndex}
              changeSelectedPackageIndex={changeSelectedPackageIndex}
              selectedCity={selectedCity}
              changeSelectedCity={changeSelectedCity}
              selectedDate={selectedDate}
              changeSelectedDate={changeSelectedDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              timeSufix={timeSufix}
              startRentLabel={startRentLabel}
              endRentLabel={endRentLabel}
            />
          </View>
          <View style={{ flex: 1, ...Padding.pv_20, ...Padding.ph_20 }} tabLabel={tab2Label}>
            <FilterArea
              onSaveDate={onSaveDate}
              onSaveTime={onSaveTime}
              locationFilterLabel={locationFilterLabel}
              placeHolderLocationFilter={placeHolderLocationFilter}
              startDateLabel={startDateLabel}
              placeHolderStartDate={placeHolderStartDate}
              durationLabel={durationLabel}
              placeHolderDuration={placeHolderDuration}
              startTimeLabel={startTimeLabel}
              placeHolderStartTime={placeHolderStartTime}
              packageLabel={packageLabel}
              placeHolderPackage={placeHolderPackage}
              citiesData={citiesData}
              okLabel={okLabel}
              cancelLabel={cancelLabel}
              weekdaysLabel={weekdaysLabel}
              monthsLabel={monthsLabel}
              durationData={durationData}
              rentPackageData={rentPackageData}
              selectedHour={selectedHour}
              changeSelectedHour={changeSelectedHour}
              selectedMinute={selectedMinute}
              changeSelectedMinute={changeSelectedMinute}
              selectedDuration={selectedDuration}
              changeSelectedDuration={changeSelectedDuration}
              selectedDurationIndex={selectedDurationIndex}
              changeSelectedDurationIndex={changeSelectedDurationIndex}
              selectedPackage={selectedPackage}
              changeSelectedPackage={changeSelectedPackage}
              selectedPackageIndex={selectedPackageIndex}
              changeSelectedPackageIndex={changeSelectedPackageIndex}
              selectedCity={selectedCity}
              changeSelectedCity={changeSelectedCity}
              selectedDate={selectedDate}
              changeSelectedDate={changeSelectedDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              timeSufix={timeSufix}
              startRentLabel={startRentLabel}
              endRentLabel={endRentLabel}
              isPackage={false}
            />
          </View>
        </ScrollableTabView>
      </View>
      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={searchButtonLabel} onButtonPress={onSearchButtonPress} />
      </View>
    </View>
  )
}

CarRentalFilterScreen.defaultProps = {
  onIconLeftPress: () => {},
  onSearchButtonPress: () => {},
  onChangeTab: () => {},
  title: 'Car Rental',
  tab1Label: 'With Driver',
  tab2Label: 'Self Drive',
  searchButtonLabel: 'Search Car',
  locationFilterLabel: 'Pick-up City',
  placeHolderLocationFilter: 'Pilih Kota Sewa',
  startDateLabel: 'Pick-up Date',
  placeHolderStartDate: 'Pilih Tanggal Mulai',
  durationLabel: 'Duration',
  placeHolderDuration: 'Pilih Durasi',
  startTimeLabel: 'Pick-up Time',
  placeHolderStartTime: 'Pick-up Time',
  packageLabel: 'Rental Package',
  placeHolderPackage: 'Rental Package',
  citiesData: [],
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
      leftLabel: '4 Hour',
      rightLabel: '09.00 - 13.00 WIB',
    },
    {
      leftLabel: '8 Hour',
      rightLabel: '09.00 - 17.00 WIB',
    },
    {
      leftLabel: '10 Hour',
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
    leftLabel: '4 Hour',
    rightLabel: '09.00 - 13.00 WIB',
  },
  changeSelectedPackage: () => {},
  selectedPackageIndex: 0,
  changeSelectedPackageIndex: () => {},
  selectedCity: null,
  changeSelectedCity: () => {},
  selectedDate: new Date(),
  changeSelectedDate: () => {},
  endDate: new Date().getTime(),
  minDate: new Date(),
  maxDate: null,
  timeSufix: 'WIB',
  startRentLabel: 'Pick-up',
  endRentLabel: 'Drop-off',
  onSaveTime: () => {},
  onSaveDate: () => {},
}

CarRentalFilterScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onChangeTab: PropTypes.func,
  onSearchButtonPress: PropTypes.func,
  title: PropTypes.string,
  tab1Label: PropTypes.string,
  tab2Label: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  locationFilterLabel: PropTypes.string,
  placeHolderLocationFilter: PropTypes.string,
  startDateLabel: PropTypes.string,
  placeHolderStartDate: PropTypes.string,
  durationLabel: PropTypes.string,
  placeHolderDuration: PropTypes.string,
  startTimeLabel: PropTypes.string,
  placeHolderStartTime: PropTypes.string,
  packageLabel: PropTypes.string,
  placeHolderPackage: PropTypes.string,
  citiesData: PropTypes.arrayOf(PropTypes.shape({})),
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  weekdaysLabel: PropTypes.arrayOf(PropTypes.string),
  monthsLabel: PropTypes.arrayOf(PropTypes.string),
  durationData: PropTypes.arrayOf(PropTypes.shape({})),
  rentPackageData: PropTypes.arrayOf(PropTypes.shape({})),
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
  selectedCity: PropTypes.string,
  changeSelectedCity: PropTypes.func,
  selectedDate: PropTypes.Date,
  changeSelectedDate: PropTypes.func,
  endDate: PropTypes.Date,
  minDate: PropTypes.Date,
  maxDate: PropTypes.Date,
  timeSufix: PropTypes.string,
  startRentLabel: PropTypes.string,
  endRentLabel: PropTypes.string,
  onSaveTime: PropTypes.func,
  onSaveDate: PropTypes.func,
}
