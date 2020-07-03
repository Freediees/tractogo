import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import FilterAirport from 'components/molecules/filterAirport'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import { Fonts, Colors, Padding } from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function AirportFilterScreen({
  onIconLeftPress,
  onSearchButtonPress,
  title,
  tab1Label,
  tab2Label,
  searchButtonLabel,
  locationFilterLabel,
  placeHolderLocationFilter,
  placeHolderAirportFilter,
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
  selectedAirport,
  changeSelectedAirport,
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
  keyword,
  changeKeyword,
  predictionItemClick,
  requestSearchPrediction,
  keywordPlaceholder,
  locationPlaceHolder,
  predictions,
  items,
  changeItems,
  onCloseIconPress,
  changeSelectedAddress,
  isFromAirport,
  changeIsFromAirport,
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <DefaultHeader title={title} iconLeft={backIcon} onIconLeftPress={onIconLeftPress} />
      <View style={{ flex: 9 }}>
        <View style={{ flex: 1, ...Padding.pv_20, ...Padding.ph_20 }} tabLabel={tab1Label}>
          <FilterAirport
            onSaveDate={onSaveDate}
            onSaveTime={onSaveTime}
            locationFilterLabel={locationFilterLabel}
            placeHolderLocationFilter={placeHolderLocationFilter}
            placeHolderAirportFilter={placeHolderAirportFilter}
            startDateLabel={startDateLabel}
            placeHolderStartDate={placeHolderStartDate}
            durationLabel={durationLabel}
            placeHolderDuration={placeHolderDuration}
            startTimeLabel={startTimeLabel}
            placeHolderStartTime={placeHolderStartTime}
            packageLabel={packageLabel}
            placeHolderPackage={placeHolderPackage}
            airportData={airportData}
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
            citiesData={citiesData}
            changeSelectedCity={changeSelectedCity}
            selectedAirport={selectedAirport}
            changeSelectedAirport={changeSelectedAirport}
            selectedDate={selectedDate}
            changeSelectedDate={changeSelectedDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            timeSufix={timeSufix}
            startRentLabel={startRentLabel}
            endRentLabel={endRentLabel}
            items={items}
            changeItems={changeItems}
            keyword={keyword}
            changeKeyword={changeKeyword}
            predictionItemClick={predictionItemClick}
            requestSearchPrediction={requestSearchPrediction}
            keywordPlaceholder={keywordPlaceholder}
            predictions={predictions}
            isFromAirport={isFromAirport}
            changeIsFromAirport={changeIsFromAirport}
            onCloseIconPress={onCloseIconPress}
            changeSelectedAddress={changeSelectedAddress}
          />
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={searchButtonLabel} onButtonPress={onSearchButtonPress} />
      </View>
    </View>
  )
}

AirportFilterScreen.defaultProps = {
  onIconLeftPress: () => {},
  onSearchButtonPress: () => {},
  onChangeTab: () => {},
  title: 'Airport Transfer',
  searchButtonLabel: 'Search Car',
  locationFilterLabel: 'Area / Address',
  placeHolderLocationFilter: 'Pilih Kota Sewa',
  placeHolderAirportFilter: 'Pilih Bandara',
  startDateLabel: 'Pick-up Date',
  placeHolderStartDate: 'Choose Date',
  startTimeLabel: 'Pick-up Time',
  placeHolderStartTime: 'Choose Time',
  durationLabel: 'Duration',
  placeHolderDuration: 'Pilih Durasi',
  packageLabel: 'Rental Package',
  placeHolderPackage: 'Rental Package',
  citiesData: [],
  airportData: [],
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
  selectedAirport: null,
  changeSelectedAirport: () => {},
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
  isFromAirport: true,
  changeIsFromAirport: () => {},
}

AirportFilterScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onChangeTab: PropTypes.func,
  onSearchButtonPress: PropTypes.func,
  title: PropTypes.string,
  tab1Label: PropTypes.string,
  tab2Label: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  locationFilterLabel: PropTypes.string,
  placeHolderLocationFilter: PropTypes.string,
  placeHolderAirportFilter: PropTypes.string,
  startDateLabel: PropTypes.string,
  placeHolderStartDate: PropTypes.string,
  durationLabel: PropTypes.string,
  placeHolderDuration: PropTypes.string,
  startTimeLabel: PropTypes.string,
  placeHolderStartTime: PropTypes.string,
  packageLabel: PropTypes.string,
  placeHolderPackage: PropTypes.string,
  citiesData: PropTypes.arrayOf(PropTypes.shape({})),
  airportData: PropTypes.arrayOf(PropTypes.shape({})),
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
  changeSelectedAirport: PropTypes.func,
  isFromAirport: PropTypes.bool,
  changeIsFromAirport: PropTypes.func,
}
