import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import OTPInput from 'components/atom/oTPInput'
import DefaultHeader from 'components/molecules/defaultHeader'
import CustomTopSheet from 'components/molecules/customTopSheet'
import FilterArea from 'components/molecules/filterArea'
import ListViewCardItem from 'components/molecules/listViewCardItem'
import SortFilterButton from 'components/molecules/sortFilterButton'

import { Column, Margin, Fonts, Colors, Padding, Row } from 'theme'

import backIcon from 'icons/ic-back.svg'
import editIcon from 'icons/ic-edit.svg'

export default function ProductListScreen({
  onIconLeftPress,
  title,
  subtitle,
  searchTitle,
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
  searchButtonLabel,
  onSearchButtonPress,
  items,
  sortLabel,
  filterLabel,
  onSortPress,
  onFilterPress,
  sortItems,
  selectedSortItem,
  selectedSortIndex,
  changeSelectedSortItem,
  buttonCloseLabel,
  selectedMin,
  selectedMax,
  changeSelectedMin,
  changeSelectedMax,
  minRange,
  maxRange,
  chipItems,
  selectedChipItem,
  selectedChipIndex,
  onSelectChipItem,
  sortTitleLabel,
  filterTitleLabel,
  rangeFilterLabel,
  chipPickerLabel,
  isPackage,
  isDriver,
  itemsLoading,
  onSaveDate,
  onSaveTime,
  isAirport,
}) {
  const [modalVisible, changeModalVisible] = useState(false)

  return (
    <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
      <DefaultHeader
        border={true}
        title={title}
        subtitle={subtitle}
        iconLeft={backIcon}
        iconRight={!isAirport ? editIcon : null}
        onIconRightPress={!isAirport ? () => changeModalVisible(true) : null}
        onIconLeftPress={onIconLeftPress}
      />
      <CustomTopSheet
        modalVisible={modalVisible}
        changeModalVisible={changeModalVisible}
        title={searchTitle}
      >
        <FilterArea
          onSaveDate={onSaveDate}
          onSaveTime={onSaveTime}
          border={false}
          footer={false}
          searchButtonEnabled={true}
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
          cities={citiesData}
          rentPackageData={rentPackageData}
          durationData={durationData}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          weekdaysLabel={weekdaysLabel}
          monthsLabel={monthsLabel}
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
          timeSufix={timeSufix}
          minDate={minDate}
          maxDate={maxDate}
          endDate={endDate}
          searchButtonLabel={searchButtonLabel}
          isPackage={isPackage}
          onSearchButtonPress={() => {
            onSearchButtonPress()
            changeModalVisible(false)
          }}
        />
      </CustomTopSheet>
      <View style={{ flex: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <ListViewCardItem items={items} isLoading={itemsLoading} isDriver={isDriver} />
        <SortFilterButton
          sortLabel={sortLabel}
          filterLabel={filterLabel}
          onSortPress={onSortPress}
          onFilterPress={onFilterPress}
          sortItems={sortItems}
          selectedSortItem={selectedSortItem}
          selectedSortIndex={selectedSortIndex}
          changeSelectedSortItem={changeSelectedSortItem}
          buttonCloseLabel={buttonCloseLabel}
          selectedMin={selectedMin}
          selectedMax={selectedMax}
          changeSelectedMin={changeSelectedMin}
          changeSelectedMax={changeSelectedMax}
          minRange={minRange}
          maxRange={maxRange}
          chipItems={chipItems}
          selectedChipItem={selectedChipItem}
          selectedChipIndex={selectedChipIndex}
          onSelectChipItem={onSelectChipItem}
          sortTitleLabel={sortTitleLabel}
          filterTitleLabel={filterTitleLabel}
          rangeFilterLabel={rangeFilterLabel}
          chipPickerLabel={chipPickerLabel}
        />
      </View>
    </View>
  )
}

ProductListScreen.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Sewa Mobil di Bandung',
  subtitle: 'Senin, 26 Jan - 27 Jan 2020 | 12 Jam',
  searchTitle: 'Ubah Pencarian',
  searchButtonLabel: 'Cari Mobil',
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
  endDate: new Date().getTime() + 864000000,
  minDate: new Date(),
  maxDate: new Date().getTime() + 864000000,
  timeSufix: 'WIB',
  onSearchButtonPress: () => {},
  items: [],
  sortLabel: 'Urutkan',
  filterLabel: 'Filter',
  onSortPress: () => {},
  onFilterPress: () => {},
  style: {},
  sortItems: [
    {
      value: 0,
      label: 'Harga Terendah',
    },
    {
      value: 1,
      label: 'Harga Tertinggi',
    },
    {
      value: 2,
      label: 'Kapasitas Penumpang Terkecil',
    },
    {
      value: 3,
      label: 'Kapasitas Penumpang Terbesar',
    },
  ],
  selectedSortItem: {
    value: 0,
    label: 'Harga Terendah',
  },
  selectedSortIndex: 0,
  changeSelectedSortItem: () => {},
  buttonCloseLabel: 'Tutup',
  selectedMin: 200000,
  selectedMax: 400000,
  changeSelectedMin: () => {},
  changeSelectedMax: () => {},
  minRange: 0,
  maxRange: 1000000,
  chipItems: [
    {
      value: 0,
      label: 'Semua',
    },
    {
      value: 1,
      label: '4 Penumpang',
    },
    {
      value: 2,
      label: '5-6 Penumpang',
    },
    {
      value: 3,
      label: '> 6 Penumpang',
    },
  ],
  selectedChipItem: {
    value: 0,
    label: 'Semua',
  },
  selectedChipIndex: 0,
  onSelectChipItem: () => {},
  sortTitleLabel: 'Urutkan Berdasarkan',
  filterTitleLabel: 'Filter',
  rangeFilterLabel: 'Kisaran Harga per Hari',
  chipPickerLabel: 'Kapasitas Penumpang',
  isPackage: true,
  isDriver: true,
  onSaveDate: () => {},
  onSaveTime: () => {},
  isAirport: false,
}

ProductListScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  searchTitle: PropTypes.string,
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
  onSearchButtonPress: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  sortLabel: PropTypes.string,
  filterLabel: PropTypes.string,
  onSortPress: PropTypes.func,
  onFilterPress: PropTypes.func,
  style: PropTypes.shape({}),
  sortItems: PropTypes.arrayOf(PropTypes.shape({})),
  selectedSortItem: PropTypes.shape({}),
  selectedSortIndex: PropTypes.number,
  changeSelectedSortItem: PropTypes.func,
  buttonCloseLabel: PropTypes.string,
  selectedMin: PropTypes.number,
  selectedMax: PropTypes.number,
  changeSelectedMin: PropTypes.func,
  changeSelectedMax: PropTypes.func,
  minRange: PropTypes.number,
  maxRange: PropTypes.number,
  sortTitleLabel: PropTypes.string,
  filterTitleLabel: PropTypes.string,
  rangeFilterLabel: PropTypes.string,
  chipPickerLabel: PropTypes.string,
  isPackage: PropTypes.bool,
  isDriver: PropTypes.bool,
  onSaveDate: PropTypes.func,
  onSaveTime: PropTypes.func,
  isAirport: PropTypes.bool,
}
