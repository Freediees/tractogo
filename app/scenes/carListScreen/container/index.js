import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import CarListScreenActions from 'scenes/carListScreen/store/actions'
import CustomAlert from 'components/molecules/customAlert'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import ProductListScreen from 'components/organism/productListScreen'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions, StackActions } from 'react-navigation'
import { saveFilterFunc, saveFilterObject, getFilterObject, pad } from 'function'
import { RENTAL_TIMEBASE, SERVICE_ID_SELF_DRIVE, SERVICE_ID_WITH_DRIVER } from 'config'
import { getSortItems, sortStock } from 'function/sort'
import { getChipItems, filterStock } from 'function/filter'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const CarListScreen = ({
  navigation,
  stocks,
  stocksIsLoading,
  stocksErrorMessage,
  fetchStocks,
  prices,
  pricesIsLoading,
  pricesErrorMessage,
  fetchStockPrice,
  stocksWithPrice,
  stocksWithPriceIsLoading,
  stocksWithPriceErrorMessage,
  fetchStocksWithPrice,
  cityCoverages,
  cityCoveragesIsLoading,
  cityCoveragesErrorMessage,
  fetchCityCoverages,
  rentDurations,
  rentDurationsIsLoading,
  rentDurationsErrorMessage,
  fetchRentDurations,
  sortStocksWithPrice,
  filterStocksWithPrice,
  filteredStocks,
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
  alertVisible,
  changeAlertVisible,
}) => {
  const { withDriver } = navigation.state.params
  const [initReady, changeInit] = useState(false)
  const [renderMount, changeRenderMount] = useState(false)
  const [items, changeItems] = useState(false)
  const [updated, changeUpdated] = useState(false)
  const [sortItems, changeSortItems] = useState(getSortItems())
  const [selectedSortItem, changeSelectedSortItem] = useState(sortItems ? sortItems[0] : null)
  const [selectedSortIndex, changeSelectedSortIndex] = useState(0)
  const [selectedMin, changeSelectedMin] = useState(0)
  const [selectedMax, changeSelectedMax] = useState(2000000)
  const [chipItems, changeChipItems] = useState(getChipItems())
  const [selectedChipItem, changeSelectedChipItem] = useState(chipItems[0])
  const [selectedChipIndex, changeSelectedChipIndex] = useState(0)

  const forceUpdate = useForceUpdate()

  useEffect(() => {
    async function initialize() {
      // resetState()
      const withDriver = await AsyncStorage.getItem('isWithDriver')
      const payload = {
        payload: {
          BusinessUnitId: await AsyncStorage.getItem('buID'),
          StartDate: await AsyncStorage.getItem('startDate'),
          EndDate: await AsyncStorage.getItem('endDate'),
          BranchId: await AsyncStorage.getItem('branchId'),
          CityId: await AsyncStorage.getItem('cityId'),
          IsWithDriver: withDriver,
          RentalPackage: await AsyncStorage.getItem('rentalPackage'),
          RentalDuration: await AsyncStorage.getItem('rentalDuration'),
          ServiceTypeId: await AsyncStorage.getItem('serviceTypeId'),
          ValidateAttribute: '1',
        },
        forceUpdate: forceUpdate,
        changeAlertVisible: changeAlertVisible,
      }
      if (withDriver === '0') {
        payload.payload.RentalPackage = 24
        changeActiveTab(1)
      } else {
        changeActiveTab(0)
      }
      fetchStocks(payload)
      changeInit(true)
    }
    initialize()
  }, [])

  if (
    initReady &&
    !renderMount &&
    stocksWithPriceIsLoading === false &&
    stocksWithPrice.length > 0
  ) {
    changeRenderMount(true)
    changeInit(false)
    sortStocksWithPrice(stocksWithPrice, selectedSortItem.value)
    // changeFilteredStocks(stocksWithPrice)
    // console.log(stocksWithPrice)
    // sortStocksWithPrice(stocksWithPrice, selectedSortItem.value)
    // console.log('testtt')
    // }
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
    changeRentPackages(arrTemp)
    changeSelectedPackage(arrTemp[selectedPackageIndex])
  }

  const changePackage = async (data) => {
    console.log('start change package')
    changeSelectedPackage(data)
    onChangePackage(data)
    console.log('end change package')
    forceUpdate()
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
    if (selectedDurationIndex !== -1 || selectedDurationIndex !== '-1') {
      changeSelectedDuration(newDurationsArr[selectedDurationIndex])
    }
  }

  const changeHour = (hour) => {
    changeSelectedHour(hour)
  }

  const changeMinute = (minute) => {
    changeSelectedMinute(minute)
  }

  if (!updated && initReady) {
    forceUpdate()
    changeUpdated(true)
    reloadRentPackage()
  }

  if (stocksWithPrice && !stocksWithPriceIsLoading && !items) {
    changeItems(true)
  }

  const searchCar = async () => {
    if (!selectedCity.cityName) {
      Alert.alert('Pilih Kota Terlebih Dahulu')
      return
    }
    if (!selectedHour || !selectedMinute) {
      Alert.alert('Pilih Waktu terlebih dahulu')
      return
    }
    if (activeTab === 1 || activeTab === '1') {
      changeSelectedPackage(rentPackages[0])
      changeSelectedPackageIndex(0)
    } else {
      if (!selectedPackage || !selectedPackage.item || !selectedPackage.item.Duration) {
        Alert.alert('Pilih Paket terlebih dahulu')
        return
      }
    }
    if (selectedDurationIndex === -1 || selectedDurationIndex === '-1') {
      Alert.alert('Pilih Durasi terlebih dahulu')
      return
    }
    console.log(endDate)
    const start = new Date(selectedDate)
    start.setHours(selectedHour)
    start.setMinutes(selectedMinute)
    start.setSeconds(0)
    const end = new Date(endDate)
    end.setHours(selectedHour)
    end.setMinutes(selectedMinute)
    end.setSeconds(0)
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
      rentalDuration: selectedDuration.item.value.toString(),
    }
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
    const withDriver = await AsyncStorage.getItem('isWithDriver')
    const payloadSearch = {
      payload: {
        BusinessUnitId: await AsyncStorage.getItem('buID'),
        StartDate: await AsyncStorage.getItem('startDate'),
        EndDate: await AsyncStorage.getItem('endDate'),
        BranchId: await AsyncStorage.getItem('branchId'),
        CityId: await AsyncStorage.getItem('cityId'),
        IsWithDriver: withDriver,
        RentalPackage: await AsyncStorage.getItem('rentalPackage'),
        RentalDuration: await AsyncStorage.getItem('rentalDuration'),
        ServiceTypeId: await AsyncStorage.getItem('serviceTypeId'),
        ValidateAttribute: '1',
      },
      forceUpdate: forceUpdate,
      changeAlertVisible: changeAlertVisible,
    }
    if (activeTab === 1) {
      payloadSearch.payload.RentalPackage = 24
    }
    changeRenderMount(false)
    fetchStocks(payloadSearch)
    changeInit(true)
    // sortStocksWithPrice(stocksWithPrice, selectedSortItem.value)
    /*
    if (stocks && !stocksIsLoading && stocks.length > 0) {
      const searchPayloads = []
      stocks.forEach(async function(v) {
        const searchPricePayload = {
          payload: {
            VehicleTypeId: v.item.vehicleTypeId,
            BusinessUnitId: v.item.businessUnitId,
          },
          stock: v,
        }
        searchPayloads.push(searchPricePayload)
      })
      fetchStocksWithPrice(searchPayloads)
    }
    */
  }

  const changeSelectedDurationFunc = (duration) => {
    changeSelectedDuration(duration)
    if (duration && duration.item) {
      console.log(duration.item.date)
      changeEndDate(duration.item.date)
    }
  }

  const changeDate = (date) => {
    changeSelectedDate(date._d)
    if (selectedDuration && selectedDuration.item) {
      console.log(selectedDate)
      console.log(selectedDuration)
      console.log(selectedPackage)
      let pastDay = 0
      const tempDate = new Date(selectedDate).getTime()
      if (selectedPackage && selectedPackage.item) {
        if (tempDate.getHours + parseInt(selectedPackage.item.Duration) >= 24) {
          pastDay = 1
          console.log('past day')
        }
      }
      const endTime =
        date._d.getTime() + (selectedDuration.item.value + parseInt(pastDay) - 1) * 86400000
      console.log(endTime)
      console.log(new Date(endTime))
      changeEndDate(new Date(endTime))
      forceUpdate()
    }
    onChangeDate(date._d)
    forceUpdate()
  }

  const onChangePackage = (data) => {
    const newDurationsArr = []
    for (let i = 1; i <= 10; i++) {
      let pastDay = 0
      const tempDate = new Date(selectedDate)
      if (data.item && data.item.Duration) {
        if (parseInt(tempDate.getHours()) + parseInt(data.item.Duration) >= 24) {
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
      newDurationsArr.push(newDuration)
    }
    changeDurations(newDurationsArr)
    changeSelectedDurationFunc(newDurationsArr[selectedDurationIndex])
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
      newDurationsArr.push(newDuration)
    }
    console.log('index' + selectedDurationIndex)
    changeDurations(newDurationsArr)
    if (selectedDurationIndex !== -1 || selectedDurationIndex !== '-1') {
      changeSelectedDuration(newDurationsArr[selectedDurationIndex])
    }
  }

  return (
    <Fragment>
      <ProductListScreen
        title={`Cars in ${selectedCity.cityName ? selectedCity.cityName : ''}`}
        subtitle={
          withDriver
            ? `${Moment(selectedDate).format('dddd, DD MMM')} - ${Moment(endDate).format(
                'DD MMM YYYY'
              )} || ${
                selectedPackage && selectedPackage.item && selectedPackage.item.Duration
                  ? selectedPackage.item.Duration
                  : '0'
              } Hour`
            : `${Moment(selectedDate).format('dddd, DD MMM')} - ${Moment(endDate).format(
                'DD MMM YYYY'
              )}`
        }
        onSaveDate={onSaveDate}
        onSaveTime={() => reloadRentPackage()}
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
        changeSelectedPackage={changePackage}
        selectedPackageIndex={selectedPackageIndex}
        changeSelectedPackageIndex={changeSelectedPackageIndex}
        selectedCity={selectedCity}
        changeSelectedCity={changeSelectedCity}
        selectedDate={selectedDate}
        changeSelectedDate={changeDate}
        onSearchButtonPress={() => searchCar()}
        items={filteredStocks}
        isDriver={withDriver}
        isPackage={withDriver}
        onIconLeftPress={() => navigation.goBack()}
        itemsLoading={stocksWithPriceIsLoading}
        sortItems={sortItems}
        selectedSortItem={selectedSortItem}
        selectedSortIndex={selectedSortIndex}
        changeSelectedSortItem={(val, index) => {
          changeSelectedSortIndex(index)
          changeSelectedSortItem(val)
        }}
        onSortPress={() => {
          sortStocksWithPrice(filteredStocks, selectedSortItem.value)
          forceUpdate()
        }}
        selectedMin={selectedMin}
        selectedMax={selectedMax}
        changeSelectedMin={changeSelectedMin}
        changeSelectedMax={changeSelectedMax}
        minRange={0}
        maxRange={2000000}
        chipItems={chipItems}
        selectedChipItem={selectedChipItem}
        selectedChipIndex={selectedChipIndex}
        onSelectChipItem={(val, index) => {
          changeSelectedChipItem(val)
          changeSelectedChipIndex(index)
        }}
        onFilterPress={(x, y, z) => {
          const payloadFilter = {
            selectedMin: x,
            selectedMax: y,
            selectedChipItem: z,
          }

          console.log('selectedMin', x)

          filterStocksWithPrice(stocksWithPrice, payloadFilter)
        }}
      />
      <CustomAlert
        visible={alertVisible}
        title={'KYC Required'}
        information={'To continue please complete the KYC Form first'}
        buttonLabel={'Go To KYC'}
        onPress={() => {
          changeAlertVisible(false)
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Home' })],
            })
          )
          navigation.navigate('Profile')
          navigation.navigate('MemberScreen')
        }}
      />
    </Fragment>
  )
}

CarListScreen.defaultProps = {
  cityCoverages: [],
}

CarListScreen.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.shape({})),
  stocksIsLoading: PropTypes.bool,
  stocksErrorMessage: PropTypes.string,
  fetchStocks: PropTypes.func,
  prices: PropTypes.arrayOf(PropTypes.shape({})),
  pricesIsLoading: PropTypes.bool,
  pricesErrorMessage: PropTypes.string,
  fetchStockPrice: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  cityCoverages: PropTypes.arrayOf(PropTypes.shape({})),
  cityCoveragesIsLoading: PropTypes.bool,
  cityCoveragesErrorMessage: PropTypes.string,
  fetchCityCoverages: PropTypes.func,
  rentDurations: PropTypes.arrayOf(PropTypes.shape({})),
  rentDurationsIsLoading: PropTypes.bool,
  rentDurationsErrorMessage: PropTypes.string,
  fetchRentDurations: PropTypes.func,
  stocksWithPrice: PropTypes.arrayOf(PropTypes.shape({})),
  stocksWithPriceIsLoading: PropTypes.bool,
  stocksWithPriceErrorMessage: PropTypes.string,
  fetchStocksWithPrice: PropTypes.func,
  filteredStocks: PropTypes.arrayOf(PropTypes.shape({})),
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
  alertVisible: PropTypes.bool,
  changeAlertVisible: PropTypes.func,
}

const mapStateToProps = (state) => ({
  stocks: state.carListScreen.stocks,
  stocksIsLoading: state.carListScreen.stocksIsLoading,
  stocksErrorMessage: state.carListScreen.stocksErrorMessage,
  prices: state.carListScreen.prices,
  pricesIsLoading: state.carListScreen.pricesIsLoading,
  pricesErrorMessage: state.carListScreen.pricesErrorMessage,
  stocksWithPrice: state.carListScreen.stocksWithPrice,
  stocksWithPriceIsLoading: state.carListScreen.stocksWithPriceIsLoading,
  stocksWithPriceErrorMessage: state.carListScreen.stocksWithPriceErrorMessage,
  cityCoverages: state.filter.cityCoverages,
  cityCoveragesIsLoading: state.filter.cityCoveragesIsLoading,
  cityCoveragesErrorMessage: state.filter.cityCoveragesErrorMessage,
  rentDurations: state.filter.rentDurations,
  rentDurationsIsLoading: state.filter.rentDurationsIsLoading,
  rentDurationsErrorMessage: state.filter.rentDurationsErrorMessage,
  filteredStocks: state.carListScreen.filteredStocks,
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
  alertVisible: state.carListScreen.alertVisible,
})

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: (payload) => dispatch(CarListScreenActions.fetchStocks(payload)),
  fetchStockPrice: (payload) => dispatch(CarListScreenActions.fetchStockPrice(payload)),
  fetchStocksWithPrice: (payload) => dispatch(CarListScreenActions.fetchStocksWithPrice(payload)),
  fetchCityCoverages: () => dispatch(CarFilterScreenActions.fetchCityCoverages()),
  fetchRentDurations: () => dispatch(CarFilterScreenActions.fetchRentDurations()),
  sortStocksWithPrice: (payload, sortMethod) => {
    const tempArr = payload
    sortStock(tempArr, sortMethod)
    console.log(tempArr)
    dispatch(CarListScreenActions.changeStocksWithPrice(tempArr))
  },
  filterStocksWithPrice: (payload, filterMethod) => {
    const tempArr = payload
    console.log(filterMethod)
    const filtered = filterStock(tempArr, filterMethod)
    console.log(filtered)
    dispatch(CarListScreenActions.changeStocksWithPrice(filtered))
  },
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
  changeAlertVisible: (payload) => dispatch(CarListScreenActions.changeAlertVisible(payload)),
  resetState: () => dispatch(CarFilterScreenActions.resetState()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarListScreen)
