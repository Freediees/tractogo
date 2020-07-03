import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, ScrollView, Alert } from 'react-native'
import CardLocationSelfDrive from 'components/atom/cardLocationSelfDrive'
import CustomLocationPicker from 'components/atom/customLocationPicker'
import { Padding, Margin, Column } from 'theme'
// import update from 'immutability-helper'

export default function ListViewCardLocationSelfDrive({
  items,
  changeItems,
  style,
  locationDetailLabel,
  notesPlaceholder,
  locationPlaceholder,
  placeHolderStartTime,
  hourSufix,
  keyword,
  changeKeyword,
  predictionItemClick,
  requestSearchPrediction,
  keywordPlaceholder,
  locationPlaceHolder,
  predictions,
  onCloseIconPress,
  poolLabel,
  poolPrice,
  anotherLocationLabel,
  poolLocation,
}) {
  const [modalLocationPicker, changeModalLocationPicker] = useState(false)
  const [selectedIndex, changeSelectedIndex] = useState(0)

  const changeItemLocation = (index, newLocation) => {
    let temp = items
    temp[index].location = newLocation
    changeItems(temp)
  }

  const changeItemIsPool = (index, isPool) => {
    let temp = items
    if (isPool) {
      temp[index].location = poolLocation
      temp[index].price = 0
      temp[index].priceExpedition = []
    }
    temp[index].isPool = isPool
    changeItems(temp)
  }

  const changePlaceDetail = (val, index) => {
    predictionItemClick(val, index)
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <CustomLocationPicker
        modalVisible={modalLocationPicker}
        changeModalVisible={changeModalLocationPicker}
        keyword={keyword}
        changeKeyword={changeKeyword}
        requestSearchPrediction={requestSearchPrediction}
        keywordPlaceholder={keywordPlaceholder}
        predictions={predictions}
        predictionItemClick={(v) => {
          changePlaceDetail(v, selectedIndex)
        }}
        locationPlaceHolder={locationPlaceholder}
        location={items && items[selectedIndex] ? items[selectedIndex].location : null}
        changeLocation={(location) => {
          changeItemLocation(selectedIndex, location)
        }}
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
      <ScrollView
        style={{
          ...Column.col_12,
          ...Padding.ph_20,
        }}
      >
        {items &&
          items.map((v, i) => {
            return (
              <CardLocationSelfDrive
                key={`location-${i}`}
                onItemPress={() => {
                  changeSelectedIndex(i)
                }}
                onLocationTextPress={() => {
                  changeSelectedIndex(i)
                  changeModalLocationPicker(true)
                }}
                locationDetailLabel={locationDetailLabel}
                location={v.location}
                changeLocation={(location) => {
                  changeItemLocation(i, location)
                }}
                notesPlaceholder={notesPlaceholder}
                locationPlaceholder={locationPlaceholder}
                date={v.date}
                notes={v.notes}
                onNoteChange={(text) => {
                  let temp = items
                  temp[i].notes = text
                  changeItems(temp)
                }}
                isPool={v.isPool}
                changeIsPool={(isPool) => {
                  changeItemIsPool(i, isPool)
                }}
                hourSufix={hourSufix}
                hour={v.hour}
                minute={v.minute}
                poolLocation={poolLocation}
                poolLabel={poolLabel}
                poolPrice={poolPrice}
                anotherLocationLabel={anotherLocationLabel}
                anotherLocationPrice={v.price}
              />
            )
          })}
      </ScrollView>
    </View>
  )
}

ListViewCardLocationSelfDrive.defaultProps = {
  items: [
    {
      date: new Date(),
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: null,
        lon: null,
      },
      price: 0,
    },
  ],
  poolLocation: {
    name: null,
    address: '',
    lat: -6.2,
    lon: 106.816666,
  },
  changeItems: () => {},
  style: {},
  locationDetailLabel: 'Detail Lokasi',
  notesPlaceholder: 'Notes',
  locationPlaceholder: 'Select Location',
  placeHolderStartTime: 'Pilih Waktu Jemput',
  hourSufix: 'Hour',
  keyword: null,
  changeKeyword: () => {},
  predictionItemClick: () => {},
  requestSearchPrediction: () => {},
  keywordPlaceholder: 'Find Location',
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
  onCloseIconPress: () => {},
  poolLabel: 'Pool',
  poolPrice: 0,
  anotherLocationLabel: 'Another Location',
}

ListViewCardLocationSelfDrive.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onCloseIconPress: PropTypes.func,
}
