import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import ListViewCardLocationSelfDrive from 'components/molecules/listViewCardLocationSelfDrive'

import { Column, Margin, Fonts, Colors, Padding, Row } from 'theme'

import backIcon from 'icons/ic-back.svg'
import editIcon from 'icons/ic-edit.svg'

export default function SelfDrivePickLocationScreen({
  onIconLeftPress,
  title,
  items,
  changeItems,
  style,
  locationDetailLabel,
  notesPlaceholder,
  locationPlaceholder,
  hourSufix,
  keyword,
  changeKeyword,
  predictionItemClick,
  requestSearchPrediction,
  keywordPlaceholder,
  predictions,
  saveButtonLabel,
  onSaveButtonPress,
  onCloseIconPress,
  poolLocation,
  poolLabel,
  poolPrice,
  anotherLocationLabel,
}) {
  return (
    <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
      <DefaultHeader
        border={true}
        title={title}
        iconLeft={backIcon}
        onIconLeftPress={onIconLeftPress}
      />
      <View style={{ flex: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <ListViewCardLocationSelfDrive
          items={items}
          changeItems={changeItems}
          locationDetailLabel={locationDetailLabel}
          notesPlaceholder={notesPlaceholder}
          locationPlaceholder={locationPlaceholder}
          hourSufix={hourSufix}
          keyword={keyword}
          changeKeyword={changeKeyword}
          predictionItemClick={predictionItemClick}
          requestSearchPrediction={requestSearchPrediction}
          keywordPlaceholder={keywordPlaceholder}
          predictions={predictions}
          onCloseIconPress={onCloseIconPress}
          poolLocation={poolLocation}
          poolLabel={poolLabel}
          poolPrice={poolPrice}
          anotherLocationLabel={anotherLocationLabel}
        />
      </View>
      <DefaultFooter buttonText={saveButtonLabel} onButtonPress={onSaveButtonPress} />
    </View>
  )
}

SelfDrivePickLocationScreen.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Select Location',
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
  saveButtonLabel: 'Simpan',
  onSaveButtonPress: () => {},
  onCloseIconPress: () => {},
  poolLabel: 'Pool',
  poolPrice: 0,
  anotherLocationLabel: 'Another location',
}

SelfDrivePickLocationScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  poolLocation: PropTypes.shape({}),
  changeItems: PropTypes.func,
  style: PropTypes.shape({}),
  locationDetailLabel: PropTypes.string,
  notesPlaceholder: PropTypes.string,
  locationPlaceholder: PropTypes.string,
  hourSufix: PropTypes.string,
  keyword: PropTypes.string,
  changeKeyword: PropTypes.func,
  predictionItemClick: PropTypes.func,
  requestSearchPrediction: PropTypes.func,
  keywordPlaceholder: PropTypes.string,
  predictions: PropTypes.arrayOf(PropTypes.shape({})),
  saveButtonLabe: PropTypes.string,
  onSaveButtonPress: PropTypes.func,
  onCloseIconPress: PropTypes.func,
  poolLabel: PropTypes.string,
  poolPrice: PropTypes.number,
  anotherLocationLabel: PropTypes.string,
}
