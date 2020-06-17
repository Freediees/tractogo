import React, { useState, useEffect, useCallback } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import CarListScreenActions from 'scenes/carListScreen/store/actions'
import CarRentalFilterScreen from 'components/organism/carRentalFilterScreen'
import { saveFilterFunc, saveFilterObject, getFilterObject, pad } from 'function'
import { RENTAL_TIMEBASE, SERVICE_ID_SELF_DRIVE, SERVICE_ID_WITH_DRIVER } from 'config'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const FilterScreen = ({
  navigation,
  cityCoverages,
  cityCoveragesIsLoading,
  cityCoveragesErrorMessage,
  fetchCityCoverages,
  rentDurations,
  rentDurationsIsLoading,
  rentDurationsErrorMessage,
  fetchRentDurations,
  adjustmentRetails,
  adjustmentRetailsIsLoading,
  adjustmentRetailsErrorMessage,
  fetchAdjustmentRetails,
  rentPackages,
  selectedHour,
  selectedMinute,
  selectedCity,
  selectedDate,
  selectedPackage,
  selectedPackageIndex,
  durations,
  selectedDuration,
  selectedDurationIndex,
  endDate,
  activeTab,
  productId,
  changeRentPackages,
  changeSelectedHour,
  changeSelectedMinute,
  changeSelectedCity,
  changeSelectedDate,
  changeSelectedPackage,
  changeSelectedPackageIndex,
  changeDurations,
  changeSelectedDuration,
  changeSelectedDurationIndex,
  changeEndDate,
  changeActiveTab,
  changeProductId,
  resetState,
}) => {
  const [updated, changeUpdated] = useState(false)
  const [initReady, changeInit] = useState(false)

  const [maxOrderTime, changeMaxOrderTime] = useState('00:00')

  const forceUpdate = useForceUpdate()

  useEffect(() => {
    async function initialize() {
      changeDate(Moment(selectedDate))
      fetchCityCoverages()
      fetchRentDurations()
      initMaxOrderTime()
      changeInit(true)
      changeActiveTab(0)
      reloadRentPackage()
    }
    initialize()
  }, [])

  const initMaxOrderTime = async () => {
    const prdID = await AsyncStorage.getItem('prdID')
    changeProductId(prdID)
    fetchAdjustmentRetails()
    adjustmentRetails.forEach((v, i) => {
      if (v.MsProductId === prdID) {
        changeMaxOrderTime(v.MaxOrderTime)
      }
    })
  }

  const reloadRentPackage = () => {
    const arrTemp = []
    rentDurations.forEach((v) => {
      const newData = {
        leftLabel: v.Name,
        rightLabel: `${selectedHour}.${selectedMinute} - ${pad(
          parseInt(selectedHour) + parseInt(v.Duration) >= 24
            ? parseInt(selectedHour) + parseInt(v.Duration) - 24
            : parseInt(selectedHour) + parseInt(v.Duration),
          2
        )}.${selectedMinute}`,
        item: v,
      }
      arrTemp.push(newData)
    })
    console.log(arrTemp)
    changeRentPackages(arrTemp)
    changeSelectedPackage(arrTemp[selectedPackageIndex])
  }

  const changeSelectedDurationFunc = (duration) => {
    console.log('change duration')
    console.log(selectedDate)
    console.log(duration)
    changeSelectedDuration(duration)
    if (duration && duration.item) {
      changeEndDate(duration.item.date)
    }
  }

  const changeDate = (date) => {
    console.log('change date')
    changeSelectedDate(date._d)
    console.log(date._d)
    console.log(selectedDate)
    // if (selectedDuration && selectedDuration.item) {
    //   console.log(selectedDate)
    //   console.log(selectedDuration)
    //   console.log(selectedPackage)
    //   let pastDay = 0
    //   const tempDate = new Date(selectedDate).getTime()
    //   if (tempDate.getHours + parseInt(selectedPackage.item.Duration) >= 24) {
    //     pastDay = 1
    //     console.log('past day')
    //   }
    //   console.log('end date')
    //   console.log(endDate)
    // }
    onChangeDate(date._d)
    forceUpdate()
  }

  const onChangeDate = (date) => {
    const newDurationsArr = []
    for (let i = 1; i <= 10; i++) {
      let pastDay = 0
      const tempDate = new Date(date)
      if (selectedPackage && selectedPackage.item && selectedPackage.item.Duration) {
        if (parseInt(tempDate.getHours()) + parseInt(selectedPackage.item.Duration) >= 24) {
          pastDay = 1
        }
      }
      const newDuration = {
        leftLabel: `${i} Hari`,
        rightLabel: `Pengembalian ${Moment(
          new Date(new Date(date).getTime() + (i + parseInt(pastDay) - 1) * 86400000)
        ).format('dddd, DD MMMM YYYY')}`,
        item: {
          value: i,
          endDate: new Date(date).getDate() + i,
          date: new Date(new Date(date).getTime() + (i + parseInt(pastDay) - 1) * 86400000),
        },
      }
      console.log(date)
      console.log(newDuration)
      newDurationsArr.push(newDuration)
    }
    console.log('index' + selectedDurationIndex)
    changeDurations(newDurationsArr)
    changeSelectedDuration(newDurationsArr[selectedDurationIndex])
  }

  const onSaveDate = () => {
    const newDurationsArr = []
    for (let i = 1; i <= 10; i++) {
      let pastDay = 0
      const tempDate = new Date(selectedDate)
      if (selectedPackage && selectedPackage.item) {
        if (parseInt(tempDate.getHours()) + parseInt(selectedPackage.item.Duration) >= 24) {
          pastDay = 1
        }
      }
      const newDuration = {
        leftLabel: `${i} Hari`,
        rightLabel: `Pengembalian ${Moment(
          new Date(new Date(selectedDate).getTime() + (i + parseInt(pastDay) - 1) * 86400000)
        ).format('dddd, DD MMMM YYYY')}`,
        item: {
          value: i,
          endDate: new Date(selectedDate).getDate() + i,
          date: new Date(new Date(selectedDate).getTime() + (i + parseInt(pastDay) - 1) * 86400000),
        },
      }
      console.log(selectedDate)
      console.log(newDuration)
      newDurationsArr.push(newDuration)
    }
    console.log('index' + selectedDurationIndex)
    changeDurations(newDurationsArr)
    changeSelectedDurationFunc(newDurationsArr[selectedDurationIndex])
  }

  const onChangePackage = (data) => {
    const newDurationsArr = []
    for (let i = 1; i <= 10; i++) {
      let pastDay = 0
      const tempDate = new Date(selectedDate)
      if (parseInt(tempDate.getHours()) + parseInt(data.item.Duration) >= 24) {
          pastDay = 1
        }
      
      const newDuration = {
        leftLabel: `${i} Hari`,
        rightLabel: `Pengembalian ${Moment(
          new Date(new Date(selectedDate).getTime() + (i + parseInt(pastDay) - 1) * 86400000)
        ).format('dddd, DD MMMM YYYY')}`,
        item: {
          value: i,
          endDate: new Date(selectedDate).getDate() + i,
          date: new Date(new Date(selectedDate).getTime() + (i + parseInt(pastDay) - 1) * 86400000),
        },
      }
      console.log(selectedDate)
      console.log(newDuration)
      newDurationsArr.push(newDuration)
    }
    console.log('index' + selectedDurationIndex)
    changeDurations(newDurationsArr)
    changeSelectedDurationFunc(newDurationsArr[selectedDurationIndex])
  }

  const changeTab = (i) => {
    changeActiveTab(i.i)
  }

  const changeHour = async (hour) => {
    changeSelectedHour(hour)
    reloadRentPackage()
    forceUpdate()
  }

  const changeMinute = async (minute) => {
    changeSelectedMinute(minute)
    reloadRentPackage()
    forceUpdate()
  }

  const changePackage = async (data) => {
    console.log('start change package')
    changeSelectedPackage(data)
    onChangePackage(data)
    console.log('end change package')
  }

  const searchCar = () => {
    if (!selectedCity.cityName) {
      Alert.alert('Pilih Kota Terlebih Dahulu')
      return
    }
    if (!selectedHour || !selectedMinute) {
      Alert.alert('Pilih Waktu terlebih dahulu')
      return
    }
    if (!selectedPackage && activeTab === 0) {
      Alert.alert('Pilih Paket terlebih dahulu')
      return
    } else {
      changeSelectedPackage(rentPackages[0])
      changeSelectedPackageIndex(0)
    }
    if (!selectedDuration) {
      Alert.alert('Pilih Durasi terlebih dahulu')
      return
    }

    const start = new Date(selectedDate)
    start.setHours(selectedHour)
    start.setMinutes(selectedMinute)
    start.setSeconds(0)
    const end = new Date(endDate)
    end.setHours(selectedHour)
    end.setMinutes(selectedMinute)
    end.setSeconds(0)
    const dateNow = new Date()
    const tempDateNow = new Date()
    const timeMax = maxOrderTime.split(':')
    dateNow.setTime(
      dateNow.getTime() +
        (parseInt(timeMax[0]) || 0 * 60 * 60 * 1000) +
        (parseInt(timeMax[1]) || 0 * 60 * 1000)
    )
    const maxTime = new Date(dateNow)
    if (start.getDate() === tempDateNow.getDate()) {
      if (start.getHours() <= tempDateNow.getHours()) {
        Alert.alert('Waktu untuk hari ini tidak bisa lebih rendah dari waktu sekarang.')
        initMaxOrderTime()
        return
      }
      if (start.getTime() >= dateNow.getTime()) {
        /*
        Alert.alert(
          'Batas Waktu Order Sudah habis, coba tekan tombol cari lagi, atau hubungi customer support'
        )
        initMaxOrderTime()
        return
        */
      }
    }
    const payload = {
      startDate: Moment(start, 'UTC')
        .utc()
        .format(),
      endDate: Moment(end, 'UTC')
        .utc()
        .format(),
      buId: selectedCity.item.BusinessUnitId,
      branchId: selectedCity.item.BranchId,
      serviceTypeId: RENTAL_TIMEBASE,
      cityId: selectedCity.item.CityId,
      isWithDriver: activeTab === 1 ? '0' : '1',
      productServiceId: activeTab === 1 ? SERVICE_ID_SELF_DRIVE : SERVICE_ID_WITH_DRIVER,
      rentalPackage: activeTab === 1 ? '24' : selectedPackage.item.Duration,
      rentalDuration: activeTab === 1 ? '24' : selectedDuration.item.value.toString(),
    }
    console.log(payload)
    saveFilterFunc(payload)
    const selectedDateObj = new Date(selectedDate)
    selectedDateObj.setHours(0)
    selectedDateObj.setMinutes(0)
    selectedDateObj.setSeconds(0)
    const selectedEndDateObj = new Date(endDate)
    selectedEndDateObj.setHours(0)
    selectedEndDateObj.setMinutes(0)
    selectedEndDateObj.setSeconds(0)
    saveFilterObject({
      selectedCity: selectedCity,
      selectedDate: selectedDateObj,
      selectedEndDate: selectedEndDateObj,
      selectedDuration: selectedDuration,
      selectedDurationIndex: selectedDurationIndex,
      selectedPackage: activeTab === 1 ? rentPackages[0] : selectedPackage,
      selectedPackageIndex: activeTab === 1 ? 0 : selectedPackageIndex,
      selectedHour: selectedHour,
      selectedMinute: selectedMinute,
    })
    resetState()
    navigation.navigate('CarListForm', {
      withDriver: activeTab !== 1,
    })
  }

  return (
    <CarRentalFilterScreen
      onChangeTab={changeTab}
      endDate={endDate}
      citiesData={cityCoverages}
      durationData={durations}
      rentPackageData={rentPackages}
      selectedHour={selectedHour}
      changeSelectedHour={changeHour}
      selectedMinute={selectedMinute}
      changeSelectedMinute={changeMinute}
      selectedDuration={selectedDuration}
      changeSelectedDuration={changeSelectedDurationFunc}
      selectedDurationIndex={selectedDurationIndex}
      changeSelectedDurationIndex={changeSelectedDurationIndex}
      selectedPackage={selectedPackage}
      changeSelectedPackage={async (data) => {
        console.log(selectedDuration)
        changePackage(data)
        // changeDate(Moment(selectedDate))
        // console.log('new end date' + new Date(new Date(selectedDate).getTime() + (parseInt(selectedDuration && selectedDuration.item ? selectedDuration.item.value : 0)) * parseInt(data.item.Duration) * 3600000))
        // changeEndDate(new Date(new Date(selectedDate).getTime() + (parseInt(selectedDuration && selectedDuration.item ? selectedDuration.item.value : 0)) * parseInt(data.item.Duration) * 3600000))
      }}
      selectedPackageIndex={selectedPackageIndex}
      changeSelectedPackageIndex={changeSelectedPackageIndex}
      selectedCity={selectedCity}
      changeSelectedCity={changeSelectedCity}
      selectedDate={selectedDate}
      changeSelectedDate={(date) => {
        changeDate(date)
      }}
      onSearchButtonPress={() => searchCar()}
      onIconLeftPress={() => navigation.goBack()}
      onSaveTime={() => reloadRentPackage()}
      onSaveDate={() => onSaveDate()}
    />
  )
}

FilterScreen.defaultProps = {
  cityCoverages: [],
}

FilterScreen.propTypes = {
  cityCoverages: PropTypes.arrayOf(PropTypes.shape({})),
  cityCoveragesIsLoading: PropTypes.bool,
  cityCoveragesErrorMessage: PropTypes.string,
  fetchCityCoverages: PropTypes.func,
  rentDurations: PropTypes.arrayOf(PropTypes.shape({})),
  rentDurationsIsLoading: PropTypes.bool,
  rentDurationsErrorMessage: PropTypes.string,
  fetchRentDurations: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  adjustmentRetails: PropTypes.arrayOf(PropTypes.shape({})),
  adjustmentRetailsIsLoading: PropTypes.bool,
  adjustmentRetailsErrorMessage: PropTypes.string,
  rentPackages: PropTypes.arrayOf(PropTypes.shape({})),
  selectedHour: PropTypes.string,
  selectedMinute: PropTypes.string,
  selectedCity: PropTypes.shape({}),
  selectedDate: PropTypes.date,
  selectedPackage: PropTypes.shape({}),
  selectedPackageIndex: PropTypes.number,
  durations: PropTypes.arrayOf(PropTypes.shape({})),
  selectedDuration: PropTypes.shape({}),
  selectedDurationIndex: PropTypes.number,
  endDate: PropTypes.date,
  activeTab: PropTypes.number,
  productId: PropTypes.string,
  changeRentPackages: PropTypes.func,
  changeSelectedHour: PropTypes.func,
  changeSelectedMinute: PropTypes.func,
  changeSelectedCity: PropTypes.func,
  changeSelectedDate: PropTypes.func,
  changeSelectedPackage: PropTypes.func,
  changeSelectedPackageIndex: PropTypes.func,
  changeDurations: PropTypes.func,
  changeSelectedDuration: PropTypes.func,
  changeSelectedDurationIndex: PropTypes.func,
  changeEndDate: PropTypes.func,
  changeActiveTab: PropTypes.func,
  changeProductId: PropTypes.func,
  resetState: PropTypes.func,
}

const mapStateToProps = (state) => ({
  cityCoverages: state.filter.cityCoverages,
  cityCoveragesIsLoading: state.filter.cityCoveragesIsLoading,
  cityCoveragesErrorMessage: state.filter.cityCoveragesErrorMessage,
  rentDurations: state.filter.rentDurations,
  rentDurationsIsLoading: state.filter.rentDurationsIsLoading,
  rentDurationsErrorMessage: state.filter.rentDurationsErrorMessage,
  adjustmentRetails: state.filter.adjustmentRetails,
  adjustmentRetailsIsLoading: state.filter.adjustmentRetailsIsLoading,
  adjustmentRetailsErrorMessage: state.filter.adjustmentRetailsErrorMessage,
  rentPackages: state.filter.rentPackages,
  selectedHour: state.filter.selectedHour,
  selectedMinute: state.filter.selectedMinute,
  selectedCity: state.filter.selectedCity,
  selectedDate: state.filter.selectedDate,
  selectedPackage: state.filter.selectedPackage,
  selectedPackageIndex: state.filter.selectedPackageIndex,
  durations: state.filter.durations,
  selectedDuration: state.filter.selectedDuration,
  selectedDurationIndex: state.filter.selectedDurationIndex,
  endDate: state.filter.endDate,
  activeTab: state.filter.activeTab,
  productId: state.filter.productId,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCityCoverages: () => dispatch(CarFilterScreenActions.fetchCityCoverages()),
  fetchRentDurations: () => dispatch(CarFilterScreenActions.fetchRentDurations()),
  fetchAdjustmentRetails: () => dispatch(CarFilterScreenActions.fetchAdjustmentRetails()),
  changeRentPackages: (payload) => dispatch(CarFilterScreenActions.changeRentPackages(payload)),
  changeSelectedHour: (payload) => dispatch(CarFilterScreenActions.changeSelectedHour(payload)),
  changeSelectedMinute: (payload) => dispatch(CarFilterScreenActions.changeSelectedMinute(payload)),
  changeSelectedCity: (payload) => dispatch(CarFilterScreenActions.changeSelectedCity(payload)),
  changeSelectedDate: (payload) => dispatch(CarFilterScreenActions.changeSelectedDate(payload)),
  changeSelectedPackage: (payload) =>
    dispatch(CarFilterScreenActions.changeSelectedPackage(payload)),
  changeSelectedPackageIndex: (payload) =>
    dispatch(CarFilterScreenActions.changeSelectedPackageIndex(payload)),
  changeDurations: (payload) => dispatch(CarFilterScreenActions.changeDurations(payload)),
  changeSelectedDuration: (payload) =>
    dispatch(CarFilterScreenActions.changeSelectedDuration(payload)),
  changeSelectedDurationIndex: (payload) =>
    dispatch(CarFilterScreenActions.changeSelectedDurationIndex(payload)),
  changeEndDate: (payload) => dispatch(CarFilterScreenActions.changeEndDate(payload)),
  changeActiveTab: (payload) => dispatch(CarFilterScreenActions.changeActiveTab(payload)),
  changeProductId: (payload) => dispatch(CarFilterScreenActions.changeProductId(payload)),
  resetState: () => dispatch(CarListScreenActions.resetState()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterScreen)
