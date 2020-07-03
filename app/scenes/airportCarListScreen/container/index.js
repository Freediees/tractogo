/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import Moment from 'moment'
import AirportCarListScreenActions from 'scenes/airportCarListScreen/store/actions'
import CarFilterScreenActions from 'scenes/filter/store/actions'
import ProductListScreen from 'components/organism/productListScreen'
import AsyncStorage from '@react-native-community/async-storage'
import { saveFilterFunc, saveFilterObject, getFilterObject, pad } from 'function'
import { getSortItems, sortStock } from 'function/sort'
import { getChipItems, filterStock } from 'function/filter'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

function AirportCarListScreen({
  navigation,
  stocks,
  stocksIsLoading,
  stocksErrorMessage,
  fetchStocks,
  fetchStocksWithPrice,
  stocksWithPrice,
  stocksWithPriceIsLoading,
  stocksWithPriceErrorMessage,
  filterStocksWithPrice,
  filteredStocks,
  sortStocksWithPrice,
  resetAirportState,
}) {
  const [sortItems, changeSortItems] = useState(getSortItems())
  const [chipItems, changeChipItems] = useState(getChipItems())
  const [selectedSortItem, changeSelectedSortItem] = useState(sortItems ? sortItems[0] : null)
  const [selectedSortIndex, changeSelectedSortIndex] = useState(0)
  const [selectedMin, changeSelectedMin] = useState(0)
  const [selectedMax, changeSelectedMax] = useState(2000000)
  const [selectedChipItem, changeSelectedChipItem] = useState(chipItems[0])
  const [selectedChipIndex, changeSelectedChipIndex] = useState(0)

  const forceUpdate = useForceUpdate()

  const { airportStockPayload, isFromAirport, reservationDetails } = navigation.state.params

  useEffect(() => {
    async function initialize() {
      resetAirportState()
      console.log({ airportStockPayload })
      console.log({ reservationDetails })
      const newPayload = {
        ...airportStockPayload,
        isFromAirport: isFromAirport,
        reservationDetails: reservationDetails,
        forceUpdate: forceUpdate,
      }
      console.log({ stocks })
      fetchStocks(newPayload)
    }
    initialize()
    console.log('vehicle stocks', stocks)
  }, [])

  return (
    <ProductListScreen
      title={isFromAirport ? 'From Airport' : 'To Airport'}
      subtitle={Moment(Moment.utc(reservationDetails.date.formatedSelectedDate).toDate())
        .local()
        .format('dddd, DD MMMM | HH:mm')}
      onIconLeftPress={() => navigation.goBack()}
      items={filteredStocks}
      itemsLoading={stocksWithPriceIsLoading}
      minRange={0}
      isAirport={true}
      maxRange={2000000}
      selectedMin={selectedMin}
      selectedMax={selectedMax}
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
        filterStocksWithPrice(stocksWithPrice, payloadFilter)
      }}
      onSortPress={() => {
        sortStocksWithPrice(filteredStocks, selectedSortItem.value)
        forceUpdate()
      }}
      sortItems={sortItems}
      selectedSortItem={selectedSortItem}
      selectedSortIndex={selectedSortIndex}
      changeSelectedSortItem={(val, index) => {
        changeSelectedSortIndex(index)
        changeSelectedSortItem(val)
      }}
      changeSelectedMin={changeSelectedMin}
      changeSelectedMax={changeSelectedMax}
    />
    // <View>
    //   <Text>{'cek'}</Text>
    //   <Text>{stocks.length}</Text>
    //   <Text>{}</Text>
    // </View>
  )
}

AirportCarListScreen.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.shape({})),
  stocksIsLoading: PropTypes.bool,
  stocksErrorMessage: PropTypes.string,
  fetchStocks: PropTypes.func,
  //   navigation: PropTypes.shape({
  //     navigate: PropTypes.func.isRequired,
  //   }).isRequired,
  stocksWithPrice: PropTypes.arrayOf(PropTypes.shape({})),
  stocksWithPriceIsLoading: PropTypes.bool,
  stocksWithPriceErrorMessage: PropTypes.string,
  filteredStocks: PropTypes.arrayOf(PropTypes.shape({})),
  resetAirportState: PropTypes.func,
}

const mapStateToProps = (state) => ({
  stocks: state.airportCarList.stocks,
  stocksIsLoading: state.airportCarList.stocksIsLoading,
  stocksWithPrice: state.airportCarList.stocksWithPrice,
  stocksWithPriceIsLoading: state.airportCarList.stocksWithPriceIsLoading,
  stocksWithPriceErrorMessage: state.airportCarList.stocksWithPriceErrorMessage,
  filteredStocks: state.airportCarList.filteredStocks,
})

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: (payload) => dispatch(AirportCarListScreenActions.fetchAirportStocks(payload)),
  fetchStocksWithPrice: (payload) =>
    dispatch(AirportCarListScreenActions.fetchStocksWithPrice(payload)),
  sortStocksWithPrice: (payload, sortMethod) => {
    const tempArr = payload
    sortStock(tempArr, sortMethod)
    console.log(tempArr)
    dispatch(AirportCarListScreenActions.changeAirportStocksWithPrice(tempArr))
  },
  filterStocksWithPrice: (payload, filterMethod) => {
    const tempArr = payload
    console.log(filterMethod)
    const filtered = filterStock(tempArr, filterMethod)
    console.log(filtered)
    dispatch(AirportCarListScreenActions.changeAirportStocksWithPrice(filtered))
  },
  resetAirportState: () => dispatch(AirportCarListScreenActions.resetAirportState()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirportCarListScreen)
